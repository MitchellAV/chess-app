"use strict";

exports.__esModule = true;

var square_js_1 = require("./square.js");

var game_js_1 = require("./game.js");

var player_js_1 = require("./player.js");

var c = require("./constants.js");

var chessboard = document.getElementById("chessboard");
chessboard.style.cssText = "width: " + c.GAME_SIZE + "px;height:" + c.GAME_SIZE + "px;";
var player1 = new player_js_1.Player(true, true);
var player2 = new player_js_1.Player(false, false);
var game = new game_js_1.Game(player1, player2);
game.initGame();
var start = new square_js_1.Square(0, 0, null);
var end = new square_js_1.Square(0, 0, null);
var clicked = false;
var clickedPiece;
chessboard.addEventListener("mousedown", function (e) {
  var canvasPos = {
    x: chessboard.getBoundingClientRect().left + window.pageXOffset,
    y: chessboard.getBoundingClientRect().top + window.pageYOffset
  };
  var mouse = {
    x: Math.floor((e.pageX - canvasPos.x) / c.TILE_SIZE),
    y: Math.floor((e.pageY - canvasPos.y) / c.TILE_SIZE)
  };

  if (clicked === false) {
    start.setX(mouse.x);
    start.setY(mouse.y);
    start.setPiece(game.getBoard().getPiece(start));
    clicked = true;
    clickedPiece = game.getBoard().getPieceColor(start);

    if (clickedPiece == game.getCurrentTurn().isWhitePlayer()) {
      // highlight spaces to move to
      game.getBoard().highlightMoves(start);
    }
  }
});
chessboard.addEventListener("mouseup", function (e) {
  var canvasPos = {
    x: chessboard.getBoundingClientRect().left + window.pageXOffset,
    y: chessboard.getBoundingClientRect().top + window.pageYOffset
  };
  var mouse = {
    x: Math.floor((e.pageX - canvasPos.x) / c.TILE_SIZE),
    y: Math.floor((e.pageY - canvasPos.y) / c.TILE_SIZE)
  };

  if (clicked == true) {
    end.setX(mouse.x);
    end.setY(mouse.y);
    end.setPiece(game.getBoard().getPiece(end));

    if (clickedPiece == game.getCurrentTurn().isWhitePlayer()) {
      game.playerMove(game.getCurrentTurn(), start, end);
    } // move piece and update board
    // console.log(start, end);


    game.getBoard().updateCanvas();
    clicked = false;
  }
});