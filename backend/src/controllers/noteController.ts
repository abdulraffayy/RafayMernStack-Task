import { Request, Response } from 'express';
import Note from '../models/Note';

// Get all notes for logged-in user
export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const notes = await Note.find({ userId })
      .sort({ updatedAt: -1 }) // Sort by most recently updated
      .select('title content tags createdAt updatedAt');

    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      data: notes
    });
  } catch (error: unknown) {
    console.error('Get Notes Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notes',
      error: (error as Error).message
    });
  }
};

// Get single note by ID
export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findOne({ _id: id, userId });

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
  } catch (error: unknown) {
    console.error('Get Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch note',
      error: (error as Error).message
    });
  }
};

// Create new note
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.userId;

    // Validation
    if (!title || !content) {
      res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
      return;
    }

    // Create note
    const note = await Note.create({
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
  } catch (error: unknown) {
    console.error('Create Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create note',
      error: (error as Error).message
    });
  }
};

// Update note
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const userId = req.userId;

    // Find note and verify ownership
    const note = await Note.findOne({ _id: id, userId });

    if (!note) {
      res.status(404).json({
        success: false,
        message: 'Note not found'
      });
      return;
    }

    // Update note
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;

    await note.save();

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error: unknown) {
    console.error('Update Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update note',
      error: (error as Error).message
    });
  }
};

// Delete note
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find and delete note
    const note = await Note.findOneAndDelete({ _id: id, userId });

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
  } catch (error: unknown) {
    console.error('Delete Note Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete note',
      error: (error as Error).message
    });
  }
};

// Search notes
export const searchNotes = async (req: Request, res: Response): Promise<void> => {
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

    // Search using text index or regex
    const notes = await Note.find({
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
  } catch (error: unknown) {
    console.error('Search Notes Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search notes',
      error: (error as Error).message
    });
  }
};

