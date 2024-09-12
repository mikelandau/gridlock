import drawCar from './drawCar';
import Car from './types/car';

const primaryCarColor = '#ff0000';

const carColors = [
    '#FFEF9E',
    '#D2FF9E',
    '#9EFFA8',
    '#9EFFE5',
    '#9EDBFF',
    '#9E9EFF',
    '#DB9EFF',
    '#FF9EE5',
    '#FF9EA8',
    '#FFD09E'
];

function drawCars(ctx: CanvasRenderingContext2D, cars: Car[]): void {
    cars.forEach((car, i) => {
        const color = i === 0 ? primaryCarColor : carColors[i];
        drawCar(ctx, car, color);
    })
}

export default drawCars;
