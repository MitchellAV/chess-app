"use strict";
exports.__esModule = true;
exports.Game = void 0;
var board_js_1 = require("./board.js");
var move_js_1 = require("./move.js");
var enums_js_1 = require("./enums.js");
var Game = /** @class */ (function () {
    function Game(player1, player2) {
        if (player1.isWhitePlayer()) {
            this.currentTurn = player1;
            this.whitePlayer = player1;
            this.blackPlayer = player2;
        }
        else {
            this.currentTurn = player2;
            this.whitePlayer = player2;
            this.blackPlayer = player1;
        }
        this.board = new board_js_1.Board(this.whitePlayer, this.blackPlayer);
        this.gameStatus = enums_js_1.GameStatus.ACTIVE;
        this.moveList = [];
    }
    Game.prototype.initGame = function () {
        this.board.drawBoard();
        this.board.initDrawPieces();
        this.board.updateAllValidMoves();
    };
    Game.prototype.getMoveList = function () {
        return this.moveList;
    };
    Game.prototype.getGameStatus = function () {
        return this.gameStatus;
    };
    Game.prototype.setGameStatus = function (status) {
        this.gameStatus = status;
    };
    Game.prototype.getCurrentTurn = function () {
        return this.currentTurn;
    };
    Game.prototype.getBoard = function () {
        return this.board;
    };
    Game.prototype.makeMove = function (player, start, end) {
        var startPiece = this.board
            .getBoardState()[start.getY()][start.getX()].getPiece();
        if (startPiece === null) {
            return;
        }
        if (player != this.currentTurn) {
            return;
        }
        if (startPiece.isValidMove(end)) {
            var move = new move_js_1.Move(player, start, end);
            this.moveList.push(move);
            // Castling
            if (startPiece.getType() === enums_js_1.ChessPiece.KING && startPiece.hasPieceMoved() === false) {
                if (end.getY() == 7) {
                    if (end.getX() == 2) {
                        var rook = this.board.getBoardState()[7][0].getPiece();
                        if (rook != null) {
                            rook.setPieceMoved(true);
                            rook.setX(3);
                            rook.setY(7);
                            this.board.getBoardState()[7][0].setPiece(null);
                            this.board.getBoardState()[7][3].setPiece(rook);
                        }
                    }
                    else if (end.getX() == 6) {
                        var rook = this.board.getBoardState()[7][7].getPiece();
                        if (rook != null) {
                            rook.setPieceMoved(true);
                            rook.setX(5);
                            rook.setY(7);
                            this.board.getBoardState()[7][7].setPiece(null);
                            this.board.getBoardState()[7][5].setPiece(rook);
                        }
                    }
                }
                if (end.getY() == 0) {
                    if (end.getX() == 2) {
                        var rook = this.board.getBoardState()[0][0].getPiece();
                        if (rook != null) {
                            rook.setPieceMoved(true);
                            rook.setX(3);
                            rook.setY(0);
                            this.board.getBoardState()[0][0].setPiece(null);
                            this.board.getBoardState()[0][3].setPiece(rook);
                        }
                    }
                    else if (end.getX() == 6) {
                        var rook = this.board.getBoardState()[0][7].getPiece();
                        if (rook != null) {
                            rook.setPieceMoved(true);
                            rook.setX(5);
                            rook.setY(0);
                            this.board.getBoardState()[0][7].setPiece(null);
                            this.board.getBoardState()[0][5].setPiece(rook);
                        }
                    }
                }
            }
            startPiece.setPieceMoved(true);
            startPiece.setX(end.getX());
            startPiece.setY(end.getY());
            this.board.getBoardState()[start.getY()][start.getX()].setPiece(null);
            this.board.getBoardState()[end.getY()][end.getX()].setPiece(startPiece);
            this.board.updateAllValidMoves();
            startPiece.updateValue(startPiece.getX(), startPiece.getY());
            // console.log(this.board.boardState);
            var lastMove = move.getPieceCaptured();
            if (lastMove != null) {
                if (lastMove.getType() == enums_js_1.ChessPiece.KING) {
                    if (player.isWhitePlayer()) {
                        this.setStatus(enums_js_1.GameStatus.WHITE_WIN);
                    }
                    else {
                        this.setStatus(enums_js_1.GameStatus.BLACK_WIN);
                    }
                }
            }
            if (this.currentTurn == this.whitePlayer) {
                this.currentTurn = this.blackPlayer;
            }
            else {
                this.currentTurn = this.whitePlayer;
            }
            if (!this.currentTurn.isHumanPlayer()) {
                this.randomMove(this.currentTurn);
            }
            this.board.updateCanvas();
        }
    };
    Game.prototype.setStatus = function (status) {
        console.log(status);
    };
    Game.prototype.randomMove = function (computer) {
        function random_item(items) {
            return items[Math.floor(Math.random() * items.length)];
        }
        if (computer.getActivePieces().length != 0) {
            var startPiece = random_item(computer.getActivePieces());
            if (startPiece.getValidMoves().length != 0) {
                var startMove = this.board.getBoardState()[startPiece.getY()][startPiece.getX()];
                var endPiece = random_item(startPiece.getValidMoves());
                var endMove = this.board.getBoardState()[endPiece.getY()][endPiece.getX()];
                this.makeMove(computer, startMove, endMove);
            }
            else {
                this.randomMove(computer);
            }
        }
    };
    return Game;
}());
exports.Game = Game;
