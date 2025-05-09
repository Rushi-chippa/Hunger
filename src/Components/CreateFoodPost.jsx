import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost, deletePost } from "../Redux/Slice/postSlice";
import "../Styles/CreateFoodPost.css";
import { getAllUser } from "../Redux/Slice/UsersSlice";

const CreateFoodPost = () => {
    const { allUser, role } = useSelector(state => state?.user);
    console.log(allUser)
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state?.post);

    const [foodItems, setFoodItems] = useState(() => {
        return JSON.parse(localStorage.getItem("foodItems")) || [];
    });

    const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "kg" });

    const [formData, setFormData] = useState(() => {
        return JSON.parse(localStorage.getItem("formData")) || { location: "", description: "" };
    });

    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(getAllUser());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("foodItems", JSON.stringify(foodItems));
    }, [foodItems]);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

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
                localStorage.removeItem("foodItems");
                localStorage.removeItem("formData");
                dispatch(fetchPosts());
            })
            .catch((err) => {
                console.error("Error creating post:", err);
                setError("Failed to create post. Please try again.");
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePost(id)).then(() => dispatch(fetchPosts()));
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {role === "foodDonor" && (
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 mb-6 float-right"
                >
                    ➕ Create Food Post
                </button>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-xl text-gray-600 hover:text-red-600"
                        >
                            ✖
                        </button>
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-4 text-center">Create Food Post</h2>
                            {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                            {/* Food Items */}
                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Food Items</h4>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={newItem.name}
                                        onChange={handleNewItemChange}
                                        className="flex-grow px-3 py-2 border rounded-md"
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Qty"
                                        value={newItem.quantity}
                                        onChange={handleNewItemChange}
                                        className="w-24 px-3 py-2 border rounded-md"
                                    />
                                    <select
                                        name="unit"
                                        value={newItem.unit}
                                        onChange={handleNewItemChange}
                                        className="px-3 py-2 border rounded-md"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="litres">litres</option>
                                        <option value="pieces">pieces</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={addFoodItem}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Add
                                    </button>
                                </div>
                                <ul className="space-y-1">
                                    {foodItems.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center text-sm bg-gray-100 px-3 py-1 rounded-md">
                                            <span>{item.name} - {item.quantity} {item.unit}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFoodItem(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ❌
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="font-semibold block mb-1">Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter a description"
                                    className="w-full px-3 py-2 border rounded-md h-24"
                                />
                            </div>

                            {/* Location */}
                            <div className="mb-4">
                                <label className="font-semibold block mb-1">Location:</label>
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
                                    {allUser?.filter(
                                        (user) =>
                                            user.location?.toLowerCase() ===
                                            formData.location.toLowerCase()
                                    ).length > 0 ? (
                                        <ul>
                                            {allUser
                                                .filter(
                                                    (user) =>
                                                        // {console.log(first)}
                                                        user.location?.toLowerCase() ===
                                                        formData.location.toLowerCase()
                                                )
                                                .map((user, index) => (
                                                    <li key={index} className="text-gray-600">
                                                        {console.log(user)}
                                                        👤 {user?.firstName}  📞 {user?.number}
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

            {/* Posts List */}
            {posts.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-center text-lg font-bold mb-4">📦 Submitted Posts</h3>
                    {posts.map((post, index) => (
                        <div key={index} className="post-card relative p-4 mb-4 bg-gray-100 rounded-lg shadow">
                            {role == "foodDonor" && <button
                                onClick={() => handleDelete(post.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                title="Delete Post"
                            >
                                🗑️
                            </button>
                            }
                            <h4 className="text-lg font-semibold text-gray-700 mb-1">
                                📍 {post.location}
                            </h4>
                            <p className="text-gray-600 mb-2">{post.description}</p>
                            <ul className="pl-4 list-disc text-sm text-gray-700">
                                {post.foodItems.map((item, i) => (
                                    <li key={i}>
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
