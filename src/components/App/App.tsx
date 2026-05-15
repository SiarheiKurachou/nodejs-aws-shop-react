import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "~/components/MainLayout/MainLayout";
import { Typography } from "@mui/material";

const PageProductForm = React.lazy(
  () => import("~/components/pages/PageProductForm/PageProductForm")
);
const PageOrders = React.lazy(
  () => import("~/components/pages/PageOrders/PageOrders")
);
const PageOrder = React.lazy(() => import("~/components/pages/PageOrder/PageOrder"));
const PageProductImport = React.lazy(
  () => import("~/components/pages/admin/PageProductImport/PageProductImport")
);
const PageCart = React.lazy(() => import("~/components/pages/PageCart/PageCart"));
const PageProducts = React.lazy(
  () => import("~/components/pages/PageProducts/PageProducts")
);

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <Routes>
          <Route path="/" element={<PageProducts />} />
          <Route path="cart" element={<PageCart />} />
          <Route path="admin/orders">
            <Route index element={<PageOrders />} />
            <Route path=":id" element={<PageOrder />} />
          </Route>
          <Route path="admin/products" element={<PageProductImport />} />
          <Route path="admin/product-form">
            <Route index element={<PageProductForm />} />
            <Route path=":id" element={<PageProductForm />} />
          </Route>
          <Route
            path="*"
            element={<Typography variant="h1">Not found</Typography>}
          />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
