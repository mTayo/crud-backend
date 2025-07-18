import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

 // fallback for dev/testing

// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare a plain password with a hashed one
export const comparePassword = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};

// Generate a JWT token
export const generateToken = (userId: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

//Format validation error
export const formatValidationError = (errors: any) => {
   const formattedErrors = errors.reduce((acc: any, error: { property: any; constraints: any; }) => {
        const key = error.property;
        const messages = Object.values(error.constraints || {});
        acc[key] = messages;
        return acc;
    }, {});
            
    return formattedErrors;
};
