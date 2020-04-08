<template>
    <div>
        <transition mode="out-in" name="fade">
            <div v-if="orderList.length">
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <div class="is-flex">
                                <span class="m-r-8">Total pass requests:</span>
                                <span class="has-text-weight-bold">{{
                                    filteredOrderList.length
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
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
                                                    >{{
                                                        statusMap[statusOption]
                                                    }}</span
                                                >
                                                <b-icon
                                                    :icon="
                                                        active
                                                            ? 'menu-up'
                                                            : 'menu-down'
                                                    "
                                                ></b-icon>
                                            </button>

                                            <b-dropdown-item
                                                :key="value"
                                                :value="value"
                                                aria-role="listitem"
                                                v-for="(status,
                                                value) in statusMap"
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
                    </div>
                </nav>

                <b-table
                    :current-page.sync="currentPage"
                    :data="filteredOrderList"
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
                            field="orgName"
                            label="Organization"
                            sortable
                            >{{ props.row.orgName }}</b-table-column
                        >

                        <b-table-column
                            field="requester"
                            label="Contact Email"
                            sortable
                        >
                            <div class="has-text-dark is-size-6">
                                {{ props.row.requester }}
                            </div>
                        </b-table-column>

                        <b-table-column
                            field="orderType"
                            label="Pass Type"
                            sortable
                        >
                            <lozenge
                                :type="
                                    props.row.orderType == 'person'
                                        ? 'primary'
                                        : 'warning'
                                "
                                >{{
                                    props.row.orderType | formatRequestLabel
                                }}</lozenge
                            >
                        </b-table-column>

                        <b-table-column
                            field="requestCount"
                            label="No. of Passes"
                            numeric
                            sortable
                            >{{ props.row.requestCount }}</b-table-column
                        >

                        <b-table-column
                            field="status"
                            label="Status"
                            sortable
                            width="120"
                        >
                            <span
                                :class="
                                    `has-text-${getStatusClass(
                                        props.row.orderStatus
                                    )}`
                                "
                                class="has-text-weight-bold is-uppercase"
                                >{{
                                    props.row.orderStatus | formatStatusLabel
                                }}</span
                            >
                        </b-table-column>
                        <b-table-column label=" " width="30">
                            <b-dropdown
                                :disabled="
                                    !!props.row.orderStatus.match(
                                        'declined|approved'
                                    )
                                "
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
                                    @click="downloadOrderFile(props.row.id)"
                                    aria-role="listitem"
                                >
                                    <div class="is-flex dropdown-menu-item">
                                        <b-icon
                                            icon="file"
                                            type="is-primary"
                                        ></b-icon>
                                        <span>Download Request File</span>
                                    </div>
                                </b-dropdown-item>

                                <template
                                    v-if="props.row.orderStatus === 'created'"
                                >
                                    <b-dropdown-item
                                        @click="approveRequest(props.row.id)"
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
                                    <b-dropdown-item
                                        @click="handleDecline(props.row.id)"
                                        aria-role="listitem"
                                    >
                                        <div class="is-flex dropdown-menu-item">
                                            <b-icon
                                                icon="close-circle-outline"
                                                type="is-danger"
                                            ></b-icon>
                                            <span>Decline</span>
                                        </div>
                                    </b-dropdown-item>
                                </template>

                                <template
                                    v-if="props.row.orderStatus === 'processed'"
                                >
                                    <b-dropdown-item
                                        @click="downloadQRCodes(props.row.id)"
                                        aria-role="listitem"
                                    >
                                        <div class="is-flex dropdown-menu-item">
                                            <b-icon
                                                icon="download"
                                                type="is-primary"
                                            ></b-icon>
                                            <span>Download e-Passes</span>
                                        </div>
                                    </b-dropdown-item>
                                </template>
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

        <b-modal :active.sync="showDeclineModal" has-modal-card>
            <div class="modal-card decline-modal" style="width:480px">
                <div class="modal-card-body is-rounded">
                    <p class="title is-5">Enter Reason</p>
                    <p class="subtitle is-7">
                        Let the applicant know why their request is being
                        rejected
                    </p>

                    <b-field>
                        <b-input
                            maxlength="400"
                            type="textarea"
                            v-model="declineReason"
                        ></b-input>
                    </b-field>

                    <div class="is-flex jc-flex-end">
                        <div class="buttons">
                            <b-button
                                @click="showDeclineModal = false"
                                outlined
                                type="is-primary"
                                >Cancel</b-button
                            >

                            <b-button
                                :disabled="!declineReason"
                                @click="submitReason"
                                type="is-primary"
                                >Submit</b-button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import Lozenge from './Lozenge.vue';
import dayjs from 'dayjs';
import { showSuccess, showError } from '../utils/toast';
import EmptyTable from './EmptyTable.vue';

export default {
    name: 'PassRequestTable',

    components: { Lozenge, EmptyTable },

    data() {
        let orderList = localStorage.getItem('orderList');

        if (orderList) {
            orderList = JSON.parse(orderList);
        }

        return {
            statusOption: 'all',
            searchText: '',
            orderList: orderList || [],
            showDeclineModal: false,

            declineReason: '',
            declineOrderId: null,
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
        statusMap() {
            const map = {
                all: 'Show All'
            };

            this.orderList.forEach(o => {
                map[o.orderStatus] = this.$options.filters.formatStatusLabel(
                    o.orderStatus
                );
            });

            return map;
        },

        filterByStatus() {
            if (this.statusOption === 'all') {
                return this.orderList;
            }

            return this.orderList.filter(o =>
                o.orderStatus.match(this.statusOption)
            );
        },

        filteredOrderList() {
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
        formatRequestLabel(request) {
            return request.toLowerCase() === 'person'
                ? 'Individual'
                : 'Vehicle';
        },

        formatStatusLabel(status) {
            status = status.replace('_', ' ');

            if (status.toLowerCase() === 'created') return 'PENDING';
            if (status.toLowerCase() === 'declined') return 'REJECTED';

            return status;
        }
    },
    methods: {
        async fetchAllOrders() {
            try {
                const { data } = await EPassService.getAllOrders();
                this.orderList = data.orders;
            } catch (error) {
                showError(`Unable to fetch requests`);
            }
        },

        async approveRequest(orderId) {
            try {
                await EPassService.approveOrder(orderId, 'ACCEPT');
                await this.fetchAllOrders();
                showSuccess(`Request Approved!`);
            } catch (error) {
                showError(`Unable to approve request`);
            }
        },

        async declineRequest(orderId) {
            try {
                await EPassService.approveOrder(orderId, 'DECLINE');
                await this.fetchAllOrders();
                this.declineOrderId = null;
                showSuccess(`Request Rejected!`);
            } catch (error) {
                showError(`Unable to reject request`);
            }
        },

        async downloadQRCodes(orderId) {
            try {
                const { data } = await EPassService.downloadQRCodes(orderId);
                const url = data.processedS3URL;

                const ele = document.createElement('a');
                ele.setAttribute('download', 'download');
                ele.href = url;

                ele.click();

                showSuccess(`e-Passes downloaded successfully`);
            } catch (error) {
                showError(`Unable to download e-Passes`);
            }
        },

        async downloadOrderFile(orderId) {
            try {
                const { data } = await EPassService.downloadOrderFile(orderId);
                const url = data.processedS3URL;

                const ele = document.createElement('a');
                ele.setAttribute('download', 'download');
                ele.href = url;

                ele.click();

                showSuccess(`Request file downloaded successfully`);
            } catch (error) {
                showError(`Unable to download request file`);
            }
        },

        submitReason() {
            this.showDeclineModal = false;
            this.declineRequest(this.declineOrderId);
        },

        handleDecline(orderId) {
            this.declineOrderId = orderId;
            this.showDeclineModal = true;
            this.declineReason = '';
        },

        getStatusClass(status) {
            if (status.match('all')) return 'dark';

            if (status.match('created|processing')) return 'warning';

            if (status.match('declined|failed|invalid_file')) return 'danger';

            if (status.match('approved')) return 'success';

            return 'primary';
        }
    },

    created() {
        this.fetchAllOrders();
    }
};
</script>

<style lang="scss">
.is-rounded {
    border-radius: 4px;
    overflow: hidden;
}

.decline-modal {
    button {
        min-width: 120px;
    }
}
.jc-flex-end {
    justify-content: flex-end;
}

.filter-options {
    .dropdown-item.is-active,
    .dropdown .dropdown-menu .has-link .is-active,
    .dropdown-item.is-active {
        background-color: #f7f7f7;
    }
}
</style>
