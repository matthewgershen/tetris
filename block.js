class Block{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.dy = options.dy;
  }

  drawBlock(ctx){
      this.y += this.dy;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    }

}

module.exports = Block;
