import { Divider, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconBrandGithub } from "@tabler/icons-react";

import styles from "./Footer.module.scss";

export function Footer() {
    const theme = useMantineTheme();

    const linkStyle = { color: theme.colors.green[9] };

    return (
        <>
            <Divider className={styles.divider} />
            <footer className={styles.footer}>
                <div className={styles.footerContents}>
                    <div>
                        {/* <div>Made with ♥ by Faith Unfeigned</div> */}
                        <div className={styles.links}>
                            <Link to="/" style={linkStyle}>
                                Home
                            </Link>{" "}
                            <span>·</span>{" "}
                            <Link to="/support" style={linkStyle}>
                                Support
                            </Link>{" "}
                            <span>·</span>{" "}
                            <Link to="/info" style={linkStyle}>
                                Info
                            </Link>
                        </div>
                    </div>
                    <div className={styles.icons}>
                        <a
                            href="https://github.com/Faith-UnFeigned/cis-web"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconBrandGithub />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
