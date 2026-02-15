import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

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
