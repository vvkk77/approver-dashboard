import Vue from 'vue';
import Vuex from 'vuex';
import EPassService from '../service/EPassService';
import { showError } from '../utils/toast';

Vue.use(Vuex);

let orderList = localStorage.getItem('orderList');
let signUpList = localStorage.getItem('signUpList');
let orgList = localStorage.getItem('orgList');

if (orgList) {
    orgList = JSON.parse(orgList);
}

if (signUpList) {
    signUpList = JSON.parse(signUpList);
}

if (orderList) {
    orderList = JSON.parse(orderList);
}

export default new Vuex.Store({
    state: {
        stateMap: {},
        orgList: orgList || [],
        signUpList: signUpList || [],
        orderList: orderList || []
    },
    mutations: {
        setState(store, { key, value }) {
            store[key] = value;
        }
    },
    actions: {
        async fetchStateList({ commit }) {
            const { data: res } = await EPassService.fetchStateList();
            commit('setState', {
                key: 'stateMap',
                value: res.stateMap
            });
            localStorage.setItem('stateList', res.stateMap);
        },

        async fetchAllOrganizations({ commit }) {
            try {
                const { data } = await EPassService.getAllOrganizations();
                commit('setState', {
                    key: 'orgList',
                    value: data.organizations
                });
            } catch (error) {
                showError(`Unable to fetch organizations`);
            }
        },
        async fetchSignUpRequests({ commit }) {
            try {
                const { data } = await EPassService.getSignUpRequests();
                commit('setState', {
                    key: 'signUpList',
                    value: data.accounts
                });
            } catch (error) {
                showError(`Unable to fetch requests`);
            }
        },
        async fetchAllOrders({ commit }) {
            try {
                const { data } = await EPassService.getAllOrders();
                commit('setState', {
                    key: 'orderList',
                    value: data.orders
                });
            } catch (error) {
                showError(`Unable to fetch requests`);
            }
        }
    }
});
