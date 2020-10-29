"use strict";
exports.__esModule = true;
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(isHuman, isWhite) {
        this.isHuman = isHuman;
        this.isWhite = isWhite;
        this.score = 0;
        this.activePieces = [];
        this.capturedPieces = [];
    }
    Player.prototype.isWhitePlayer = function () {
        return this.isWhite;
    };
    Player.prototype.isHumanPlayer = function () {
        return this.isHuman;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.getActivePieces = function () {
        return this.activePieces;
    };
    Player.prototype.getCapturedPieces = function () {
        return this.capturedPieces;
    };
    Player.prototype.addCapturedPiece = function (piece) {
        this.capturedPieces.push(piece);
    };
    Player.prototype.removeCapturedPiece = function (piece) {
        this.capturedPieces = this.capturedPieces.filter(function (capturedPiece) {
            return capturedPiece != piece;
        });
    };
    Player.prototype.addActivePiece = function (piece) {
        this.activePieces.push(piece);
    };
    Player.prototype.removeActivePiece = function (piece) {
        this.activePieces = this.activePieces.filter(function (activePiece) {
            return activePiece != piece;
        });
    };
    return Player;
}());
exports.Player = Player;
