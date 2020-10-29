export class Player {
    constructor(isHuman, isWhite) {
        this.isHuman = isHuman;
        this.isWhite = isWhite;
        this.score = 0;
        this.activePieces = [];
        this.capturedPieces = [];
    }
    isWhitePlayer() {
        return this.isWhite;
    }
    isHumanPlayer() {
        return this.isHuman;
    }
    getScore() {
        return this.score;
    }
    getActivePieces() {
        return this.activePieces;
    }
    getCapturedPieces() {
        return this.capturedPieces;
    }
    addCapturedPiece(piece) {
        this.capturedPieces.push(piece);
    }
    removeCapturedPiece(piece) {
        this.capturedPieces = this.capturedPieces.filter((capturedPiece) => {
            return capturedPiece != piece;
        });
    }
    addActivePiece(piece) {
        this.activePieces.push(piece);
    }
    removeActivePiece(piece) {
        this.activePieces = this.activePieces.filter((activePiece) => {
            return activePiece != piece;
        });
    }
}
