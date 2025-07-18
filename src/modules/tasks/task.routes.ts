import { Router } from 'express';
import { authenticate } from '../../middlewares/authMiddleware';
import { createTask, deleteTask, getAllTasks, getSingleTask, getTaskMetrics, updateTask, updateTaskStatus } from './task.controller';

const router = Router();

router.use(authenticate);


router.post('/', createTask);
router.get('/metrics', getTaskMetrics);
router.get('/', getAllTasks);
router.get('/:taskId', getSingleTask);
router.put('/:taskId', updateTask);
router.put('/:taskId/status', updateTaskStatus);
router.delete('/:taskId', deleteTask);


export default router;

