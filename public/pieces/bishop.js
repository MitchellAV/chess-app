import { Piece } from "../piece.js";
import { ChessPiece } from "../enums.js";
export class Bishop extends Piece {
    constructor(player, board, x, y) {
        super(player, board, x, y);
        this.type = ChessPiece.BISHOP;
        this.imgIndex = {
            row: 0,
            col: 2
        };
        if (this.isWhitePiece()) {
            this.imgIndex.row = 0;
        }
        else {
            this.imgIndex.row = 1;
        }
        this.img.src = "./imgs/ChessPiecesVector.svg";
        this.img.onload = () => {
            this.draw();
        };
        this.pieceSquareTable = [
            [-20, -10, -10, -10, -10, -10, -10, -20],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-10, 0, 5, 10, 10, 5, 0, -10],
            [-10, 5, 5, 10, 10, 5, 5, -10],
            [-10, 0, 10, 10, 10, 10, 0, -10],
            [-10, 10, 10, 10, 10, 10, 10, -10],
            [-10, 5, 0, 0, 0, 0, 5, -10],
            [-20, -10, -10, -10, -10, -10, -10, -20]
        ];
    }
    updateValidMoves() {
        let avaliableMoves = [];
        this.validMoves = this.diagonalMoves(avaliableMoves, this);
    }
}
