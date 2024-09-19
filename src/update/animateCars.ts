import GameState from '@interfaces/gameState';

function animateCars(game: GameState) {
    game.cars.forEach(car => {
        ++car.animationFrame
        if (car.animation === 'incoming' && car.animationFrame === 30) {
            game.playDropSound = true;
        }
        else if (car.animation === 'falling' && car.animationFrame === 1) {
            game.playPickupSound = true;
        }
    });
}

export default animateCars;