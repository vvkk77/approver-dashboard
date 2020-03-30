<template>
    <div>
        <router-view></router-view>
        <loading-bar v-show="loading"></loading-bar>
    </div>
</template>

<script>
import EPassService from './service/EPassService';
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
        if (this.$route.path !== '/signup' && !EPassService.isSessionValid()) {
            this.$router.replace('/signup');
        }

        window.addEventListener(SHOW_LOADING, () => (this.loading = true));
        window.addEventListener(HIDE_LOADING, () => (this.loading = false));
    }
};
</script>
<style lang="scss"></style>
