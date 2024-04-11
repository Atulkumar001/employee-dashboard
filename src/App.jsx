import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ProSidebarProvider } from "react-pro-sidebar";

import {Routes, Route} from "react-router-dom";

// import Topbar from "./pages/global/Topbar";
// import Sidebar from "./pages/global/Sidebar";
import SideBarContainer from "./components/SideBarContainer";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
// import Calender from "./pages/calender";
// import Notes from "./pages/notes";
// import Settings from "./pages/settings";
function App() {

  const [theme, colorMode] = useMode();
  return (
    <>
    <ProSidebarProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <SideBarContainer />
                        <main className="content">
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                {/* <Route path="/calender" element={<Calender />} />
                                <Route path="/notes" element={<Notes />} />
                                <Route path="/settings" element={<Settings />} /> */}
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </ProSidebarProvider>
    </>
  )
}

export default App
