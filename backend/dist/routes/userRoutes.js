"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usercontroller_1 = require("../controllers/Usercontroller");
const router = express_1.default.Router();
router.post('/register', Usercontroller_1.registerUser);
router.post('/login', Usercontroller_1.loginUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map