import getOriginForSpace from './getOriginForSpace';
import Car from './types/car';
import Coordinates from './types/coordinates';

function getTargetHeldCarPosition(ctx: CanvasRenderingContext2D, heldCar: Car, canvasMouseX: number, canvasMouseY: number, holdOriginalCanvasMouseX: number, holdOriginalCanvasMouseY: number): Coordinates {
    const heldCarOrigin = getOriginForSpace(ctx, heldCar.x, heldCar.y);
    const dragX = canvasMouseX - holdOriginalCanvasMouseX;
    const dragY = canvasMouseY - holdOriginalCanvasMouseY;
    const targetHeldCarPositionX = heldCarOrigin.x + dragX;
    const targetHeldCarPositionY = heldCarOrigin.y + dragY;
    return { x: targetHeldCarPositionX, y: targetHeldCarPositionY };
}

export default getTargetHeldCarPosition;
