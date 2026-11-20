import { Anchor, Container, Space } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

import { Footer } from "../../Components/Footer/Footer";
import { FLoatingColorModeButton } from "../../Components/FLoatingColorModeButton/FLoatingColorModeButton";

export default function PrivacyPolicy() {
    useDocumentTitle("Privacy Policy | Christ in Song");

    return (
        <Container
            style={{
                fontFamily: '"Sora", Verdana, Geneva, Tahoma, sans-serif',
                padding: "2em 2em 1em 2em",
            }}
        >
            <main
                style={{
                    fontFamily: '"Nunito", Verdana, Geneva, Tahoma, sans-serif',
                }}
            >
                <h1>Privacy Policy</h1>
                <p>
                    This policy applies to the Christ In Song website and our
                    apps, including the iOS, Android, macOS, and Apple TV (tvOS)
                    versions. Christ In Song is provided by Tinashe Mzondiwa at
                    no cost and is intended to be used as provided.
                </p>
                <p>
                    This policy explains what information may be handled when
                    you use Christ In Song, how it is used, and the choices
                    available to you. We do not require you to create an
                    account to use the Apple TV app.
                </p>

                <h2>Apple TV (tvOS)</h2>
                <p>
                    The Apple TV app stores app preferences, recently viewed
                    hymns, pinned hymnals, and saved collections locally on
                    your Apple TV. The app does not send this local information
                    to Christ In Song servers or sync it to an account.
                </p>
                <p>
                    The tvOS version does not send its analytics events to
                    Firebase Analytics. When you choose to play a tune, the app
                    may download a sound-font file from GitHub at
                    raw.githubusercontent.com. GitHub may receive standard
                    connection information, such as your IP address and the
                    requested file, as part of serving that download. See the
                    <Anchor
                        href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub Privacy Statement
                    </Anchor>
                    .
                </p>

                <h2>Information and app diagnostics</h2>
                <p>
                    App features and data handling vary by platform. The Apple
                    TV app does not ask you to provide a name, email address, or
                    other account information. On platforms where analytics or
                    crash reporting services are integrated, those services may
                    process usage events and diagnostic information to help us
                    understand app use and investigate errors. This information
                    may include app and operating system versions, device
                    information, event details, crash reports, and the time of
                    an event.
                </p>
                <p>
                    Some versions of Christ In Song use third-party services
                    such as Google Analytics for Firebase, Firebase Crashlytics,
                    or Google Play Services. Their use depends on the platform
                    and the services included in that app version. These
                    providers handle information under their own privacy
                    policies:
                </p>
                <ul>
                    <li>
                        <Anchor
                            href="https://www.google.com/policies/privacy/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Privacy Policy (including Google Play
                            Services)
                        </Anchor>
                    </li>
                    <li>
                        <Anchor
                            href="https://firebase.google.com/policies/analytics"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Analytics for Firebase Privacy Information
                        </Anchor>
                    </li>
                    <li>
                        <Anchor
                            href="https://firebase.google.com/support/privacy/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Firebase Privacy and Security
                        </Anchor>
                    </li>
                </ul>

                <h2>Website storage and cookies</h2>
                <p>
                    The website stores preferences such as your selected hymnal
                    and color mode in your browser’s local storage. The website
                    does not use cookies explicitly. Third-party resources used
                    by the website, such as Google Fonts, may receive standard
                    connection information when your browser requests them.
                </p>

                <h2>Service providers and external links</h2>
                <p>
                    We use third-party providers when needed to deliver or
                    support parts of the service, such as analytics, crash
                    diagnostics, and file downloads. These providers may process
                    information needed to perform their services and are
                    governed by their own privacy policies. Christ In Song may
                    also link to external websites; we do not control their
                    content or privacy practices, so please review their
                    policies before using them.
                </p>

                <h2>Security and data retention</h2>
                <p>
                    We use reasonable measures to protect information handled
                    by the service. No method of internet transmission or
                    electronic storage is completely secure. Information saved
                    locally by the Apple TV app remains on that device unless
                    you remove it by clearing the app’s data or uninstalling
                    the app. Third-party providers retain information under
                    their own policies.
                </p>

                <h2>Children’s privacy</h2>
                <p>
                    We do not knowingly collect personal information directly
                    from children. If you believe a child has provided personal
                    information to us, contact us so we can review and address
                    the request.
                </p>

                <h2>Changes to this policy</h2>
                <p>
                    We may update this policy as our services or data practices
                    change. We will post the updated policy on this page and
                    revise the effective date.
                </p>
                <p>This policy is effective as of November 19, 2026.</p>

                <h2>Contact</h2>
                <p>
                    If you have questions or requests about this policy, email
                    us at{" "}
                    <Anchor href="mailto:tmzon08@gmail.com">
                        tmzon08@gmail.com
                    </Anchor>
                    .
                </p>
            </main>
            <Space h="md" />
            <Footer />
            <FLoatingColorModeButton />
        </Container>
    );
}
