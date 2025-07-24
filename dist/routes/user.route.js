"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../controllers/user.controller.js");
const isAuth_js_1 = require("../middlewares/isAuth.js");
const multer_js_1 = __importDefault(require("../middlewares/multer.js"));
const router = express_1.default.Router();
router.post("/login", user_controller_js_1.loginUser);
router.get("/me", user_controller_js_1.myProfile);
router.get("/user/:id", user_controller_js_1.getUserProfile);
router.post("/user/update", isAuth_js_1.isAuth, user_controller_js_1.updateUser);
router.post("/user/update/pic", isAuth_js_1.isAuth, multer_js_1.default, user_controller_js_1.updateProfilePic);
exports.default = router;
