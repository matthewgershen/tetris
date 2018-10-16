class Game{
  constructor(canvas,ctx){
    this.ctx = ctx;
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.rect(20, 40, 50, 50);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
  }
}


module.exports = Game;
