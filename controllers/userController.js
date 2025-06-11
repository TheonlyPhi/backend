
import * as userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const successResponse = (message, data = null) => ({
  status: 'success',
  message,
  data,
});

const errorResponse = (message, statusCode = 400) => ({
  status: 'fail',
  message,
  statusCode,
});

export const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return successResponse('Success', users);
  } catch (err) {
    return errorResponse(err.message);
  }
};

export const createUser = async (request) => {
  try {
    const { username, email, password } = request.payload;
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return errorResponse('Email sudah terdaftar');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser(username, email, hashedPassword);
    return successResponse('User created successfully', newUser);
  } catch (err) {
    return errorResponse(err.message);
  }
};

export const loginUser = async (request) => {
  try {
    const { email, password } = request.payload;
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return errorResponse('User not found', 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse('Invalid password', 401);
    }
    return successResponse('Login successful', {
      username: user.username,
      email: user.email
    });
  } catch (err) {
    return errorResponse(err.message);
  }
};

export const deleteUser = async (request) => {
  try {
    const { id } = request.params;
    const deletedUser = await userModel.deleteUserByUsername(id);
    if (deletedUser.length === 0) {
      return errorResponse('User not found', 404);
    }
    return successResponse('User deleted successfully', deletedUser);
  } catch (err) {
    return errorResponse(err.message);
  }
};

export const createCheckin = async (request) => {
  try {
    const { prediction, username } = request.payload;
    const checkin = await userModel.createCheckin(prediction, username);
    return successResponse('Checkin successful', checkin);
  } catch (err) {
    return errorResponse(err.message);
  }
};
