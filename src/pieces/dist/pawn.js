"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Pawn = void 0;
var square_js_1 = require("../square.js");
var piece_js_1 = require("../piece.js");
var enums_js_1 = require("../enums.js");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(player, board, x, y) {
        var _this = _super.call(this, player, board, x, y) || this;
        _this.type = enums_js_1.ChessPiece.PAWN;
        _this.img.onload = function () {
            _this.draw();
        };
        _this.img.src = "./imgs/ChessPiecesVector.svg";
        _this.imgIndex = {
            row: 0,
            col: 5
        };
        if (_this.isWhitePiece()) {
            _this.imgIndex.row = 0;
        }
        else {
            _this.imgIndex.row = 1;
        }
        _this.pieceSquareTable = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [5, 5, 10, 25, 25, 10, 5, 5],
            [0, 0, 0, 20, 20, 0, 0, 0],
            [5, -5, -10, 0, 0, -10, -5, 5],
            [5, 10, 10, -20, -20, 10, 10, 5],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        return _this;
    }
    Pawn.prototype.updateValidMoves = function () {
        var avaliableMoves = [];
        var gap = 1;
        if (!this.hasMoved) {
            gap = 2;
        }
        if (this.isWhitePiece()) {
            // Capture Pieces Diagonally
            var up = this.y - 1;
            var left = this.x - 1;
            var right = this.x + 1;
            var leftPiece = void 0, rightPiece = void 0, frontPiece = void 0;
            if (up >= 0 && up <= 7) {
                if (left >= 0) {
                    leftPiece = this.boardState[up][left].getPiece();
                    var endSquare = new square_js_1.Square(left, up, null);
                    if (leftPiece != null && leftPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
                if (right <= 7) {
                    rightPiece = this.boardState[up][right].getPiece();
                    var endSquare = new square_js_1.Square(right, up, null);
                    if (rightPiece != null && rightPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
            }
            // Move toward black side
            for (var row = this.y - 1; row >= this.y - gap; row--) {
                if (row < 0 || row > 7) {
                    continue;
                }
                frontPiece = this.boardState[row][this.x].getPiece();
                var endSquare = new square_js_1.Square(this.x, row, null);
                if (frontPiece != null) {
                    break;
                }
                avaliableMoves.push(endSquare);
            }
        }
        else {
            // Capture Pieces Diagonally
            var down = this.y + 1;
            var left = this.x - 1;
            var right = this.x + 1;
            var leftPiece = void 0, rightPiece = void 0, frontPiece = void 0;
            if (down >= 0 && down <= 7) {
                if (left >= 0) {
                    leftPiece = this.boardState[down][left].getPiece();
                    var endSquare = new square_js_1.Square(left, down, null);
                    if (leftPiece != null && leftPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
                if (right <= 7) {
                    rightPiece = this.boardState[down][right].getPiece();
                    var endSquare = new square_js_1.Square(right, down, null);
                    if (rightPiece != null && rightPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
            }
            // Move toward black side
            for (var row = this.y + 1; row <= this.y + gap; row++) {
                if (row < 0 || row > 7) {
                    continue;
                }
                frontPiece = this.boardState[row][this.x].getPiece();
                var endSquare = new square_js_1.Square(this.x, row, null);
                if (frontPiece != null) {
                    break;
                }
                avaliableMoves.push(endSquare);
            }
        }
        this.validMoves = avaliableMoves;
    };
    return Pawn;
}(piece_js_1.Piece));
exports.Pawn = Pawn;
