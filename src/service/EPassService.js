import axios from 'axios';
import { SHOW_LOADING, HIDE_LOADING } from '../utils/contants';
import { getAuthToken } from '../utils/session';
import dotprop from 'dot-prop';
import { isProd, isGithub } from '../utils/helpers';

const BASE_URL = (() => {
    const DEFAULT_API = 'https://viruscorona.co.in';
    const EPASS_API = `${window.location.protocol}//${window.location.hostname}/ecurfew`;

    if (!isProd || isGithub) {
        return DEFAULT_API;
    }

    return EPASS_API;
})();

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json'
    }
});

const showLoader = () => {
    window.dispatchEvent(new CustomEvent(SHOW_LOADING));
};

const hideLoader = () => {
    window.dispatchEvent(new CustomEvent(HIDE_LOADING));
};

// Add a request interceptor
api.interceptors.request.use(
    function(config) {
        showLoader();
        return config;
    },
    function(error) {
        hideLoader();
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function(response) {
        hideLoader();
        return response;
    },
    function(error) {
        const message = dotprop.get(error, 'response.data.message');
        if (String(message).indexOf('invalid token') > -1) {
            window.dispatchEvent(new CustomEvent('LOGIN'));
            return Promise.reject();
        }

        hideLoader();
        return Promise.reject(error);
    }
);

export default {
    signIn(email, password, stateName) {
        return api.post('/signin', {
            email,
            password,
            accountType: 'admin',
            stateName
        });
    },

    createAccount({ name, email, password, orgID, orgName }) {
        return api.post('/createAccount', {
            name,
            email,
            password,
            orgID,
            orgName
        });
    },

    verifyOTP({ emailId, otp }) {
        return api.post('/verifyOTP', {
            identifier: emailId,
            accountIdentifierType: 'email',
            otp
        });
    },

    getAllOrders() {
        return api
            .post('/getAllOrders', {
                authToken: getAuthToken()
            })
            .then(req => {
                req.data.orders.forEach(e => {
                    e.searchTerm = [
                        e.orgName,
                        e.requester,
                        e.orderStatus,
                        e.reason
                    ]
                        .join('|')
                        .toLowerCase();
                });

                localStorage.setItem(
                    'orderList',
                    JSON.stringify(req.data.orders)
                );
                return req;
            });
    },

    approveOrder(orderID, orderAction) {
        return api.post('/approveOrder', {
            orderID,
            orderAction,
            authToken: getAuthToken()
        });
    },

    approveAccount(email, requesterAccountId) {
        return api.post('/approveAccount', {
            email,
            requesterAccountId,
            authToken: getAuthToken()
        });
    },

    downloadQRCodes(orderID) {
        return api.post('/downloadQRCodes', {
            orderID,
            authToken: getAuthToken()
        });
    },

    downloadOrderFile(orderID) {
        return api.post('/downloadOrderFile', {
            orderID,
            authToken: getAuthToken()
        });
    },

    getSignUpRequests() {
        return api
            .post('/getAllAccountsPendingVerification', {
                authToken: getAuthToken()
            })
            .then(req => {
                localStorage.setItem(
                    'signUpList',
                    JSON.stringify(req.data.accounts)
                );
                return req;
            });
    },

    getAllOrganizations() {
        return api
            .post('/getAllOrganizations', {
                authToken: getAuthToken()
            })
            .then(req => {
                req.data.organizations.forEach(e => {
                    e.searchTerm = [
                        e.name,
                        e.orgID,
                        e.status,
                        e.activePassLimit
                    ]
                        .join('|')
                        .toLowerCase();
                });

                localStorage.setItem(
                    'orgList',
                    JSON.stringify(req.data.organizations)
                );
                return req;
            });
    },

    setPassLimit(newLimit, organizationID) {
        return api.post('/setPassLimit', {
            newLimit,
            organizationID,
            authToken: getAuthToken()
        });
    },

    getApproverUserProfile() {
        return api.post(`/getApproverUserProfile`, null, {
            params: {
                authToken: getAuthToken()
            }
        });
    },

    fetchStateList() {
        return api.post(`/fetchStateList`);
    }
};
