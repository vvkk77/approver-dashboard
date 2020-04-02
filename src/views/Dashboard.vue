<template>
    <div>
        <app-header></app-header>
        <div class="app-body">
            <div class="container">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item org-details">
                            <div
                                class="has-text-black is-size-5 has-text-weight-semibold"
                            >
                                {{ orderList.length | formatNumber }} Requests
                            </div>
                            <div class="seperator"></div>
                            <div
                                class="is-block has-text-black has-text-weight-semibold"
                            >
                                <div class="is-size-6">
                                    {{ org.activePassLimit | formatNumber }}
                                    passes
                                </div>

                                <div class="is-size-7 has-text-weight-normal">
                                    Overall limit
                                </div>
                            </div>
                            <template v-if="org.activePassCount">
                                <div class="seperator"></div>
                                <div class="is-block has-text-black">
                                    <div class="is-size-6 has-text-success">
                                        {{
                                            (org.activePassLimit -
                                                org.activePassCount)
                                                | formatNumber
                                        }}
                                        passes
                                    </div>

                                    <div
                                        class="is-size-7 has-text-weight-normal"
                                    >
                                        Available
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <b-button
                                @click="openCreateRequest"
                                type="is-primary"
                                >Create Request</b-button
                            >
                        </div>
                    </div>
                </div>

                <div class="no-request-image" v-if="orderList.length === 0">
                    <img alt src="../assets/no-request.png" />
                </div>
                <orders-table :data.sync="orderList" v-else></orders-table>
            </div>
        </div>
        <create-request
            @close="openCR = false"
            @success="onOrderSuccess"
            v-if="openCR"
        ></create-request>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import CreateRequest from '../components/CreateRequest.vue';
import EPassService from '../service/EPassService';
import OrdersTable from '../components/OrdersTable.vue';
import { showError } from '../utils/toast';

export default {
    name: 'Dashboard',
    components: {
        AppHeader,
        CreateRequest,
        OrdersTable
    },
    data() {
        let reqOrderList = localStorage.getItem('reqOrderList');

        if (reqOrderList) {
            reqOrderList = JSON.parse(reqOrderList);
        }

        let org = localStorage.getItem('org');

        if (org) {
            org = JSON.parse(org);
        }

        return {
            openCR: false,
            orderList: reqOrderList || [],
            org: org || {}
        };
    },
    filters: {
        formatNumber(number) {
            return new Intl.NumberFormat('en-IN').format(number);
        }
    },
    methods: {
        openCreateRequest() {
            this.openCR = true;
        },

        async fetchOrders() {
            try {
                const { data } = await EPassService.getOrders();

                this.orderList = data.orders;
                localStorage.setItem(
                    'reqOrderList',
                    JSON.stringify(data.orders)
                );
            } catch (error) {
                showError('Unable to fetch requests');
            }
        },

        async fetchOrg() {
            try {
                const { data } = await EPassService.getOrganization();

                this.org = data;
                localStorage.setItem('org', JSON.stringify(data));
            } catch (error) {
                showError('Unable to fetch organization');
            }
        },

        onOrderSuccess() {
            this.openCR = false;
            this.fetchOrders();
        }
    },

    mounted() {
        this.fetchOrders();
        this.fetchOrg();
    }
};
</script>

<style lang="scss">
.app-body {
    padding: 40px 80px 0;
    border-top: 1px solid #ededed;
    button {
        height: 40px;
        font-weight: 600;
    }
}

.no-request-image {
    text-align: center;
    padding: 80px 0;
    img {
        width: 50%;
        max-width: 480px;
    }
}

.org-details {
    .seperator {
        height: 3rem;
        width: 0;
        border: 2px solid #ededed;
        margin: 0 1rem;
    }
}

.toast {
    font-weight: 600;
}
</style>
