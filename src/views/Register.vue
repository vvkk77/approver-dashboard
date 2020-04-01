<template>
    <div>
        <sign-up-layout>
            <register-form></register-form>
        </sign-up-layout>
    </div>
</template>

<script>
import SignUpLayout from '../components/SignUpLayout.vue';
import RegisterForm from '../components/RegisterForm.vue';

export default {
    name: 'Register',
    components: {
        SignUpLayout,
        RegisterForm
    }
};
</script>

<style lang="scss" scoped></style>
