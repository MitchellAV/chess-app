import { Square } from "../square.js";
import { Board } from "../board.js";
import { Player } from "../player.js";
import { Piece } from "../piece.js";

export class Rook extends Piece {
	constructor(player: Player, board: Board, x: number, y: number) {
		super(player, board, x, y);

		this.img.src = "./imgs/ChessPiecesVector.svg";
		this.img.onload = () => {
			this.draw();
		};

		this.imgIndex = {
			row: 0,
			col: 4
		};

		if (this.isWhitePiece()) {
			this.imgIndex.row = 0;
		} else {
			this.imgIndex.row = 1;
		}

		this.pieceSquareTable = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[5, 10, 10, 10, 10, 10, 10, 5],
			[-5, 0, 0, 0, 0, 0, 0, -5],
			[-5, 0, 0, 0, 0, 0, 0, -5],
			[-5, 0, 0, 0, 0, 0, 0, -5],
			[-5, 0, 0, 0, 0, 0, 0, -5],
			[-5, 0, 0, 0, 0, 0, 0, -5],
			[0, 0, 0, 5, 5, 0, 0, 0]
		];
	}

	updateValidMoves() {
		let avaliableMoves: Square[] = [];
		this.validMoves = this.straightMoves(avaliableMoves, this);
	}
}
