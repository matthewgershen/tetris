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
    this.ticker = 0;
    this.dropSpeed = 40;
    this.linesToErase = [];
    this.createPiece = this.createPiece.bind(this);
    this.collisionHandling = this.collisionHandling.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);
    this.pieceCollision = this.pieceCollision.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.sideBoundaryCheck = this.sideBoundaryCheck.bind(this);
    this.sideBlockCheck = this.sideBlockCheck.bind(this);
    this.rotate = this.rotate.bind(this);
    this.lineCheck = this.lineCheck.bind(this);
    this.keyupHandler = this.keyupHandler.bind(this);
    this.lineErase = this.lineErase.bind(this);
  }



  draw(){
    this.lineCheck();
    if (this.linesToErase.length > 0) {
      this.lineErase();
    }
    this.ticker++;
    if (this.activePiece.length === 0) {
      this.createPiece();
    }
    this.collisionHandling();
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    if (this.ticker === this.dropSpeed) {
      this.activePiece.forEach((block)=>{
        block.y += 20;
      });
      this.ticker = 0;
    }
    this.activePiece.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
    this.staticPieces.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
  }

  nextType(){
    const types = ["i","o","t","s","z","j","l"];
    return types[Math.floor(Math.random() * types.length)];
  }

  createPiece(){
    const piece = new Piece;
    const type = this.nextType();
    const blocks = piece.addPiece(type);
    this.activePiece = blocks;
    this.activePieceRotate = 0;
    this.activePieceType = type;

  }
  lineCheck(){
    let hash = {};
    this.staticPieces.forEach((block)=>{
      if (hash[block.y]) {
        hash[block.y]++;
      } else {
        hash[block.y] = 1;
      }
    });
    let result = Object.entries(hash).filter(pair => pair[1] === 10);
    let lines = [];
    result.forEach((pair)=>{
      lines.push(parseInt(pair[0]));
    });
    this.linesToErase = lines.sort();
  }

  lineErase(){
    this.linesToErase.forEach((line)=>{
      this.staticPieces = this.staticPieces.filter(block => block.y !== line)
      this.staticPieces.forEach((block)=>{
        if (block.y < line) {
          block.y += 40;
        }
      });
    });
  }

  collisionHandling(){
    if (this.collisionCheck()) {
      this.activePiece.forEach((block)=>{
        this.staticPieces.push(block);
      });
      this.activePiece = [];
      this.lineCheck();
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
        { 0:[[80,-40],[40,0],[0,-40],[-40,0]],
          1:[[-80,40],[-40,0],[0,40],[40,0]],
          2:[[80,-40],[40,0],[0,-40],[-40,0]],
          3:[[-80,40],[-40,0],[0,40],[40,0]]},
      "j":
        { 0:[[0,40],[40,0],[0,-40],[-40,-80]],
          1:[[40,0],[0,-40],[-40,0],[-80,40]],
          2:[[0,-40],[-40,0],[0,40],[40,80]],
          3:[[-40,0],[0,40],[40,0],[80,-40]]},
      "l":
        { 0:[[80,40],[40,0],[0,-40],[-40,0]],
          1:[[40,-80],[0,-40],[-40,0],[0,40]],
          2:[[-80,-40],[-40,0],[0,40],[40,0]],
          3:[[-40,80],[0,40],[40,0],[0,-40]]},


    };
    let rotate = rotations[this.activePieceType][this.activePieceRotate];
    for (var i = 0; i < rotate.length; i++) {
      this.activePiece[i].x += rotate[i][0];
      this.activePiece[i].y += rotate[i][1];
    }
    this.activePieceRotate = (this.activePieceRotate + 1)%4;

  }

  keydownHandler(e){
    if (e.keyCode === 39) {
      this.movePiece(40);
    } else if (e.keyCode === 37) {
      this.movePiece(-40);
    } else if (e.keyCode === 40) {
      this.ticker = 0;
      this.dropSpeed = 5;
    } else if (e.keyCode === 38) {
      this.rotate();

    }

  }

  keyupHandler(e){
    if (e.keyCode === 40) {
      this.dropSpeed = 40;
    }
  }
}


module.exports = Game;
