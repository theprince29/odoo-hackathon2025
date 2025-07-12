// import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom";
import ReWearLanding from "./pages/home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgotPassword";
import UserDashboard from "./pages/user-dashborad";
import NotFound from "./pages/not-found";
import ItemListing from "./pages/item-listing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReWearLanding />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add-new-item" element={<ItemListing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App