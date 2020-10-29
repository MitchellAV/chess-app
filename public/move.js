export class Move {
    constructor(player, start, end) {
        this.player = player;
        this.start = start;
        this.end = end;
        this.pieceMoved = start.getPiece();
        this.pieceCaptured = end.getPiece();
        if (this.pieceCaptured != null) {
            player.addCapturedPiece(this.pieceCaptured);
            let opponent = end.getPiece().getPlayer();
            opponent.removeActivePiece(this.pieceCaptured);
        }
    }
    getPlayer() {
        return this.player;
    }
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
    getPieceMoved() {
        return this.pieceMoved;
    }
    getPieceCaptured() {
        return this.pieceCaptured;
    }
    setPieceCaptured(square) {
        this.pieceCaptured = square.getPiece();
    }
}
