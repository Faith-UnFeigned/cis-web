import { useState } from "react";
import { Center, Container, Space } from "@mantine/core";
import { useEditor, Editor as ReactEditor } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Markdown } from "tiptap-markdown";

import {
    InvalidHymnMessage,
    NoHymnMessage,
} from "../ErrorMessages/ErrorMessages";
import { Hymn, useDebouncedAction } from "../../utils";
import { FullEditor } from "./FullEditor";
import { RawCodeEditor } from "./RawCodeEditor";
import { TitleInput } from "./TitleInput";

export default function HymnEditor({
    currentHymn,
    updateHymn,
}: {
    currentHymn?: Hymn;
    updateHymn: (updater: (oldValue: Hymn) => Hymn) => void;
}) {
    if (!currentHymn) {
        return (
            <Center>
                <NoHymnMessage />
            </Center>
        );
    }

    const [editingRawCode, setEditingRawCode] = useState(false);

    const hymn: { text: string; format: "html" | "markdown" } | null =
        currentHymn?.content
            ? { text: currentHymn.content, format: "html" }
            : currentHymn?.markdown
            ? { text: currentHymn.markdown, format: "markdown" }
            : null;

    if (!hymn) {
        return (
            <Center>
                <InvalidHymnMessage selectedHymn={currentHymn} />
            </Center>
        );
    }

    const getEditorContent = (editor: Editor) =>
        hymn?.format === "html"
            ? editor?.getHTML()
            : (editor?.storage.markdown.getMarkdown() as string);

    const delay = useDebouncedAction();

    const updateHymnContent = (content: string) =>
        delay(() => {
            if (hymn?.format === "html") {
                updateHymn((oldValue) => ({
                    ...oldValue,
                    content: content,
                }));
            } else {
                updateHymn((oldValue) => ({
                    ...oldValue,
                    markdown: content,
                }));
            }
        }, 1000);

    const editor = useEditor(
        {
            extensions:
                hymn.format === "html"
                    ? [StarterKit, TextStyle, Color]
                    : [StarterKit, Markdown],
            content: hymn.text,
            onUpdate: (editor) => {
                updateHymnContent(getEditorContent(editor.editor));
            },
        },
        [currentHymn.number]
    );

    return (
        <Container>
            <TitleInput
                hymnNumber={currentHymn.number}
                title={currentHymn.title}
                updateTitle={(title) =>
                    updateHymn((oldValue) => ({ ...oldValue, title }))
                }
            />
            <Space h={16} />
            {!editingRawCode ? (
                <FullEditor
                    editor={editor as ReactEditor}
                    format={hymn.format}
                    setEditingRawCode={setEditingRawCode}
                />
            ) : (
                <RawCodeEditor
                    initialValue={getEditorContent(editor as Editor)}
                    setEditingRawCode={setEditingRawCode}
                    onUpdate={(text) => {
                        editor?.commands.setContent(text);
                        updateHymnContent(text);
                    }}
                />
            )}
        </Container>
    );
}
