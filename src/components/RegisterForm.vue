<template>
    <div class="register-form" v-if="!openOTP">
        <div class="title">Register</div>

        <section>
            <form @submit.prevent.stop>
                <b-field
                    :message="error.orgName"
                    :type="{ 'is-danger': !!error.orgName }"
                    label="Organization name"
                >
                    <b-input
                        @blur="validateOrgName"
                        @focus="error.orgName = ''"
                        type="text"
                        v-model="user.orgName"
                    ></b-input>
                </b-field>

                <b-field
                    :message="error.orgId"
                    :type="{ 'is-danger': !!error.orgId }"
                    label="Organization ID"
                >
                    <b-input
                        @blur="validateOrgId"
                        @focus="error.orgId = ''"
                        type="text"
                        v-model="user.orgId"
                    ></b-input>
                </b-field>

                <b-field
                    :message="error.name"
                    :type="{ 'is-danger': !!error.name }"
                    label="Your name"
                >
                    <b-input
                        @blur="validateName"
                        @focus="error.name = ''"
                        type="text"
                        v-model="user.name"
                    ></b-input>
                </b-field>

                <b-field
                    :message="error.email"
                    :type="{ 'is-danger': !!error.email }"
                    label="Official / Organization Email"
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
                    :message="error.cpass"
                    :type="{ 'is-danger': !!error.cpass }"
                    label="Confirm Password"
                >
                    <b-input
                        @blur="confimPassword"
                        @focus="error.cpass = ''"
                        password-reveal
                        type="password"
                        v-model="user.cpass"
                    ></b-input>
                </b-field>

                <div class="buttons m-y-48">
                    <b-button
                        :disabled="loading"
                        :loading="loading"
                        @click="register"
                        class="has-text-weight-bold"
                        expanded
                        native-type="submit"
                        type="is-primary"
                        >Register</b-button
                    >
                </div>
            </form>
        </section>
    </div>

    <verify-otp-form
        :emailId="user.email"
        @verfied="$emit('registered')"
        v-else
    ></verify-otp-form>
</template>

<script>
import { isValidEmail } from '../utils/helpers';
import EPassService from '../service/EPassService';
import VerifyOTPForm from './VerifyOTPForm';

export default {
    name: 'RegistrationForm',
    components: { 'verify-otp-form': VerifyOTPForm },

    data() {
        return {
            user: {
                orgName: '',
                orgId: '',
                name: '',
                email: '',
                pass: '',
                cpass: ''
            },
            error: {
                orgName: '',
                orgId: '',
                name: '',
                email: '',
                pass: '',
                cpass: ''
            },
            loading: false,

            openOTP: false
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

        validateOrgName() {
            this.error.orgName = '';
            if (!this.user.orgName) {
                this.error.orgName = 'Please enter organization name';
            }
        },

        validateName() {
            this.error.name = '';
            if (!this.user.name) {
                this.error.name = 'Please enter your name';
            }
        },

        validateOrgId() {
            this.error.orgId = '';
            if (!this.user.orgId) {
                this.error.orgId = 'Please enter organization id';
            }
        },

        confimPassword() {
            this.error.cpass = '';
            if (!this.user.cpass) {
                this.error.cpass = 'Please re-enter password';
                return;
            }

            if (this.user.cpass !== this.user.pass) {
                this.error.cpass = 'Password does not match!';
            }
        },

        isValid() {
            this.validateName();
            this.validateOrgName();
            this.validateOrgId();
            this.validateEmail();
            this.validatePassword();
            this.confimPassword();

            return !Object.keys(this.error).some(key => !!this.error[key]);
        },

        async register() {
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                const { name, email, pass, orgId, orgName } = this.user;

                await EPassService.createAccount({
                    email: email.trim(),
                    name: name.trim(),
                    password: pass.trim(),
                    orgName: orgName.trim(),
                    orgID: orgId.trim()
                });

                this.loading = false;

                this.openOTP = true;
            } catch (error) {
                this.loading = false;
            }
        }
    }
};
</script>

<style lang="scss">
.register-form {
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
</style>
