import React, { useState } from "react";
import { Home, Edit, Users, Utensils, History, LogOut } from "lucide-react"; // Updated icons
import CreateFoodPost from "../Components/CreateFoodPost";
import Volunteer from "../Components/Volunteer";
import FoodDonorPage from "../Components/FoodDonorPage";
import "../Styles/DashBoard.css";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <h2 className="text-2xl font-bold">🌾 Welcome to the Dashboard</h2>;
            case "post":
                return <CreateFoodPost />;
            case "volunteers":
                return <Volunteer />;
            case "foodDonar":
                return <FoodDonorPage />;
            case "earnings":
                return <h2 className="text-xl font-semibold">💰 Food Delivery History</h2>;
            default:
                return <h2 className="text-lg">❓ Select a Tab</h2>;
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar - styled via CSS */}
            <aside className="sidebar">
                <h1>👨‍🌾 My Panel</h1>
                <ul>
                    <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
                        <Home size={18} /> Dashboard
                    </li>
                    <li className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
                        <Edit size={18} /> Create Post
                    </li>
                    <li className={activeTab === "volunteers" ? "active" : ""} onClick={() => setActiveTab("volunteers")}>
                        <Users size={18} /> Volunteers
                    </li>
                    <li className={activeTab === "foodDonar" ? "active" : ""} onClick={() => setActiveTab("foodDonar")}>
                        <Utensils size={18} /> Food Donor
                    </li>
                    <li className={activeTab === "earnings" ? "active" : ""} onClick={() => setActiveTab("earnings")}>
                        <History size={18} /> History
                    </li>
                    <li className="logout" onClick={() => alert("Logged out!")}>
                        <LogOut size={18} /> Logout
                    </li>
                </ul>
            </aside>

            {/* Main content */}
            <main className="main">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;