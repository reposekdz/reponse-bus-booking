import User from '../users/user.model';
import { AppError } from '../../utils/AppError';

export const registerUser = async (userData: any) => {
    const { name, email, password, phone } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new AppError('User already exists', 400);
    }
    
    // Force role to passenger for public registration
    const user = await User.create({ name, email, password, phone, role: 'passenger' });

    const token = user.getSignedJwtToken();
    
    // Omit password from the returned user object
    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse, token };
};

export const loginUser = async (loginData: any) => {
    const { email, password } = loginData;

    if (!email || !password) {
        throw new AppError('Please provide an email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
        throw new AppError('Invalid credentials', 401);
    }

    const token = user.getSignedJwtToken();
    
    const userResponse = user.toObject();
    delete userResponse.password;

    return { user: userResponse, token };
};

export const updatePassword = async (userId: string, currentPassword, newPassword) => {
    if (!currentPassword || !newPassword) {
        throw new AppError('Please provide current and new passwords', 400);
    }

    const user = await User.findById(userId).select('+password');

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
        throw new AppError('Incorrect current password', 401);
    }

    user.password = newPassword;
    await user.save();
};