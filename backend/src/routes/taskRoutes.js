import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { validateCreateTask, validateUpdateTask } from '../validators/taskValidator.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', validateCreateTask, createTask);
router.put('/:id', validateUpdateTask, updateTask);
router.delete('/:id', deleteTask);

export default router;

