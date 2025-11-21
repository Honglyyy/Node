import { Router } from "express";
import { createPost, deletePost, getAllPost, updatePost } from "../controllers/post.controller.js";


const router = Router();

router.route("/create").post(createPost)
router.route("/getPosts").get(getAllPost)
router.route("/updatePost/:id").patch(updatePost)
router.route("/deletePost/:id").delete(deletePost)
export default router