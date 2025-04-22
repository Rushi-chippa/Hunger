import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../Redux/Slice/UsersSlice";

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        number: "",
        location: "",
        password: "",
        user_role: "volunteer",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        dispatch(createUser(formData));
        alert(`Registration Successful as a ${formData.user_role}!`);
        setFormData({
            firstName: "",
            email: "",
            number: "",
            location: "",
            password: "",
            user_role: "volunteer",
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg relative"
            >
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 text-green-600 text-lg border-2 px-3 rounded-lg hover:bg-yellow-400 hover:text-white transition-all ease-in-out duration-300"
                >
                 Back
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700">Registration Form</h2>

                <div className="mb-4">
                    <label htmlFor="firstName" className="block mb-1 font-medium">Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="number" className="block mb-1 font-medium">Phone Number:</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="Enter your number"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block mb-1 font-medium">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="user_role" className="block mb-1 font-medium">Role:</label>
                    <select
                        id="user_role"
                        name="user_role"
                        value={formData.user_role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="volunteer">Volunteer</option>
                        <option value="foodDonor">Food Donor</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
                >
                    Register
                </button>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline font-medium">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegistrationForm;
