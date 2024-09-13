import Coordinates from './types/coordinates';

function getNearestSpaceForCoordinates(ctx: CanvasRenderingContext2D, coordinates: Coordinates): Coordinates {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const playfieldWidth = 6 * width / 7;
    const playfieldHeight = 6 * height / 7;
    const playfieldX = width / 14;
    const playfieldY = height / 14;

    const normalizedX = coordinates.x - playfieldX;
    const normalizedY = coordinates.y - playfieldY;

    const spaceX = (normalizedX / playfieldWidth) * 6;
    const spaceY = (normalizedY / playfieldHeight) * 6;
    const roundedSpaceX = Math.round(spaceX);
    const roundedSpaceY = Math.round(spaceY);
    console.log(`${roundedSpaceX},${roundedSpaceY}`);

    return { x: roundedSpaceX, y: roundedSpaceY };
}

export default getNearestSpaceForCoordinates;