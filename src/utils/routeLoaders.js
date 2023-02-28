import axios from './axios';

export const ping = async () => {
  try {
    const response = await axios('/ping');
    return response.status;
  } catch (e) {
    return null;
  }
};

export const getUser = async () => {
  try {
    const { data: user } = await axios('/auth/user');
    return user;
  } catch (e) {
    return null;
  }
};
