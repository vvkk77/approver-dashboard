import Vue from 'vue';
import Vuex from 'vuex';
import EPassService from '../service/EPassService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        stateMap: {}
    },
    mutations: {
        setStateList(store, list) {
            store.stateMap = list;
        }
    },
    actions: {
        async fetchStateList({ commit }) {
            const { data: res } = await EPassService.fetchStateList();
            commit('setStateList', res.stateMap);
            localStorage.setItem('stateList', res.stateMap);
        }
    }
});
