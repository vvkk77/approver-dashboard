<template>
    <div>
        <transition mode="out-in" name="fade">
            <div v-if="!loading && orgList.length > 0">
                <div class="is-flex jc-space-between ai-center">
                    <div class="is-flex">
                        <span class="m-r-8">Total organizations:</span>
                        <span class="has-text-weight-bold">
                            {{ filteredOrgList.length }}
                        </span>
                    </div>

                    <div class="is-flex">
                        <b-field grouped>
                            <p class="control">
                                <b-dropdown
                                    aria-role="list"
                                    class="filter-options"
                                    position="is-bottom-left"
                                    v-model="statusOption"
                                >
                                    <button
                                        class="button"
                                        slot="trigger"
                                        slot-scope="{ active }"
                                    >
                                        <span
                                            :class="
                                                `has-text-${getStatusClass(
                                                    statusOption
                                                )}`
                                            "
                                            class="has-text-weight-semibold is-uppercase"
                                            >{{ statusMap[statusOption] }}</span
                                        >
                                        <b-icon
                                            :icon="
                                                active ? 'menu-up' : 'menu-down'
                                            "
                                        ></b-icon>
                                    </button>

                                    <b-dropdown-item
                                        :key="value"
                                        :value="value"
                                        aria-role="listitem"
                                        v-for="(status, value) in statusMap"
                                    >
                                        <span
                                            :class="
                                                `has-text-${getStatusClass(
                                                    value
                                                )}`
                                            "
                                            class="has-text-weight-bold is-uppercase"
                                            >{{ status }}</span
                                        >
                                    </b-dropdown-item>
                                </b-dropdown>
                            </p>

                            <b-field>
                                <b-input
                                    icon="magnify"
                                    icon-clickable
                                    placeholder="Search..."
                                    type="search"
                                    v-model="searchText"
                                ></b-input>
                            </b-field>
                        </b-field>
                    </div>
                </div>
                <br />
                <b-table
                    :current-page.sync="currentPage"
                    :data="filteredOrgList"
                    :default-sort-direction="defaultSortDirection"
                    :paginated="isPaginated"
                    :pagination-position="paginationPosition"
                    :pagination-simple="isPaginationSimple"
                    :per-page="perPage"
                    :sort-icon="sortIcon"
                    :sort-icon-size="sortIconSize"
                >
                    <template slot-scope="props">
                        <b-table-column
                            field="createdAt"
                            label="Raised on"
                            sortable
                        >
                            <div class="has-text-dark is-size-6">
                                {{ props.row.createdAt | formatDate }}
                            </div>
                            <div class="has-text-grey is-size-6">
                                {{ props.row.createdAt | formatTime }}
                            </div>
                        </b-table-column>

                        <b-table-column
                            field="name"
                            label="Organization"
                            sortable
                            >{{ props.row.name }}</b-table-column
                        >

                        <b-table-column
                            field="orgID"
                            label="Organization ID"
                            sortable
                        >
                            <div class="has-text-dark is-size-6">
                                {{ props.row.orgID }}
                            </div>
                        </b-table-column>

                        <b-table-column
                            field="activePassLimit"
                            label="Overall Limit"
                            sortable
                        >
                            <div class="has-text-dark is-size-6">
                                {{ props.row.activePassLimit | formatNumber }}
                            </div>
                        </b-table-column>

                        <b-table-column
                            field="activePassCount"
                            label="Active passes"
                            sortable
                        >
                            {{ props.row.activePassCount | formatNumber }}
                        </b-table-column>

                        <b-table-column field="status" label="Status" sortable>
                            <span
                                :class="
                                    `has-text-${
                                        props.row.status == 'VERIFIED'
                                            ? 'success'
                                            : 'warning'
                                    }`
                                "
                                class="has-text-weight-bold is-uppercase"
                                >{{ props.row.status }}</span
                            >
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
                                    @click="orgEditLimit = props.row.orgID"
                                    aria-role="listitem"
                                >
                                    <div class="is-flex dropdown-menu-item">
                                        <b-icon
                                            icon="border-color"
                                            type="is-primary"
                                        ></b-icon>
                                        <span>Edit overall limit</span>
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

        <b-modal
            :active="!!orgEditLimit"
            :can-cancel="false"
            aria-role="dialog"
            aria-modal
            has-modal-card
            trap-focus
        >
            <form class="modal-card" style="width: 360px">
                <form class="modal-card-body is-rounded">
                    <p class="title is-4">Edit Overall Passes Limit</p>
                    <form @submit.prevent.stop>
                        <b-field>
                            <b-input
                                expanded
                                placeholder
                                size="is-medium"
                                type="number"
                                v-model="newLimit"
                            ></b-input>
                            <p class="control">
                                <span class="button is-static is-medium"
                                    >Passes</span
                                >
                            </p>
                        </b-field>
                        <div class="buttons stretch">
                            <b-button
                                :disabled="loading"
                                @click="orgEditLimit = null"
                                outlined
                                size="is-medium"
                                type="is-primary"
                                >Cancel</b-button
                            >
                            <b-button
                                :disabled="loading"
                                :loading="loading"
                                @click="submitLimit"
                                native-type="submit"
                                size="is-medium"
                                type="is-primary"
                                >Set limit</b-button
                            >
                        </div>
                    </form>
                </form>
            </form>
        </b-modal>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import EPassService from '../service/EPassService';
import { showError } from '../utils/toast';
import EmptyTable from './EmptyTable.vue';

export default {
    name: 'OrganizationTabItem',
    components: { EmptyTable },
    data() {
        let orgList = localStorage.getItem('orgList');
        if (orgList) {
            orgList = JSON.parse(orgList);
        }

        return {
            statusOption: 'all',
            searchText: '',
            orgList: orgList || [],
            loading: false,
            orgEditLimit: null,
            newLimit: null,

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

    watch: {
        orgEditLimit(value) {
            if (value) {
                const org = this.orgList.find(o => o.orgID === value);

                org && (this.newLimit = org.activePassLimit);
            }
        },
        filteredOrgList() {
            this.$emit('orgCount');
        }
    },

    computed: {
        statusMap() {
            const map = {
                all: 'Show All'
            };

            this.orgList.forEach(o => {
                map[o.status] = o.status;
            });

            return map;
        },

        filterByStatus() {
            if (this.statusOption === 'all') {
                return this.orgList;
            }

            return this.orgList.filter(o => o.status.match(this.statusOption));
        },

        filteredOrgList() {
            return this.filterByStatus.filter(o =>
                o.searchTerm.match(this.searchText.trim().toLowerCase())
            );
        }
    },

    filters: {
        formatDate(date) {
            return dayjs(new Date(date)).format("DD MMM' YY");
        },
        formatTime(date) {
            return dayjs(new Date(date)).format('hh:mm A');
        },
        formatNumber(number) {
            return new Intl.NumberFormat('en-IN').format(number);
        }
    },

    methods: {
        async fetchAllOrganizations() {
            this.loading = true;
            try {
                const { data } = await EPassService.getAllOrganizations();
                this.orgList = data.organizations;
            } catch (error) {
                showError(`Unable to fetch organizations`);
            }
            this.loading = false;
        },

        async submitLimit() {
            const orgID = String(this.orgEditLimit);

            this.loading = true;

            try {
                await EPassService.setPassLimit(this.newLimit, orgID);
                this.fetchAllOrganizations();
            } catch (error) {
                showError(`Unable to set new limit`);
            }

            this.newLimit = null;
            this.orgEditLimit = null;
            this.loading = false;
        },
        getStatusClass(status) {
            if (status.match('all')) return 'dark';

            if (status.match('UNVERIFIED')) return 'warning';

            if (status.match('VERIFIED')) return 'success';

            return 'primary';
        }
    },
    created() {
        this.fetchAllOrganizations();
    }
};
</script>

<style lang="scss">
.stretch {
    margin-top: 2rem;
    justify-content: center;
    button {
        flex: 1;
        font-weight: 600;
    }
}
</style>
