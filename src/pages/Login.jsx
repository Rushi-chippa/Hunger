import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slice/UsersSlice";

const LogInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "", // Changed 'number' to 'email'
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted:", formData);
        const res = dispatch(loginUser(formData));
        alert("Login Successful!");
        setFormData({ email: "", password: "" }); // Updated field names
        if (res?.payload?.succes) {
            navigate("/dashboard")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md relative"
            >
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="absolute top-4 left-4 text-green-600 text-sm font-bold border-2 p-2 rounded-lg hover:bg-yellow-400 hover:text-white transition-all ease-in-out duration-300"
                >
                    Back
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Log In</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
                        Email Address:
                    </label>
                    <input
                        type="email" // Changed type to email
                        id="email"
                        name="email" // Changed name to email
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                    Log In
                </button>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Account not exists?{" "}
                    <Link to="/register" className="text-green-600 hover:underline font-medium">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LogInForm;