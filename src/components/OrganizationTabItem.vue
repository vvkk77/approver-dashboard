<template>
    <div>
        <div class="is-flex jc-space-between">
            <div class="is-flex">
                <b-field>
                    <b-radio-button native-value="pass" v-model="requestType">
                        <span>Pass Request</span>
                    </b-radio-button>
                    <b-radio-button native-value="signup" v-model="requestType">
                        <span>Sign Up Request</span>
                    </b-radio-button>
                </b-field>
            </div>

            <div class="is-flex">
                <b-field grouped>
                    <p class="control">
                        <b-dropdown aria-role="list" position="is-bottom-left">
                            <button
                                class="button"
                                slot="trigger"
                                slot-scope="{ active }"
                            >
                                <span>Filter</span>
                                <b-icon
                                    :icon="active ? 'menu-up' : 'menu-down'"
                                ></b-icon>
                            </button>

                            <b-dropdown-item aria-role="listitem" value
                                >Action</b-dropdown-item
                            >
                            <b-dropdown-item aria-role="listitem" value
                                >Another action</b-dropdown-item
                            >
                            <b-dropdown-item aria-role="listitem" value
                                >Something else</b-dropdown-item
                            >
                        </b-dropdown>
                    </p>

                    <b-field>
                        <b-input
                            icon="magnify"
                            icon-clickable
                            placeholder="Search..."
                            type="search"
                        ></b-input>
                    </b-field>
                </b-field>
            </div>
        </div>

        <br />

        <pass-request-table v-if="requestType === 'pass'"></pass-request-table>
        <sign-up-request-table v-else></sign-up-request-table>
    </div>
</template>

<script>
import PassRequestTable from './PassRequestTable.vue';
import SignUpRequestTable from './SignUpRequestTable.vue';

export default {
    name: 'OrganizationTabItem',
    components: {
        PassRequestTable,
        SignUpRequestTable
    },
    data() {
        return {
            signUpList: [],
            requestType: 'pass'
        };
    },

    mounted() {}
};
</script>

<style lang="scss">
.jc-space-between {
    justify-content: space-between;
}

.jc-space-around {
    justify-content: space-around;
}
</style>
