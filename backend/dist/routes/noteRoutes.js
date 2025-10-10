"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.use(authMiddleware_1.default);
router.get('/', noteController_1.getAllNotes);
router.get('/search', noteController_1.searchNotes);
router.get('/:id', noteController_1.getNoteById);
router.post('/', noteController_1.createNote);
router.put('/:id', noteController_1.updateNote);
router.delete('/:id', noteController_1.deleteNote);
exports.default = router;
//# sourceMappingURL=noteRoutes.js.map