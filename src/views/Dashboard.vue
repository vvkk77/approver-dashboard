<template>
    <div>
        <app-header></app-header>
        <div class="app-body">
            <div class="container">
                <b-tabs @change="onTabChange" class="block" size="is-medium">
                    <b-tab-item label="Pass requests">
                        <pass-request-table></pass-request-table>
                    </b-tab-item>
                    <b-tab-item label="Signup requests">
                        <sign-up-request-table></sign-up-request-table>
                    </b-tab-item>
                    <b-tab-item label="Organizations">
                        <organization-tab-item></organization-tab-item>
                    </b-tab-item>
                </b-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import OrganizationTabItem from '../components/OrganizationTabItem.vue';
import SignUpRequestTable from '../components/SignUpRequestTable.vue';
import PassRequestTable from '../components/PassRequestTable.vue';
import EPassService from '../service/EPassService';

export default {
    components: {
        AppHeader,
        OrganizationTabItem,
        SignUpRequestTable,
        PassRequestTable
    },
    methods: {
        onTabChange(index) {
            switch (index) {
                case 0:
                    EPassService.getAllOrders();
                    break;

                case 1:
                    EPassService.getSignUpRequests();
                    break;

                case 2:
                    EPassService.getAllOrganizations();
                    break;
            }
        }
    },
    mounted() {
        EPassService.getApproverUserProfile();
    }
};
</script>

<style lang="scss">
.app-body {
    padding: 20px 0 100px;
    border-top: 1px solid #ededed;

    .tabs a {
        border-width: 2px;
    }

    .table td {
        vertical-align: middle;
    }

    .table tr.is-checked {
        background-color: #f7f7f7;
    }
}

.toast {
    font-weight: 600;
}

.jc-space-between {
    justify-content: space-between;
}

.ai-center {
    align-items: center;
}

.jc-space-around {
    justify-content: space-around;
}
</style>
