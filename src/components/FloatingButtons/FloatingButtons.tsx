import { ActionIcon, Affix, Menu, rem } from "@mantine/core";
import {
    IconAdjustmentsHorizontal,
    IconDownload,
    // IconGitCompare,
    IconMoon,
    IconSun,
    IconUpload,
} from "@tabler/icons-react";

import classes from "./FloatingButtons.module.css";
import { useColorMode } from "../../Context/ColorMode";

export default function FloatingButtons({
    uploadAnotherFile,
    downloadJson,
}: {
    uploadAnotherFile: () => void;
    downloadJson: () => void;
}) {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Affix
            position={{ bottom: 20, right: 20 }}
            className={classes.container}
        >
            <Menu
                trigger="click-hover"
                openDelay={100}
                closeDelay={400}
                position="bottom-end"
            >
                <Menu.Target>
                    <ActionIcon size={50} variant="default">
                        <IconAdjustmentsHorizontal />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Options</Menu.Label>
                    <Menu.Item
                        leftSection={
                            colorMode === "light" ? (
                                <IconMoon
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            ) : (
                                <IconSun
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            )
                        }
                        onClick={toggleColorMode}
                    >
                        {colorMode === "light" ? "Dark mode" : "Light mode"}
                    </Menu.Item>
                    <Menu.Item
                        leftSection={
                            <IconDownload
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                        onClick={downloadJson}
                    >
                        Download JSON
                    </Menu.Item>
                    {/* <Menu.Item
                        leftSection={
                            <IconGitCompare
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                    >
                        Compare changes
                    </Menu.Item> */}
                    <Menu.Item
                        leftSection={
                            <IconUpload
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                        onClick={uploadAnotherFile}
                    >
                        Upload another file
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Affix>
    );
}
