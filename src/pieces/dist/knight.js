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
exports.Knight = void 0;
var square_js_1 = require("../square.js");
var piece_js_1 = require("../piece.js");
var enums_js_1 = require("../enums.js");
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(player, board, x, y) {
        var _this = _super.call(this, player, board, x, y) || this;
        _this.type = enums_js_1.ChessPiece.KNIGHT;
        _this.img.onload = function () {
            _this.draw();
        };
        _this.img.src = "./imgs/ChessPiecesVector.svg";
        _this.imgIndex = {
            row: 0,
            col: 3
        };
        if (_this.isWhitePiece()) {
            _this.imgIndex.row = 0;
        }
        else {
            _this.imgIndex.row = 1;
        }
        _this.pieceSquareTable = [
            [-50, -40, -30, -30, -30, -30, -40, -50],
            [-40, -20, 0, 0, 0, 0, -20, -40],
            [-30, 0, 10, 15, 15, 10, 0, -30],
            [-30, 5, 15, 20, 20, 15, 5, -30],
            [-30, 0, 15, 20, 20, 15, 0, -30],
            [-30, 5, 10, 15, 15, 10, 5, -30],
            [-40, -20, 0, 5, 5, 0, -20, -40],
            [-50, -40, -30, -30, -30, -30, -40, -50]
        ];
        return _this;
    }
    Knight.prototype.updateValidMoves = function () {
        var avaliableMoves = [];
        for (var row = this.y - 2; row <= this.y + 2; row++) {
            if (row < 0 || row > 7) {
                continue;
            }
            for (var col = this.x - 2; col <= this.x + 2; col++) {
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
                var dist = Math.abs(this.x - col) + Math.abs(this.y - row);
                if (dist == 3 && !(this.x == col || this.y == row)) {
                    avaliableMoves.push(endSquare);
                }
            }
        }
        this.validMoves = avaliableMoves;
    };
    return Knight;
}(piece_js_1.Piece));
exports.Knight = Knight;
