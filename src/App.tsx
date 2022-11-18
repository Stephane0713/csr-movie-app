import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { SearchTextContextProvider } from "./contexts/SearchTextContextProvider";

import { HomePage } from "./pages/HomePage";
import { DetailsPage } from "./pages/DetailsPage";
import { NoPage } from "./pages/NoPage";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <SearchTextContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<HomePage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </SearchTextContextProvider>
    </StyledEngineProvider>
  );
}

export default App;
