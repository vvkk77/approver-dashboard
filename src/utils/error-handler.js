import dotProp from 'dot-prop';

const GENERIC_ERROR = 'Something went wrong';
const EXCEPTION = 'Error Creating accountjava.lang.RuntimeException:';

export const getError = error => {
    if (!error) {
        return GENERIC_ERROR;
    }
    const message = dotProp.get(error, 'response.data.message');

    if (!message) {
        return GENERIC_ERROR;
    }

    if (message.indexOf(EXCEPTION) > -1) {
        return message.replace(EXCEPTION, '');
    }

    const expection = message.split(':');

    if (expection) {
        return expection[1];
    }

    return message;
};
