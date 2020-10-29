import { Square } from './square.js';
import { Game } from './game.js';
import { Player } from './player.js';
import * as c from './constants.js';
const chessboard = document.getElementById('chessboard');
chessboard.style.cssText = `width: ${c.GAME_SIZE}px;height:${c.GAME_SIZE}px;`;
const player1 = new Player(true, true);
const player2 = new Player(false, false);
const game = new Game(player1, player2);
game.initGame();
let start = new Square(0, 0, null);
let end = new Square(0, 0, null);
let clicked = false;
let clickedPiece;
chessboard.addEventListener("mousedown", function (e) {
    let canvasPos = {
        x: chessboard.getBoundingClientRect().left + window.pageXOffset,
        y: chessboard.getBoundingClientRect().top + window.pageYOffset,
    };
    let mouse = {
        x: Math.floor((e.pageX - canvasPos.x) / c.TILE_SIZE),
        y: Math.floor((e.pageY - canvasPos.y) / c.TILE_SIZE),
    };
    if (clicked === false) {
        start.setX(mouse.x);
        start.setY(mouse.y);
        start.setPiece(game.getBoard().getPiece(start));
        clicked = true;
        clickedPiece = game.getBoard().getPieceColor(start);
        if (clickedPiece == game.getCurrentTurn().isWhitePlayer()) {
            // highlight spaces to move to
            game.getBoard().highlightMoves(start);
        }
    }
});
chessboard.addEventListener("mouseup", function (e) {
    let canvasPos = {
        x: chessboard.getBoundingClientRect().left + window.pageXOffset,
        y: chessboard.getBoundingClientRect().top + window.pageYOffset,
    };
    let mouse = {
        x: Math.floor((e.pageX - canvasPos.x) / c.TILE_SIZE),
        y: Math.floor((e.pageY - canvasPos.y) / c.TILE_SIZE),
    };
    if (clicked == true) {
        end.setX(mouse.x);
        end.setY(mouse.y);
        end.setPiece(game.getBoard().getPiece(end));
        if (clickedPiece == game.getCurrentTurn().isWhitePlayer()) {
            game.makeMove(game.getCurrentTurn(), start, end);
        }
        // move piece and update board
        // console.log(start, end);
        game.getBoard().updateCanvas();
        clicked = false;
    }
});
