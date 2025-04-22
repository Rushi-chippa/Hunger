import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
    data: {},
    role: "",
    token: null, // Store authentication token
    loading: false,
    error: null,
    allUser: {}
};

// **Create User Thunk**
export const createUser = createAsyncThunk(
    "/register",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const res = await axiosInstance.post("/user", data);
            return res.data; // Return response data
        } catch (error) {
            console.error("Failed to create the user", error);
            return rejectWithValue(error.response?.data || "An error occurred"); // Return error details
        }
    }
);

// **Login User Thunk**
export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/auth/login", credentials);
            return res.data; // Returns { token, user }
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

// **Get Profile Thunk**
export const getProfile = createAsyncThunk(
    "user/profile",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().user; // Retrieve token from state
            const res = await axiosInstance.get("/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data; // Returns profile details
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

// **Logout User Thunk**
export const logoutUser = createAsyncThunk("user/logout", async () => {
    return null; // Clears authentication state
});


export const getAllUser = createAsyncThunk("/all-user", async () => {
    try {
        const res = await axiosInstance.get("/users")
        console.log(res)
        return res.data; // Returns profile details
    } catch (error) {
        console.log(error)
    }
})

// **User Slice**
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllUser.fulfilled, (state, action) => {
                state.allUser = action.payload
            })

            // **Handle Create User**
            .addCase(createUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.role = action.payload.role;
                state.loading = false;
                state.error = null;
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.data = {};
                state.role = "";
                state.loading = false;
                state.error = action.payload;
            })

            // **Handle Login**
            .addCase(loginUser.fulfilled, (state, action) => {
                state.data = action.payload.user;
                state.role = action.payload.user.role;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // **Handle Get Profile**
            .addCase(getProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.role = action.payload.role;
                state.loading = false;
                state.error = null;
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // **Handle Logout**
            .addCase(logoutUser.fulfilled, (state) => {
                state.data = {};
                state.role = "";
                state.token = null;
                state.loading = false;
                state.error = null;
            });

    },
});

export default userSlice.reducer;