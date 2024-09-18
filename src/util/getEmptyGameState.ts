import GameState from '@interfaces/gameState';

function getEmptyGameState() {
    const emptyState: GameState = {
        cars: [],
        currentLevel: 0,
        dragBoundaries: {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0,
        },
        gamePhase: 'settingUpLevel',
        heldCarIndex: -1,
        heldCarPosition: {
            x: 0,
            y: 0
        },
        holdingCar: false,
        holdOriginalCanvasMouse: {
            x: 0,
            y: 0
        },
        levelComplete: false,
    };

    return emptyState;
}

export default getEmptyGameState;