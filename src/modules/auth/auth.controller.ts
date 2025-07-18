import { Request, Response } from 'express';
import * as AuthService from './auth.service';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface User {
            id: string;
            // add other user properties if needed
        }
        interface Request {
            user?: User;
        }
    }
}
import { ResponseManager } from '../../utils/ResponseManager';
import { LoginDto, RegisterDto } from './auth.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { formatValidationError } from '../../utils';

export const register = async (req: Request, res: Response) => {
    try {
        const dto = plainToInstance(RegisterDto, req.body, {
            excludeExtraneousValues: true,
        });
        const errors = await validate(dto);
        if (errors.length > 0) {
            const formattedErrors = formatValidationError(errors);
            return ResponseManager.validationError(res, formattedErrors,  400);
        }
        const result = await AuthService.registerUser(dto);
        return ResponseManager.success(res, result, 'User registered', 201);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const dto = plainToInstance(LoginDto, req.body, {
            excludeExtraneousValues: true,
        });
        const errors = await validate(dto);
        if (errors.length > 0) {
            const formattedErrors = formatValidationError(errors);
            return ResponseManager.validationError(res, formattedErrors,  400);
        }
        const result = await AuthService.loginUser(req.body);
        return ResponseManager.success(res, result, 'User logged in', 200);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};

export const profile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return ResponseManager.error(res, 'User not authenticated', 401);
        }
        const result = await AuthService.userProfile(req.user.id);
        return ResponseManager.success(res, result, 'Profile retrieved successfully', 200);
    } catch (error: any) {
        return ResponseManager.error(res, error, error.statusCode || 400);
    }
};