import GameState from '@interfaces/gameState';

function updateToPlayPhase(game: GameState) {
    game.gamePhase = 'play';
    game.cars.forEach(car => {
        car.animation = 'none';
        car.animationFrame = 0;
    });
}

export default updateToPlayPhase;