import cookie from 'js-cookie';
import { AUTHTOKEN } from './contants';
import { IS_PROD } from './helpers';

const cookieOptions = {
    expires: 1,
    secure: IS_PROD,
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
