export const isValidEmail = email => {
    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return EMAIL_REGEX.test(email);
};

export const isProd = process.env.NODE_ENV === 'production';
export const isGithub = window.location.hostname.indexOf('github') > -1;
