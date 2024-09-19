function drawTitleScreenText(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "48px \"Dosis\", sans-serif";
    ctx.fillStyle = '#ffffff';
    ctx.fillText("Click or Tap to Start", width/2, height/2);


}

export default drawTitleScreenText;
