interface Car {
    orientation: 'h' | 'v',
    size: number,
    x: number,
    y: number,
    animation: 'none' | 'incoming' | 'falling'
    animationFrame: number
};

export default Car;