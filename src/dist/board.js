"use strict";
exports.__esModule = true;
exports.Board = void 0;
var square_js_1 = require("./square.js");
var player_js_1 = require("./player.js");
var king_js_1 = require("./pieces/king.js");
var bishop_js_1 = require("./pieces/bishop.js");
var knight_js_1 = require("./pieces/knight.js");
var pawn_js_1 = require("./pieces/pawn.js");
var queen_js_1 = require("./pieces/queen.js");
var rook_js_1 = require("./pieces/rook.js");
var c = require("./constants.js");
var Board = /** @class */ (function () {
    function Board(whitePlayer, blackPlayer) {
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
        this.boardSize = c.GAME_SIZE;
        this.initBoardState = [
            ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
            ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
            ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
        ];
        this.boardState = [
            Array(8),
            Array(8),
            Array(8),
            Array(8),
            Array(8),
            Array(8),
            Array(8),
            Array(8)
        ];
    }
    Board.prototype.getBoardState = function () {
        return this.boardState;
    };
    Board.prototype.getBlackPlayer = function () {
        return this.blackPlayer;
    };
    Board.prototype.getWhitePlayer = function () {
        return this.whitePlayer;
    };
    Board.prototype.initDrawPieces = function () {
        for (var row = 0; row < this.initBoardState.length; row++) {
            for (var column = 0; column < this.initBoardState[row].length; column++) {
                var tile = this.initBoardState[row][column];
                var playerPiece = new player_js_1.Player(true, true);
                if (tile[0] === "b") {
                    playerPiece = this.blackPlayer;
                }
                else if (tile[0] === "w") {
                    playerPiece = this.whitePlayer;
                }
                switch (tile[1]) {
                    case "B":
                        this.boardState[row][column] = new square_js_1.Square(column, row, new bishop_js_1.Bishop(playerPiece, this, column, row));
                        break;
                    case "Q":
                        this.boardState[row][column] = new square_js_1.Square(column, row, new queen_js_1.Queen(playerPiece, this, column, row));
                        break;
                    case "N":
                        this.boardState[row][column] = new square_js_1.Square(column, row, new knight_js_1.Knight(playerPiece, this, column, row));
                        break;
                    case "K":
                        this.boardState[row][column] = new square_js_1.Square(column, row, new king_js_1.King(playerPiece, this, column, row));
                        break;
                    case "R":
                        this.boardState[row][column] = new square_js_1.Square(column, row, new rook_js_1.Rook(playerPiece, this, column, row));
                        break;
                    case "P":
                        this.boardState[row][column] = new square_js_1.Square(column, row, new pawn_js_1.Pawn(playerPiece, this, column, row));
                        break;
                }
                if (tile != "") {
                    var currentPiece = this.boardState[row][column].getPiece();
                    if (currentPiece != null) {
                        currentPiece.draw();
                        if (currentPiece.isWhitePiece()) {
                            this.whitePlayer.addActivePiece(currentPiece);
                        }
                        else {
                            this.blackPlayer.addActivePiece(currentPiece);
                        }
                    }
                }
                else {
                    this.boardState[row][column] = new square_js_1.Square(column, row, null);
                }
            }
        }
    };
    Board.prototype.getPieceColor = function (location) {
        return this.boardState[location.getY()][location.getX()].getPiece().isWhitePiece();
    };
    Board.prototype.getPiece = function (location) {
        return this.boardState[location.getY()][location.getX()].getPiece();
    };
    Board.prototype.updateAllValidMoves = function () {
        for (var row = 0; row < this.boardState.length; row++) {
            for (var column = 0; column < this.boardState[row].length; column++) {
                var piece = this.boardState[row][column].getPiece();
                if (piece != null) {
                    piece.updateValidMoves();
                }
            }
        }
    };
    Board.prototype.highlightMoves = function (start) {
        var startPiece = this.boardState[start.getY()][start.getX()].getPiece();
        if (startPiece === null) {
            return;
        }
        startPiece.getValidMoves().forEach(function (move) {
            c.ctx.save();
            c.ctx.globalAlpha = 0.2;
            c.ctx.fillStyle = "yellow";
            c.ctx.fillRect(move.getX() * c.TILE_SIZE, move.getY() * c.TILE_SIZE, c.TILE_SIZE, c.TILE_SIZE);
            c.ctx.restore();
        });
    };
    Board.prototype.updatePieces = function () {
        for (var row = 0; row < this.boardState.length; row++) {
            for (var column = 0; column < this.boardState[row].length; column++) {
                var piece = this.boardState[row][column].getPiece();
                if (piece != null) {
                    piece.draw();
                }
            }
        }
    };
    Board.prototype.drawBoard = function () {
        c.ctx.save();
        c.ctx.clearRect(0, 0, this.boardSize, this.boardSize);
        for (var column = 0; column < 8; column++) {
            for (var row = 0; row < 8; row++) {
                if ((row + column) % 2 == 0) {
                    c.ctx.fillStyle = "white";
                }
                else {
                    c.ctx.fillStyle = "gray";
                }
                c.ctx.fillRect(row * c.TILE_SIZE, column * c.TILE_SIZE, c.TILE_SIZE, c.TILE_SIZE);
            }
        }
        c.ctx.restore();
    };
    // evalBoard() {
    // 	let score: number = 0;
    // 	let totalScore: number = 0;
    // 	let players = [this.blackPlayer, this.whitePlayer];
    // 	players.forEach((player) => {
    // 		player.getActivePieces().forEach((piece) => {
    // 			switch (piece.getType()) {
    // 				case ChessPiece.KING:
    // 					score = 1000;
    // 					break;
    // 				case ChessPiece.QUEEN:
    // 					score = 90;
    // 					break;
    // 				case ChessPiece.ROOK:
    // 					score = 50;
    // 					break;
    // 				case ChessPiece.BISHOP:
    // 					score = 30;
    // 					break;
    // 				case ChessPiece.KNIGHT:
    // 					score = 30;
    // 					break;
    // 				case ChessPiece.PAWN:
    // 					score = 10;
    // 					break;
    // 				default:
    // 					break;
    // 			}
    // 			totalScore += piece.value + score;
    // 		});
    // 	});
    // 	return totalScore;
    // }
    Board.prototype.updateCanvas = function () {
        this.drawBoard();
        this.updatePieces();
    };
    return Board;
}());
exports.Board = Board;
