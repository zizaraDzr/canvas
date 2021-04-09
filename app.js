
const HEIGHT = 200;
const WIDTH = 600;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
function initChart(canvas, data) {
  const ctx = canvas.getContext("2d");
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  canvas.height = DPI_HEIGHT;
  canvas.width = DPI_WIDTH;

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'green'
  for (const [x,y] of data) {
    ctx.lineTo(x, DPI_HEIGHT - y);
  }
  ctx.stroke();
  ctx.closePath();
}
initChart(document.getElementById('chart'), [
  [0, 0],
  [200, 100],
  [400, 200],
  [600, 30],
  [700, 350],
])