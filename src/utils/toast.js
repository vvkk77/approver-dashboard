import { ToastProgrammatic as Toast } from 'buefy';

export const showSuccess = (message, duration = 3000) => {
    Toast.open({
        duration,
        message,
        position: 'is-top',
        type: 'is-success'
    });
};

export const showError = (message, duration = 3000) => {
    Toast.open({
        duration,
        message,
        position: 'is-top',
        type: 'is-danger'
    });
};
