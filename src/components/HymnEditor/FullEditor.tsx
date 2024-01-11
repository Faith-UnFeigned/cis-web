import { RichTextEditor } from "@mantine/tiptap";
import { Editor as ReactEditor } from "@tiptap/react";
import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconCode,
    IconColorPicker,
} from "@tabler/icons-react";

export function FullEditor({
    editor,
    format,
    setEditingRawCode,
}: {
    editor: ReactEditor;
    format: "html" | "markdown";
    setEditingRawCode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Control
                        title="Edit raw code"
                        onClick={() => setEditingRawCode(true)}
                    >
                        <IconCode size={16} />
                    </RichTextEditor.Control>
                    <RichTextEditor.Control
                        title="Undo"
                        disabled={!editor?.can().undo()}
                        onClick={() => editor?.commands.undo()}
                    >
                        <IconArrowBackUp size={16} />
                    </RichTextEditor.Control>
                    <RichTextEditor.Control
                        title="Redo"
                        disabled={!editor?.can().redo()}
                        onClick={() => editor?.commands.redo()}
                    >
                        <IconArrowForwardUp size={16} />
                    </RichTextEditor.Control>
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.ClearFormatting />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                </RichTextEditor.ControlsGroup>

                {format === "html" ? (
                    <>
                        <RichTextEditor.ColorPicker
                            colors={[
                                "#25262b",
                                "#868e96",
                                "#fa5252",
                                "#e64980",
                                "#be4bdb",
                                "#7950f2",
                                "#4c6ef5",
                                "#228be6",
                                "#15aabf",
                                "#12b886",
                                "#40c057",
                                "#82c91e",
                                "#fab005",
                                "#fd7e14",
                            ]}
                        />

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Control interactive={false}>
                                <IconColorPicker size="1rem" stroke={1.5} />
                            </RichTextEditor.Control>
                            <RichTextEditor.Color color="#37B24D" />
                            <RichTextEditor.Color color="#F0B323" />
                            <RichTextEditor.UnsetColor />
                        </RichTextEditor.ControlsGroup>
                    </>
                ) : null}
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content
                style={{
                    fontFamily: "'Nunito', var(--mantine-font-family)",
                }}
            />
        </RichTextEditor>
    );
}
