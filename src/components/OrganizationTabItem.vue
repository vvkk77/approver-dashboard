<template>
    <div>
        <div class="is-flex jc-space-between">
            <div class="is-flex">
                <b-field>
                    <b-radio-button native-value="pass" v-model="radioButton">
                        <span>Pass Request</span>
                    </b-radio-button>
                    <b-radio-button native-value="signup" v-model="radioButton">
                        <span>SignUp Request</span>
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

        <b-table
            :checked-rows.sync="checkedRows"
            :current-page.sync="currentPage"
            :data="data"
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
        >
            <template slot-scope="props">
                <b-table-column field="createAt" label="Raised on" sortable>
                    <div class="has-text-dark is-size-6">
                        {{ props.row.createAt | formatDate }}
                    </div>
                    <div class="has-text-grey is-size-6">
                        {{ props.row.createAt | formatTime }}
                    </div>
                </b-table-column>

                <b-table-column
                    field="organization"
                    label="Organization"
                    sortable
                    >{{ props.row.organization }}</b-table-column
                >

                <b-table-column field="email" label="Contact Email" sortable>
                    <div class="has-text-dark is-size-6">
                        {{ props.row.email }}
                    </div>
                </b-table-column>

                <b-table-column field="type" label="Pass Type" sortable>{{
                    props.row.type
                }}</b-table-column>

                <b-table-column
                    field="passCount"
                    label="No. of Passes"
                    numeric
                    sortable
                    >{{ props.row.passCount }}</b-table-column
                >

                <b-table-column field="status" label="Status" sortable>
                    <span
                        class="has-text-weight-bold is-uppercase has-text-warning"
                        >{{ props.row.status }}</span
                    >
                </b-table-column>
                <b-table-column label=" ">
                    <button class="button is-small is-white">
                        <b-icon icon="dots-vertical"></b-icon>
                    </button>
                </b-table-column>
            </template>
            <template slot="bottom-left">
                <span class="is-6">Request per page:</span>
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
import dayjs from 'dayjs';
import TableActionSheet from './TableActionSheet.vue';

export default {
    name: 'OrganizationTabItem',
    components: {
        TableActionSheet
    },
    data() {
        const data = Array(48)
            .fill(0)
            .map(i => ({
                id: Math.random()
                    .toString()
                    .slice(2),
                createAt: Date.now(),
                organization: 'Swiggy',
                email: 'swiggy@gmail.com',
                type: 'individual',
                passCount: 20 + i,
                status: 'Pending'
            }));
        console.log('data: ', data);

        return {
            data,
            radioButton: 'pass',
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

    filters: {
        formatDate(date) {
            return dayjs(new Date(date)).format('DD MMM YY');
        },
        formatTime(date) {
            return dayjs(new Date(date)).format('hh:mm A');
        }
    },
    watch: {}
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
