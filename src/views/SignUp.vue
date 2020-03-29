<template>
    <div class="sign-up-container">
        <div class="columns">
            <div class="column full-height is-three-fifths">
                <div class="sign-up-info-container full-height">
                    <img
                        alt
                        class="logo"
                        src="../assets/logo.png"
                        width="120"
                    />

                    <div class="title is-5">{{ typeText }}</div>

                    <div class="login-bg">
                        <img alt src="../assets/login-bg.png" />
                    </div>
                </div>
            </div>
            <div class="column full-height">
                <div class="sign-up-form-container full-height">
                    <login-form></login-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
export default {
    name: 'SignUp',
    components: { LoginForm },
    data() {
        return {
            welcomeText: 'Get a pass to commute during the COVID pandemic',
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
    }
};
</script>

<style lang="scss">
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
}

.sign-up-info-container {
    padding: 60px;
    position: relative;

    .logo {
        margin-bottom: 16px;
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

.m-y-48 {
    margin-top: 48px;
    margin-bottom: 48px;
}
</style>
