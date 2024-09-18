function drawBorder(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const borderWidth = width / 14;
    const borderHeight = height / 14;
    const spaceHeight = height / 7;
    
    const topExitBorderTotalHeight = 5 * height / 14;
    const bottomExitBorderTotalheight = 7 * height / 14;
    ctx.fillStyle = '#606060';
    ctx.fillRect(0, 0, borderWidth, height);
    ctx.fillRect(borderWidth, 0, (width - (2 * borderWidth)), borderHeight);
    ctx.fillRect(borderWidth, height - borderHeight, (width - (2 * borderWidth)), borderHeight);
    ctx.fillRect(width - borderWidth, 0, borderWidth, topExitBorderTotalHeight);
    ctx.fillRect(width - borderWidth, topExitBorderTotalHeight + spaceHeight, borderWidth, bottomExitBorderTotalheight);
}

export default drawBorder;
