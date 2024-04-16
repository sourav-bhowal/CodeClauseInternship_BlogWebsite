import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/users.models.js";
import {deleteOnCloudinary, uploadOnCloudinary} from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
import {generateTokens} from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const signin = asyncHandler(async (req, res) => {

    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        throw new apiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ username });

    if (existedUser) {
        throw new apiError(400, "User already exists");
    }

    const profilePicLocalPath = req.file?.path;

    if (!profilePicLocalPath) {
        throw new apiError(400, "Profile picture is required");
    }

    const profilePicCloudinary = await uploadOnCloudinary(profilePicLocalPath);

    if (!profilePicCloudinary) {
        throw new apiError(500, "Something went wrong while uploading profile picture on cloudinary");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        profilePic: {
            public_id: profilePicCloudinary?.public_id,
            url: profilePicCloudinary?.url
        }
    });

    if (!user) {
        await deleteOnCloudinary(profilePicCloudinary.public_id);
        throw new apiError(500, "Something went wrong while creating user");
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new apiError(500, "User not found");
    }

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                "User created successfully",
                createdUser
            )
        );
});


export const login = asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        throw new apiError(400, "All fields are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new apiError(400, "User not found");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new apiError(400, "Incorrect password");
    }

    const {accessToken, refreshToken} = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                "User logged in successfully",
                { user: loggedInUser, accessToken, refreshToken }
            )
        );
});


export const logout = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { 
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully."))
});


export const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find({}).select("-password -refreshToken");

    if (!users) {
        throw new apiError(404, "No users found");
    }

    return res
    .status(200)
    .json( new apiResponse(200, users, "All users fetched successfully") );
});


export const verifyUser = asyncHandler( async(req, res) => {
    try {
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            throw new apiError(401, "Unauthorized request. No token found");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if (!user) {
            throw new apiError(401, "Invalid Access Token");
        }

        return res
        .status(200)
        .json( new apiResponse(200, user, "User verified successfully") );
    }
    catch (error) {
        throw new apiError(401, error?.message || "Invalid Access Token");
    }

} );