<template>
    <div class="empty-table">
        <img alt src="../assets/empty-table.png" width="400" />
        <div class="title is-3">
            There are no pending requests to be processed!
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyTable'
};
</script>

<style lang="scss">
.empty-table {
    margin-top: 2rem;
    text-align: center;
    img {
        margin-bottom: 3rem;
    }

    .title {
        max-width: 40rem;
        margin: 0 auto;
    }
}
</style>
