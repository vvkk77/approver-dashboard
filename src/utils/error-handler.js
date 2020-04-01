import dotProp from 'dot-prop';

const GENERIC_ERROR = 'Something went wrong';

export const getError = error => {
    if (!error) {
        return GENERIC_ERROR;
    }
    const message = dotProp.get(error, 'response.data.message');

    if (!message) {
        return GENERIC_ERROR;
    }

    const expection = message.split(':');

    if (expection) {
        return expection[1];
    }

    return message;
};
