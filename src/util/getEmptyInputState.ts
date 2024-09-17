import InputState from '@interfaces/inputState';

function getEmptyInputState () {
    const emptyState: InputState = {
        canvasMouse: {
            x: 0,
            y: 0
        },
        mouseButtonPressed: false
    };

    return emptyState;
}

export default getEmptyInputState;
