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
exports.Queen = void 0;
var piece_js_1 = require("../piece.js");
var enums_js_1 = require("../enums.js");
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(player, board, x, y) {
        var _this = _super.call(this, player, board, x, y) || this;
        _this.type = enums_js_1.ChessPiece.QUEEN;
        _this.img.onload = function () {
            _this.draw();
        };
        _this.img.src = "./imgs/ChessPiecesVector.svg";
        _this.imgIndex = {
            row: 0,
            col: 1
        };
        if (_this.isWhitePiece()) {
            _this.imgIndex.row = 0;
        }
        else {
            _this.imgIndex.row = 1;
        }
        _this.pieceSquareTable = [
            [-20, -10, -10, -5, -5, -10, -10, -20],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-10, 0, 5, 5, 5, 5, 0, -10],
            [-5, 0, 5, 5, 5, 5, 0, -5],
            [0, 0, 5, 5, 5, 5, 0, -5],
            [-10, 5, 5, 5, 5, 5, 0, -10],
            [-10, 0, 5, 0, 0, 0, 0, -10],
            [-20, -10, -10, -5, -5, -10, -10, -20]
        ];
        return _this;
    }
    Queen.prototype.updateValidMoves = function () {
        var avaliableMoves = [];
        avaliableMoves = this.straightMoves(avaliableMoves, this);
        avaliableMoves = this.diagonalMoves(avaliableMoves, this);
        this.validMoves = avaliableMoves;
    };
    return Queen;
}(piece_js_1.Piece));
exports.Queen = Queen;
