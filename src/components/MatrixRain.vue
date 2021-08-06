<template>
    <canvas id="c"></canvas>
</template>
<script lang="ts">
    import {Options, Vue} from "vue-class-component";

    @Options({
        props: {
            name: String,
            doYouWantToKnowTruth: Boolean,
        },
    })
    export default class Answer extends Vue {

        timeout = 25;

        mounted() {
            const canvas = document.getElementById("c") as HTMLCanvasElement;
            canvas.height = window.innerHeight, canvas.width = window.innerWidth;
            const size = 15;
            const chars: number[] = [];
            for (let i = 0; i < canvas.width / size; i++) {
                chars[i] = 1;
            }
            setInterval(() => this.startDraw(
                canvas,
                "We love JavaScript and TypeScript",
                size,
                chars
            ), this.timeout);
        }

        startDraw(c: HTMLCanvasElement, text: string, size: number, chars: number[]) {
            const ctx = c && c.getContext("2d") as CanvasRenderingContext2D;
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fillStyle = "#3ab440";
            ctx.font = size + "px";

            for (let i = 0; i < chars.length; i++) {
                const __text = text.split('')[Math.floor(Math.random() * text.length)];
                ctx.fillText(__text, i * size, chars[i] * size);
                chars[i] = Math.random() > 0.9 ? 0 : (chars[i] + 1);
            }
        }
    }

</script>
<style scoped>
    canvas {
        display: block;
    }
</style>
