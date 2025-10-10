"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const getAllNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const notes = await Note_1.default.find({ userId })
            .sort({ updatedAt: -1 })
            .select('title content tags createdAt updatedAt');
        res.status(200).json({
            success: true,
            message: 'Notes fetched successfully',
            data: notes
        });
    }
    catch (error) {
        console.error('Get Notes Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notes',
            error: error.message
        });
    }
};
exports.getAllNotes = getAllNotes;
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const note = await Note_1.default.findOne({ _id: id, userId });
        if (!note) {
            res.status(404).json({
                success: false,
                message: 'Note not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Note fetched successfully',
            data: note
        });
    }
    catch (error) {
        console.error('Get Note Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch note',
            error: error.message
        });
    }
};
exports.getNoteById = getNoteById;
const createNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const userId = req.userId;
        if (!title || !content) {
            res.status(400).json({
                success: false,
                message: 'Title and content are required'
            });
            return;
        }
        const note = await Note_1.default.create({
            title,
            content,
            tags: tags || [],
            userId
        });
        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: note
        });
    }
    catch (error) {
        console.error('Create Note Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create note',
            error: error.message
        });
    }
};
exports.createNote = createNote;
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags } = req.body;
        const userId = req.userId;
        const note = await Note_1.default.findOne({ _id: id, userId });
        if (!note) {
            res.status(404).json({
                success: false,
                message: 'Note not found'
            });
            return;
        }
        if (title !== undefined)
            note.title = title;
        if (content !== undefined)
            note.content = content;
        if (tags !== undefined)
            note.tags = tags;
        await note.save();
        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            data: note
        });
    }
    catch (error) {
        console.error('Update Note Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update note',
            error: error.message
        });
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const note = await Note_1.default.findOneAndDelete({ _id: id, userId });
        if (!note) {
            res.status(404).json({
                success: false,
                message: 'Note not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete Note Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete note',
            error: error.message
        });
    }
};
exports.deleteNote = deleteNote;
const searchNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
            return;
        }
        const notes = await Note_1.default.find({
            userId,
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } }
            ]
        }).sort({ updatedAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Search completed successfully',
            data: notes
        });
    }
    catch (error) {
        console.error('Search Notes Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search notes',
            error: error.message
        });
    }
};
exports.searchNotes = searchNotes;
//# sourceMappingURL=noteController.js.map