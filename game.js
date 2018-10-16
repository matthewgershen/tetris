const Block = require("./block");
const Piece = require("./piece");

class Game{
  constructor(canvas,ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.activePiece = []
    this.blocks = [];
  }



  draw(){
    if (this.activePiece.length === 0) {
      debugger
      const piece = new Piece;
      const blocks = piece.addPiece("i");
      this.activePiece = blocks;
    }
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.activePiece.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
  }
}


module.exports = Game;
