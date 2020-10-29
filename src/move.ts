import { Square } from "./square.js";
import { Piece } from "./piece.js";
import { Player } from "./player.js";

export class Move {
	private start: Square;
	private end: Square;
	private pieceMoved: Piece | null;
	private pieceCaptured: Piece | null;
	private player: Player;

	constructor(player: Player, start: Square, end: Square) {
		this.player = player;
		this.start = start;
		this.end = end;
		this.pieceMoved = start.getPiece();
		this.pieceCaptured = end.getPiece();
		if (this.pieceCaptured != null) {
			player.addCapturedPiece(this.pieceCaptured);
			let opponent = end.getPiece()!.getPlayer();
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
	setPieceCaptured(square: Square) {
		this.pieceCaptured = square.getPiece();
	}
}
