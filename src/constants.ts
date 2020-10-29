export const IMG_SIZE = 45;
export const GAME_SIZE = 600;
export const TILE_SIZE = GAME_SIZE / 8;
let canvas = document.getElementById("chessboard") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");