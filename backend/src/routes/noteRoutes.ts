import express from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
} from '../controllers/noteController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// All routes are protected - require authentication
router.use(authMiddleware);

// Note routes
router.get('/', getAllNotes);              // GET /api/notes - Get all notes
router.get('/search', searchNotes);        // GET /api/notes/search?q=query - Search notes
router.get('/:id', getNoteById);           // GET /api/notes/:id - Get single note
router.post('/', createNote);              // POST /api/notes - Create note
router.put('/:id', updateNote);            // PUT /api/notes/:id - Update note
router.delete('/:id', deleteNote);         // DELETE /api/notes/:id - Delete note

export default router;

