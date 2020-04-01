<template>
    <div class="login-form">
        <div class="title">Enter email</div>

        <section>
            <form @submit.prevent.stop>
                <b-field
                    :message="error.email"
                    :type="{ 'is-danger': !!error.email }"
                    label="Email"
                >
                    <b-input
                        @blur="validateEmail"
                        @focus="error.email = ''"
                        type="email"
                        v-model="user.email"
                    ></b-input>
                </b-field>

                <div
                    class="is-size-7 has-text-danger has-text-weight-semibold"
                    v-if="apiError"
                >
                    {{ apiError }}
                </div>

                <div class="buttons m-y-48">
                    <b-button
                        :disabled="loading"
                        :loading="loading"
                        @click="requestOTP"
                        class="has-text-weight-bold"
                        expanded
                        native-type="submit"
                        type="is-primary"
                        >Get OTP</b-button
                    >
                </div>
            </form>

            <br />

            <div class="is-size-6">
                <a @click="$router.go(-1)" class="has-text-weight-semibold"
                    >Go back</a
                >
            </div>
        </section>
    </div>
</template>

<script>
import { isValidEmail } from '../utils/helpers';
import EPassService from '../service/EPassService';
import { getError } from '../utils/error-handler';

export default {
    name: 'LoginForm',
    components: {},
    data() {
        return {
            user: {
                email: ''
            },
            error: {
                email: ''
            },
            loading: false,

            apiError: null
        };
    },

    methods: {
        validateEmail() {
            this.error.email = '';
            if (!this.user.email) {
                this.error.email = 'Please enter email id';
            } else if (!isValidEmail(this.user.email.trim())) {
                this.error.email = 'Invalid email address';
            }
        },

        isValid() {
            this.validateEmail();

            return !this.error.email;
        },

        async requestOTP() {
            this.apiError = null;
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                await EPassService.requestOTP(this.user.email.trim());

                this.loading = false;
                sessionStorage.setItem('email', this.user.email.trim());
                this.$router.push('/reset-password/verify-otp');
            } catch (error) {
                this.loading = false;
                this.apiError = getError(error);
            }
        }
    }
};
</script>

<style lang="scss"></style>
