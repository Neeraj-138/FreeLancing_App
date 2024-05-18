import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import {createReviewLike,getReviewLike} from "../controllers/reviewlike.controller.js"

const router=express.Router()

router.post("/",verifyToken,createReviewLike);
router.get("/:reviewId",getReviewLike);

export default router;