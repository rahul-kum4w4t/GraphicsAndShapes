const dA = 1;
const dB = 0.5;
const f = 0.055;
const k = 0.062;

const mask = [[0.05, 0.2, 0.05], [0.2, -1, 0.2], [0.05, 0.2, 0.05]];
let grid;
let nextGrid;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  nextGrid = getGrid(400, 400, { a: 1, b: 0 });
  grid = getGrid(400, 400, { a: 1, b: 0 });

  for (let i = 200; i < 240; i++) {
    for (let j = 200; j < 240; j++) {
      grid[i][j].b = 1;
    }
  }
}


function draw() {
  background(0);
  convolve(grid, mask, nextGrid);
  /*for(let i=1 ;i < nextGrid.length -1 ;i++){
    for(let j=1; j< nextGrid[0].length - 1; j++){
       let a = grid[i][j].a;
       let b = grid[i][j].b;
       nextGrid[i][j].a = a + (dA * convolveA(i,j)) - (a * b * b) + (f * (1 - a));
       nextGrid[i][j].b = b + (dB * convolveB(i,j)) + (a * b * b) - ((k + f) * b);
    }
  }*/
  loadPixels();
  for (let i = 0; i < nextGrid.length; i++) {
    for (let j = 0; j < nextGrid[0].length; j++) {
      let pix = (i * nextGrid[0].length + j) * 4;
      //console.log(JSON.stringify(nextGrid[i][j]));
      let c = floor((nextGrid[i][j].a - nextGrid[i][j].b) * 255);
      c = constrain(c,0,255);
      pixels[pix + 0] = c;
      pixels[pix + 1] = c;
      pixels[pix + 2] = c;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  [grid, nextGrid] = [nextGrid, grid];
}

function getGrid(width, height, defaultData) {
  let grid = new Array(height);
  let widthSizeMapper = new Array(width).fill(0);
  for (let i = 0; i < height; i++) {
    grid[i] = widthSizeMapper.map(() => ({ ...defaultData }));
  }
  return grid;
}

function convolve(grid, mask, resultant) {

  const rows = grid.length;
  const cols = grid[0].length;
  const maskRows = mask.length;
  const maskCols = mask[0].length;
  const maskMid = [Math.floor(maskRows / 2), Math.floor(maskCols / 2)];
  let sumA = 0;
  let sumB = 0;
  let a = 0;
  let b = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      a = grid[i][j].a;
      b = grid[i][j].b;
      for (let mi = 0; mi < maskRows; mi++) {
        for (let mj = 0; mj < maskCols; mj++) {
          let c = j + (mj - maskMid[1]);
          let r = i + (mi - maskMid[0]);
          if (c < cols && c >= 0 && r < rows && r >= 0) {
            sumA += grid[r][c].a * mask[mi][mj];
            sumB += grid[r][c].b * mask[mi][mj];
          }
        }
      }
      resultant[i][j].a = constrain(a + (dA * sumA) - (a * b * b) + (f * (1 - a)), 0, 1);
      resultant[i][j].b = constrain(b + (dB * sumB) + (a * b * b) - ((k + f) * b), 0, 1);
      sumA = 0;
      sumB = 0;
    }
  }
}