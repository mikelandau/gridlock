import Car from '@interfaces/car';

function isAnyCarInSpace(spaceX: number, spaceY: number, cars: Car[]) {
    for (const car of cars) {
        if (car.orientation == 'h') {
            if (car.y === spaceY &&
                spaceX >= car.x &&
                spaceX < car.x + car.size) {
                    return true;
            }
        } else {
            if (car.x === spaceX &&
                spaceY >= car.y &&
                spaceY < car.y + car.size) {
                    return true;
            }
        }
    }
    return false;
}

export default isAnyCarInSpace;
