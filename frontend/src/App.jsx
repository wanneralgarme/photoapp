import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import Navigation from "./Navigation";
import ImageGridNature from "./pages/ImageGridNature";
import ImageGridArchitecture from "./pages/ImageGridArchitecture";
import ImageGridFashion from "./pages/ImageGridFashion";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<ImageGridNature />} />
          <Route path="/architecture" element={<ImageGridArchitecture />} />
          <Route path="/fashion" element={<ImageGridFashion />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
