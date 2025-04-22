import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/UsersSlice'
import postSlice from './Slice//postSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice
    },
    devTools: true

})

export default store