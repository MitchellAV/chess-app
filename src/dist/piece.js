"use strict";
exports.__esModule = true;
exports.Piece = void 0;
var square_js_1 = require("./square.js");
var enums_js_1 = require("./enums.js");
var c = require("./constants.js");
var Piece = /** @class */ (function () {
    function Piece(player, board, x, y) {
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
        this.type = enums_js_1.ChessPiece.ROOK;
        this.img = new Image();
        this.imgIndex = { row: 0, col: 0 };
    }
    Piece.prototype.draw = function () {
        c.ctx.drawImage(this.img, this.imgIndex.col * c.IMG_SIZE, this.imgIndex.row * c.IMG_SIZE, c.IMG_SIZE, c.IMG_SIZE, this.x * c.TILE_SIZE, this.y * c.TILE_SIZE, c.TILE_SIZE, c.TILE_SIZE);
    };
    Piece.prototype.getPlayer = function () {
        return this.player;
    };
    Piece.prototype.updateValidMoves = function () { };
    Piece.prototype.updateValue = function (x, y) {
        if (this.isWhite) {
            this.value = this.pieceSquareTable[y][x];
        }
        else {
            this.value = this.pieceSquareTable[7 - y][x];
        }
    };
    Piece.prototype.isValidMove = function (end) {
        for (var i = 0; i < this.validMoves.length; i++) {
            var move = this.validMoves[i];
            if (move.getX() === end.getX() && move.getY() === end.getY()) {
                return true;
            }
        }
        return false;
    };
    Piece.prototype.getX = function () {
        return this.x;
    };
    Piece.prototype.getY = function () {
        return this.y;
    };
    Piece.prototype.setX = function (x) {
        this.x = x;
    };
    Piece.prototype.setY = function (y) {
        this.y = y;
    };
    Piece.prototype.getType = function () {
        return this.type;
    };
    Piece.prototype.isPieceDead = function () {
        return this.isDead;
    };
    Piece.prototype.hasPieceMoved = function () {
        return this.hasMoved;
    };
    Piece.prototype.setPieceMoved = function (state) {
        this.hasMoved = state;
    };
    Piece.prototype.getValidMoves = function () {
        return this.validMoves;
    };
    Piece.prototype.getValue = function () {
        return this.value;
    };
    Piece.prototype.isWhitePiece = function () {
        return this.isWhite;
    };
    Piece.prototype.pieceValue = function () {
        var pieceValue = 0;
        switch (this.getType()) {
            case enums_js_1.ChessPiece.KING:
                pieceValue = 1000;
                break;
            case enums_js_1.ChessPiece.QUEEN:
                pieceValue = 9;
                break;
            case enums_js_1.ChessPiece.ROOK:
                pieceValue = 5;
                break;
            case enums_js_1.ChessPiece.BISHOP:
                pieceValue = 3;
                break;
            case enums_js_1.ChessPiece.KNIGHT:
                pieceValue = 3;
                break;
            case enums_js_1.ChessPiece.PAWN:
                pieceValue = 1;
                break;
            default:
                break;
        }
        return pieceValue;
    };
    Piece.prototype.locationValue = function () {
        return (this.isWhite ? this.pieceSquareTable[this.y][this.x] : this.pieceSquareTable[7 - this.y][this.x]);
    };
    Piece.prototype.updatePieceValue = function () {
        this.value = this.pieceValue() + this.locationValue();
    };
    Piece.prototype.diagonalMoves = function (avaliableMoves, p) {
        outer: for (var row = p.y - 1; row >= 0; row--) {
            if (row < 0 || row > 7) {
                break;
            }
            for (var col = p.x - 1; col >= 0; col--) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                var frontPiece = p.boardState[row][col].getPiece();
                var endSquare = new square_js_1.Square(col, row, null);
                if (frontPiece != null) {
                    if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                    break outer;
                }
                avaliableMoves.push(endSquare);
            }
        }
        outer: for (var row = p.y - 1; row >= 0; row--) {
            if (row < 0 || row > 7) {
                break;
            }
            for (var col = p.x + 1; col < 8; col++) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                var frontPiece = p.boardState[row][col].getPiece();
                var endSquare = new square_js_1.Square(col, row, null);
                if (frontPiece != null) {
                    if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                    break outer;
                }
                avaliableMoves.push(endSquare);
            }
        }
        outer: for (var row = p.y + 1; row < 8; row++) {
            if (row < 0 || row > 7) {
                break;
            }
            for (var col = p.x + 1; col < 8; col++) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                var frontPiece = p.boardState[row][col].getPiece();
                var endSquare = new square_js_1.Square(col, row, null);
                if (frontPiece != null) {
                    if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                    break outer;
                }
                avaliableMoves.push(endSquare);
            }
        }
        outer: for (var row = p.y + 1; row < 8; row++) {
            if (row < 0 || row > 7) {
                break;
            }
            for (var col = p.x - 1; col >= 0; col--) {
                if (col < 0 || col > 7) {
                    break;
                }
                if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
                    continue;
                }
                var frontPiece = p.boardState[row][col].getPiece();
                var endSquare = new square_js_1.Square(col, row, null);
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
    };
    Piece.prototype.straightMoves = function (avaliableMoves, p) {
        for (var row = p.y - 1; row >= 0; row--) {
            if (row < 0 || row > 7) {
                break;
            }
            var frontPiece = p.boardState[row][p.x].getPiece();
            var endSquare = new square_js_1.Square(p.x, row, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        for (var col = p.x - 1; col >= 0; col--) {
            if (col < 0 || col > 7) {
                break;
            }
            var frontPiece = p.boardState[p.y][col].getPiece();
            var endSquare = new square_js_1.Square(col, p.y, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        for (var row = p.y + 1; row < 8; row++) {
            if (row < 0 || row > 7) {
                break;
            }
            var frontPiece = p.boardState[row][p.x].getPiece();
            var endSquare = new square_js_1.Square(p.x, row, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        for (var col = p.x + 1; col < 8; col++) {
            if (col < 0 || col > 7) {
                break;
            }
            var frontPiece = p.boardState[p.y][col].getPiece();
            var endSquare = new square_js_1.Square(col, p.y, null);
            if (frontPiece != null) {
                if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
                    avaliableMoves.push(endSquare);
                }
                break;
            }
            avaliableMoves.push(endSquare);
        }
        return avaliableMoves;
    };
    return Piece;
}());
exports.Piece = Piece;
