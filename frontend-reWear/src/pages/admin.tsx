import { useState } from "react";
import { Button } from "@/components/ui/button";
import ManageListingsTab from "@/components/admin/ManageListingsTab";
import ManageUsersTab from "@/components/admin/ManageUsersTab";
import ManageOrdersTab from "@/components/admin/ManageOrdersTab";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("manageListings");

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
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
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
