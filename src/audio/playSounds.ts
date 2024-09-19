import AudioBuffers from '@interfaces/audioBuffers';
import GameState from '@interfaces/gameState';

import playSound from './playSound';

function playSounds(audioContext: AudioContext, game: GameState, audioBuffers: AudioBuffers) {
    if (game.playDropSound && audioBuffers.drop) {
        playSound(audioContext, audioBuffers.drop);
    }
    if (game.playPickupSound && audioBuffers.pickup) {
        playSound(audioContext, audioBuffers.pickup);
    }
    game.playDropSound = false;
    game.playPickupSound = false;
}

export default playSounds;
