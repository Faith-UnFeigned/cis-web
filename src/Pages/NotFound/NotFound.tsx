import { Box, useMantineTheme } from "@mantine/core";

import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@mantine/hooks";

export default function NotFound() {
    useDocumentTitle("404 - Not found");

    const theme = useMantineTheme();

    return (
        <Box
            className={styles.container}
            style={{
                fontFamily: "Sora",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Box style={{ height: "fit-content" }}>
                <h1 style={{ fontSize: "4em" }}>404</h1>
                <h2>Not Found</h2>
                <p>
                    There was nothing found at this URL. You may go to the{" "}
                    <Link to="/" style={{ color: theme.colors.green[9] }}>
                        homepage
                    </Link>
                </p>
            </Box>
        </Box>
    );
}
