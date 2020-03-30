<template>
    <div>
        <b-table
            :current-page.sync="currentPage"
            :data="data"
            :paginated="isPaginated"
            :pagination-position="paginationPosition"
            :pagination-simple="false"
            :per-page="perPage"
        >
            <template slot-scope="props">
                <b-table-column field="createAt" label="Raised on" sortable>
                    <div class="has-text-dark is-size-6">
                        {{ props.row.createdAt | formatDate }}
                    </div>
                    <div class="has-text-grey is-size-6">
                        {{ props.row.createdAt | formatTime }}
                    </div>
                </b-table-column>

                <b-table-column field="type" label="Request Type" sortable>
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
                    field="passCount"
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
                    <b-button
                        @click="downloadQRCodes(props.row.id)"
                        class="has-text-primary has-text-weight-semibold"
                        icon-left="download"
                        size="is-small"
                        tag="a"
                        type="is-white"
                        v-if="props.row.zipFileURL"
                        >DOWNLOAD QR</b-button
                    >
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
</template>

<script>
import Lozenge from './Lozenge.vue';
import dayjs from 'dayjs';
import EPassService from '../service/EPassService';
import { showSuccess, showError } from '../utils/toast';

export default {
    name: 'OrdersTable',
    props: {
        data: Array
    },

    components: {
        Lozenge
    },
    data() {
        return {
            isPaginated: true,
            paginationPosition: 'bottom',
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
        async downloadQRCodes(orderId) {
            try {
                const { data } = await EPassService.downloadQRCodes(orderId);
                const url = data.processedS3URL;

                const ele = document.createElement('a');
                ele.setAttribute('download', 'download');
                ele.href = url;

                ele.click();

                showSuccess(`QR codes downloaded successfully`);
            } catch (error) {
                showError(`Unable to download QR codes`);
            }
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
    }
};
</script>

<style lang="scss"></style>
