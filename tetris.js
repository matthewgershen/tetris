const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  let game = new Game(canvas, ctx);
  let animationId = null;
  const restart = document.getElementById("restart");

  const mute = document.getElementById("mute");
  const unmute = document.getElementById("unmute");
  mute.addEventListener("click", (e)=>{
    document.getElementById('background_audio').muted = true;
    document.getElementById('unmute').hidden = false;
    document.getElementById('mute').hidden = true;
  });
  unmute.addEventListener("click", (e)=>{
    document.getElementById('background_audio').muted = false;
    document.getElementById('unmute').hidden = true;
    document.getElementById('mute').hidden = false;
  });

  document.addEventListener("keydown", game.keydownHandler);
  document.addEventListener("keyup", game.keyupHandler);
  game.drawSides();
  function drawFrame(){
    if (game.gameOver) return;
    if (!game.pause) game.draw();
    animationId = requestAnimationFrame(drawFrame);
  }
  animationId = requestAnimationFrame(drawFrame);

  restart.addEventListener("click", (e)=>{
    cancelAnimationFrame(animationId);
    document.getElementById("highScore").hidden = true;
    document.getElementById("pause").hidden = true;
    game = new Game(canvas, ctx);
    document.addEventListener("keydown", game.keydownHandler);
    document.addEventListener("keyup", game.keyupHandler);
    game.drawSides();
    function drawFrame(){
      if (game.gameOver) return;
      if (!game.pause) game.draw();
      animationId = requestAnimationFrame(drawFrame);
    }
    animationId = requestAnimationFrame(drawFrame);
  });

});
