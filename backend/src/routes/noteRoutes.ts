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

router.use(authMiddleware);


router.get('/', getAllNotes);             
router.get('/search', searchNotes);        
router.get('/:id', getNoteById);           
router.post('/', createNote);              
router.put('/:id', updateNote);            
router.delete('/:id', deleteNote);         

export default router;

