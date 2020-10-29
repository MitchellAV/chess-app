import { Square } from "./square.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { Piece } from "./piece.js";
import { Move } from "./move.js";
import { GameStatus, ChessPiece } from "./enums.js";

export class Game {
	private board: Board;
	private currentTurn: Player;
	private gameStatus: GameStatus;
	private moveList: Move[];
	private whitePlayer: Player;
	private blackPlayer: Player;

	constructor(player1: Player, player2: Player) {
		if (player1.isWhitePlayer()) {
			this.currentTurn = player1;
			this.whitePlayer = player1;
			this.blackPlayer = player2;
		} else {
			this.currentTurn = player2;
			this.whitePlayer = player2;
			this.blackPlayer = player1;
		}

		this.board = new Board(this.whitePlayer, this.blackPlayer);

		this.gameStatus = GameStatus.ACTIVE;
		this.moveList = [];
	}

	initGame() {
		this.board.drawBoard();
		this.board.initDrawPieces();
		this.board.updateAllValidMoves();
	}

	getMoveList() {
		return this.moveList;
	}

	getGameStatus() {
		return this.gameStatus;
	}
	setGameStatus(status: GameStatus) {
		this.gameStatus = status;
	}
	getCurrentTurn() {
		return this.currentTurn;
	}

	getBoard() {
		return this.board;
	}

	makeMove(player: Player, start: Square, end: Square) {
		let startPiece = this.board
			.getBoardState()
			[start.getY()][start.getX()].getPiece();
		if (startPiece === null) {
			return;
		}
		if (player != this.currentTurn) {
			return;
		}
		if (startPiece.isValidMove(end)) {
			let move = new Move(player, start, end);
			this.moveList.push(move);
			// Castling
			if (startPiece.getType() === ChessPiece.KING && startPiece.hasPieceMoved() === false) {
				if (end.getY() == 7) {
					if (end.getX() == 2) {
						let rook = this.board.getBoardState()[7][0].getPiece();
						if (rook != null) {
							rook.setPieceMoved(true);
							rook.setX(3);
							rook.setY(7);
							this.board.getBoardState()[7][0].setPiece(null);
							this.board.getBoardState()[7][3].setPiece(rook);
						}
					} else if (end.getX() == 6) {
						let rook = this.board.getBoardState()[7][7].getPiece();
						if (rook != null) {
							rook.setPieceMoved(true);
							rook.setX(5);
							rook.setY(7);
							this.board.getBoardState()[7][7].setPiece(null);
							this.board.getBoardState()[7][5].setPiece(rook);
						}
					}
				}
				if (end.getY() == 0) {
					if (end.getX() == 2) {
						let rook = this.board.getBoardState()[0][0].getPiece();
						if (rook != null) {
							rook.setPieceMoved(true);
							rook.setX(3);
							rook.setY(0);
							this.board.getBoardState()[0][0].setPiece(null);
							this.board.getBoardState()[0][3].setPiece(rook);
						}
					} else if (end.getX() == 6) {
						let rook = this.board.getBoardState()[0][7].getPiece();
						if (rook != null) {
							rook.setPieceMoved(true);
							rook.setX(5);
							rook.setY(0);
							this.board.getBoardState()[0][7].setPiece(null);
							this.board.getBoardState()[0][5].setPiece(rook);
						}
					}
				}
			}

			startPiece.setPieceMoved(true);
			startPiece.setX(end.getX());
			startPiece.setY(end.getY());
			this.board.getBoardState()[start.getY()][start.getX()].setPiece(null);
			this.board.getBoardState()[end.getY()][end.getX()].setPiece(startPiece);
			this.board.updateAllValidMoves();
			startPiece.updateValue(startPiece.getX(), startPiece.getY());
			// console.log(this.board.boardState);
			let lastMove = move.getPieceCaptured();
			if (lastMove != null) {
				if (lastMove.getType() == ChessPiece.KING) {
					if (player.isWhitePlayer()) {
						this.setStatus(GameStatus.WHITE_WIN);
					} else {
						this.setStatus(GameStatus.BLACK_WIN);
					}
				}
			}

			if (this.currentTurn == this.whitePlayer) {
				this.currentTurn = this.blackPlayer;
			} else {
				this.currentTurn = this.whitePlayer;
			}
			
			if (!this.currentTurn.isHumanPlayer()) {
				this.randomMove(this.currentTurn);
			}
			this.board.updateCanvas();
		}
	}

	setStatus(status: GameStatus) {
		console.log(status);
	}

	randomMove(computer: Player) {
		function random_item(items: any[]) {
			return items[Math.floor(Math.random() * items.length)];
		}
		if (computer.getActivePieces().length != 0) {
			let startPiece: Piece = random_item(computer.getActivePieces());
			if (startPiece.getValidMoves().length != 0) {
				let startMove = this.board.getBoardState()[startPiece.getY()][startPiece.getX()];
				let endPiece: Piece = random_item(startPiece.getValidMoves());
				let endMove = this.board.getBoardState()[endPiece.getY()][endPiece.getX()];
				this.makeMove(computer, startMove, endMove);
			} else {
				this.randomMove(computer);
			}
		}
	}

	// minimax(board: Board, depth: number, maximizingPlayer: boolean) {
	// 	// if depth == 0 or game over in position
	// 	if (depth == 0) {
	// 		// 		return static evaluation of position
	// 		return board.evalBoard();
	// 	}

	// 	// if maximizingPlayer
	// 	if (maximizingPlayer) {

	// 		let maxEval = -Infinity;
	// 		// 	for each child of position
	// 		board.whitePlayer.activePieces.forEach(piece => {
	// 			piece.validMoves.forEach(square => {
	// 				// make a move
	// 				let start = {
	// 					x: piece.x,
	// 					y: piece.y
	// 				};

	// 				piece.x = square.x;
	// 				piece.y = square.y;
	// 				board.boardState[start.y][start.x].setPiece(null);
	// 				board.boardState[square.y][square.x].setPiece(piece);
	// 				board.updateAllValidMoves();
	// 				piece.updateValue(piece.x, piece.y);

	// 				let eval = this.minimax(board, depth - 1, false);
	// 				maxEval = Math.max(maxEval, eval);
	// 				// 		alpha = max(alpha, eval)
	// 				// 		if beta <= alpha
	// 				// 			break
	// 				return maxEval;
	// 			});
	// 		});
	// 	}

	// 	else {

	// 		let minEval = Infinity;
	// 		// 	for each child of position
	// 		board.whitePlayer.activePieces.forEach(piece => {
	// 			piece.validMoves.forEach(square => {
	// 				// make a move
	// 				let start = {
	// 					x: piece.x,
	// 					y: piece.y
	// 				};

	// 				piece.x = square.x;
	// 				piece.y = square.y;
	// 				board.boardState[start.y][start.x].setPiece(null);
	// 				board.boardState[square.y][square.x].setPiece(piece);
	// 				board.updateAllValidMoves();
	// 				piece.updateValue(piece.x, piece.y);

	// 				let eval = this.minimax(board, depth - 1, true);
	// 				minEval = Math.min(minEval, eval);
	// 				// 		beta = min(beta, eval)
	// 				// 		if beta <= alpha
	// 				// 			break
	// 				return minEval;
	// 			});
	// 		});
	// 	}
	// }
}
