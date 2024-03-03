import { Box, Container, Space } from "@mantine/core";

import styles from "./Support.module.scss";
import { Footer } from "../../Components/Footer/Footer";
import { FLoatingColorModeButton } from "../../Components/FLoatingColorModeButton/FLoatingColorModeButton";
import { useDocumentTitle } from "@mantine/hooks";

export default function SupportPage() {
    useDocumentTitle("Support | Christ in Song on the Web");
    return (
        <Container className={styles.container}>
            <h1>Support</h1>
            <Box className={styles.main}>
                <img src="/images/ic_undraw_air_support.svg" />
                <h2>Support us with a Donation!</h2>
                <div className={styles.subtext}>
                    If you find this web app useful, please consider supporting
                    us with a donation
                </div>
                <p className={styles.disclaimer}>
                    A One-time Donation or a Monthly Donation is not required to
                    access any feature of this web app, All features are
                    available for free and will always be.
                    {/* The subscription renews automatically each month. You can
                    cancel your subscription at any time through your Google
                    Play Store account settings and your subscription will stay
                    active until the end of your subscription period.
                    Subscriptions must be cancelled at least 24 hours before the
                    end of the subscription period to avoid being charged for
                    another month. */}
                </p>
            </Box>
            <Space h="md" />
            <Footer />
            <FLoatingColorModeButton />
        </Container>
    );
}
