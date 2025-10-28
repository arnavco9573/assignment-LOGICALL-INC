
import { Router } from 'express';
import {
  createEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
  getEntryStats,
} from '../controllers/entry.controller';

// 1. Import our new tools
import { validate } from '../middleware/validate';
import { createEntrySchema, updateEntrySchema } from '../schemas/entry.schema';

const router = Router();

// 2. Add the 'validate' middleware before the controller
router.get('/stats', getEntryStats);
router.post('/', validate(createEntrySchema), createEntry);
router.get('/', getAllEntries);

// 3. Add the 'validate' middleware here too
router.put('/:id', validate(updateEntrySchema), updateEntry);
router.delete('/:id', deleteEntry);

export default router;