import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ManageListingsTab from "@/components/admin/ManageListingsTab";
import ManageUsersTab from "@/components/admin/ManageUsersTab";
import ManageOrdersTab from "@/components/admin/ManageOrdersTab";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("manageListings");

  useEffect(() => {
    const adminloggedIn = localStorage.getItem("admin_token");
    if (!adminloggedIn) {
      navigate("/admin-login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin-login");
  };

  const tabButton = (label: string, value: string) => (
    <Button
      onClick={() => setActiveTab(value)}
      variant={activeTab === value ? "default" : "outline"}
      className={activeTab === value ? "bg-primary text-white" : ""}
    >
      {label}
    </Button>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        {tabButton("Manage User", "manageUsers")}
        {tabButton("Manage Orders", "manageOrders")}
        {tabButton("Manage Listings", "manageListings")}
      </div>
      <div className="mt-6">
        {activeTab === "manageUsers" && <ManageUsersTab />}
        {activeTab === "manageOrders" && <ManageOrdersTab />}
        {activeTab === "manageListings" && <ManageListingsTab />}
      </div>
    </div>
  );
}
