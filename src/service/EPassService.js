import axios from 'axios';
import { SHOW_LOADING, HIDE_LOADING } from '../utils/contants';
import { getAuthToken } from '../utils/session';

const BASE_URL = 'https://epassapi.egovernments.org/ecurfew';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['content-type'] = 'application/json';

const showLoader = () => {
    window.dispatchEvent(new CustomEvent(SHOW_LOADING));
};

const hideLoader = () => {
    window.dispatchEvent(new CustomEvent(HIDE_LOADING));
};

// Add a request interceptor
axios.interceptors.request.use(
    function(config) {
        showLoader();
        return config;
    },
    function(error) {
        hideLoader();
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function(response) {
        hideLoader();
        return response;
    },
    function(error) {
        hideLoader();
        return Promise.reject(error);
    }
);

export default {
    signIn(email, password) {
        return axios.post('/signin', { email, password, accountType: 'admin' });
    },

    createAccount({ name, email, password, orgID, orgName }) {
        return axios.post('/createAccount', {
            name,
            email,
            password,
            orgID,
            orgName
        });
    },

    verifyOTP({ emailId, otp }) {
        return axios.post('/verifyOTP', {
            identifier: emailId,
            accountIdentifierType: 'email',
            otp
        });
    },

    getAllOrders() {
        return axios.post('/getAllOrders', {
            authToken: getAuthToken()
        });
    },

    approveOrder(orderID, orderAction) {
        return axios.post('/approveOrder', {
            orderID,
            orderAction,
            authToken: getAuthToken()
        });
    },

    approveAccount(email) {
        return axios.post('/approveAccount', {
            email,
            authToken: getAuthToken()
        });
    },

    downloadQRCodes(orderID) {
        return axios.post('/downloadQRCodes', {
            orderID,
            authToken: getAuthToken()
        });
    },

    downloadOrderFile(orderID) {
        return axios.post('/downloadOrderFile', {
            orderID,
            authToken: getAuthToken()
        });
    },

    getSignUpRequests() {
        return axios.post('/getAllAccountsPendingVerification', {
            authToken: getAuthToken()
        });
    },

    getApproverUserProfile() {
        return axios.post('/getApproverUserProfile', {
            authToken: getAuthToken()
        });
    }
};
