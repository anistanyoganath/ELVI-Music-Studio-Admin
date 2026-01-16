import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminLoginPage } from "./Auth/LoginPage";
import Layout from "./Common/Layout";
import { Dashboard } from "./Dashboard";
import { Inventory } from "./Inventory";
import { Rentals } from "./Rentals";
import { Reports } from "./Reports";
import { Settings } from "./Settings";
import { getIsLoading } from "./Store/Slices/app_slice";
import { Users } from "./Users";
import { LoadingScreen } from "./Utils/LoadingScreen";
import { getIsLoggedIn } from "./Store/Slices/auth_slice";
import { Categories } from "./Categories";

function App() {
  const isLoading = useSelector(getIsLoading);
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLoading && <LoadingScreen />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? ( // Replace `true` with admin auth check
                <Layout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="category" element={<Categories />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<AdminLoginPage />} />

          {/* ===================== 404 ===================== */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
