import { Box, Container, Space } from "@mantine/core";

import styles from "./Info.module.scss";
import { Footer } from "../../Components/Footer/Footer";
import { useColorMode } from "../../Context/ColorMode";
import { FLoatingColorModeButton } from "../../Components/FLoatingColorModeButton/FLoatingColorModeButton";
import {
    IconBrandGithub,
    IconBrandGooglePlay,
    IconHelp,
    IconShare,
} from "@tabler/icons-react";
import { useDocumentTitle } from "@mantine/hooks";

export default function InfoPage() {
    useDocumentTitle("Info | Christ in Song on the Web");

    let { colorMode } = useColorMode();

    return (
        <Container className={styles.container}>
            <h1>Info</h1>
            <Box className={styles.main}>
                <div
                    className={styles.items}
                    style={
                        colorMode === "dark"
                            ? {
                                  borderColor: "#484848",
                                  backgroundColor: "#303030",
                              }
                            : {
                                  borderColor: "#e2e2e2",
                                  backgroundColor: "#f5f5f5",
                              }
                    }
                >
                    <a
                        href="https://github.com/Faith-UnFeigned/cis-web"
                        target="_blank"
                        className={styles.item}
                    >
                        <span className={styles.icon}>
                            <IconBrandGithub />
                        </span>
                        View Source Code
                    </a>
                    <a
                        href="mailto:tmzon08@gmail.com?subject=Christ in Song Web App"
                        target="_blank"
                        className={styles.item}
                    >
                        <span className={styles.icon}>
                            <IconHelp />
                        </span>
                        Help or Feedback
                    </a>
                    {navigator.share ? (
                        <div
                            className={styles.item}
                            onClick={() =>
                                navigator.share({
                                    url: window.location.href,
                                    title: "Christ in Song on the Web",
                                })
                            }
                        >
                            <span className={styles.icon}>
                                <IconShare />
                            </span>
                            Share This Website
                        </div>
                    ) : null}
                    <a
                        href="https://play.google.com/store/apps/details?id=com.tinashe.christInSong"
                        target="_blank"
                        className={styles.item}
                    >
                        <span className={styles.icon}>
                            <IconBrandGooglePlay />
                        </span>
                        Visit the Mobile App
                    </a>
                </div>
                <Space h="xl" />
                <p>
                    The Christ In Song web app was made with ❤️ by Faith
                    Unfeigned
                </p>
                <p>
                    If you enjoy using this app please consider sharing it to
                    others
                </p>
                <p>
                    Special thanks to all the wonderful saints who provided
                    hymnals to include in this app.
                </p>
            </Box>
            <Footer />
            <FLoatingColorModeButton />
        </Container>
    );
}
