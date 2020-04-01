<template>
    <div class="verify-otp-form">
        <div class="title">Enter OTP</div>

        <div></div>

        <div class="subtitle is-6">
            Enter OTP sent to:
            <span>{{ emailId }}</span>
        </div>
        <section>
            <form @submit.prevent.stop>
                <b-field
                    :message="error.otp"
                    :type="{ 'is-danger': !!error.otp }"
                    label="Enter 6 digit OTP"
                >
                    <b-input
                        @blur="validateOTP"
                        @focus="error.otp = ''"
                        maxlength="6"
                        type="number"
                        v-model="user.otp"
                    ></b-input>
                </b-field>

                <div class="buttons m-y-48">
                    <b-button
                        :disabled="loading"
                        :loading="loading"
                        @click="verifyOTP"
                        class="has-text-weight-bold"
                        expanded
                        native-type="submit"
                        type="is-primary"
                        >Verify email</b-button
                    >
                </div>
            </form>

            <br />
            <div class="is-size-6">
                <span class="m-r-8">Didn’t receive the OTP?</span>
                <a @click="resendOTP" class="has-text-weight-semibold"
                    >Resend OTP</a
                >
            </div>

            <br />

            <div class="is-size-6">
                <span class="m-r-8">Incorrect email?</span>
                <a @click="$router.go(-1)" class="has-text-weight-semibold"
                    >Go Back</a
                >
            </div>
        </section>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import dotprop from 'dot-prop';
import { showSuccess } from '../utils/toast';

export default {
    name: 'VerifyOTPForm',

    components: {},
    data() {
        const email = sessionStorage.getItem('email');
        sessionStorage.clear();

        return {
            emailId: email,
            user: {
                otp: ''
            },
            error: {
                otp: ''
            },
            loading: false
        };
    },
    methods: {
        validateOTP() {
            this.error.otp = '';
            if (!this.user.otp) {
                this.error.otp = 'Please enter otp';
                return;
            }

            if (this.user.otp.length !== 6) {
                this.error.otp = 'Invalid OTP';
            }
        },

        isValid() {
            this.validateOTP();

            return !this.error.otp;
        },

        async verifyOTP() {
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                const { data } = await EPassService.verifyOTP({
                    emailId: this.emailId,
                    otp: this.user.otp.trim()
                });

                this.loading = false;

                if (this.$route.path.indexOf('reset-password') > -1) {
                    sessionStorage.setItem('email', this.emailId);
                    sessionStorage.setItem('auth', data.authToken);
                    this.$router.replace('/reset-password/update');
                } else this.$router.replace('/login');
            } catch (error) {
                this.loading = false;
                const message = dotprop.get(error, 'response.data.message');
                if (message) {
                    this.error.otp = message;
                } else {
                    this.error.otp = 'Something went wrong';
                }
            }
        },

        async resendOTP() {
            try {
                await EPassService.requestOTP(this.emailId);

                showSuccess(`OTP sent to ${this.emailId}`);
            } catch (error) {
                showSuccess(`Unable to send OTP`);
            }
        }
    },
    mounted() {
        if (!this.emailId) {
            this.$router.replace('/login');
        }
    },
    created() {}
};
</script>

<style lang="scss">
.verify-otp-form {
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
