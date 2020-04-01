<template>
    <div>
        <transition mode="out-in" name="fade">
            <b-table
                :checked-rows.sync="checkedRows"
                :current-page.sync="currentPage"
                :data="signUpList"
                :default-sort-direction="defaultSortDirection"
                :is-row-checkable="row => true"
                :paginated="isPaginated"
                :pagination-position="paginationPosition"
                :pagination-simple="isPaginationSimple"
                :per-page="perPage"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                checkable
                checkbox-position="left"
                v-if="!loading && signUpList.length"
            >
                <template slot-scope="props">
                    <b-table-column field="name" label="Name" sortable>
                        <div class="has-text-dark is-size-6">
                            {{ props.row.name }}
                        </div>
                    </b-table-column>

                    <b-table-column field="email" label="Email" sortable>
                        <div class="has-text-dark is-size-6">
                            {{ props.row.email }}
                        </div>
                    </b-table-column>

                    <b-table-column
                        field="orgID"
                        label="Organization Id"
                        sortable
                    >
                        <div class="has-text-dark is-size-6">
                            {{ props.row.orgID }}
                        </div>
                    </b-table-column>

                    <b-table-column
                        field="orgName"
                        label="Organization Name"
                        sortable
                    >
                        <div class="has-text-dark is-size-6">
                            {{ props.row.orgName }}
                        </div>
                    </b-table-column>

                    <b-table-column label=" " width="30">
                        <b-dropdown aria-role="list" position="is-bottom-left">
                            <button
                                class="button is-small is-white"
                                slot="trigger"
                            >
                                <b-icon icon="dots-vertical"></b-icon>
                            </button>

                            <b-dropdown-item
                                @click="approveSignUp(props.row.email)"
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

            <empty-table v-else></empty-table>
        </transition>

        <transition name="slideInBottom">
            <sign-up-table-action-sheet
                @approve="approveAll"
                v-if="checkedRows.length > 0"
            ></sign-up-table-action-sheet>
        </transition>

        <b-modal :active="showProgess" has-modal-card>
            <div class="modal-card">
                <div class="modal-card-body is-rounded">
                    <p class="title is-4">Submitting Requests</p>
                    <b-progress
                        :value="reqProgess"
                        show-value
                        type="is-success"
                    >
                        {{ reqIndex }} out of
                        {{ checkedRows.length }}
                    </b-progress>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import SignUpTableActionSheet from './SignUpTableActionSheet.vue';
import { showError, showSuccess } from '../utils/toast';
import EmptyTable from './EmptyTable.vue';

export default {
    name: 'PassRequestTable',

    components: { SignUpTableActionSheet, EmptyTable },

    data() {
        let signUpList = localStorage.getItem('signUpList');

        if (signUpList) {
            signUpList = JSON.parse(signUpList);
        }

        return {
            signUpList: signUpList || [],
            checkedRows: [],
            loading: false,

            isPaginated: true,
            isPaginationSimple: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            perPage: 10,
            reqIndex: 1,
            showProgess: false
        };
    },

    computed: {
        reqProgess() {
            return Math.ceil((this.reqIndex / this.checkedRows.length) * 100);
        }
    },

    methods: {
        async fetchSignUpRequests() {
            this.loading = true;
            try {
                const { data } = await EPassService.getSignUpRequests();
                this.signUpList = data.accounts;
            } catch (error) {
                showError(`Unable to fetch requests`);
            }
            this.loading = false;
        },
        async approveSignUp(email) {
            try {
                await EPassService.approveAccount(email);
                await this.fetchSignUpRequests();
                showSuccess(`Request Approved!`);
            } catch (error) {
                showError(`Unable to approve request`);
            }
        },

        async approveAll() {
            try {
                this.showProgess = true;
                const emailList = this.checkedRows.map(i => i.email);

                for (let index = 0; index < emailList.length; index++) {
                    this.reqIndex = index + 1;
                    const email = emailList[index];
                    await EPassService.approveAccount(email);
                }

                await this.fetchSignUpRequests();

                this.checkedRows = [];
                this.showProgess = false;

                showSuccess(`All Request Approved!`);
            } catch (error) {
                this.showProgess = false;
                this.checkedRows = [];
                showError(`Unable to approve requests`);
            }
        }
    },

    created() {
        this.fetchSignUpRequests();
    }
};
</script>

<style lang="scss" scoped></style>
