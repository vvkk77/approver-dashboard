<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import EPassService from './service/EPassService';
export default {
    name: 'App',

    created() {
        if (!EPassService.isSessionValid()) {
            this.$router.replace('/signup');
        }
    }
};
</script>

<style lang="scss"></style>
