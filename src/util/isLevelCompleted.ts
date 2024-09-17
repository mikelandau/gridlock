import Car from '@interfaces/car';
import Coordinates from '@interfaces/coordinates';

function isLevelCompleted(ctx: CanvasRenderingContext2D, heldCar: Car, heldCarPosition: Coordinates) {
    const width = ctx.canvas.width;
    const spaceWidth = (width / 7);
    const carRightX = heldCarPosition.x + (spaceWidth * heldCar.size);

    const levelCompleted = carRightX > width;
    return levelCompleted;
}

export default isLevelCompleted;