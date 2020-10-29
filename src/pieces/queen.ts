import { Square } from "../square.js";
import { Board } from "../board.js";
import { Player } from "../player.js";
import { Piece } from "../piece.js";
import { ChessPiece } from "../enums.js";

export class Queen extends Piece {
	constructor(player: Player, board: Board, x: number, y: number) {
		super(player, board, x, y);
		this.type = ChessPiece.QUEEN;
		this.img.onload = () => {
			this.draw();
		};
		this.img.src = "./imgs/ChessPiecesVector.svg";
		this.imgIndex = {
			row: 0,
			col: 1
		};
		if (this.isWhitePiece()) {
			this.imgIndex.row = 0;
		} else {
			this.imgIndex.row = 1;
		}
		this.pieceSquareTable = [
			[-20, -10, -10, -5, -5, -10, -10, -20],
			[-10, 0, 0, 0, 0, 0, 0, -10],
			[-10, 0, 5, 5, 5, 5, 0, -10],
			[-5, 0, 5, 5, 5, 5, 0, -5],
			[0, 0, 5, 5, 5, 5, 0, -5],
			[-10, 5, 5, 5, 5, 5, 0, -10],
			[-10, 0, 5, 0, 0, 0, 0, -10],
			[-20, -10, -10, -5, -5, -10, -10, -20]
		];
	}

	updateValidMoves() {
		let avaliableMoves:Square[] = [];
		avaliableMoves = this.straightMoves(avaliableMoves, this);
		avaliableMoves = this.diagonalMoves(avaliableMoves, this);
		this.validMoves = avaliableMoves;
	}
}
