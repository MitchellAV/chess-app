"use strict";
exports.__esModule = true;
exports.ctx = exports.TILE_SIZE = exports.GAME_SIZE = exports.IMG_SIZE = void 0;
exports.IMG_SIZE = 45;
exports.GAME_SIZE = 600;
exports.TILE_SIZE = exports.GAME_SIZE / 8;
var canvas = document.getElementById("chessboard");
exports.ctx = canvas.getContext("2d");
