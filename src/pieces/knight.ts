import { Square } from "../square.js";
import { Board } from "../board.js";
import { Player } from "../player.js";
import { Piece } from "../piece.js";
import { ChessPiece } from "../enums.js";

export class Knight extends Piece {
	constructor(player: Player, board: Board, x: number, y: number) {
		super(player, board, x, y);
		this.type = ChessPiece.KNIGHT;
		this.img.onload = () => {
			this.draw();
		};
		this.img.src = "./imgs/ChessPiecesVector.svg";
		this.imgIndex = {
			row: 0,
			col: 3
		};
		if (this.isWhitePiece()) {
			this.imgIndex.row = 0;
		} else {
			this.imgIndex.row = 1;
		}
		this.pieceSquareTable = [
			[-50, -40, -30, -30, -30, -30, -40, -50],
			[-40, -20, 0, 0, 0, 0, -20, -40],
			[-30, 0, 10, 15, 15, 10, 0, -30],
			[-30, 5, 15, 20, 20, 15, 5, -30],
			[-30, 0, 15, 20, 20, 15, 0, -30],
			[-30, 5, 10, 15, 15, 10, 5, -30],
			[-40, -20, 0, 5, 5, 0, -20, -40],
			[-50, -40, -30, -30, -30, -30, -40, -50]
		];
	}

	updateValidMoves() {
		let avaliableMoves = [];
		for (let row = this.y - 2; row <= this.y + 2; row++) {
			if (row < 0 || row > 7) {
				continue;
			}
			for (let col = this.x - 2; col <= this.x + 2; col++) {
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
				let dist = Math.abs(this.x - col) + Math.abs(this.y - row);

				if (dist == 3 && !(this.x == col || this.y == row)) {
					avaliableMoves.push(endSquare);
				}
			}
		}
		this.validMoves = avaliableMoves;
	}
}
