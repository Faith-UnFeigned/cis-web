import { Alert, Code } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

import { Hymn } from "../../../utils/types";

export function InvalidHymnMessage({ selectedHymn }: { selectedHymn: Hymn }) {
    return (
        <Alert
            variant="light"
            color="red"
            title="Invalid hymn"
            icon={<IconInfoCircle />}
        >
            This hymn (number {selectedHymn.number}) does not have a valid{" "}
            <Code>markdown</Code> or <Code>content</Code> value
        </Alert>
    );
}

export function NoHymnMessage() {
    return (
        <Alert
            variant="light"
            color="gray"
            title="No hymn selected"
            icon={<IconInfoCircle />}
        >
            There is no hymn with the selected number in this hymnal
        </Alert>
    );
}
