import { useEffect, useState } from "react";
import { Textarea } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { IconCode } from "@tabler/icons-react";

export function RawCodeEditor({
    initialValue,
    setEditingRawCode,
    onUpdate,
}: {
    initialValue: string;
    setEditingRawCode: React.Dispatch<React.SetStateAction<boolean>>;
    onUpdate: (text: string) => void;
}) {
    const [value, setValue] = useState(initialValue);
    useEffect(() => setValue(initialValue), [initialValue]);

    return (
        <RichTextEditor editor={null}>
            <RichTextEditor.Toolbar>
                <RichTextEditor.Control
                    title="Enable rich text editor"
                    onClick={() => {
                        onUpdate(value);
                        setEditingRawCode(false);
                    }}
                >
                    <IconCode size={16} />
                </RichTextEditor.Control>
            </RichTextEditor.Toolbar>
            <Textarea
                placeholder="Hymn text as code"
                rows={20}
                value={value}
                onInput={(event) =>
                    setValue((event.target as HTMLTextAreaElement).value)
                }
                onBlur={() => onUpdate(value)}
            />
        </RichTextEditor>
    );
}
