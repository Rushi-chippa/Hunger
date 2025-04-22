import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../Helper/axiosInstance';

// Replace this with your actual backend URL
const BASE_URL = 'http://localhost:8080/api/posts';

const initialState = {
    posts: [],
    loading: false,
    error: null
}

// / api / foodposts


// Async Thunks
export const fetchPosts = createAsyncThunk('/fetchPosts', async () => {
    const response = await axiosInstance.get("/api/foodposts");
    console.log(response)
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
    const response = await axiosInstance.post("/api/foodposts", postData);
    return response.data;
});

export const deletePost = createAsyncThunk('/api/foodposts', async (id) => {
    const res = axiosInstance.delete(`/api/foodposts/${id}`)
    console.log(res)
    return postId;
});


// Slice
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    }
});

export default postSlice.reducer;
