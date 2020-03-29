<template>
    <div class="bottom-sheet">
        <div class>
            <p class="is-size-6 has-text-weight-bold">Select a Bulk Action</p>
            <p class="is-size-7">
                Action will apply to all the selected items in the list
            </p>
        </div>
        <div class>
            <div class="buttons">
                <b-button
                    icon-left="close-circle-outline"
                    outlined
                    type="is-danger"
                    >Reject Requests</b-button
                >
                <b-button icon-left="check-circle-outline" type="is-primary"
                    >Approve Requests</b-button
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableActionSheet'
};
</script>

<style>
.bottom-sheet {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    padding: 30px 80px;
    display: flex;
    justify-content: space-between;
}
</style>
