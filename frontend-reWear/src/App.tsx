// import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom";
import ReWearLanding from "./pages/home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgotPassword";
import UserDashboard from "./pages/user-dashborad";
import NotFound from "./pages/not-found";
import ItemListing from "./pages/item-listing";
import AdminPage from "./pages/admin";
import AdminLogin from "./components/admin/AdminLogin";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AllProduct from "./components/AllProductPage";

function App() {

  

  return (
    <>
      <Routes>
        <Route path="/" element={<ReWearLanding />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add-new-item" element={<ItemListing />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/item-listing" element={<AllProduct />} />
     
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App