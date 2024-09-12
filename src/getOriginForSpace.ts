import Coordinates from './types/coordinates';

function getOriginForSpace(ctx: CanvasRenderingContext2D, spaceX: number, spaceY: number): Coordinates {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    const borderWidth = (width / 14);
    const borderHeight = (height / 14);

    const spaceWidth = (width / 7);
    const spaceHeight = (height / 7);

    const originX = borderWidth + spaceX * spaceWidth;
    const originY = borderHeight + spaceY * spaceHeight;

    const origin: Coordinates = {
        x: originX,
        y: originY
    }

    return origin;
}

export default getOriginForSpace;
