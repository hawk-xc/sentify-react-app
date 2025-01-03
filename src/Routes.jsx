import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import LoginPage from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPages.jsx";
import NotFoundPages from "./pages/NotFoundPages.jsx";
import DashboardPages from "./pages/DashboardPages.jsx";

// Buat komponen fallback untuk Hydration
function HydrateFallback() {
  return <div>Loading...</div>;
}

function Routes() {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);

  const routesForPublic = [
    {
      path: "/info",
      element: <div>Fitri</div>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "/dashboard",
          element: <DashboardPages />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ];

  const fallbackRoute = [
    {
      path: "*",
      element: <NotFoundPages />,
    },
  ];

  const router = createBrowserRouter(
    [
      ...routesForPublic,
      ...(isAuthenticated ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly),
      ...fallbackRoute,
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <RouterProvider
      router={router}
      fallbackElement={null}
    >
      <HydrateFallback />
    </RouterProvider>
  );
}

export default Routes;
