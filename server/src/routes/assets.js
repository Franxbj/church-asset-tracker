import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset
} from '../controllers/assetsController.js';

const router = express.Router();

router.get('/', requireAuth, getAssets);
router.get('/:id', requireAuth, getAssetById);
router.post('/', requireAuth, requireRole('data_entry'), createAsset);
router.put('/:id', requireAuth, requireRole('data_entry'), updateAsset);
router.delete('/:id', requireAuth, requireRole('admin'), deleteAsset);

export default router;
