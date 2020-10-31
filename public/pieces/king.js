import { Square } from "../square.js";
import { Piece } from "../piece.js";
import { ChessPiece } from "../enums.js";
export class King extends Piece {
    constructor(player, board, x, y) {
        super(player, board, x, y);
        this.type = ChessPiece.KING;
        this.img.onload = () => {
            this.draw();
        };
        this.img.src = "./imgs/ChessPiecesVector.svg";
        this.imgIndex = {
            row: 0,
            col: 0
        };
        if (this.isWhitePiece()) {
            this.imgIndex.row = 0;
        }
        else {
            this.imgIndex.row = 1;
        }
        this.pieceSquareTable = [
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-20, -30, -30, -40, -40, -30, -30, -20],
            [-10, -20, -20, -20, -20, -20, -20, -10],
            [20, 20, 0, 0, 0, 0, 20, 20],
            [20, 30, 10, 0, 0, 10, 30, 20]
        ];
    }
    updateValidMoves() {
        let avaliableMoves = [];
        for (let row = this.y - 1; row <= this.y + 1; row++) {
            if (row < 0 || row > 7) {
                continue;
            }
            for (let col = this.x - 1; col <= this.x + 1; col++) {
                if (col < 0 || col > 7) {
                    continue;
                }
                if (row == this.y && col == this.x) {
                    continue;
                }
                let endPiece = this.boardState[row][col].getPiece();
                let endSquare = new Square(col, row, null);
                if (endPiece != null) {
                    if (endPiece.isWhitePiece() == this.isWhitePiece()) {
                        continue;
                    }
                }
                avaliableMoves.push(endSquare);
            }
        }
        if (this.isWhitePiece()) {
            if (this.hasMoved == false) {
                if (this.boardState[7][0].getPiece() !== null) {
                    if (this.boardState[7][0].getPiece().hasPieceMoved() ==
                        false) {
                        if (this.boardState[7][1].getPiece() == null &&
                            this.boardState[7][2].getPiece() == null &&
                            this.boardState[7][3].getPiece() == null) {
                            avaliableMoves.push(new Square(2, 7, null));
                        }
                    }
                }
                if (this.boardState[7][7].getPiece() !== null) {
                    if (this.boardState[7][7].getPiece().hasPieceMoved() ==
                        false) {
                        if (this.boardState[7][5].getPiece() == null &&
                            this.boardState[7][6].getPiece() == null) {
                            avaliableMoves.push(new Square(6, 7, null));
                        }
                    }
                }
            }
        }
        else {
            if (this.hasMoved == false) {
                if (this.boardState[0][0].getPiece() !== null) {
                    if (this.boardState[0][0].getPiece().hasPieceMoved() ==
                        false) {
                        if (this.boardState[0][1].getPiece() == null &&
                            this.boardState[0][2].getPiece() == null &&
                            this.boardState[0][3].getPiece() == null) {
                            avaliableMoves.push(new Square(2, 0, null));
                        }
                    }
                }
                if (this.boardState[0][7].getPiece() !== null) {
                    if (this.boardState[0][7].getPiece().hasPieceMoved() ==
                        false) {
                        if (this.boardState[0][5].getPiece() == null &&
                            this.boardState[0][6].getPiece() == null) {
                            avaliableMoves.push(new Square(6, 0, null));
                        }
                    }
                }
            }
        }
        this.validMoves = avaliableMoves;
    }
}
