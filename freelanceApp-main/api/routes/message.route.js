import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {createMessage,getMesages} from "../controllers/message.controller.js"


const router=express.Router()

router.post("/",verifyToken,createMessage)
router.get("/:id",verifyToken,getMesages)

export default router;