import { Request, Response } from 'express';
import * as TaskService from './task.service';
import { ResponseManager } from '../../utils/ResponseManager';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { formatValidationError } from '../../utils';
import { CreateTaskDto, UpdateTaskStatusDto } from './task.dto';

export const createTask = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
        const dto = plainToInstance(CreateTaskDto, req.body, {
            excludeExtraneousValues: true,
        });
        const errors = await validate(dto);
        if (errors.length > 0) {
            const formattedErrors = formatValidationError(errors);
            return ResponseManager.validationError(res, formattedErrors,  400);
        }
        const result = await TaskService.createNewTask(dto, req.user?.id);
        return ResponseManager.success(res, result, 'Task created', 201);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
        const dto = plainToInstance(CreateTaskDto, req.body, {
            excludeExtraneousValues: true,
        });
        const errors = await validate(dto);
        if (errors.length > 0) {
            const formattedErrors = formatValidationError(errors);
            return ResponseManager.validationError(res, formattedErrors,  400);
        }
        const userId = req.user?.id;
        const result = await TaskService.updateTask(dto, req.params.taskId, userId);
        return ResponseManager.success(res, result, 'Tasks updated successfully', 200);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
        const { status, dueDate, createdFrom, createdTo } = req.query;
        const userId = req?.user?.id;
        const filters: any = { userId };
        if (status) filters.status = status;
        if (dueDate) {
            filters.extras = {
                path: ['dueDate'],
                equals: dueDate,
            };
        }
        if (createdFrom || createdTo) {
            filters.createdAt = {};
            if (createdFrom) filters.createdAt.gte = new Date(createdFrom as string);
        }
        const result = await TaskService.getUserTasks(filters);
        return ResponseManager.success(res, result, 'Tasks retrieved successfully', 200);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const getSingleTask = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
        const result = await TaskService.getSingleTask(req?.params?.taskId, req.user?.id);
        return ResponseManager.success(res, result, 'Task retrieved successfully', 200);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
        const result = await TaskService.deleteSingleTask(req?.params?.taskId, req.user?.id);
        return ResponseManager.success(res, result, 'Task deleted successfully', 200);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const getTaskMetrics = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
        const result = await TaskService.getTaskAnalytics(req.user?.id);
        return ResponseManager.success(res, result, 'Task metrics retrieved successfully', 200);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
    const dto = plainToInstance(UpdateTaskStatusDto, req.body, {
      excludeExtraneousValues: true,
    });

    const errors = await validate(dto);
    if (errors.length > 0) {
      const formatted = formatValidationError(errors);
      return ResponseManager.validationError(res, formatted, 400);
    }

    const result = await TaskService.updateTaskStatus(req.params.taskId, req?.user?.id, dto.status);
    return ResponseManager.success(res, result, 'Task status updated');
  } catch (error: any) {
    return ResponseManager.error(res, error, error.statusCode || 400);
  }
};
