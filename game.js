const Block = require("./block");
const Piece = require("./piece");

class Game{
  constructor(canvas,ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.activePiece = [];
    this.activePieceRotate = 0;
    this.activePieceRotate = "";
    this.staticPieces = [];
    this.createPiece = this.createPiece.bind(this);
    this.collisionHandling = this.collisionHandling.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);
    this.pieceCollision = this.pieceCollision.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.sideBoundaryCheck = this.sideBoundaryCheck.bind(this);
    this.sideBlockCheck = this.sideBlockCheck.bind(this);
    this.rotate = this.rotate.bind(this);
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
    // const types = ["i","o","t","s","z","j","l"];
    // return types[Math.floor(Math.random() * types.length)];
    return "s"

  }

  createPiece(){
    const piece = new Piece;
    const type = this.nextType();
    const blocks = piece.addPiece(type);
    this.activePiece = blocks;
    this.activePieceRotate = 0;
    this.activePieceType = type;
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
        (block.x < staticBlock.x + staticBlock.width &&
         block.x + block.width > staticBlock.x &&
         block.y < staticBlock.y + staticBlock.height + 1 &&
         block.y + block.height + 1 > staticBlock.y)
      ) {
        result = true;
      }
    });
    return result;
  }


  sideBoundaryCheck(move){
    let result = false;
    this.activePiece.forEach((block)=>{
      let pos = block.x;
      if (pos + move < 0 || pos + move > 360) {
        result = true;
      }
    });
    return result;
  }

  sideBlockCheck(move){

    let result = false;
    this.activePiece.forEach((block)=>{
      let hypotheticalBlock = new Block({x:block.x + move,y:block.y,width: 40, height: 40});
      if (this.pieceCollision(hypotheticalBlock)) {
        result = true;
      }
    });
    return result;
  }

  movePiece(move){
    let outOfBounds = false;
    outOfBounds = this.sideBoundaryCheck(move);

    let sideBlocked = false;
    sideBlocked = this.sideBlockCheck(move);
    if (outOfBounds === false && sideBlocked === false) {
      this.activePiece.forEach((block)=>{
        block.x += move;
      });
    }
  }

  rotate(){
    const rotations = {
      "i":
        { 0:[[-80,60],[-40,20],[0,-20],[40,-60]],
          1:[[80,-60],[40,-20],[0,20],[-40,60]],
          2:[[-80,60],[-40,20],[0,-20],[40,-60]],
          3:[[80,-60],[40,-20],[0,20],[-40,60]]},
      "o":
        { 0:[[0,0],[0,0],[0,0],[0,0]],
          1:[[0,0],[0,0],[0,0],[0,0]],
          2:[[0,0],[0,0],[0,0],[0,0]],
          3:[[0,0],[0,0],[0,0],[0,0]]},
      "t":
        { 0:[[40,40],[0,0],[0,0],[0,0]],
          1:[[-40,-40],[0,80],[0,0],[0,0]],
          2:[[0,0],[0,-80],[0,0],[-40,40]],
          3:[[0,0],[0,0],[0,0],[40,-40]]},
      "s":
        { 0:[[40,0],[0,-40],[-40,0],[-80,-40]],
          1:[[-40,0],[0,40],[40,0],[80,40]],
          2:[[40,0],[0,-40],[-40,0],[-80,-40]],
          3:[[-40,0],[0,40],[40,0],[80,40]]},
      "z":
        { 0:[[-80,60],[-40,20],[0,-20],[40,-60]],
          1:[[80,-60],[40,-20],[0,20],[-40,60]],
          2:[[-80,60],[-40,20],[0,-20],[40,-60]],
          3:[[80,-60],[40,-20],[0,20],[-40,60]]},
      "j":
        { 0:[[-80,60],[-40,20],[0,-20],[40,-60]],
          1:[[80,-60],[40,-20],[0,20],[-40,60]],
          2:[[-80,60],[-40,20],[0,-20],[40,-60]],
          3:[[80,-60],[40,-20],[0,20],[-40,60]]},
      "l":
        { 0:[[-80,60],[-40,20],[0,-20],[40,-60]],
          1:[[80,-60],[40,-20],[0,20],[-40,60]],
          2:[[-80,60],[-40,20],[0,-20],[40,-60]],
          3:[[80,-60],[40,-20],[0,20],[-40,60]]},


    };
    let rotate = rotations[this.activePieceType][this.activePieceRotate];
    debugger
    for (var i = 0; i < rotate.length; i++) {
      this.activePiece[i].x += rotate[i][0];
      this.activePiece[i].y += rotate[i][1];
    }
    debugger
    this.activePieceRotate = (this.activePieceRotate + 1)%4;

  }

  keydownHandler(e){
    if (e.keyCode === 39) {
      this.movePiece(40);
    } else if (e.keyCode === 37) {
      this.movePiece(-40);
    } else if (e.keyCode === 40) {
      this.activePiece.forEach((block)=>{
        block.y += 10;
      });
    } else if (e.keyCode === 38) {
      this.rotate();

    }

  }
}


module.exports = Game;
