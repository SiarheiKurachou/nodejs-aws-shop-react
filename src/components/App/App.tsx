import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "~/components/MainLayout/MainLayout";
import { Typography } from "@mui/material";
import { AuthProvider, useAuth } from "~/contexts/AuthContext";

const PageProductForm = React.lazy(
  () => import("~/components/pages/PageProductForm/PageProductForm"),
);
const PageOrders = React.lazy(
  () => import("~/components/pages/PageOrders/PageOrders"),
);
const PageOrder = React.lazy(
  () => import("~/components/pages/PageOrder/PageOrder"),
);
const PageProductImport = React.lazy(
  () => import("~/components/pages/admin/PageProductImport/PageProductImport"),
);
const PageCart = React.lazy(
  () => import("~/components/pages/PageCart/PageCart"),
);
const PageProducts = React.lazy(
  () => import("~/components/pages/PageProducts/PageProducts"),
);
const PageLogin = React.lazy(
  () => import("~/components/pages/PageLogin/PageLogin"),
);

// Protected route wrapper
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <Routes>
        <Route path="/login" element={<PageLogin />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<MainLayout><PageProducts /></MainLayout>} />}
        />
        <Route
          path="cart"
          element={<ProtectedRoute element={<MainLayout><PageCart /></MainLayout>} />}
        />
        <Route
          path="admin/orders"
          element={<ProtectedRoute element={<MainLayout><PageOrders /></MainLayout>} />}
        />
        <Route
          path="admin/orders/:id"
          element={<ProtectedRoute element={<MainLayout><PageOrder /></MainLayout>} />}
        />
        <Route
          path="admin/products"
          element={<ProtectedRoute element={<MainLayout><PageProductImport /></MainLayout>} />}
        />
        <Route
          path="admin/product-form"
          element={<ProtectedRoute element={<MainLayout><PageProductForm /></MainLayout>} />}
        />
        <Route
          path="admin/product-form/:id"
          element={<ProtectedRoute element={<MainLayout><PageProductForm /></MainLayout>} />}
        />
        <Route
          path="*"
          element={<Typography variant="h1">Not found</Typography>}
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
