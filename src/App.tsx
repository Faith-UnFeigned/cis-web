import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import SongPage from "./Pages/SongPage/SongPage";
import { ColorModeProvider, useColorMode } from "./Context/ColorMode";
import { Homepage } from "./Pages/Homepage/Homepage";
import SupportPage from "./Pages/Support/Support";
import InfoPage from "./Pages/Info/Info";
import NotFound from "./Pages/NotFound/NotFound";

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
        <MantineProvider
            forceColorScheme={colorMode}
            theme={{ primaryColor: "green" }}
        >
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/songs/:language/:number" element={<SongPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </MantineProvider>
    );
}

export default AppWithColorModeProvider;
