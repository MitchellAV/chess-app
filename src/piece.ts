import { Square } from "./square.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { ChessPiece } from "./enums.js";
import * as c from "./constants.js";

export class Piece {
	protected isWhite: boolean;
	protected board: Board;
	protected x: number;
	protected y: number;
	protected hasMoved: boolean;
	protected isDead: boolean;
	protected validMoves: Square[];
	protected player: Player;
	protected value: number;
	protected boardState: Square[][];
	protected imgIndex: { row: number; col: number };
	protected img: HTMLImageElement;
	protected type: ChessPiece;
	protected pieceSquareTable: number[][];

	constructor(player: Player, board: Board, x: number, y: number) {
		this.isWhite = player.isWhitePlayer();
		this.player = player;
		this.board = board;
		this.boardState = this.board.getBoardState();
		this.pieceSquareTable = [];
		this.x = x;
		this.y = y;
		this.hasMoved = false;
		this.validMoves = [];
		this.value = 0;
		this.isDead = false;
		this.type = ChessPiece.ROOK;
		this.img = new Image();
		this.imgIndex = { row: 0, col: 0 };
	}

	draw() {
		c.ctx!.drawImage(
			this.img,
			this.imgIndex.col * c.IMG_SIZE,
			this.imgIndex.row * c.IMG_SIZE,
			c.IMG_SIZE,
			c.IMG_SIZE,
			this.x * c.TILE_SIZE,
			this.y * c.TILE_SIZE,
			c.TILE_SIZE,
			c.TILE_SIZE
		);
	}

	getPlayer() {
		return this.player;
	}

	updateValidMoves() {}

	updateValue(x: number, y: number) {
		if (this.isWhite) {
			this.value = this.pieceSquareTable[y][x];
		} else {
			this.value = this.pieceSquareTable[7 - y][x];
		}
	}

	isValidMove(end: Square) {
		for (let i = 0; i < this.validMoves.length; i++) {
			let move = this.validMoves[i];
			if (move.getX() === end.getX() && move.getY() === end.getY()) {
				return true;
			}
		}

		return false;
	}

	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	setX(x: number){
		this.x = x;
	}
	setY(y: number){
		this.y = y;
	}
	getType() {
		return this.type;
	}

	isPieceDead() {
		return this.isDead;
	}

	hasPieceMoved() {
		return this.hasMoved;
	}

	setPieceMoved(state: boolean){
		this.hasMoved = state;
	}

	getValidMoves() {
		return this.validMoves;
	}

	getValue() {
		return this.value;
	}

	isWhitePiece() {
		return this.isWhite;
	}
	pieceValue() {
		let pieceValue: number = 0;
		switch (this.getType()) {
			case ChessPiece.KING:
				pieceValue = 1000;
				break;
			case ChessPiece.QUEEN:
				pieceValue = 9;
				break;
			case ChessPiece.ROOK:
				pieceValue = 5;
				break;
			case ChessPiece.BISHOP:
				pieceValue = 3;
				break;
			case ChessPiece.KNIGHT:
				pieceValue = 3;
				break;
			case ChessPiece.PAWN:
				pieceValue = 1;
				break;
			default:
				break;
		}
		return pieceValue;
	}

	locationValue() {
		return (this.isWhite ? this.pieceSquareTable[this.y][this.x] : this.pieceSquareTable[7 - this.y][this.x]);
	}

	updatePieceValue() {
		this.value = this.pieceValue() + this.locationValue();
	}

	protected diagonalMoves(avaliableMoves: Square[],p: Piece){
		outer: for (let row = p.y - 1; row >= 0; row--) {
			if (row < 0 || row > 7) {
				break;
			}
			for (let col = p.x - 1; col >= 0; col--) {
				if (col < 0 || col > 7) {
					break;
				}
				if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
					continue;
				}
				let frontPiece = p.boardState[row][col].getPiece();
				let endSquare = new Square(col, row, null);
				if (frontPiece != null) {
					if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
						avaliableMoves.push(endSquare);
					}
	
					break outer;
				}
				avaliableMoves.push(endSquare);
			}
		}
		outer: for (let row = p.y - 1; row >= 0; row--) {
			if (row < 0 || row > 7) {
				break;
			}
			for (let col = p.x + 1; col < 8; col++) {
				if (col < 0 || col > 7) {
					break;
				}
				if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
					continue;
				}
				let frontPiece = p.boardState[row][col].getPiece();
				let endSquare = new Square(col, row, null);
				if (frontPiece != null) {
					if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
						avaliableMoves.push(endSquare);
					}
	
					break outer;
				}
				avaliableMoves.push(endSquare);
			}
		}
		outer: for (let row = p.y + 1; row < 8; row++) {
			if (row < 0 || row > 7) {
				break;
			}
			for (let col = p.x + 1; col < 8; col++) {
				if (col < 0 || col > 7) {
					break;
				}
				if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
					continue;
				}
				let frontPiece = p.boardState[row][col].getPiece();
				let endSquare = new Square(col, row, null);
				if (frontPiece != null) {
					if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
						avaliableMoves.push(endSquare);
					}
	
					break outer;
				}
				avaliableMoves.push(endSquare);
			}
		}
		outer: for (let row = p.y + 1; row < 8; row++) {
			if (row < 0 || row > 7) {
				break;
			}
			for (let col = p.x - 1; col >= 0; col--) {
				if (col < 0 || col > 7) {
					break;
				}
				if (Math.abs(p.x - col) != Math.abs(p.y - row)) {
					continue;
				}
				let frontPiece = p.boardState[row][col].getPiece();
				let endSquare = new Square(col, row, null);
				if (frontPiece != null) {
					if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
						avaliableMoves.push(endSquare);
					}
	
					break outer;
				}
				avaliableMoves.push(endSquare);
			}
		}
		return avaliableMoves;
	}
	protected straightMoves(avaliableMoves: Square[],p: Piece){
		for (let row = p.y - 1; row >= 0; row--) {
			if (row < 0 || row > 7) {
				break;
			}
			let frontPiece = p.boardState[row][p.x].getPiece();
			let endSquare = new Square(p.x, row, null);
			if (frontPiece != null) {
				if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
					avaliableMoves.push(endSquare);
				}

				break;
			}
			avaliableMoves.push(endSquare);
		}
		for (let col = p.x - 1; col >= 0; col--) {
			if (col < 0 || col > 7) {
				break;
			}
			let frontPiece = p.boardState[p.y][col].getPiece();
			let endSquare = new Square(col, p.y, null);
			if (frontPiece != null) {
				if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
					avaliableMoves.push(endSquare);
				}

				break;
			}
			avaliableMoves.push(endSquare);
		}
		for (let row = p.y + 1; row < 8; row++) {
			if (row < 0 || row > 7) {
				break;
			}
			let frontPiece = p.boardState[row][p.x].getPiece();
			let endSquare = new Square(p.x, row, null);
			if (frontPiece != null) {
				if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
					avaliableMoves.push(endSquare);
				}

				break;
			}
			avaliableMoves.push(endSquare);
		}
		for (let col = p.x + 1; col < 8; col++) {
			if (col < 0 || col > 7) {
				break;
			}
			let frontPiece = p.boardState[p.y][col].getPiece();
			let endSquare = new Square(col, p.y, null);
			if (frontPiece != null) {
				if (frontPiece.isWhitePiece() != p.isWhitePiece()) {
					avaliableMoves.push(endSquare);
				}

				break;
			}
			avaliableMoves.push(endSquare);
		}
		return avaliableMoves;
	}
}
