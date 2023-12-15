import express from "express";
import * as userCtrl from "../controllers/userController.js";


const router = express.Router();

router.post("/api/user/register", userCtrl.registerUser);
router.post("/api/user/login", userCtrl.loginUser);
router.post("/api/user/send-email", userCtrl.sendEmail);
router.get('/api/user/getOne/:userID', userCtrl.getUser); 


export { router };
