import { ActionIcon, Affix, Menu, rem, Slider, Tooltip } from "@mantine/core";
import {
	IconAdjustmentsHorizontal,
	IconHome,
	IconMaximize,
	IconMoon,
	IconSun,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useColorMode } from "../../../Context/ColorMode";
import { isFullscreenSupported } from "../../../utils/isFullscreenSupported";
import classes from "./FloatingButtons.module.scss";

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
				<Link to={"/"}>
					<ActionIcon size={50} variant="default">
						<IconHome />
					</ActionIcon>
				</Link>
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
