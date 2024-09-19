import AudioBuffers from '@interfaces/audioBuffers';

import loadAudioBufferFromFile from './loadAudioBufferFromFile';

async function loadAudio(audioContext: AudioContext, audioBuffers: AudioBuffers) {
    const dropSoundBuffer = await loadAudioBufferFromFile(audioContext, 'sfx/pop7.wav');
    const pickupSoundBuffer = await loadAudioBufferFromFile(audioContext, 'sfx/pop2.wav');

    audioBuffers.drop = dropSoundBuffer;
    audioBuffers.pickup = pickupSoundBuffer;
}

export default loadAudio;
