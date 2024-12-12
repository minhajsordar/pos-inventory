import express from 'express';
const router = express.Router();
import {
  workerController,
} from '../../controllers/worker/workerController.js';

router.route('/').get(workerController);
export default router;
