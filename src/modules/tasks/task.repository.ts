import prisma from "../../config/db";
import { TaskStatus } from '@prisma/client';

export const createTask = (data: any) => {
    return prisma.task.create({ data });
};

export const getTasksByUser = (filters: any) => {
    const where: any = {
        userId: filters.userId,
    };

    if (filters.status) {
        where.status = filters.status;
    }

    if (filters.extras) {
        where.extras = {
        path: filters.extras.path,
        equals: filters.extras.equals,
        };
    }

    if (filters.createdAt) {
        where.createdAt = filters.createdAt;
    }

    return prisma.task.findMany({ where });

};

export const getTaskById = (taskId: string, userId:string) => {
    return prisma.task.findFirst({where: {id: Number(taskId), userId}}) 
};

export const updateTask = (data: any, taskId: string|number, userId:string) => {
    return prisma.task.update({where: {id: Number(taskId), userId}, data}) 
};

export const deleteTask = (taskId: string, userId:string) => {
    return prisma.task.delete({where: {id: Number(taskId), userId}}) 
};

export const countTasksByUser = (userId: string) => {
  return prisma.task.count({ where: { userId } });
};

export const countTasksByStatus = (userId: string, status: TaskStatus) => {
  return prisma.task.count({ where: { userId, status } });
};

export const updateTaskStatusById = async (taskId: string, status: TaskStatus) => {
  return prisma.task.update({
    where: { id: Number(taskId) },
    data: { status },
  });
};
