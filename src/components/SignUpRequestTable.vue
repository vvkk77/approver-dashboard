<template>
    <div>
        <transition mode="out-in" name="fade">
            <div v-if="signUpList.length">
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <div class="is-flex">
                                <span class="m-r-8"
                                    >Total signup requests:</span
                                >
                                <span class="has-text-weight-bold">{{
                                    signUpList.length
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item"></div>
                    </div>
                </nav>

                <b-table
                    :current-page.sync="currentPage"
                    :data="signUpList"
                    :default-sort-direction="defaultSortDirection"
                    :paginated="isPaginated"
                    :pagination-position="paginationPosition"
                    :pagination-simple="isPaginationSimple"
                    :per-page="perPage"
                    :sort-icon="sortIcon"
                    :sort-icon-size="sortIconSize"
                    checkbox-position="left"
                >
                    <template slot-scope="props">
                        <b-table-column
                            field="orgName"
                            label="Organization Name"
                            sortable
                        >
                            <div class="has-text-dark is-size-6">
                                {{ props.row.orgName }}
                            </div>
                        </b-table-column>

                        <b-table-column field="orgID" label="GSTIN Id" sortable>
                            <div class="has-text-dark is-size-6">
                                {{ props.row.orgID }}
                            </div>
                        </b-table-column>

                        <b-table-column field="name" label="SPOC Name" sortable>
                            <div class="has-text-dark is-size-6">
                                {{ props.row.name }}
                            </div>
                        </b-table-column>

                        <b-table-column
                            field="email"
                            label="SPOC Email"
                            sortable
                        >
                            <div class="has-text-dark is-size-6">
                                {{ props.row.email }}
                            </div>
                        </b-table-column>

                        <b-table-column label=" " width="30">
                            <b-dropdown
                                aria-role="list"
                                position="is-bottom-left"
                            >
                                <button
                                    class="button is-small is-white"
                                    slot="trigger"
                                >
                                    <b-icon icon="dots-vertical"></b-icon>
                                </button>

                                <b-dropdown-item
                                    @click="approveSignUp(props.row)"
                                    aria-role="listitem"
                                >
                                    <div class="is-flex dropdown-menu-item">
                                        <b-icon
                                            icon="check-circle-outline"
                                            type="is-success"
                                        ></b-icon>
                                        <span>Approve</span>
                                    </div>
                                </b-dropdown-item>

                                <b-dropdown-item aria-role="listitem" disabled>
                                    <div class="is-flex dropdown-menu-item">
                                        <b-icon
                                            icon="close-circle-outline"
                                            type="is-danger"
                                        ></b-icon>
                                        <span>Decline</span>
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-table-column>
                    </template>
                    <template slot="bottom-left">
                        <span class="is-size-7 has-text-weight-bold m-r-8"
                            >Request per page:</span
                        >
                        <b-select
                            placeholder="Select a character"
                            size="is-small"
                            v-model="perPage"
                        >
                            <option
                                :key="index"
                                :value="item"
                                v-for="(item, index) in [10, 25, 50]"
                                >{{ item }}</option
                            >
                        </b-select>
                    </template>
                </b-table>
            </div>

            <empty-table v-else></empty-table>
        </transition>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import { showError, showSuccess } from '../utils/toast';
import EmptyTable from './EmptyTable.vue';

export default {
    name: 'PassRequestTable',

    components: { EmptyTable },

    data() {
        return {
            isPaginated: true,
            isPaginationSimple: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            perPage: 10
        };
    },

    computed: {
        signUpList() {
            return this.$store.state.signUpList;
        }
    },

    methods: {
        fetchSignUpRequests() {
            this.$store.dispatch('fetchSignUpRequests');
        },

        async approveSignUp(item) {
            try {
                await EPassService.approveAccount(item.email, item.id);
                await this.fetchSignUpRequests();
                showSuccess(`Request Approved!`);
            } catch (error) {
                showError(`Unable to approve request`);
            }
        }
    },

    created() {
        this.fetchSignUpRequests();
    }
};
</script>

<style lang="scss" scoped></style>
