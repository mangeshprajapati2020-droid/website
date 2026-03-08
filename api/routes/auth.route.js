import express from "express";
const router=express.Router();
const authController=await import("../controllers/auth.controller.js")
router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/verify-otp",authController.verifyOtp)
router.post("/logout",authController.logout)
router.post("/forgot-password",authController.resetPassword)
router.post("/reset-password",authController.verifyResetOtp)
router.post("/resend-otp",authController.resendOtp)
export default router;  