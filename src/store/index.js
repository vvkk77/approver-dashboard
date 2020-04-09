import Vue from 'vue';
import Vuex from 'vuex';
import EPassService from '../service/EPassService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stateList: []
    },
    mutations: {
        setStateList(store, list) {
            store.stateList = list;
        }
    },
    actions: {
        async fetchStateList({ commit }) {
            const { data: stateList } = await EPassService.fetchStateList();
            commit('setStateList', stateList);
            localStorage.setItem('stateList', stateList);
        }
    }
});
