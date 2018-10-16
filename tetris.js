const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const game = new Game(canvas, ctx);

  document.addEventListener("keydown", game.keydownHandler);
  
  function drawFrame(){
    game.draw();
    requestAnimationFrame(drawFrame);
  }
  requestAnimationFrame(drawFrame);

});
