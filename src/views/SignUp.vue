<template>
    <div class="sign-up-container">
        <div class="columns">
            <div class="column full-height is-three-fifths">
                <div class="sign-up-info-container full-height">
                    <div class="is-flex ai-center logo-container">
                        <img
                            alt
                            class="logo"
                            src="../assets/logo.png"
                            width="132"
                        />
                        <div class="seperator"></div>
                        <div class="title is-4">Approver Dashboard</div>
                    </div>

                    <div class="title is-5">{{ typeText }}</div>

                    <div class="login-bg">
                        <img alt src="../assets/login-bg.png" />
                    </div>
                </div>
            </div>
            <div class="column full-height mobile-login">
                <div class="sign-up-form-container full-height">
                    <login-form></login-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import { clearSession } from '../utils/session';

export default {
    name: 'SignUp',
    components: { LoginForm },
    data() {
        return {
            welcomeText:
                'Verify and issue commute passes to authorised people during the COVID pandemic',
            typeText: ''
        };
    },

    mounted() {
        let count = 0;
        const timer = setInterval(() => {
            if (
                this.welcomeText.length === this.typeText.length ||
                count > this.welcomeText.length
            ) {
                clearInterval(timer);
            } else {
                this.typeText = this.welcomeText.slice(0, count);
                count++;
            }
        }, 30);
    },
    created() {
        localStorage.clear();
        clearSession();
    }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';

.sign-up-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 1;
    background-color: #fff;
}

.full-height {
    height: 100vh;
}

.sign-up-form-container {
    padding: 60px 36px;
    background-color: #f5f5f5;
    overflow: auto;
}

.sign-up-info-container {
    padding: 60px;
    position: relative;

    .title.is-5 {
        line-height: 1.5;
    }

    .logo-container {
        margin-bottom: 2rem;

        .seperator {
            height: 3rem;
        }
    }

    .login-bg {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        right: 0;
        img {
            width: 100%;
        }
    }
}

@include mobile {
    .sign-up-info-container {
        padding: 1.5rem 2rem;

        .logo-container {
            img {
                width: 100px;
            }
        }

        .title.is-5 {
            display: none;
        }
    }
    .mobile-login {
        position: absolute;
        z-index: 200;
        height: auto !important;
        width: 100%;
        max-width: 480px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .sign-up-form-container {
            border-radius: 10px;
            box-shadow: 0 4px 16px 0 rgba($color: #000000, $alpha: 0.25);
        }
        .full-height {
            height: auto;
            max-height: 100vh;
        }
    }
}

.m-y-48 {
    margin-top: 48px;
    margin-bottom: 48px;
}
</style>
