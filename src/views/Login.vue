<template>
    <div>
        <sign-up-layout>
            <login-form></login-form>
        </sign-up-layout>
    </div>
</template>

<script>
import SignUpLayout from '../components/SignUpLayout.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
    name: 'Login',
    components: {
        SignUpLayout,
        LoginForm
    }
};
</script>

<style lang="scss" scoped></style>
