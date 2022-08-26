import { Router } from 'express';
import { createBookmark, deleteBookmark, getAllBookmarks,
    getBookmark, updateBookmark } from '../controllers/bookmarkController';

const router = Router();

router.get('/', getAllBookmarks);

router.post('/', createBookmark);

router.get('/:id', getBookmark);

router.put('/:id', updateBookmark);

router.delete('/:id', deleteBookmark);

export default router;