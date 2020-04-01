<template>
    <div>
        <sign-up-layout>
            <verify-o-t-p-form></verify-o-t-p-form>
        </sign-up-layout>
    </div>
</template>

<script>
import SignUpLayout from '../components/SignUpLayout.vue';
import VerifyOTPForm from '../components/VerifyOTPForm.vue';

export default {
    name: 'VerifyOTP',
    props: {
        emailId: String
    },
    components: {
        SignUpLayout,
        VerifyOTPForm
    }
};
</script>

<style lang="scss" scoped></style>
