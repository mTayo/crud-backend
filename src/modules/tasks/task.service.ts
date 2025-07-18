import { CreateTaskDto } from './task.dto';
import * as TaskRepository from './task.repository';
import { TaskStatus } from '@prisma/client';

export const createNewTask = async (data: CreateTaskDto, userId: string) => {
  try {
     return await TaskRepository.createTask({ ...data, userId });
  } catch (err) {
    throw err; 
  }
};

export const updateTask = async (data: CreateTaskDto, taskId: string|number, userId: string) => {
  try {
     return await TaskRepository.updateTask(data, taskId, userId);
  } catch (err) {
    console.error('[Task creation Error]', err);
    throw err; 
  }
};

export const getUserTasks = async (filters:any ) => {
    try {
        const taskData = await TaskRepository.getTasksByUser(filters);
        return taskData;
    } catch (err) {
        console.error('[Tasks selection Error]', err);
        throw err; 
    }
    
};

export const getSingleTask = async (taskId:string, userId: string ) => {
    try {
    
        const taskData = await TaskRepository.getTaskById(taskId,userId);
        if (!taskData) {
            throw new Error('Task not found');
        }
        return taskData;
    } catch (err) {
        throw err; 
    }
    
};


export const deleteSingleTask = async (taskId:string, userId: string ) => {
    try {
        const taskData = await TaskRepository.deleteTask(taskId,userId);
        if (!taskData) {
            throw new Error('Task not found');
        }
        return {};
    } catch (err) {
        console.error('[Tasks selection Error]', err);
        throw err; 
    }
    
};

export const getTaskAnalytics = async (userId: string) => {
  const [total, pending, inProgress, done] = await Promise.all([
    TaskRepository.countTasksByUser(userId),
    TaskRepository.countTasksByStatus(userId, TaskStatus.PENDING),
    TaskRepository.countTasksByStatus(userId, TaskStatus.IN_PROGRESS),
    TaskRepository.countTasksByStatus(userId, TaskStatus.DONE),
  ]);

  return {
    total,
    pending,
    inProgress,
    done,
  };
};

export const updateTaskStatus = async (taskId: string, userId: string, status: TaskStatus) => {
  try {
        const task = await TaskRepository.getTaskById(taskId, userId);
        if (!task) {
          throw new Error('Task not found or unauthorized');
        }
        return await TaskRepository.updateTaskStatusById(taskId, status);
    } catch (err) {
        console.error('[Tasks selection Error]', err);
        throw err; 
    }
 
 
};