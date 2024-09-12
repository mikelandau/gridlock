function drawBorder(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fillStyle = '#606060';
    ctx.fillRect(0, 0, width, height);
}

export default drawBorder;
