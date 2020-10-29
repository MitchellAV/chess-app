export class Square {
    constructor(x, y, piece) {
        this.x = x;
        this.y = y;
        this.piece = piece;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    getPiece() {
        return this.piece;
    }
    setPiece(piece) {
        this.piece = piece;
    }
}
