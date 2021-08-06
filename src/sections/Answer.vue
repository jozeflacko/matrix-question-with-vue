<template>
    <MatrixRain v-if="doYouWantToKnowTruth"/>
    <section
        :class="[{'matrix': doYouWantToKnowTruth}]"
    >
        <h3>Dear {{name}}, enjoy a wonderful day and visit my web page:</h3>
        <a
            href="https://jozeflacko.github.io/"
            class="green-color"
            :class="[{'green-color': doYouWantToKnowTruth}]"
        >
            jozeflacko.github.io/
        </a>
    </section>
</template>

<script lang="ts">
    import {Options, Vue} from 'vue-class-component';
    import MatrixRain from '../components/MatrixRain.vue';

    @Options({
        props: {
            name: String,
            doYouWantToKnowTruth: Boolean,
        },
        components: {
            MatrixRain
        }
    })
    export default class Answer extends Vue {

    }
</script>

<style scoped>

    section:not(.matrix) {
        background: white;
    }

    a {
        z-index: 10;
        font-size: 1.2em;
        position: relative;
        animation: comeFromBottom 5s forwards ease-in-out;
        top: 0;
    }

    .matrix a {
        background: black;
    }

    .matrix h3 {
        display: none;
        color: var(--green-color);
    }

    h3:not(.matrix) {
        padding: 1em;
        color: transparent;
        animation: easeInGreyColor 5s forwards ease-in-out;
    }

    .matrix a:after {
        background: black;
        position: absolute;
        content: '';
        top: 1.15em;
        left: 0;
        width: 100%;
        height: 20000px;
    }

    section:not(.matrix) {
        animation: whiteBg 5s forwards ease-in-out;
        background: transparent;
    }

    @keyframes whiteBg {
        0% {
            background: transparent;
        }
        100% {
            background: white;
        }
    }

    @keyframes comeFromBottom {
        0% {
            color: transparent;
            top: 500px;
        }
        100% {
            top: 0;
        }
    }

    @keyframes easeInGreyColor {
        0% {
            color: transparent;
        }
        100% {
            color: #CCC;
        }
    }
</style>
