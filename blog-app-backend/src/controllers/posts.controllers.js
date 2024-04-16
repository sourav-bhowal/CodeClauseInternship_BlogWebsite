import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { Post } from "../models/posts.models.js";
import {Comment} from "../models/comments.models.js";
import {deleteOnCloudinary, uploadOnCloudinary} from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";


export const createPost = asyncHandler(async (req, res) => {

    const { title, content, category } = req.body;

    if (!content || !title || !category) {
        throw new apiError(400, "All fields are required");
    }

    const postImageLocalPath = req.file?.path;

    if (!postImageLocalPath) {
        throw new apiError(400, "Post image is required");
    }

    const postImageCloudinary = await uploadOnCloudinary(postImageLocalPath);

    if (!postImageCloudinary) {
        throw new apiError(500, "Something went wrong while uploading post image on cloudinary");
    }

    const newPost = await Post.create({
        title,
        content,
        category,
        image: {
            public_id: postImageCloudinary.public_id,
            url: postImageCloudinary.url
        },
        owner: req.user._id
    });

    if (!newPost) {
        throw new apiError(500, "Something went wrong while creating post");
    }

    return res
    .status(201)
    .json(new apiResponse(201, newPost, "Post created successfully"));
});


export const getAllPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find({});

    if (!posts) {
        throw new apiError(404, "No posts found");
    }

    return res
    .status(200)
    .json( new apiResponse(200, posts, "All posts fetched successfully") );
});


export const deletePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!postId) {
        throw new apiError(400, "Post id is required");
    }

    const post = await Post.findById(postId);

    const postImage = post?.image.public_id;

    if (!post) {
        throw new apiError(404, "Post not found");
    }

    if (post.owner.toString() === req.user._id.toString()) {

        await deleteOnCloudinary(postImage);
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (deletedPost) {
            await Comment.deleteMany({ post: deletedPost._id });
        }

        return res
        .status(200)
        .json( new apiResponse(200, {}, "Post deleted successfully") );
    }
    else {
        throw new apiError(403, "You are not authorized to delete this post");
    }
});


export const getAPost = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!postId) {
        throw new apiError(400, "Post id is required");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new apiError(404, "Post not found");
    }

    return res
    .status(200)
    .json( new apiResponse(200, post, "Post fetched successfully") );
});