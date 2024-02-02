import { ReactNode } from "react";
import styles from "./Feature.module.scss";
import { useColorMode } from "../../../Context/ColorMode";

export function Feature({
    icon,
    subtext,
    title,
}: {
    icon: ReactNode;
    title: string;
    subtext: string;
}) {
    const { colorMode } = useColorMode();

    return (
        <div
            className={styles.feature}
            style={{
                backgroundColor:
                    colorMode === "dark"
                        ? "rgb(50, 50, 50)"
                        : "rgb(236, 236, 236)",
            }}
        >
            {icon}
            <div className={styles.text}>
                <h3>{title}</h3>
                <span>{subtext}</span>
            </div>
        </div>
    );
}
