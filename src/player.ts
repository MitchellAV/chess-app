import { Piece } from "./piece.js";

export class Player {
	private isHuman: boolean;
	private isWhite: boolean;
	private score: number;
	private activePieces: Piece[];
	private capturedPieces: Piece[];

	constructor(isHuman: boolean, isWhite: boolean) {
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

	addCapturedPiece(piece: Piece) {
		this.capturedPieces.push(piece);
	}
	removeCapturedPiece(piece: Piece) {
		this.capturedPieces = this.capturedPieces.filter((capturedPiece) => {
			return capturedPiece != piece;
		});
	}

	addActivePiece(piece: Piece) {
		this.activePieces.push(piece);
	}
	removeActivePiece(piece: Piece) {
		this.activePieces = this.activePieces.filter((activePiece) => {
			return activePiece != piece;
		});
	}
}
