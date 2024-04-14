import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";

import { Routes, Route } from "react-router-dom";

import SideBarContainer from "./components/SideBarContainer";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

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
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ProSidebarProvider>
    </>
  );
}

export default App;
