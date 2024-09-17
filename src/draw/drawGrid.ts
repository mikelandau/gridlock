function drawGrid(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fillStyle = '#303030';
    ctx.fillRect(width / 14, height / 14, 6 * width / 7, 6 * height / 7);

    ctx.fillStyle = '#606060';
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 6; ++j) {
            const x = (width / 14) + (3 * width / 56) + (i * width / 7);
            const y = (height / 14) + (3 * height / 56) + (j * height / 7);
            ctx.fillRect(x, y, width / 28, height / 28);
        }
    }

    const exitX = 13 * height / 14;
    const exitY = 5 * height / 14;
    ctx.fillStyle = '#303030';
    ctx.fillRect(exitX, exitY, width / 14, height / 7);
}

export default drawGrid;