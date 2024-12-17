import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import LoginPage from "./pages/loginPages";
import NotFoundPages from "./pages/NotFoundPages.jsx";
import DashboardPages from "./pages/dashboardPages.jsx";

function Routes() {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);

  const routesForPublic = [
    {
      path: "/news",
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
          element: <DashboardPages />,
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
      path: "/login",
      element: <LoginPage />,
    },
  ];

  const fallbackRoute = [
    {
      path: "*",
      element: <NotFoundPages />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(isAuthenticated ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly),
    ...fallbackRoute,
  ]);

  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Something went wrong. Please try again later.</div>}
    />
  );
}

export default Routes;
