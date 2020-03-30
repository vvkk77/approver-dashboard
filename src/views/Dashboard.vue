<template>
    <div>
        <app-header></app-header>
        <div class="app-body">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div class="title is-5">
                            {{ orderList.length }} request
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <b-button @click="openCreateRequest" type="is-primary"
                            >Create Request</b-button
                        >
                    </div>
                </div>
            </div>

            <div class="no-request-image" v-if="orderList.length === 0">
                <img alt src="../assets/no-request.png" />
            </div>
            <orders-table :data="orderList" v-else></orders-table>
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

        return {
            openCR: false,
            orderList: reqOrderList || []
        };
    },
    methods: {
        openCreateRequest() {
            this.openCR = true;
        },

        async fetchOrders() {
            const { data } = await EPassService.getOrders();

            this.orderList = data.orders;
            localStorage.setItem('reqOrderList', JSON.stringify(data.orders));
        },

        onOrderSuccess() {
            this.openCR = false;
            this.fetchOrders();
        }
    },

    mounted() {
        this.fetchOrders();
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
</style>
