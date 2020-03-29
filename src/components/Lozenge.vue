<template>
    <div :class="[`has-background-${type}`]" class="is-inline-block lozenge-bg">
        <div class="whiter-bg is-inline-block">
            <div
                :class="[`has-text-${type}`]"
                class="is-inline-block lozenge-text is-size-7 has-text-centered is-uppercase has-text-weight-semibold"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Lozenge',
    props: {
        type: {
            type: String,
            required: true,
            default: 'primary' // bulma-color-class
        }
    }
};
</script>

<style lang="scss">
.lozenge-bg {
    border-radius: 2px;
    .whiter-bg {
        padding: 0 1rem;
        background-color: rgba(white, 0.9);
    }
    .lozenge-text {
        opacity: 1;
        letter-spacing: 0.5px;
        line-height: 1.5rem;
    }
}
</style>
