<template>
    <div>
        <b-table
            :checked-rows.sync="checkedRows"
            :current-page.sync="currentPage"
            :data="orderList"
            :default-sort-direction="defaultSortDirection"
            :is-row-checkable="row => row.orderStatus === 'created'"
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
                <b-table-column field="createdAt" label="Raised on" sortable>
                    <div class="has-text-dark is-size-6">
                        {{ props.row.createdAt | formatDate }}
                    </div>
                    <div class="has-text-grey is-size-6">
                        {{ props.row.createdAt | formatTime }}
                    </div>
                </b-table-column>

                <b-table-column field="orgName" label="Organization" sortable>{{
                    props.row.orgName
                }}</b-table-column>

                <b-table-column
                    field="requester"
                    label="Contact Email"
                    sortable
                >
                    <div class="has-text-dark is-size-6">
                        {{ props.row.requester }}
                    </div>
                </b-table-column>

                <b-table-column field="orderType" label="Pass Type" sortable>
                    <lozenge
                        :type="
                            props.row.orderType == 'person'
                                ? 'primary'
                                : 'warning'
                        "
                        >{{ props.row.orderType | formatRequestLabel }}</lozenge
                    >
                </b-table-column>

                <b-table-column
                    field="requestCount"
                    label="No. of Passes"
                    numeric
                    sortable
                    >{{ props.row.requestCount }}</b-table-column
                >

                <b-table-column field="status" label="Status" sortable>
                    <span
                        :class="
                            `has-text-${getStatusClass(props.row.orderStatus)}`
                        "
                        class="has-text-weight-bold is-uppercase"
                        >{{ props.row.orderStatus | formatStatusLabel }}</span
                    >
                </b-table-column>
                <b-table-column label=" ">
                    <b-dropdown
                        :disabled="props.row.orderStatus === 'declined'"
                        aria-role="list"
                        position="is-bottom-left"
                    >
                        <button class="button is-small is-white" slot="trigger">
                            <b-icon icon="dots-vertical"></b-icon>
                        </button>

                        <template v-if="props.row.orderStatus === 'created'">
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
                                @click="declineRequest(props.row.id)"
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

                        <template v-if="props.row.orderStatus === 'processed'">
                            <b-dropdown-item
                                @click="downloadQRCodes(props.row.id)"
                                aria-role="listitem"
                            >
                                <div class="is-flex dropdown-menu-item">
                                    <b-icon
                                        icon="download"
                                        type="is-primary"
                                    ></b-icon>
                                    <span>Download Details</span>
                                </div>
                            </b-dropdown-item>
                        </template>
                    </b-dropdown>
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

        <table-action-sheet
            @approve="approveAll"
            @decline="declineAll"
            v-if="checkedRows.length > 0"
        ></table-action-sheet>

        <b-modal :active.sync="isModalActive" has-modal-card>
            <div class="modal-card">
                <div class="modal-card-body">
                    <p class="title is-4">Enter Reason</p>
                    <p class="subtitle">Jeff Atwood</p>
                </div>
            </div>
        </b-modal>

        <b-modal :active="showProgess" has-modal-card>
            <div class="modal-card">
                <div class="modal-card-body is-rounded">
                    <p class="title is-4">Submitting Requests</p>
                    <b-progress :value="reqProgess" show-value type="is-success"
                        >{{ reqIndex }} out of
                        {{ checkedRows.length }}</b-progress
                    >
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import EPassService from '../service/EPassService';
import Lozenge from './Lozenge.vue';
import TableActionSheet from './TableActionSheet.vue';
import dayjs from 'dayjs';

export default {
    name: 'PassRequestTable',

    components: { TableActionSheet, Lozenge },

    data() {
        let orderList = localStorage.getItem('orderList');

        if (orderList) {
            orderList = JSON.parse(orderList);
        }

        return {
            orderList: orderList || [],
            checkedRows: [],
            isModalActive: false,

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
    filters: {
        formatDate(date) {
            return dayjs(new Date(date)).format('DD MMM YY');
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
            if (status.toLowerCase() === 'created') return 'PENDING';
            if (status.toLowerCase() === 'declined') return 'REJECTED';

            return status;
        }
    },
    methods: {
        async fetchAllOrders() {
            const { data } = await EPassService.getAllOrders();
            this.orderList = data.orders;
            localStorage.setItem('orderList', JSON.stringify(data.orders));
        },

        async approveRequest(orderId) {
            await EPassService.approveOrder(orderId, 'ACCEPT');
            await this.fetchAllOrders();
        },

        async declineRequest(orderId) {
            await EPassService.approveOrder(orderId, 'DECLINE');
            await this.fetchAllOrders();
        },

        async approveAll() {
            this.showProgess = true;
            const orderIdList = this.checkedRows.map(i => i.id);

            for (let index = 0; index < orderIdList.length; index++) {
                this.reqIndex = index + 1;
                const orderId = orderIdList[index];
                await EPassService.approveOrder(orderId, 'ACCEPT');
            }

            await this.fetchAllOrders();

            this.checkedRows = [];
            this.showProgess = false;
        },
        async declineAll() {
            this.showProgess = true;

            const orderIdList = this.checkedRows.map(i => i.id);

            for (let index = 0; index < orderIdList.length; index++) {
                this.reqIndex = index + 1;
                const orderId = orderIdList[index];
                await EPassService.approveOrder(orderId, 'DECLINE');
            }

            await this.fetchAllOrders();

            this.checkedRows = [];
            this.showProgess = false;
        },

        async downloadQRCodes(orderId) {
            const { data } = await EPassService.downloadQRCodes(orderId);
            const url = data.processedS3URL;

            const ele = document.createElement('a');
            ele.setAttribute('download', 'download');
            ele.href = url;

            ele.click();
        },

        getStatusClass(status) {
            switch (status) {
                case 'created':
                    return 'warning';

                case 'declined':
                    return 'danger';

                case 'approved':
                    return 'success';
            }

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
}
</style>
