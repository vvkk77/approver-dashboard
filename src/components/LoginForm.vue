<template>
    <div class="login-form">
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
                <b-field
                    :message="error.state"
                    :type="{ 'is-danger': !!error.state }"
                    label="State"
                >
                    <b-select
                        :disabled="stateList.length === 0"
                        @change="validatePassword"
                        @focus="error.state = ''"
                        expanded
                        placeholder="Select a state"
                        v-model="user.state"
                    >
                        <option
                            :key="value"
                            :value="item"
                            v-for="(item, value) in stateList"
                            >{{ item }}</option
                        >
                    </b-select>
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
        </section>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import { saveAuthToken } from '../utils/session';
import { isValidEmail } from '../utils/helpers';
import { getError } from '../utils/error-handler';

export default {
    name: 'LoginForm',
    components: {},
    data() {
        return {
            registered: true,
            user: {
                email: '',
                pass: '',
                state: null
            },
            error: {
                email: '',
                pass: '',
                state: ''
            },
            loading: false,

            apiError: null
        };
    },

    computed: {
        stateList() {
            return this.$store.state.stateList;
        }
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

        validateState() {
            this.error.state = '';
            if (!this.user.state) {
                this.error.state = 'Please select a state';
            }
        },

        isValid() {
            this.validateEmail();
            this.validatePassword();
            this.validateState();

            return !this.error.email && !this.error.pass && !this.error.state;
        },

        async login() {
            this.apiError = null;
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                const { data } = await EPassService.signIn(
                    this.user.email.trim(),
                    this.user.pass.trim(),
                    this.user.state
                );

                this.loading = false;

                const { authToken } = data;

                saveAuthToken(authToken);

                this.$router.replace('/');
            } catch (error) {
                this.loading = false;
                this.apiError = getError(error);
            }
        },
        fetchStateList() {
            this.$store.dispatch('fetchStateList');
        }
    },

    created() {
        this.fetchStateList();
    }
};
</script>

<style lang="scss">
.login-form {
    section {
        margin-top: 60px;
        button {
            height: 40px;
        }
        .label {
            font-weight: 600;
        }
    }
}
.m-r-8 {
    margin-right: 8px;
}
</style>
