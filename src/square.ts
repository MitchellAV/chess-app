import { Piece } from './piece.js';

export class Square {
	private y: number;
	private x: number;
	private piece: Piece | null;

	constructor(x: number, y: number, piece: Piece | null) {
		this.x = x;
		this.y = y;
		this.piece = piece;
	}

	getY() {
		return this.y;
	}
	
	setY(y: number) {
		this.y = y;
	}

	getX() {
		return this.x;
	}

	setX(x: number) {
		this.x = x;
	}

	getPiece() {
		return this.piece;
	}
	
	setPiece(piece: Piece | null) {
		this.piece = piece;
	}
}
