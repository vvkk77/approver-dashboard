<template>
    <div class="side-sheet">
        <div class="overlay"></div>
        <div class="sheet">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideSheet',
    mounted() {
        document.body.style.overflow = 'hidden';
    }
};
</script>

<style lang="scss">
.side-sheet {
    .overlay {
        top: 0;
        position: fixed;
        left: 0;
        right: 0;
        height: 100vh;
        z-index: 100;
        background-color: rgba($color: #000000, $alpha: 0.5);
    }

    .sheet {
        position: fixed;
        right: 0;
        top: 0;
        width: 400px;
        height: 100vh;
        z-index: 200;
        background-color: white;
    }
}
</style>
