import { NavLink, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@mantine/hooks";
import {
    IconArrowsMove,
    IconDeviceMobile,
    IconLanguage,
    IconSearch,
} from "@tabler/icons-react";

import styles from "./Homepage.module.scss";
import { HYMNALS_CONFIG } from "../../data/hymnalsConfig";
import { useColorMode } from "../../Context/ColorMode";
import { Feature } from "./Feature/Feature";
import { Footer } from "../../Components/Footer/Footer";

export function Homepage() {
    useDocumentTitle("Christ in Song on the Web");

    const theme = useMantineTheme();
    const { colorMode } = useColorMode();

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.titleContainer}>
                    <h1>Christ in Song on the Web</h1>
                    <div className={styles.links}>
                        <a className={styles.getStarted} href="#languages">
                            Get Started
                        </a>
                        <a className={styles.features} href="#features">
                            Features →
                        </a>
                    </div>
                </div>
            </header>
            <section className={styles.languagesContainer} id="languages">
                <div className={styles.languages}>
                    <h2>Pick a Hymnal Version</h2>
                    <div
                        className={styles.links}
                        style={{
                            borderColor:
                                theme.colors.gray[colorMode === "dark" ? 8 : 1],
                        }}
                    >
                        {[...HYMNALS_CONFIG]
                            .sort((a, b) => (a.title < b.title ? -1 : 1))
                            .map((value) => (
                                <Link
                                    key={value.key}
                                    className={styles.link}
                                    to={`/songs/${value.key}/1`}
                                >
                                    <NavLink
                                        label={value.title}
                                        description={value.language}
                                    />
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
            <section className={styles.featuresContainer} id="features">
                <div className={styles.features}>
                    <h2>Features</h2>
                    <div className={styles.featuresList}>
                        <Feature
                            icon={<IconLanguage />}
                            title="Multiple Language Support"
                            subtext="Access hymnals in various languages"
                        />
                        <Feature
                            icon={<IconArrowsMove />}
                            title="Easy Navigation"
                            subtext="Quickly find and browse through hymns"
                        />
                        <Feature
                            icon={<IconSearch />}
                            title="Search Functionality"
                            subtext="Effortlessly search for specific hymns or keywords"
                        />
                        <Feature
                            icon={<IconDeviceMobile />}
                            title="Responsive Design"
                            subtext="Enjoy a seamless experience on any device"
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
