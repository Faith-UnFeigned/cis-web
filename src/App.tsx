import { MantineProvider } from "@mantine/core";
import PreviewContainer from "./PreviewContainer";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { ColorModeProvider, useColorMode } from "./Context/ColorMode";

function AppWithColorModeProvider() {
    return (
        <ColorModeProvider>
            <App />
        </ColorModeProvider>
    );
}

function App() {
    const { colorMode } = useColorMode();

    return (
        <MantineProvider forceColorScheme={colorMode}>
            <PreviewContainer />
        </MantineProvider>
    );
}

export default AppWithColorModeProvider;
