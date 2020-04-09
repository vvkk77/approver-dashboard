<template>
    <nav
        aria-label="main navigation"
        class="is-flex navbar is-white ai-center"
        role="navigation"
    >
        <div class="is-flex ai-center">
            <router-link :to="{ path: '/' }" tag="a">
                <img alt="iPass Logo" src="../assets/logo.png" width="112" />
            </router-link>
            <div class="seperator"></div>
            <span class="title is-4">
                Approver Dashboard
                <b class="title is-4 has-text-grey" v-if="user.stateName"
                    >[{{ user.stateName }}]</b
                >
            </span>
        </div>
        <div class="is-flex header-end">
            <b-dropdown aria-role="list" position="is-bottom-left">
                <button class="button is-outlined" slot="trigger">
                    <span>{{ selectedLang }}</span>
                    <b-icon icon="menu-down"></b-icon>
                </button>

                <b-dropdown-item
                    :key="i"
                    aria-role="listitem"
                    v-for="(item, i) in langs"
                    >{{ item }}</b-dropdown-item
                >
            </b-dropdown>

            <b-dropdown aria-role="list" position="is-bottom-left">
                <button class="button is-outlined" slot="trigger">
                    <span>Account</span>
                    <b-icon icon="menu-down"></b-icon>
                </button>

                <b-dropdown-item disabled>
                    <b>Logged in as {{ user.name }}</b>
                    <p>{{ user.email }}</p>
                </b-dropdown-item>
                <hr class="dropdown-divider" />

                <b-dropdown-item
                    @click="logout"
                    aria-role="menuitem"
                    value="logout"
                >
                    <div class="is-flex dropdown-menu-item">
                        <b-icon icon="logout"></b-icon>
                        <span>Sign out</span>
                    </div>
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </nav>
</template>

<script>
import { clearSession } from '../utils/session';
import EPassService from '../service/EPassService';
export default {
    name: 'AppHeader',
    data() {
        return {
            selectedLang: 'En',
            langs: ['Hi'],
            user: {
                name: '',
                email: '',
                stateName: ''
            }
        };
    },
    methods: {
        logout() {
            clearSession();
            localStorage.clear();
            window.location.reload();
        },
        async fetchProfile() {
            const { data } = await EPassService.getApproverUserProfile();
            this.user = data;
        }
    },

    created() {
        this.fetchProfile();
    }
};
</script>

<style lang="scss">
.ai-center {
    align-items: center;

    .seperator {
        width: 2px;
        height: 34px;
        background-color: #ededed;
        margin: 0 16px;
    }
}

.navbar {
    padding: 20px 40px;
    justify-content: space-between;
}

@media only screen and (max-width: 600px) {
    .navbar {
        padding: 1rem;
        display: block;

        .seperator {
            margin: 0 0.5rem;
        }
        .title.is-4 {
            font-size: 1rem;
        }

        .button {
            height: auto;
            font-size: 0.75rem;
        }
    }
}

@media only screen and (max-width: 600px) {
    .navbar {
        padding: 0.75rem;
    }
}

.dropdown-menu-item {
    .icon {
        margin-right: 8px;
    }
}

.dropdown-item.is-disabled {
    pointer-events: none;
}
</style>
