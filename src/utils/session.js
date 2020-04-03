import cookie from 'js-cookie';
import { AUTHTOKEN } from './contants';
import { isProd } from './helpers';

const cookieOptions = {
    expires: 1,
    secure: isProd,
    path: process.env.APPLICATION_PATH
};

export const isSessionValid = () => {
    return !!cookie.get(AUTHTOKEN);
};

export const clearSession = () => {
    cookie.remove(AUTHTOKEN, cookieOptions);
};

export const saveAuthToken = authToken => {
    cookie.set(AUTHTOKEN, authToken, cookieOptions);
};

export const getAuthToken = () => cookie.get(AUTHTOKEN);
