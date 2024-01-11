import { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import { useDebouncedAction } from "../../utils";

export function TitleInput({
    hymnNumber,
    title,
    updateTitle,
}: {
    title: string;
    hymnNumber: number;
    updateTitle: (title: string) => void;
}) {
    const [value, setValue] = useState(title);
    const delay = useDebouncedAction();

    useEffect(() => setValue(title), [hymnNumber]);
    useEffect(() => delay(() => updateTitle(value), 1000), [value]);

    return (
        <TextInput
            size="lg"
            placeholder="Hymn title"
            value={value}
            onInput={(event) =>
                setValue((event.target as HTMLInputElement).value)
            }
        />
    );
}
