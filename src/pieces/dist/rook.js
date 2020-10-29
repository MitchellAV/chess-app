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
exports.Rook = void 0;
var piece_js_1 = require("../piece.js");
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(player, board, x, y) {
        var _this = _super.call(this, player, board, x, y) || this;
        _this.img.src = "./imgs/ChessPiecesVector.svg";
        _this.img.onload = function () {
            _this.draw();
        };
        _this.imgIndex = {
            row: 0,
            col: 4
        };
        if (_this.isWhitePiece()) {
            _this.imgIndex.row = 0;
        }
        else {
            _this.imgIndex.row = 1;
        }
        _this.pieceSquareTable = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [5, 10, 10, 10, 10, 10, 10, 5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [0, 0, 0, 5, 5, 0, 0, 0]
        ];
        return _this;
    }
    Rook.prototype.updateValidMoves = function () {
        var avaliableMoves = [];
        this.validMoves = this.straightMoves(avaliableMoves, this);
    };
    return Rook;
}(piece_js_1.Piece));
exports.Rook = Rook;
