import clearScreen from './clearScreen';

const canvas = document.getElementById('gridlockCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const width = canvas.width;
const height = canvas.height;

const gridSquareWidth = width / 8;
const gridSquareHeight = height / 8;

async function init(): Promise<void> {

}

function drawBorder(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fillStyle = '#606060';
    ctx.fillRect(0, 0, width, height);
}

function drawGrid(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fillStyle = '#303030';
    ctx.fillRect(width / 14, height / 14, 6 * width / 7, 6 * height / 7);

    ctx.fillStyle = '#606060';
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 6; ++j) {
            const x = (width / 14) + (3 * width / 56) + (i * width / 7);
            const y = (height / 14) + (3 * height / 56) + (j * height / 7);
            ctx.fillRect(x, y, width / 28, height / 28);
        }
    }
}

function step(): void {
    clearScreen(ctx);

    drawBorder(ctx);
    drawGrid(ctx);

    window.requestAnimationFrame(step);
}

init().then(() => {
    window.requestAnimationFrame(step);
}).catch((e) => {
    console.error('initialization error');
    console.error(e);
});
