import GameState from '@interfaces/gameState';

import carsfromLevelFile from '@util/carsFromLevelFile';

async function resetGame(gameState: GameState): Promise<void> {
    let levelFile: string;
    switch(gameState.currentLevel) {
        case 0:
            levelFile = 'levels/level01.json';
            break;
        case 1:
            levelFile = 'levels/level11.json';
            break;
        case 2:
            levelFile = 'levels/level21.json';
            break;
        case 3:
            levelFile = 'levels/level31.json';
            break;
        default:
            levelFile = 'levels/level31.json';
    }
    gameState.cars = await carsfromLevelFile(levelFile);
    gameState.holdingCar = false;
    gameState.heldCarIndex = -1;
    gameState.levelComplete = false;
}

export default resetGame;