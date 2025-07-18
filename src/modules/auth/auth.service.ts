import { comparePassword, generateToken, hashPassword } from '../../utils';
import { AppError } from '../../utils/AppError';
import * as AuthRepository from './auth.repository';

export const registerUser = async (userData: any) => {
  try {
    const existing = await AuthRepository.findByEmail(userData.email);
    if (existing) {
        throw new AppError('Email already registered', 409);
    }

    const hashedPassword = await hashPassword(userData.password);
    const createUser = await AuthRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
    const token = generateToken(createUser.id);
    const {password, ...user} = createUser;
    return { user, token };
  } catch (err) {
    console.error('[RegisterUser Error]', err);
    throw err; 
  }
};

export const loginUser = async (data:  { email: string; password: string } ) => {
    try {
        const findUser = await AuthRepository.findByEmail(data.email);
        if (!findUser || !(await comparePassword(data.password, findUser.password))) {
            throw new Error('Invalid credentials');
        }
        const token = generateToken(findUser.id);
        const {password, ...user} = findUser;
        return { user, token };
    } catch (err) {
        console.error('[Login Error]', err);
        throw err; 
    }
    
};

export const userProfile = async (userId: string ) => {
    try {
        const findUser = await AuthRepository.findById(userId);
        if (!findUser) {
            throw new Error('User not found');
        }
        const {password, ...user} = findUser;
        return { user };
    } catch (err) {
        console.error('[ Error]', err);
        throw err; 
    }
    
};