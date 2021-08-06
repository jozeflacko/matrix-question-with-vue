<template>
    <div class="app">
        <Start
            v-if="pageToShow === 'start'"
            v-on:handleStart="setPage('name')"
        />
        <Name
            v-if="pageToShow === 'name'"
            :name="yourName"
            :isEnterDisabled="!isYourNameValid"
            v-on:handleNameChange="setName"
            v-on:handleEnterClick="setPage('question')"
        />
        <Question
            v-if="pageToShow === 'question'"
            :name="yourName"
            :doYouWantToKnowTruth="doYouWantToKnowTruth"
            v-on:handleButtonClick="goToAnswer"
        />
        <Answer
            v-if="pageToShow === 'answer'"
            :name="yourName"
            :doYouWantToKnowTruth="doYouWantToKnowTruth"
        />
    </div>
</template>

<script lang="ts">
    import {Options, Vue} from 'vue-class-component';
    import Start from './sections/Start.vue';
    import Name from './sections/Name.vue';
    import Question from './sections/Question.vue';
    import Answer from './sections/Answer.vue';

    type Page = 'start' | 'name' | 'question' | 'answer';

    @Options({
        components: {Start, Name, Question, Answer}
    })
    export default class App extends Vue {

        // I am using simple navigation instead of router. It would be an overkill for this app.
        // + I do not want any browser navigation features because flow should be only one way!
        pageToShow: Page = 'start';

        yourName: string = '';
        isYourNameValid: boolean = false;
        doYouWantToKnowTruth: boolean | null = null;

        setName(name: string) {
            this.yourName = name;
            this.isYourNameValid = name.length > 2;
        }

        setPage(page: Page) {
            this.pageToShow = page;
        }

        async goToAnswer(doYou: boolean) {
            this.setDoYouWantToKnowTruth(doYou);
            await new Promise<void>(res => setTimeout(res, 1000));
            this.setPage('answer');
        }

        setDoYouWantToKnowTruth(value: boolean) {
            this.doYouWantToKnowTruth = value;
        }
    }
</script>

<style>

    :root {
        background: black;
        color: white;
        font-size: 20px;
        --green-color: #3ab440;
    }

    @media (max-width: 768px) {
        :root {
            font-size: 15px;
        }
    }

    * {
        box-sizing: border-box;
        font-family: monospace !important; /* important because any other font-family is not allowed! */
    }

    .app {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    button {
        cursor: pointer;
    }

    button:disabled,
    button[disabled] {
        cursor: default;
    }

    .green-color {
        color: var(--green-color);
    }

    .white-color {
        color: #fff;
    }

    .pulse {
        animation: pulse 2s infinite;
        box-shadow: 0 0 0 rgb(255 255 255);
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 transparent;
        }
        70% {
            box-shadow: 0 0 0 15px #ffffff2e;
        }
        100% {
            box-shadow: 0 0 0 0 transparent;
        }
    }

    section {
        text-align: center;
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
</style>
