import { Routes, Route } from "react-router-dom";
import HomePage from "pages/HomePage/HomePage";
import CatalogPage from "pages/CatalogPage/CatalogPage";
import FavoritePage from "pages/FavoritePage/FavoritePage";
import Layout from "./LayOut";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;