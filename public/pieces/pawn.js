import { Square } from "../square.js";
import { Piece } from "../piece.js";
import { ChessPiece } from "../enums.js";
export class Pawn extends Piece {
    constructor(player, board, x, y) {
        super(player, board, x, y);
        this.type = ChessPiece.PAWN;
        this.img.onload = () => {
            this.draw();
        };
        this.img.src = "./imgs/ChessPiecesVector.svg";
        this.imgIndex = {
            row: 0,
            col: 5
        };
        if (this.isWhitePiece()) {
            this.imgIndex.row = 0;
        }
        else {
            this.imgIndex.row = 1;
        }
        this.pieceSquareTable = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [5, 5, 10, 25, 25, 10, 5, 5],
            [0, 0, 0, 20, 20, 0, 0, 0],
            [5, -5, -10, 0, 0, -10, -5, 5],
            [5, 10, 10, -20, -20, 10, 10, 5],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }
    updateValidMoves() {
        let avaliableMoves = [];
        let gap = 1;
        if (!this.hasMoved) {
            gap = 2;
        }
        if (this.isWhitePiece()) {
            // Capture Pieces Diagonally
            let up = this.y - 1;
            let left = this.x - 1;
            let right = this.x + 1;
            let leftPiece, rightPiece, frontPiece;
            if (up >= 0 && up <= 7) {
                if (left >= 0) {
                    leftPiece = this.boardState[up][left].getPiece();
                    let endSquare = new Square(left, up, null);
                    if (leftPiece != null && leftPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
                if (right <= 7) {
                    rightPiece = this.boardState[up][right].getPiece();
                    let endSquare = new Square(right, up, null);
                    if (rightPiece != null && rightPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
            }
            // Move toward black side
            for (let row = this.y - 1; row >= this.y - gap; row--) {
                if (row < 0 || row > 7) {
                    continue;
                }
                frontPiece = this.boardState[row][this.x].getPiece();
                let endSquare = new Square(this.x, row, null);
                if (frontPiece != null) {
                    break;
                }
                avaliableMoves.push(endSquare);
            }
        }
        else {
            // Capture Pieces Diagonally
            let down = this.y + 1;
            let left = this.x - 1;
            let right = this.x + 1;
            let leftPiece, rightPiece, frontPiece;
            if (down >= 0 && down <= 7) {
                if (left >= 0) {
                    leftPiece = this.boardState[down][left].getPiece();
                    let endSquare = new Square(left, down, null);
                    if (leftPiece != null && leftPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
                if (right <= 7) {
                    rightPiece = this.boardState[down][right].getPiece();
                    let endSquare = new Square(right, down, null);
                    if (rightPiece != null && rightPiece.isWhitePiece() != this.isWhitePiece()) {
                        avaliableMoves.push(endSquare);
                    }
                }
            }
            // Move toward black side
            for (let row = this.y + 1; row <= this.y + gap; row++) {
                if (row < 0 || row > 7) {
                    continue;
                }
                frontPiece = this.boardState[row][this.x].getPiece();
                let endSquare = new Square(this.x, row, null);
                if (frontPiece != null) {
                    break;
                }
                avaliableMoves.push(endSquare);
            }
        }
        this.validMoves = avaliableMoves;
    }
}
