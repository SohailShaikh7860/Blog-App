import {configureStore} from "@reduxjs/toolkit";
import redux from "./authSlice"
const store = configureStore({
    reducer:{
        auth: redux,
    }
});


export default store;