import React, { useEffect, useState } from "react";
import { Home, Edit, Users, Utensils, History, LogOut } from "lucide-react";
import CreateFoodPost from "../Components/CreateFoodPost";
import Volunteer from "../Components/Volunteer";
import FoodDonorPage from "../Components/FoodDonorPage";
import "../Styles/DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, logoutUser } from "../Redux/Slice/UsersSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state) => state?.user);

    console.log("User Role:", role);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <h2 className="text-2xl font-bold">🌾 Welcome to the Dashboard</h2>;
            case "post":
                return <CreateFoodPost />;
            case "volunteers":
                return role === "foodDonor" && <Volunteer />
            case "foodDonor":
                return <FoodDonorPage />;
            case "earnings":
                return role === "foodDonor" ? (
                    <h2 className="text-xl font-semibold">💰 Food Delivery History</h2>
                ) : (
                    <h2 className="text-lg">❌ Access Denied</h2>
                );
            default:
                return <h2 className="text-lg">❓ Select a Tab</h2>;
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <h1>👨‍🌾 My Panel</h1>
                <ul>
                    <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
                        <Home size={18} /> Dashboard
                    </li>
                    <li className={activeTab === "post" ? "active" : ""} onClick={() => setActiveTab("post")}>
                        {role === "foodDonor" ? (
                            <>
                                <Edit size={18} /> Add Food Post
                            </>
                        ) : (
                            <>
                                <Edit size={18} /> Posts
                            </>
                        )}
                    </li>
                    {role === "foodDonor" && (
                        <li className={activeTab === "volunteers" ? "active" : ""} onClick={() => setActiveTab("volunteers")}>
                            <Users size={18} /> Volunteers
                        </li>
                    )}
                    <li className={activeTab === "foodDonor" ? "active" : ""} onClick={() => setActiveTab("foodDonor")}>
                        <Utensils size={18} /> Food Donor
                    </li>
                    {role === "admin" && (
                        <li className={activeTab === "earnings" ? "active" : ""} onClick={() => setActiveTab("earnings")}>
                            <History size={18} /> History
                        </li>
                    )}
                    <li className="logout" onClick={handleLogout}>
                        <LogOut size={18} /> Logout
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="main">{renderContent()}</main>
        </div>
    );
};

export default Dashboard;
