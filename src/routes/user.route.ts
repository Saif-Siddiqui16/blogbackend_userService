import express from "express";
import {
  getUserProfile,
  loginUser,
  myProfile,
  updateProfilePic,
  updateUser,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", myProfile);
router.get("/user/:id", getUserProfile);
router.post("/user/update", isAuth, updateUser);
router.post("/user/update/pic", isAuth, upload, updateProfilePic);

export default router;
