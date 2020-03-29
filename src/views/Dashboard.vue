<template>
    <div>
        <app-header></app-header>

        <div class="app-body">
            <b-tabs class="block" size="is-medium">
                <b-tab-item label="Organizations">
                    <organization-tab-item></organization-tab-item>
                </b-tab-item>
                <b-tab-item disabled label="Individuals">
                    <individual-tab-item></individual-tab-item>
                </b-tab-item>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import OrganizationTabItem from '../components/OrganizationTabItem.vue';
import IndividualTabItem from '../components/IndividualTabItem.vue';

export default {
    components: {
        AppHeader,
        OrganizationTabItem,
        IndividualTabItem
    }
};
</script>

<style lang="scss">
.app-body {
    padding: 20px 40px 100px;
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
</style>
