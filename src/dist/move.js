"use strict";
exports.__esModule = true;
exports.Move = void 0;
var Move = /** @class */ (function () {
    function Move(player, start, end) {
        this.player = player;
        this.start = start;
        this.end = end;
        this.pieceMoved = start.getPiece();
        this.pieceCaptured = end.getPiece();
        if (this.pieceCaptured != null) {
            player.addCapturedPiece(this.pieceCaptured);
            var opponent = end.getPiece().getPlayer();
            opponent.removeActivePiece(this.pieceCaptured);
        }
    }
    Move.prototype.getPlayer = function () {
        return this.player;
    };
    Move.prototype.getStart = function () {
        return this.start;
    };
    Move.prototype.getEnd = function () {
        return this.end;
    };
    Move.prototype.getPieceMoved = function () {
        return this.pieceMoved;
    };
    Move.prototype.getPieceCaptured = function () {
        return this.pieceCaptured;
    };
    Move.prototype.setPieceCaptured = function (square) {
        this.pieceCaptured = square.getPiece();
    };
    return Move;
}());
exports.Move = Move;
