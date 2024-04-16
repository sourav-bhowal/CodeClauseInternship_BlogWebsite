import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {createPost, deletePost, getAPost, getAllPosts} from "../controllers/posts.controllers.js";


const postRouter = Router();

postRouter.use(verifyJWT);

postRouter.route("/").post(upload.single("image"),createPost).get(getAllPosts);
postRouter.route("/:postId").delete(deletePost).get(getAPost);

export default postRouter;
