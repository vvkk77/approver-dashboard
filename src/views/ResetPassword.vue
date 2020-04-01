<template>
    <div>
        <sign-up-layout>
            <reset-password-form></reset-password-form>
        </sign-up-layout>
    </div>
</template>

<script>
import SignUpLayout from '../components/SignUpLayout.vue';
import ResetPasswordForm from '../components/ResetPasswordForm.vue';

export default {
    name: 'ResetPassword',
    components: {
        SignUpLayout,
        ResetPasswordForm
    }
};
</script>

<style lang="scss" scoped></style>
