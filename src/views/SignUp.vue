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

                    <div class="title is-5">
                        Verify and issue commute passes to authorised
                        <br />people during the COVID pandemic
                    </div>

                    <div class="login-bg">
                        <img alt src="../assets/login-bg.png" />
                    </div>
                </div>
            </div>
            <div class="column full-height">
                <div class="sign-up-form-container full-height">
                    <div class="title">Login</div>

                    <section>
                        <b-field label="Email">
                            <b-input
                                type="email"
                                v-model="user.email"
                            ></b-input>
                        </b-field>

                        <b-field label="Enter Password">
                            <b-input
                                password-reveal
                                type="password"
                                v-model="user.pass"
                            ></b-input>
                        </b-field>

                        <div class="buttons m-t-48">
                            <b-button
                                class="has-text-weight-bold"
                                expanded
                                type="is-primary"
                                >Login</b-button
                            >
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            user: {
                email: '',
                pass: ''
            }
        };
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
    section {
        margin-top: 60px;
    }
    button {
        height: 40px;
    }
    .label {
        font-weight: 600;
    }
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

.m-t-48 {
    margin-top: 48px;
}
</style>
