import express from "express";
import {createGig, deleteGig,getGig,getGigs, getmyGigs} from "../controllers/gig.controller.js"
import {verifyToken} from "../middleware/jwt.js"

const router=express.Router()

router.post("/",verifyToken,createGig);
router.delete("/:id",verifyToken,deleteGig);
router.get("/single/:id",getGig);
router.get("/",getGigs);
router.get("/mygigs/:id",getmyGigs);

export default router;