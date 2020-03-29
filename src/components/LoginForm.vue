<template>
    <div>
        <div class="title">Login</div>

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
        </section>
    </div>
</template>

<script>
import { isValidEmail } from '../utils/helpers';
import { AUTHTOKEN } from '../utils/contants';
import EPassService from '../service/EPassService';
import dayjs from 'dayjs';

export default {
    name: 'LoginForm',
    data() {
        return {
            user: {
                email: '',
                pass: ''
            },
            error: {
                email: '',
                pass: ''
            },
            loading: false
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
        validatePassword() {
            this.error.pass = '';
            if (!this.user.pass) {
                this.error.pass = 'Please enter password';
            }
        },

        isValid() {
            this.validateEmail();
            this.validatePassword();

            return !this.error.email && !this.error.pass;
        },

        async login() {
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                const { data } = await EPassService.signIn(
                    this.user.email.trim(),
                    this.user.pass.trim()
                );

                this.loading = false;

                const { authToken, ...userInfo } = data;

                userInfo.email = this.user.email;

                localStorage.setItem(AUTHTOKEN, authToken);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                localStorage.setItem('expiry', dayjs(new Date()).add(1, 'day'));

                this.$router.replace('/');
            } catch (error) {
                this.loading = false;
            }
        }
    }
};
</script>

<style lang="scss">
section {
    margin-top: 60px;
    button {
        height: 40px;
    }
    .label {
        font-weight: 600;
    }
}
</style>
