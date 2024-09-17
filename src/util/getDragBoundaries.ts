import DragBoundaries from '@interfaces/dragBoundaries';
import GameState from '@interfaces/gameState';

import getOriginForSpace from './getOriginForSpace';
import isAnyCarInSpace from './isAnyCarInSpace';

function getDragBoundaries(ctx: CanvasRenderingContext2D, game: GameState) {
    const heldCar = game.cars[game.heldCarIndex]
    const cars = game.cars;
    if (heldCar.orientation === 'h') {
        let minSpaceX = heldCar.x;
        while (minSpaceX > 0 && !isAnyCarInSpace(minSpaceX - 1, heldCar.y, cars)) {
            minSpaceX -= 1; // don't use unary operators because javascript was designed by orangutans
        }
        
        let maxSpaceX = heldCar.x;
        while (maxSpaceX + heldCar.size < 6 && !isAnyCarInSpace(maxSpaceX + heldCar.size, heldCar.y, cars)) {
            maxSpaceX += 1;
        }

        if (heldCar.y === 2 && maxSpaceX === 6 - heldCar.size) {
            // exit
            maxSpaceX = 6;
        }

        const minCoords = getOriginForSpace(ctx, minSpaceX, heldCar.y);
        const maxCoords = getOriginForSpace(ctx, maxSpaceX, heldCar.y);

        const dragBoundaries : DragBoundaries = {
            maxX: maxCoords.x,
            maxY: maxCoords.y,
            minX: minCoords.x,
            minY: minCoords.y
        }

        return dragBoundaries;
    } else {
        let minSpaceY = heldCar.y;
        while (minSpaceY > 0 && !isAnyCarInSpace(heldCar.x, minSpaceY - 1, cars)) {
            minSpaceY -= 1; 
        }
        
        let maxSpaceY = heldCar.y;
        while (maxSpaceY + heldCar.size < 6 && !isAnyCarInSpace(heldCar.x, maxSpaceY + heldCar.size, cars)) {
            maxSpaceY += 1;
        }

        const minCoords = getOriginForSpace(ctx, heldCar.x, minSpaceY);
        const maxCoords = getOriginForSpace(ctx, heldCar.x, maxSpaceY);

        const dragBoundaries : DragBoundaries = {
            maxX: maxCoords.x,
            maxY: maxCoords.y,
            minX: minCoords.x,
            minY: minCoords.y
        }

        return dragBoundaries;
    }
}

export default getDragBoundaries;
