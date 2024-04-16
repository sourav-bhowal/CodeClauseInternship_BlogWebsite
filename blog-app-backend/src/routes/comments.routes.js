import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createComment, deleteComment, getAllComments } from "../controllers/comments.controllers.js";


const commentRouter = Router();

commentRouter.use(verifyJWT);

commentRouter.route("/:postId").post(createComment).get(getAllComments);
commentRouter.route("/c/:commentId").delete(deleteComment);


export default commentRouter;