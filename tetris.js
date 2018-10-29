const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  let game = new Game(canvas, ctx);
  const restart = document.getElementById("restart");

  document.addEventListener("keydown", game.keydownHandler);
  document.addEventListener("keyup", game.keyupHandler);
  game.drawSides();
  function drawFrame(){
    if (game.gameOver) return;
    if (game.restart) return;
    game.draw();
    requestAnimationFrame(drawFrame);
  }
  requestAnimationFrame(drawFrame);

  restart.addEventListener("click", (e)=>{
    document.getElementById("highScore").hidden = true;
    game = new Game(canvas, ctx);
    document.addEventListener("keydown", game.keydownHandler);
    document.addEventListener("keyup", game.keyupHandler);
    game.drawSides();
    function drawFrame(){
      if (game.gameOver) return;
      game.draw();
      requestAnimationFrame(drawFrame);
    }
    requestAnimationFrame(drawFrame);
  });

});
