import axios from 'axios';
import { AUTHTOKEN } from '../utils/contants';

const BASE_URL = 'https://viruscorona.co.in';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['content-type'] = 'application/json';
// Add a request interceptor
axios.interceptors.request.use(
    function(config) {
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default {
    isSessionValid() {
        const expiry = localStorage.getItem('expiry');
        return (
            localStorage.getItem(AUTHTOKEN) &&
            expiry &&
            new Date(expiry) > Date.now()
        );
    },
    signIn(email, password) {
        return axios.post('/signin', { email, password });
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
            authToken: localStorage.getItem(AUTHTOKEN)
        });
    },

    approveOrder(orderID, orderAction) {
        return axios.post('/approveOrder', {
            orderID,
            orderAction,
            authToken: localStorage.getItem(AUTHTOKEN)
        });
    },

    downloadQRCodes(orderID) {
        return axios.post('/downloadQRCodes', {
            orderID,
            authToken: localStorage.getItem(AUTHTOKEN)
        });
    },

    getSignUpRequests() {
        return axios.post('/getAllAccountsPendingVerification', {
            authToken: localStorage.getItem(AUTHTOKEN)
        });
    }
};
