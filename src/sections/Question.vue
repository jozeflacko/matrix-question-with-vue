<template>
    <div class="withBackground" :class="[{'active': showBg}]"></div>
    <section class="question">
        <h2 class="green-color">{{question}}</h2>
        <ul v-if="showPills">
            <li
                v-for="pill in pills"
                :key="pill.color"
                v-on:click="handleClick(pill.value)"
                class="pill"
                v-bind:class="[
                                { selected: pill.value === doYouWantToKnowTruth },
                                { red: pill.color === 'red'}
                ]"
                :title="pill.description"
            >
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
    import {Options, Vue} from 'vue-class-component';
    import {animations} from '../helpers';

    interface Props {
        name: string,
        doYouWantToKnowTruth: boolean,
    }

    @Options({
        props: {
            name: String,
            doYouWantToKnowTruth: Boolean,
        },
        emits: ['handleButtonClick']
    })
    export default class Question extends Vue {

        question = '';
        showBg = false;
        showPills = false;

        pills = [
            {value: true, color: 'red', description: 'I want to know the truth'},
            {value: false, color: 'blue', description: 'No, I wish to live in Matrix'}
        ];

        async mounted() {
            const messages = [
                `Welcome ${(this as any).name}.`,
                'The biggest Matrix question was about choosing to know the Truth.',
                'You will be offered the choice between a red pill and a blue pill.',
                'The red pill represents an uncertain future.\nThe blue pill represents a beautiful prison which would lead you back to ignorance.',
                'How will you decide?'
            ];

            animations.getMultipleMessageStepByStepWithDelay(messages, q => {
                this.question = q;
                this.question === messages[messages.length - 2] && (this.showBg = true);
                this.question === messages[messages.length - 1] && (this.showPills = true);
            });
        }

        handleClick(value: boolean) {
            this.$emit('handleButtonClick', value);
        }
    }
</script>

<style scoped>
    .withBackground {
        background-image: url(../../public/morpheus.png);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        transition: opacity 20s;
        opacity:0;
    }

    .withBackground.active {
        opacity: .4;
    }

    .question > ul {
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;
        position: absolute;
        top: 60%;
    }

    h2 {
        padding: 5%;
        display: block;
        text-align: center;
        min-height: 5em;
        width: 100%;
        max-width: 800px;
    }

    @media (max-width: 600px) {
        h2 {
            max-width: 400px;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    li.pill {
        cursor: pointer;
        list-style-type: none;
        padding: 1em;
        margin: 0 6em;
        color: green;
        width: 4em;
        height: 1.5em;
        border-radius: 5em;
        border: none;
        background: white;
        position: relative;
        overflow: hidden;
        transform: rotate(5deg);
        transition: all 1s;
        box-shadow:0px 0px 30px white;
        animation: fadeIn 1s;
    }


    li.pill:hover {
        transform: scale(1.2);
    }

    li.pill.selected:hover,
    li.pill.selected {
        transform: scale(1.5);
    }

    li.pill:before {
        content: "";
        background: blue;
        width: 50%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    li.pill.red:before {
        background: red;
    }
</style>
