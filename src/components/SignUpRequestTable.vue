<template>
    <div>
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
            checkbox-position="left"
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

                <b-table-column field="orgID" label="Organization Id" sortable>
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

        <table-action-sheet v-if="checkedRows.length > 0"></table-action-sheet>

        <b-modal :active.sync="isModalActive" has-modal-card>
            <div class="modal-card">
                <div class="modal-card-body">
                    <p class="title is-4">Enter Reason</p>
                    <p class="subtitle">Jeff Atwood</p>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import TableActionSheet from './TableActionSheet.vue';

export default {
    name: 'PassRequestTable',

    components: { TableActionSheet },

    data() {
        let signUpList = localStorage.getItem('signUpList');

        if (signUpList) {
            signUpList = JSON.parse(signUpList);
        }

        return {
            signUpList: signUpList || [],
            checkedRows: [],
            isModalActive: false,

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

    methods: {
        async fetchSignUpRequests() {
            const { data } = await EPassService.getSignUpRequests();
            this.signUpList = data.accounts;
            localStorage.setItem('signUpList', JSON.stringify(data.accounts));
        }
    },

    created() {
        this.fetchSignUpRequests();
    }
};
</script>

<style lang="scss" scoped></style>
