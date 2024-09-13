import isCoordinateOverCar from './isCoordinateOverCar';
import Car from './types/car';
import Coordinates from './types/coordinates';

function getCarAtMouseCoordinates(ctx: CanvasRenderingContext2D, cars: Car[], canvasMouseCoords: Coordinates): number {
    for (let i = 0; i < cars.length; ++i) {
        if (isCoordinateOverCar(ctx, cars[i], canvasMouseCoords)) {
            return i;
        }
    }
    return -1;
}

export default getCarAtMouseCoordinates;
