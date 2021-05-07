
const HEIGHT = 200;
const WIDTH = 600;
const PADDING = 40; // граница сверху/снизу графика
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const VIEW_HEIGHT = DPI_HEIGHT - (PADDING * 2);
const ROWS_COUNT = 5; // кол-во линий по y
function initChart(canvas, data) {
  const ctx = canvas.getContext("2d");
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  canvas.height = DPI_HEIGHT;
  canvas.width = DPI_WIDTH;

  // вычислить границы
  const [yMin, yMax] = computeBoundaries(data)
  // масштаб графика
  const yRatio = VIEW_HEIGHT / (yMax -yMin)
  // y axis
  // шаг по оси y
  const step = VIEW_HEIGHT / ROWS_COUNT
  const textStep = (yMax - yMin) / ROWS_COUNT
  ctx.beginPath();
  ctx.strokeStyle = '#bbb';
  ctx.font = 'normal 20px Helvetica, sans-serif';
  // цвет текста
  ctx.fillStyle = '#96a2aa'
  for (let i = 1; i <= ROWS_COUNT; i++) {
    // координата по y
    const y = step * i;
    const text = yMax - textStep * i
    // текст над линиями y
    ctx.fillText(text.toString(), 6, y + PADDING - 10)
    // передвигает точку 
    ctx.moveTo(0, y + PADDING);
    // до конца графика
    ctx.lineTo(DPI_WIDTH, y + PADDING);
  }
  ctx.stroke();
  ctx.closePath();
  // ===

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'red'
  for (const [x,y] of data) {
    ctx.lineTo(x, DPI_HEIGHT - PADDING - y * yRatio);
  }
  ctx.stroke();
  ctx.closePath();
}
initChart(document.getElementById('chart'), [
  [0, 0],
  [200, 200],
  [400, 100],
  [600, 320],
  [700, 200],
])

// находим макс и мин в массиве
function computeBoundaries(data) {
  let min, max
  for (const [, y] of data) {
    if (typeof min !=='number') min = y
    if (typeof max !=='number') max = y
    if (min > y) min = y
    if (max < y) max = y
  }
  return [min, max]
}