import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { Post } from "../models/posts.models.js";
import {Comment} from "../models/comments.models.js";
import {deleteOnCloudinary, uploadOnCloudinary} from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
import mongoose, {isValidObjectId} from "mongoose";



export const createComment = asyncHandler(async (req, res) => {

    const { content } = req.body;
    console.log(content)
    console.log(req.params)
    
    if (!content) {
        throw new apiError(400, "All fields are required");
    }

    const { postId } = req.params;

    if (!postId) {
        throw new apiError(400, "Post id is required");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new apiError(404, "Post not found");
    }


    const newComment = await Comment.create({
        content,
        post: postId,
        owner: req.user._id
    });

    if (!newComment) {
        throw new apiError(500, "Something went wrong while creating comment");
    }


    return res
    .status(201)
    .json( new apiResponse(201, newComment, "Comment created successfully") );
});



export const deleteComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new apiError(400, "Comment id is required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new apiError(404, "Comment not found");
    }

    if (comment.owner.toString() === req.user._id.toString()) {
        
        await Comment.findByIdAndDelete(commentId);

        return res
        .status(200)
        .json( new apiResponse(200, {}, "Comment deleted successfully") );
    }
    else{

        throw new apiError(403, "You are not authorized to delete this comment");
    }
});



export const getAllComments = asyncHandler(async (req, res) => {

    const { postId } = req.params;
    const {page = 1, limit = 10} = req.query;

    if (!isValidObjectId(postId)) {
        throw new apiError(400, "Post id is required");
    }

    if(page < 1 || limit > 10) {
        throw new apiError(400, "Invalid page number or limit");
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new apiError(404, "Post not found");
    }

    const postComments = Comment.aggregate([
        {
            $match: {
                post: new mongoose.Types.ObjectId(postId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "commentOwner"
            }
        },
        {
            $addFields: {
                commentOwner: {
                    $first: "$commentOwner"
                }
            }
        },
        {
            $project: {
                content: 1,
                createdAt: 1,
                commentOwner: {
                    _id: 1,
                    username: 1,
                    profilePic: 1
                }
            }
        }
    ]);
      
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    }

    const comments = await Comment.aggregatePaginate(postComments, options);
    
    if (comments.docs.length === 0) { 
        throw new apiError(404, "Comments not found");
    }

    return res
    .status(200)
    .json( new apiResponse(200, comments, "All comments fetched successfully") );
});