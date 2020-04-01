<template>
    <div class="login-form">
        <div class="title">Reset password</div>

        <div class="subtitle is-6">
            Enter OTP sent to:
            <span>{{ emailId }}</span>
        </div>
        <section>
            <form @submit.prevent.stop>
                <b-field
                    :message="error.pass"
                    :type="{ 'is-danger': !!error.pass }"
                    label="Enter Password"
                >
                    <b-input
                        @blur="validatePassword"
                        @focus="error.pass = ''"
                        password-reveal
                        type="password"
                        v-model="user.pass"
                    ></b-input>
                </b-field>

                <b-field
                    :message="error.cpass"
                    :type="{ 'is-danger': !!error.cpass }"
                    label="Confirm Password"
                >
                    <b-input
                        @blur="confirmPassword"
                        @focus="error.cpass = ''"
                        password-reveal
                        type="password"
                        v-model="user.cpass"
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
                        @click="login"
                        class="has-text-weight-bold"
                        expanded
                        native-type="submit"
                        type="is-primary"
                        >Login</b-button
                    >
                </div>
            </form>

            <br />
            <div class="is-size-6">
                <span class="m-r-8">Forgot password?</span>
                <router-link
                    class="has-text-weight-semibold"
                    to="/reset-password"
                    >Click here</router-link
                >
            </div>

            <br />

            <div class="is-size-6">
                <span class="m-r-8">New user?</span>
                <router-link class="has-text-weight-semibold" to="/register"
                    >Register Now</router-link
                >
            </div>
        </section>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import { getError } from '../utils/error-handler';

export default {
    name: 'LoginForm',
    components: {},
    data() {
        return {
            user: {
                pass: '',
                cpass: ''
            },
            error: {
                pass: '',
                cpass: ''
            },
            loading: false,

            apiError: null,
            email: null,
            auth: null
        };
    },

    methods: {
        validatePassword() {
            this.error.pass = '';
            if (!this.user.pass) {
                this.error.pass = 'Please enter password';
            }
        },

        confirmPassword() {
            this.error.cpass = '';
            this.validatePassword();

            if (!this.error.pass && this.user.pass !== this.user.cpass) {
                this.error.cpass = "Password doesn't match";
            }
        },

        isValid() {
            this.confirmPassword();
            return !this.error.cpass && !this.error.pass;
        },

        async login() {
            this.apiError = null;
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                await EPassService.updatePassword({
                    email: this.email.trim(),
                    password: this.user.pass.trim(),
                    authToken: this.auth.trim()
                });

                this.loading = false;

                this.$router.replace('/login');
            } catch (error) {
                this.loading = false;
                this.apiError = getError(error);
            }
        }
    },
    created() {
        this.email = sessionStorage.getItem('email');
        this.auth = sessionStorage.getItem('auth');
        sessionStorage.clear();
    }
};
</script>

<style lang="scss"></style>
