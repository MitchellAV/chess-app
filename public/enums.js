export var ChessPiece;
(function (ChessPiece) {
    ChessPiece[ChessPiece["KING"] = 0] = "KING";
    ChessPiece[ChessPiece["QUEEN"] = 1] = "QUEEN";
    ChessPiece[ChessPiece["ROOK"] = 2] = "ROOK";
    ChessPiece[ChessPiece["KNIGHT"] = 3] = "KNIGHT";
    ChessPiece[ChessPiece["BISHOP"] = 4] = "BISHOP";
    ChessPiece[ChessPiece["PAWN"] = 5] = "PAWN";
    ChessPiece[ChessPiece["UNASSIGNED"] = 6] = "UNASSIGNED";
})(ChessPiece || (ChessPiece = {}));
export var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["ACTIVE"] = 0] = "ACTIVE";
    GameStatus[GameStatus["BLACK_WIN"] = 1] = "BLACK_WIN";
    GameStatus[GameStatus["WHITE_WIN"] = 2] = "WHITE_WIN";
    GameStatus[GameStatus["FORFEIT"] = 3] = "FORFEIT";
    GameStatus[GameStatus["STALEMATE"] = 4] = "STALEMATE";
    GameStatus[GameStatus["RESIGNATION"] = 5] = "RESIGNATION";
})(GameStatus || (GameStatus = {}));
