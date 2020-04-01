<template>
    <div>
        <sign-up-layout>
            <re-enter-email-form></re-enter-email-form>
        </sign-up-layout>
    </div>
</template>

<script>
import SignUpLayout from '../components/SignUpLayout.vue';
import ReEnterEmailForm from '../components/ReEnterEmailForm.vue';

export default {
    name: 'ReEnterEmail',
    components: {
        SignUpLayout,
        ReEnterEmailForm
    }
};
</script>

<style lang="scss" scoped></style>
