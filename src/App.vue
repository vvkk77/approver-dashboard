<template>
    <div id="app">
        <router-view></router-view>
        <loading-bar
            :alt="$route.path == '/login'"
            v-show="loading"
        ></loading-bar>
    </div>
</template>

<script>
import LoadingBar from './components/LoadingBar.vue';
import { SHOW_LOADING, HIDE_LOADING } from './utils/contants';

export default {
    name: 'App',
    components: { LoadingBar },

    data() {
        return {
            loading: false
        };
    },

    created() {
        window.addEventListener(SHOW_LOADING, () => (this.loading = true));
        window.addEventListener(HIDE_LOADING, () => (this.loading = false));
        window.addEventListener('LOGIN', () => {
            this.$router.replace('/login');
        });
    }
};
</script>

<style lang="scss"></style>
