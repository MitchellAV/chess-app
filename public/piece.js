import { Square } from "./square.js";
import { ChessPiece } from "./enums.js";
import * as c from "./constants.js";
export class Piece {
    constructor(player, board, x, y) {
        this.isWhite = player.isWhitePlayer();
        this.player = player;
        this.board = board;
        this.boardState = this.board.getBoardState();
        this.pieceSquareTable = [];
        this.x = x;
        this.y = y;
        this.hasMoved = false;
        this.validMoves = [];
        this.value = 0;
        this.isDead = false;
        this.type = ChessPiece.ROOK;
        this.img = new Image();
        this.imgIndex = { row: 0, col: 0 };
    }
    draw() {
        c.ctx.drawImage(this.img, this.imgIndex.col * c.IMG_SIZE, this.imgIndex.row * c.IMG_SIZE, c.IMG_SIZE, c.IMG_SIZE, this.x * c.TILE_SIZE, this.y * c.TILE_SIZE, c.TILE_SIZE, c.TILE_SIZE);
    }
    getPlayer() {
        return this.player;
    }
    updateValidMoves() { }
    updateValue(x, y) {
        if (this.isWhite) {
            this.value = this.pieceSquareTable[y][x];
        }
        else {
            this.value = this.pieceSquareTable[7 - y][x];
        }
    }
    isValidMove(end) {
        for (let i = 0; i < this.validMoves.length; i++) {
            let move = this.validMoves[i];
            if (move.getX() === end.getX() && move.getY() === end.getY()) {
                return true;
            }
        }
        return false;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    getType() {
        return this.type;
    }
    isPieceDead() {
        return this.isDead;
    }
    hasPieceMoved() {
        return this.hasMoved;
    }
    setPieceMoved(state) {
        this.hasMoved = state;
    }
    getValidMoves() {
        return this.validMoves;
    }
    getValue() {
        return this.value;
    }
    isWhitePiece() {
        return this.isWhite;
    }
    pieceValue() {
        let pieceValue = 0;
        switch (this.getType()) {
            case ChessPiece.KING:
                pieceValue = 1000;
                break;
            case ChessPiece.QUEEN:
                pieceValue = 9;
                break;
            case ChessPiece.ROOK:
                pieceValue = 5;
                break;
            case ChessPiece.BISHOP:
                pieceValue = 3;
                break;
            case ChessPiece.KNIGHT:
                pieceValue = 3;
                break;
            case ChessPiece.PAWN:
                pieceValue = 1;
                break;
            default:
                break;
        }
        return pieceValue;
    }
    locationValue() {
        return (this.isWhite ? this.pieceSquareTable[this.y][this.x] : this.pieceSquareTable[7 - this.y][this.x]);
    }
    updatePieceValue() {
        this.value = this.pieceValue() + this.locationValue();
    }
    diagonalMoves(avaliableMoves, p) {
        outer: for (let row = p.y - 1; row >= 0; row--) {
            if (row < 0 || row > 7) {
                break;
            }
            for (let col = p.x - 1; col >= 0; col--) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                let frontPiece = p.boardState[row][col].getPiece();
                let endSquare = new Square(col, row, null);
                if (frontPiece != null) {
                    if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                    break outer;
                }
                avaliableMoves.push(endSquare);
            }
        }
        outer: for (let row = p.y - 1; row >= 0; row--) {
            if (row < 0 || row > 7) {
                break;
            }
            for (let col = p.x + 1; col < 8; col++) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                let frontPiece = p.boardState[row][col].getPiece();
                let endSquare = new Square(col, row, null);
                if (frontPiece != null) {
                    if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                    break outer;
                }
                avaliableMoves.push(endSquare);
            }
        }
        outer: for (let row = p.y + 1; row < 8; row++) {
            if (row < 0 || row > 7) {
                break;
            }
            for (let col = p.x + 1; col < 8; col++) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                let frontPiece = p.boardState[row][col].getPiece();
                let endSquare = new Square(col, row, null);
                if (frontPiece != null) {
                    if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                    break outer;
                }
                avaliableMoves.push(endSquare);
            }
        }
        outer: for (let row = p.y + 1; row < 8; row++) {
            if (row < 0 || row > 7) {
                break;
            }
            for (let col = p.x - 1; col >= 0; col--) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                let frontPiece = p.boardState[row][col].getPiece();
                let endSquare = new Square(col, row, null);
                if (frontPiece != null) {
                    if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                    break outer;
                }
                avaliableMoves.push(endSquare);
            }
        }
        return avaliableMoves;
    }
    straightMoves(avaliableMoves, p) {
        for (let row = p.y - 1; row >= 0; row--) {
            if (row < 0 || row > 7) {
                break;
            }
            let frontPiece = p.boardState[row][p.x].getPiece();
            let endSquare = new Square(p.x, row, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        for (let col = p.x - 1; col >= 0; col--) {
            if (col < 0 || col > 7) {
                break;
            }
            let frontPiece = p.boardState[p.y][col].getPiece();
            let endSquare = new Square(col, p.y, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        for (let row = p.y + 1; row < 8; row++) {
            if (row < 0 || row > 7) {
                break;
            }
            let frontPiece = p.boardState[row][p.x].getPiece();
            let endSquare = new Square(p.x, row, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        for (let col = p.x + 1; col < 8; col++) {
            if (col < 0 || col > 7) {
                break;
            }
            let frontPiece = p.boardState[p.y][col].getPiece();
            let endSquare = new Square(col, p.y, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        return avaliableMoves;
    }
}
