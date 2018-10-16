const Block = require("./block");
const Piece = require("./piece");

class Game{
  constructor(canvas,ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.activePiece = [];
    this.blocks = [];
    this.collisionHandling = this.collisionHandling.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);
  }



  draw(){
    if (this.activePiece.length === 0) {
      const piece = new Piece;
      const blocks = piece.addPiece(this.nextType());
      this.activePiece = blocks;
    }
    this.collisionHandling();
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.activePiece.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
  }

  nextType(){
    const types = ["i","o","t","s","z","j","l"]
    return types[Math.floor(Math.random() * types.length)];
  }

  collisionHandling(){
    debugger
    if (this.collisionCheck()) {
      this.activePiece.forEach((block)=>{
        block.dy = 0;
      });
    }
  }

  collisionCheck(){
    var result = false
    this.activePiece.forEach((block)=>{
      if (block.y >= 760) {
        result = true;
      }
    });
    return result
  }
}


module.exports = Game;
