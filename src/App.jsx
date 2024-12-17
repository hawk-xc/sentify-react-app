import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LoginPage from "./pages/loginPages.jsx";
import DashboardPages from "./pages/dashboardPages.jsx";

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPages />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
