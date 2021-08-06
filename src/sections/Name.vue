<template>
    <section class="name">
        <h3 class="green-color">{{message}}<span v-if="questionMarkBlink">?</span></h3>
        <input :name="name" v-on:keyup="handleNameChange" autofocus/>
        <button
            v-on:click="handleEnterClick"
            :disabled="isEnterDisabled"
        >
            Enter >
        </button>
    </section>
</template>

<script lang="ts">

    import {Options, Vue} from 'vue-class-component';
    import {animations} from '../helpers';

    @Options({
        props: {
            name: String,
            isEnterDisabled: Boolean
        },
        emits: ['handleEnterClick', 'handleNameChange'],
    })
    export default class Name extends Vue {

        message: string = '';
        questionMarkBlink: boolean = false;

        mounted() {
            animations.getMessageStepByStepWithDelay('What is your name?', text => this.message = text);
        }

        handleNameChange(event: any) {
            event.keyCode === 13 ? this.handleEnterClick() : this.$emit('handleNameChange', event.target.value);
        }

        handleEnterClick() {
            this.$emit('handleEnterClick');
        }
    }
</script>

<style scoped>
    .name {

    }

    .name > ul {
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;
    }

    ul > li {
        cursor: pointer;
        list-style-type: none;
        padding: 1em;
        margin: 0 1em;
        color: green;
        border: 1px solid red;
        border-radius: 1em;
    }

    h3 {
        min-height: 1em;
    }

    input {
        background-color: transparent;
        outline: none;
        border: none;
        border-bottom: 1px solid #DDD;
        color: white;
        margin: 0em;
        font-size: 1.2em;
        text-align: center;
        display: block;
    }

    button {
        margin-top: 2em;
        font-size: 1em;
    }


</style>
