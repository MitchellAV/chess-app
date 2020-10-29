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
exports.King = void 0;
var square_js_1 = require("../square.js");
var piece_js_1 = require("../piece.js");
var enums_js_1 = require("../enums.js");
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(player, board, x, y) {
        var _this = _super.call(this, player, board, x, y) || this;
        _this.type = enums_js_1.ChessPiece.KING;
        _this.img.onload = function () {
            _this.draw();
        };
        _this.img.src = "./imgs/ChessPiecesVector.svg";
        _this.imgIndex = {
            row: 0,
            col: 0
        };
        if (_this.isWhitePiece()) {
            _this.imgIndex.row = 0;
        }
        else {
            _this.imgIndex.row = 1;
        }
        _this.pieceSquareTable = [
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-20, -30, -30, -40, -40, -30, -30, -20],
            [-10, -20, -20, -20, -20, -20, -20, -10],
            [20, 20, 0, 0, 0, 0, 20, 20],
            [20, 30, 10, 0, 0, 10, 30, 20]
        ];
        return _this;
    }
    King.prototype.updateValidMoves = function () {
        var avaliableMoves = [];
        for (var row = this.y - 1; row <= this.y + 1; row++) {
            if (row < 0 || row > 7) {
                continue;
            }
            for (var col = this.x - 1; col <= this.x + 1; col++) {
                if (col < 0 || col > 7) {
                    continue;
                }
                if (row == this.y && col == this.x) {
                    continue;
                }
                var endPiece = this.boardState[row][col].getPiece();
                var endSquare = new square_js_1.Square(col, row, null);
                if (endPiece != null) {
                    if (endPiece.isWhitePiece() == this.isWhitePiece()) {
                        continue;
                    }
                }
                avaliableMoves.push(endSquare);
            }
        }
        if (this.isWhitePiece()) {
            if (this.hasMoved == false) {
                if (this.boardState[7][0].getPiece().hasPieceMoved() == false) {
                    if (this.boardState[7][1].getPiece() == null &&
                        this.boardState[7][2].getPiece() == null &&
                        this.boardState[7][3].getPiece() == null) {
                        avaliableMoves.push(new square_js_1.Square(2, 7, null));
                    }
                }
                if (this.boardState[7][7].getPiece().hasPieceMoved() == false) {
                    if (this.boardState[7][5].getPiece() == null &&
                        this.boardState[7][6].getPiece() == null) {
                        avaliableMoves.push(new square_js_1.Square(6, 7, null));
                    }
                }
            }
        }
        else {
            if (this.hasMoved == false) {
                if (this.boardState[0][0].getPiece().hasPieceMoved() == false) {
                    if (this.boardState[0][1].getPiece() == null &&
                        this.boardState[0][2].getPiece() == null &&
                        this.boardState[0][3].getPiece() == null) {
                        avaliableMoves.push(new square_js_1.Square(2, 0, null));
                    }
                }
                if (this.boardState[0][7].getPiece().hasPieceMoved() == false) {
                    if (this.boardState[0][5].getPiece() == null &&
                        this.boardState[0][6].getPiece() == null) {
                        avaliableMoves.push(new square_js_1.Square(6, 0, null));
                    }
                }
            }
        }
        this.validMoves = avaliableMoves;
    };
    return King;
}(piece_js_1.Piece));
exports.King = King;
