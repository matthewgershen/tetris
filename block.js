class Block{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.dy = options.dy;
  }

  drawBlock(ctx){
      this.y += this.dy;
      ctx.beginPath();
      ctx.rect(this.x, this.y, 40, 40);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    }

}

module.exports = Block;
