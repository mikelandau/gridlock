import loadAudio from '@audio/loadAudio';

import draw from '@draw/draw';

import Coordinates from '@interfaces/coordinates';
import GameState from '@interfaces/gameState';
import InputState from '@interfaces/inputState';
import AudioBuffers from '@interfaces/audioBuffers';

import resetGame from '@update/resetGame';
import update from '@update/update';

import getEmptyInputState from '@util/getEmptyInputState';
import getEmptyGameState from '@util/getEmptyGameState';
import playSounds from '@audio/playSounds';

const canvas = document.getElementById('gridlockCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const audioContext = new AudioContext();
const audioBuffers: AudioBuffers = {
    drop: undefined,
    pickup: undefined
};


let clientMouseX = 0;
let clientMouseY = 0;

const game: GameState = getEmptyGameState();
const input: InputState = getEmptyInputState();




async function init(): Promise<void> {
    await loadAudio(audioContext, audioBuffers);
    await resetGame(game);
}

function getCanvasMousePosition(): Coordinates {
    const bounding = canvas.getBoundingClientRect();
    const x = Math.floor(clientMouseX - bounding.x);
    const y = Math.floor(clientMouseY - bounding.y);

    return { x, y };
}

function step(): void {
    input.canvasMouse = getCanvasMousePosition();

    update(ctx, game, input);

    if (game.levelComplete) {
        resetGame(game).then(() => {
            window.requestAnimationFrame(step);
        });
        return;
    }

    draw(ctx, game);
    playSounds(audioContext, game, audioBuffers);

    window.requestAnimationFrame(step);
}

function updateMouse(e: MouseEvent) {
    input.mouseButtonPressed = (e.buttons & 1) === 1;
    clientMouseX = e.clientX;
    clientMouseY = e.clientY;
}

document.addEventListener("mousedown", updateMouse);
document.addEventListener("mousemove", updateMouse);
document.addEventListener("mouseup", updateMouse);

function handleTouchStart(e: TouchEvent) {
    input.mouseButtonPressed = true;
    clientMouseX = e.changedTouches[0].clientX;
    clientMouseY = e.changedTouches[0].clientY;
}

function handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    clientMouseX = e.changedTouches[0].clientX;
    clientMouseY = e.changedTouches[0].clientY;
}

function handleTouchStop(e: TouchEvent) {
    input.mouseButtonPressed = false;
}

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchStop);
canvas.addEventListener('touchcancel', handleTouchStop);

function handleCanvasClick(e: MouseEvent) {
    e.preventDefault();
    if (game.gamePhase === 'title') {
        game.gamePhase = 'settingUpLevel';
    }
}

canvas.addEventListener('click', handleCanvasClick);

init().then(() => {
    window.requestAnimationFrame(step);
}).catch((e) => {
    console.error('initialization error');
    console.error(e);
});