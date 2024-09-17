import Car from '@interfaces/car';

async function carsfromLevelFile(path: string): Promise<Car[]> {
    const levelResponse = await fetch(path);
    const levelJson = await levelResponse.json();
    const cars = levelJson.cars as Car[];
    return cars;
}

export default carsfromLevelFile;
