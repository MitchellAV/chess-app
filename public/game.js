import { Board } from "./board.js";
import { Move } from "./move.js";
import { GameStatus, ChessPiece } from "./enums.js";
export class Game {
    constructor(player1, player2) {
        if (player1.isWhitePlayer()) {
            this.currentTurn = player1;
            this.whitePlayer = player1;
            this.blackPlayer = player2;
        }
        else {
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
    setGameStatus(status) {
        this.gameStatus = status;
    }
    getCurrentTurn() {
        return this.currentTurn;
    }
    getBoard() {
        return this.board;
    }
    getNextTurn(currentTurn) {
        if (currentTurn == this.blackPlayer) {
            return this.whitePlayer;
        }
        else {
            return this.blackPlayer;
        }
    }
    movePiece(board, startPiece, end) {
        board
            .getBoardState()[startPiece.getY()][startPiece.getX()].setPiece(null);
        board.getBoardState()[end.getY()][end.getX()].setPiece(startPiece);
        startPiece.setX(end.getX());
        startPiece.setY(end.getY());
        startPiece.setPieceMoved(true);
        startPiece.updateValue(startPiece.getX(), startPiece.getY());
        board.updateAllValidMoves();
    }
    playerMove(player, start, end) {
        if (this.gameStatus != GameStatus.ACTIVE)
            return;
        let startPiece = this.board
            .getBoardState()[start.getY()][start.getX()].getPiece();
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
            if (startPiece.getType() === ChessPiece.KING &&
                startPiece.hasPieceMoved() === false) {
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
                    }
                    else if (end.getX() == 6) {
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
                    }
                    else if (end.getX() == 6) {
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
            this.movePiece(this.board, startPiece, end);
            console.log(this.board.getBoardState());
            let lastMove = move.getPieceCaptured();
            if (lastMove != null) {
                if (lastMove.getType() == ChessPiece.KING) {
                    if (player.isWhitePlayer()) {
                        this.setStatus(GameStatus.WHITE_WIN);
                    }
                    else {
                        this.setStatus(GameStatus.BLACK_WIN);
                    }
                }
            }
            if (this.currentTurn == this.whitePlayer) {
                this.currentTurn = this.blackPlayer;
            }
            else {
                this.currentTurn = this.whitePlayer;
            }
            if (!this.currentTurn.isHumanPlayer()) {
                this.randomMove(this.currentTurn);
            }
            this.board.updateCanvas();
        }
    }
    setStatus(status) {
        this.gameStatus = status;
    }
    randomMove(computer) {
        function random_item(items) {
            return items[Math.floor(Math.random() * items.length)];
        }
        if (computer.getActivePieces().length != 0) {
            let startPiece = random_item(computer.getActivePieces());
            if (startPiece.getValidMoves().length != 0) {
                let startMove = this.board.getBoardState()[startPiece.getY()][startPiece.getX()];
                let endPiece = random_item(startPiece.getValidMoves());
                let endMove = this.board.getBoardState()[endPiece.getY()][endPiece.getX()];
                this.playerMove(computer, startMove, endMove);
            }
            else {
                this.randomMove(computer);
            }
        }
    }
}
