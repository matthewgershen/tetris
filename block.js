class Block{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.colors = options.colors;
  }

  drawBlock(ctx){
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.colors[0];
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.rect(this.x+4, this.y+4, this.width-8, this.height-8);
      ctx.fillStyle = this.colors[1];
      ctx.fill();
      ctx.closePath();
    }

}

module.exports = Block;
