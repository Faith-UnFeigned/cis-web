import { ActionIcon, Affix, Menu, Slider, Tooltip, rem } from "@mantine/core";
import {
  IconAdjustmentsHorizontal,
  IconHome,
  IconMaximize,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";
import { PREFERRED_HYMNAL_STORAGE_KEY } from "../../../data/hymnalsConfig";

import classes from "./FloatingButtons.module.scss";
import { useColorMode } from "../../../Context/ColorMode";
import { isFullscreenSupported } from "../../../utils/isFullscreenSupported";

export default function FloatingButtons({
  textSize,
  setTextSize,
  togglePresentationMode,
}: {
  textSize: number;
  setTextSize: (val: number) => void;
  togglePresentationMode: () => void;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [, setPreferredHymnal] = useLocalStorage<string>({
    key: PREFERRED_HYMNAL_STORAGE_KEY,
    defaultValue: "",
  });

  return (
    <Affix
      position={{ bottom: 20, right: 20 }}
      display="flex"
      style={{
        flexDirection: "column",
      }}
      className={classes.container}
    >
      {isFullscreenSupported() && (
        <Tooltip label="Presentation mode">
          <ActionIcon
            size={50}
            variant="default"
            onClick={togglePresentationMode}
          >
            <IconMaximize />
          </ActionIcon>
        </Tooltip>
      )}

      <Tooltip label="Go home">
        <Tooltip label="Go home">
          <ActionIcon
            size={50}
            variant="default"
            onClick={() => {
              setPreferredHymnal("");
              navigate("/");
            }}
          >
            <IconHome />
          </ActionIcon>
        </Tooltip>
      </Tooltip>

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
                <IconMoon style={{ width: rem(14), height: rem(14) }} />
              ) : (
                <IconSun style={{ width: rem(14), height: rem(14) }} />
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
                    label: <b style={{ fontSize: "0.7em" }}>A</b>,
                  },
                  {
                    value: 2,
                    label: <b style={{ fontSize: "1.2em" }}>A</b>,
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
