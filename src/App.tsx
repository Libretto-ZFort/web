import {ChakraProvider, Box, theme} from "@chakra-ui/react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AppContextProvider, useAppContext} from "./context/AppContext";
import ConversationScreen from "./screens/Conversation";
import routes from "./navigation/routes";
import ChatGPTScreen from "./screens/ChatGPT";

function App() {
    const {routeHash} = useAppContext();

    if (routeHash) {
        if (routeHash.endsWith("&type=recovery")) {
            window.location.replace(`/login/${routeHash}`);
        }

        if (routeHash.startsWith("#error_code=404"))
            return (
                <div>
                    <p>This link has expired</p>
                    <a href={routes.HOME} style={{cursor: "pointer"}}>
                        Back to app
                    </a>
                </div>
            );
    }

    return (
        <ChakraProvider theme={theme}>
            <AppContextProvider>
                <Box bg="gray.100">
                    <Router>
                        <Routes>
                            <Route
                                key={routes.HOME}
                                path={routes.HOME}
                                element={
                                    <ConversationScreen/>
                                }
                            />
                            <Route
                                key={routes.CHAT}
                                path={routes.CHAT}
                                element={
                                    <ChatGPTScreen/>
                                }
                            />
                            <Route path="*" element={<p>Not found</p>}/>
                        </Routes>
                    </Router>
                </Box>
            </AppContextProvider>
        </ChakraProvider>
    );
}

export default App;
