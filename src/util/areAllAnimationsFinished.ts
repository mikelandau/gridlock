import GameState from '@interfaces/gameState';

function areAllAnimationsFinished(game: GameState) {
    return !(game.cars.some(car => car.animationFrame < 30));
}

export default areAllAnimationsFinished;
