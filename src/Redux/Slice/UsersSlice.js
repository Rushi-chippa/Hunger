import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
    data: JSON.parse(localStorage.getItem("data")) || {},
    userData: JSON.parse(localStorage.getItem("userData")) || {},
    role: localStorage.getItem("role") || "",
    token: null,
    loading: false,
    error: null,
    allUser: [],
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
};

// Thunks
export const createUser = createAsyncThunk("user/register", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/user", data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occurred");
    }
});

export const loginUser = createAsyncThunk("user/login", async (credentials, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("/login", credentials);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

export const getProfile = createAsyncThunk("user/profile", async (_, { rejectWithValue, getState }) => {
    try {
        const { token } = getState().user;
        const res = await axiosInstance.get("/auth/profile", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
    return null;
});

export const getAllUser = createAsyncThunk("user/all", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("/users");
        console.log(res.data)
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
});

// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Users
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.allUser = action.payload;
                state.loading = false;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create User
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {



                state.data = action.payload;
                state.role = action.payload.role;
                state.loading = false;
                state.error = null;
                state.isLoggedIn = true;

                // Set to localStorage
                localStorage.setItem("data", JSON.stringify(action.payload));
                localStorage.setItem("role", action.payload.role);
                localStorage.setItem("isLoggedIn", "true");
            })
            .addCase(createUser.rejected, (state, action) => {
                state.data = {};
                state.role = "";
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
                localStorage.setItem("isLoggedIn", "false");
            })

            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {

                state.data = action.payload;
                state.role = action.payload.user_role;
                state.loading = false;
                state.error = null;
                state.isLoggedIn = true;

                // Set to localStorage
                localStorage.setItem("data", JSON.stringify(action.payload));
                localStorage.setItem("role", action.payload.user_role);
                localStorage.setItem("isLoggedIn", "true");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isLoggedIn = false;
                localStorage.setItem("isLoggedIn", "false");
            })

            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.role = action.payload.role;
                state.loading = false;
                state.error = null;

                // Set to localStorage
                localStorage.setItem("userData", JSON.stringify(action.payload));
                localStorage.setItem("role", action.payload.role);
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.data = {};
                state.userData = {};
                state.role = "";
                state.token = null;
                state.loading = false;
                state.error = null;
                state.isLoggedIn = false;

                // Clear localStorage
                localStorage.removeItem("data");
                localStorage.removeItem("userData");
                localStorage.removeItem("role");
                localStorage.setItem("isLoggedIn", "false");
            });
    }
});

export default userSlice.reducer;
