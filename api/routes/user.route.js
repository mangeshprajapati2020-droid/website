import express from "express";
import auth from "../middleware/auth.js";
const UserController=await import("../controllers/user.controller.js")
const router=express.Router();
router.get("/profile",auth,UserController.profile)
export default router;