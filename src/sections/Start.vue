<template>
    <section class="start">
        <button v-on:click="handleClick" class="pulse">Start</button>
        <h5><span class="green-color">Matrix Demo</span> by Jozef Lacko</h5>
    </section>
</template>

<script lang="ts">
    import {Options, Vue} from 'vue-class-component';

    @Options({
        emits: ['handleStart']
    })
    export default class Start extends Vue {
        mounted() {
            window.addEventListener('keyup', this.handleKeyPress);
        }

        unmounted() {
            window.removeEventListener('keyup', this.handleKeyPress);
        }

        handleClick() {
            this.$emit('handleStart');
        }

        handleKeyPress(event: any) {
            event.keyCode === 13 && this.$emit('handleStart');
        }
    }
</script>

<style scoped>
    button {
        margin-top: 2em;
        font-size: 2em;
        border-radius: 50%;
        width: 3em;
        height: 3em;
        text-align: center;
        outline: none;
        padding: 0;
    }
</style>
