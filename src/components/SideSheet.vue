<template>
    <div class="side-sheet">
        <transition appear name="fade">
            <div class="overlay" v-if="sheet"></div>
        </transition>

        <transition @after-leave="$emit('close')" appear name="slideInRight">
            <div class="sheet" v-if="sheet">
                <span @click="close" class="icon close-btn">
                    <i class="mdi mdi-close mdi-24px"></i>
                </span>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'SideSheet',
    data() {
        return {
            sheet: true
        };
    },

    methods: {
        close() {
            this.sheet = false;
        }
    },

    mounted() {
        document.body.classList.add('sheet-open');
    },

    destroyed() {
        document.body.classList.remove('sheet-open');
    }
};
</script>

<style lang="scss">
.sheet-open {
    position: fixed;
    width: 100%;
    overflow: hidden;
}

.side-sheet {
    top: 0;
    position: fixed;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 100;

    .overlay {
        top: 0;
        position: fixed;
        left: 0;
        right: 0;
        height: 100vh;
        z-index: 101;
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
        padding: 30px 30px 100px;
    }

    .close-btn {
        cursor: pointer;
        border-radius: 2px;

        &:hover {
            background-color: #f5f5f5;
        }
    }
}
</style>
