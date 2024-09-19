async function loadAudioBufferFromFile(audioContext: AudioContext, path: string): Promise<AudioBuffer> {
    const resp = await fetch(path);
    const arrayBuffer = await resp.arrayBuffer();

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer;
}

export default loadAudioBufferFromFile;
