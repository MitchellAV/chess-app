import { Square } from "./square.js";
import { Player } from "./player.js";
import { King } from "./pieces/king.js";
import { Bishop } from "./pieces/bishop.js";
import { Knight } from "./pieces/knight.js";
import { Pawn } from "./pieces/pawn.js";
import { Queen } from "./pieces/queen.js";
import { Rook } from "./pieces/rook.js";
import * as c from "./constants.js";
export class Board {
    constructor(whitePlayer, blackPlayer) {
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
    getBoardState() {
        return this.boardState;
    }
    getBlackPlayer() {
        return this.blackPlayer;
    }
    getWhitePlayer() {
        return this.whitePlayer;
    }
    initDrawPieces() {
        for (let row = 0; row < this.initBoardState.length; row++) {
            for (let column = 0; column < this.initBoardState[row].length; column++) {
                let tile = this.initBoardState[row][column];
                let playerPiece = new Player(true, true);
                if (tile[0] === "b") {
                    playerPiece = this.blackPlayer;
                }
                else if (tile[0] === "w") {
                    playerPiece = this.whitePlayer;
                }
                switch (tile[1]) {
                    case "B":
                        this.boardState[row][column] = new Square(column, row, new Bishop(playerPiece, this, column, row));
                        break;
                    case "Q":
                        this.boardState[row][column] = new Square(column, row, new Queen(playerPiece, this, column, row));
                        break;
                    case "N":
                        this.boardState[row][column] = new Square(column, row, new Knight(playerPiece, this, column, row));
                        break;
                    case "K":
                        this.boardState[row][column] = new Square(column, row, new King(playerPiece, this, column, row));
                        break;
                    case "R":
                        this.boardState[row][column] = new Square(column, row, new Rook(playerPiece, this, column, row));
                        break;
                    case "P":
                        this.boardState[row][column] = new Square(column, row, new Pawn(playerPiece, this, column, row));
                        break;
                }
                if (tile != "") {
                    let currentPiece = this.boardState[row][column].getPiece();
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
                    this.boardState[row][column] = new Square(column, row, null);
                }
            }
        }
    }
    getPieceColor(location) {
        return this.boardState[location.getY()][location.getX()]
            .getPiece()
            .isWhitePiece();
    }
    getPiece(location) {
        return this.boardState[location.getY()][location.getX()].getPiece();
    }
    updateAllValidMoves() {
        for (let row = 0; row < this.boardState.length; row++) {
            for (let column = 0; column < this.boardState[row].length; column++) {
                let piece = this.boardState[row][column].getPiece();
                if (piece != null) {
                    piece.updateValidMoves();
                }
            }
        }
    }
    highlightMoves(start) {
        let startPiece = this.boardState[start.getY()][start.getX()].getPiece();
        if (startPiece === null) {
            return;
        }
        startPiece.getValidMoves().forEach((move) => {
            c.ctx.save();
            c.ctx.globalAlpha = 0.2;
            c.ctx.fillStyle = "yellow";
            c.ctx.fillRect(move.getX() * c.TILE_SIZE, move.getY() * c.TILE_SIZE, c.TILE_SIZE, c.TILE_SIZE);
            c.ctx.restore();
        });
    }
    updatePieces() {
        for (let row = 0; row < this.boardState.length; row++) {
            for (let column = 0; column < this.boardState[row].length; column++) {
                let piece = this.boardState[row][column].getPiece();
                if (piece != null) {
                    piece.draw();
                }
            }
        }
    }
    drawBoard() {
        c.ctx.save();
        c.ctx.clearRect(0, 0, this.boardSize, this.boardSize);
        for (let column = 0; column < 8; column++) {
            for (let row = 0; row < 8; row++) {
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
    }
    evalBoard(whiteToMove) {
        let whiteScore = 0;
        let blackScore = 0;
        let players = [this.whitePlayer, this.blackPlayer];
        players.forEach((player) => {
            player.getActivePieces().forEach((piece) => {
                if (player.isWhitePlayer()) {
                    whiteScore += piece.getValue();
                }
                else {
                    blackScore += piece.getValue();
                }
            });
        });
        let toMove = -1;
        if (whiteToMove == true) {
            toMove = 1;
        }
        return (whiteScore - blackScore) * toMove;
    }
    updateCanvas() {
        this.drawBoard();
        this.updatePieces();
    }
}
