import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost, deletePost } from "../Redux/Slice/postSlice";
import "../Styles/CreateFoodPost.css";

const CreateFoodPost = () => {
    const userData = [
        { name: "rushi", location: "yevlewadi" },
        { name: "bhavesh", location: "katraj" },
        { name: "aaditya", location: "yevlewadi" },
        { name: "rajesh", location: "konndhawa" },
    ];

    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state?.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const [foodItems, setFoodItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "kg" });
    const [formData, setFormData] = useState({ location: "", description: "" });
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({ ...prev, [name]: value }));
    };

    const addFoodItem = () => {
        if (!newItem.name || !newItem.quantity || !newItem.unit) {
            alert("Please provide name, quantity and unit for the food item.");
            return;
        }
        setFoodItems((prev) => [...prev, newItem]);
        setNewItem({ name: "", quantity: "", unit: "kg" });
    };

    const removeFoodItem = (indexToRemove) => {
        setFoodItems((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (foodItems.length === 0 || !formData.location || !formData.description) {
            setError("Please add at least one food item and fill all fields.");
            return;
        }

        const fullPost = { foodItems, ...formData };

        dispatch(createPost(fullPost))
            .unwrap()
            .then(() => {
                setFoodItems([]);
                setNewItem({ name: "", quantity: "", unit: "kg" });
                setFormData({ location: "", description: "" });
                setShowModal(false);
                dispatch(fetchPosts());
            })
            .catch((err) => {
                console.error("Error creating post:", err);
                setError("Failed to create post. Please try again.");
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            const res = dispatch(deletePost(id)).then(() => dispatch(fetchPosts()));
            console.log(res)
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 mb-6 float-right"
            >
                ➕ Create Food Post
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-red-500 absolute top-3 right-3 text-xl hover:text-red-700"
                        >
                            ✖
                        </button>
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl font-semibold mb-4 text-center">
                                Create Food Post
                            </h2>
                            {error && (
                                <p className="text-red-500 text-center">{error}</p>
                            )}
                            <div className="mb-4">
                                <h4 className="font-semibold">Food Items</h4>
                                <div className="flex space-x-2 mb-2">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Food name"
                                        value={newItem.name}
                                        onChange={handleNewItemChange}
                                        className="flex-1 px-3 py-2 border rounded-md"
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        value={newItem.quantity}
                                        onChange={handleNewItemChange}
                                        className="w-24 px-3 py-2 border rounded-md"
                                    />
                                    <select
                                        name="unit"
                                        value={newItem.unit}
                                        onChange={handleNewItemChange}
                                        className="px-2 py-2 border rounded-md"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="litres">litres</option>
                                        <option value="pieces">pieces</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={addFoodItem}
                                        className="bg-green-500 text-white px-3 py-2 rounded-md"
                                    >
                                        Add
                                    </button>
                                </div>
                                {foodItems.length > 0 && (
                                    <ul>
                                        {foodItems.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between items-center mb-2"
                                            >
                                                <span>
                                                    {item.name} - {item.quantity} {item.unit}
                                                </span>
                                                <button
                                                    onClick={() => removeFoodItem(index)}
                                                    className="text-red-500"
                                                >
                                                    ❌
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter a description"
                                    className="w-full px-3 py-2 border rounded-md h-24"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-semibold">Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {formData.location && (
                                <div className="mb-4">
                                    <h4 className="font-semibold">
                                        Nearby Users in "{formData.location}"
                                    </h4>
                                    {userData.filter(
                                        (user) =>
                                            user.location.toLowerCase() ===
                                            formData.location.toLowerCase()
                                    ).length > 0 ? (
                                        <ul>
                                            {userData
                                                .filter(
                                                    (user) =>
                                                        user.location.toLowerCase() ===
                                                        formData.location.toLowerCase()
                                                )
                                                .map((user, index) => (
                                                    <li key={index} className="text-gray-600">
                                                        👤 {user.name}
                                                    </li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">
                                            No users found in this location.
                                        </p>
                                    )}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {posts.length > 0 && (
                <div>
                    <h3 className="text-center text-lg font-bold my-6">
                        📦 Submitted Posts
                    </h3>
                    {posts.map((post, index) => (
                        <div key={index} className="post-card">
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="delete-btn"
                                title="Delete Post"
                            >
                                🗑️
                            </button>
                            <h4 className="text-lg font-semibold text-gray-700">
                                📍 {post.location}
                            </h4>
                            <p className="text-gray-600">{post.description}</p>
                            <ul>
                                {post.foodItems.map((item, i) => (
                                    <li key={i} className="text-gray-500">
                                        🍽 {item.name} - {item.quantity} {item.unit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreateFoodPost;
