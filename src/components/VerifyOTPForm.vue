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
                        @click="login"
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
                <a class="has-text-weight-semibold">Resend OTP</a>
            </div>

            <br />

            <div class="is-size-6">
                <span class="m-r-8">Incorrect email?</span>
                <a class="has-text-weight-semibold">Change email</a>
            </div>
        </section>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';

export default {
    name: 'VerifyOTPForm',
    props: {
        emailId: String
    },
    components: {},
    data() {
        return {
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

        async login() {
            if (!this.isValid()) {
                return;
            }

            this.loading = true;
            try {
                await EPassService.verifyOTP({
                    emailId: this.emailId,
                    otp: this.user.otp.trim()
                });

                this.loading = false;

                this.$emit('verfied');
            } catch (error) {
                this.loading = false;
            }
        }
    }
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
