import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductPage from "./pages/ProductPage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="*"
          element={
            <div className="py-24 text-center">
              <h1 className="text-2xl font-bold">Page not found</h1>
              <Link to="/" className="btn-primary mt-6">
                Back to home
              </Link>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}
