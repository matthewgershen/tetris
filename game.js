const Block = require("./block");
const Piece = require("./piece");

class Game{
  constructor(canvas,ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.activePiece = [];
    this.staticPieces = [];
    this.createPiece = this.createPiece.bind(this);
    this.collisionHandling = this.collisionHandling.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);
    this.pieceCollision = this.pieceCollision.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.movePiece = this.movePiece.bind(this);
  }



  draw(){
    if (this.activePiece.length === 0) {
      this.createPiece();
    }
    this.collisionHandling();
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.activePiece.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
    this.staticPieces.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
  }

  nextType(){
    const types = ["i","o","t","s","z","j","l"]
    return types[Math.floor(Math.random() * types.length)];
  }

  createPiece(){
    const piece = new Piece;
    const blocks = piece.addPiece(this.nextType());
    this.activePiece = blocks;
  }

  collisionHandling(){
    if (this.collisionCheck()) {
      this.activePiece.forEach((block)=>{
        block.dy = 0;
        this.staticPieces.push(block);
      });
      this.activePiece = [];
    }
  }

  collisionCheck(){
    let result = false;
    this.activePiece.forEach((block)=>{
      if (block.y >= 760) {
        result = true;
      } else if (this.pieceCollision(block)){
        result = true;
      }
    });
    return result;
  }

  pieceCollision(block){
    let result = false;
    this.staticPieces.forEach((staticBlock)=>{
      if (
        block.y >= staticBlock.y - 40
      ) {
        result = true;
      }
    });
    return result;
  }

  movePiece(move){
    let outOfBounds = false
    this.activePiece.forEach((block)=>{
      let pos = block.x;
      if (pos + move < 0 || pos + move > 360) {
        outOfBounds = true
      }
    });
    if (outOfBounds === false) {
      this.activePiece.forEach((block)=>{
        block.x += move;
      });
    }
  }

  keydownHandler(e){
    if (e.keyCode === 39) {
      this.movePiece(40);
    } else if (e.keyCode === 37) {
      this.movePiece(-40);
    }

  }
}


module.exports = Game;
