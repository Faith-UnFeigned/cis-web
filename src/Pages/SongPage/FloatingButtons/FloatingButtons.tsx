import { ActionIcon, Affix, Menu, Slider, rem } from "@mantine/core";
import {
    IconAdjustmentsHorizontal,
    IconMoon,
    IconSun,
} from "@tabler/icons-react";

import classes from "./FloatingButtons.module.css";
import { useColorMode } from "../../../Context/ColorMode";

export default function FloatingButtons({
    textSize,
    setTextSize,
}: {
    textSize: number;
    setTextSize: (val: number) => void;
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
                    <Menu.Item>
                        <div style={{ width: 200, height: 35 }}>
                            <Slider
                                value={textSize}
                                onChange={(size) => setTextSize(size)}
                                min={0.8}
                                max={2.0}
                                step={0.1}
                                marks={[
                                    {
                                        value: 0.8,
                                        label: (
                                            <b style={{ fontSize: "0.7em" }}>
                                                A
                                            </b>
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: (
                                            <b style={{ fontSize: "1.2em" }}>
                                                A
                                            </b>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Affix>
    );
}
