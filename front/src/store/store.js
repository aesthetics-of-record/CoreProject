import {configureStore, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import base_url from "../BaseUrl";

const post = createSlice({
    name: "post",
    initialState: [],
    reducers: {
        setPost: (state, post) => {
            return post.payload;
        },
        addPost: (state, new_post) => {
            axios.post(base_url + "/post", new_post)
                .then((res) => {
                });
        },
    },
});

export const {setPost, addPost} = post.actions;

const tab = createSlice({
    name: "tab",
    initialState: 0,
    reducers: {
        setTab: (state, value) => {
            return value.payload;
        },
    },
});

export const {setTab} = tab.actions;

export default configureStore({
    reducer: {
        post: post.reducer,
        tab: tab.reducer,
    },
});
