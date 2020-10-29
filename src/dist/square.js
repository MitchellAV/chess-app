"use strict";
exports.__esModule = true;
exports.Square = void 0;
var Square = /** @class */ (function () {
    function Square(x, y, piece) {
        this.x = x;
        this.y = y;
        this.piece = piece;
    }
    Square.prototype.getY = function () {
        return this.y;
    };
    Square.prototype.setY = function (y) {
        this.y = y;
    };
    Square.prototype.getX = function () {
        return this.x;
    };
    Square.prototype.setX = function (x) {
        this.x = x;
    };
    Square.prototype.getPiece = function () {
        return this.piece;
    };
    Square.prototype.setPiece = function (piece) {
        this.piece = piece;
    };
    return Square;
}());
exports.Square = Square;
