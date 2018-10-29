const Block = require("./block");
const Piece = require("./piece");

class Game{
  constructor(canvas,ctx){
    this.ctx = ctx;
    this.canvas = canvas;
    this.createSides = this.createSides.bind(this);
    this.sides = this.createSides();
    this.activePiece = [];
    this.activePieceRotate = 0;
    this.activePieceType = "";
    this.nextPiece = [];
    this.nextPieceRotate = 0;
    this.nextPieceType = "";
    this.staticPieces = [];
    this.ticker = 0;
    this.linesToErase = [];
    this.score = 0;
    this.linesCleared = 0;
    this.level = 0;
    this.pause = false;
    this.dropSpeed = (60-this.level) > 5 ? (60-this.level) : 5;
    this.gameOver = false;
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
    this.rotationCollisionCheck = this.rotationCollisionCheck.bind(this);
    this.scoringAndLevel = this.scoringAndLevel.bind(this);
    this.drawSides = this.drawSides.bind(this);
    this.drawScoresLevels = this.drawScoresLevels.bind(this);
    this.gameOverCheck = this.gameOverCheck.bind(this);
  }



  draw(){
    
    this.lineCheck();
    if (this.linesToErase.length > 0) {
      this.lineErase();
    }
    this.ticker++;
    this.gameOverCheck();
    if (this.activePiece.length === 0) {

      this.nextPiece.forEach((block)=>{
        if (block.x === 735 || block.x === 765) {
          block.x -= 315
          block.y -= 435;
        } else {
          block.x -= 300;
          block.y -= 435;
        }
      });
      this.activePiece = this.nextPiece;
      this.activePieceRotate = this.nextPieceRotate;
      this.activePieceType = this.nextPieceType;
      this.createPiece();
    }
    this.collisionHandling();
    this.ctx.clearRect(300,0,300,600);
    this.ctx.clearRect(690,390,150,150);
    this.ctx.clearRect(690,60,150,60);
    this.ctx.clearRect(690,210,150,60);
    if (this.ticker === this.dropSpeed) {
      this.activePiece.forEach((block)=>{
        block.y += 30;
      });
      this.ticker = 0;
    }
    this.activePiece.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
    this.staticPieces.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
    this.nextPiece.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
    this.drawScoresLevels();
  }

  createSides(){
    const sides = [];
    for (var i = 0; i < 270; i +=30) {
      for (var j = 0; j < 600; j += 30) {
        sides.push(new Block({x:i,y:j, width: 30, height: 30, colors: ["rgb(112, 112, 112)","rgb(89, 89, 89)"]}));
      }
    }
    for (var i = 270; i < 300; i +=10) {
      for (var j = 0; j < 600; j += 10) {
        sides.push(new Block({x:i,y:j, width: 10, height: 10, colors: ["rgb(183, 55, 0)","rgb(89, 89, 89)"]}));
      }
    }
    for (var i = 600; i < 630; i +=10) {
      for (var j = 0; j < 600; j += 10) {
        sides.push(new Block({x:i,y:j, width: 10, height: 10, colors: ["rgb(183, 55, 0)","rgb(89, 89, 89)"]}));
      }
    }
    for (var i = 630; i < 900; i +=30) {
      for (var j = 0; j < 600; j += 30) {
        sides.push(new Block({x:i,y:j, width: 30, height: 30, colors: ["rgb(112, 112, 112)","rgb(89, 89, 89)"]}));
      }
    }
    return sides.filter(block =>
      (block.x < 690 ||
      block.x > 810 ||
      block.y < 390 ||
      block.y > 510) &&
      (block.x < 690 ||
      block.x > 810 ||
      block.y < 210 ||
      block.y > 240) &&
      (block.x < 690 ||
      block.x > 810 ||
      block.y < 60 ||
      block.y > 90) &&
      (block.x < 30 ||
      block.x > 210 ||
      block.y < 120 ||
      block.y > 300) &&
      (block.x < 30 ||
      block.x > 210 ||
      block.y < 420 ||
      block.y > 510) &&
      (block.x < 30 ||
      block.x > 210 ||
      block.y < 30 ||
      block.y > 60)
    );
  }

  drawSides(){
    this.sides.forEach((block)=>{
      block.drawBlock(this.ctx);
    });
  }

  drawScoresLevels(){
    this.ctx.font = `22px Gadget`;
    this.ctx.fillStyle = "gray";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Score", 765, 78);

    this.ctx.font = `22px Gadget`;
    this.ctx.fillStyle = "gray";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.score, 765, 105);

    this.ctx.font = `22px Gadget`;
    this.ctx.fillStyle = "gray";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Level", 765, 228);

    this.ctx.font = `22px Gadget`;
    this.ctx.fillStyle = "gray";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.level, 765, 255);

  }

  nextType(){
    const types = ["i","o","t","s","z","j","l"];
    return types[Math.floor(Math.random() * types.length)];
  }

  createPiece(){
    const piece = new Piece;
    const type = this.nextType();
    const blocks = piece.addPiece(type);
    this.nextPiece = blocks;
    this.nextPieceRotate = 0;
    this.nextPieceType = type;

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
    this.scoringAndLevel(this.linesToErase);
    this.linesToErase.forEach((line)=>{
      this.staticPieces = this.staticPieces.filter(block => block.y !== line)
      this.staticPieces.forEach((block)=>{
        if (block.y < line) {
          block.y += 30;
        }
      });
    });
  }

  scoringAndLevel(linesToErase){
    let lines = linesToErase.length
    this.linesCleared = this.linesCleared + lines;
    this.level = Math.floor(this.linesCleared/10);
    this.score = this.score + (lines * lines * 100);
  }

  gameOverCheck(){
    this.nextPiece.forEach((block)=>{
      let hypotheticalBlock = new Block({x:block.x,y:block.y,width: 30, height: 30});
      if (hypotheticalBlock.x === 735 || hypotheticalBlock.x === 765) {
        hypotheticalBlock.x -= 315
        hypotheticalBlock.y -= 435;
      } else {
        hypotheticalBlock.x -= 300;
        hypotheticalBlock.y -= 435;
      }

      if (this.pieceCollision(hypotheticalBlock)) {
        this.gameOver = true;
        window.score = this.score;
        document.getElementById("highScore").hidden = false;
        document.getElementById("restart").hidden = false;
      }
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
      if (block.y >= 570) {
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
      if (pos + move < 300 || pos + move > 570) {
        result = true;
      }
    });
    return result;
  }

  sideBlockCheck(move){

    let result = false;
    this.activePiece.forEach((block)=>{
      let hypotheticalBlock = new Block({x:block.x + move,y:block.y,width: 30, height: 30});
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
        { 0:[[-60,30],[-30,0],[0,-30],[30,-60]],
          1:[[60,-30],[30,0],[0,30],[-30,60]],
          2:[[-60,30],[-30,0],[0,-30],[30,-60]],
          3:[[60,-30],[30,0],[0,30],[-30,60]]},
      "o":
        { 0:[[0,0],[0,0],[0,0],[0,0]],
          1:[[0,0],[0,0],[0,0],[0,0]],
          2:[[0,0],[0,0],[0,0],[0,0]],
          3:[[0,0],[0,0],[0,0],[0,0]]},
      "t":
        { 0:[[30,30],[0,0],[0,0],[0,0]],
          1:[[-30,-30],[0,60],[0,0],[0,0]],
          2:[[0,0],[0,-60],[0,0],[-30,30]],
          3:[[0,0],[0,0],[0,0],[30,-30]]},
      "s":
        { 0:[[30,0],[0,-30],[-30,0],[-60,-30]],
          1:[[-30,0],[0,30],[30,0],[60,30]],
          2:[[30,0],[0,-30],[-30,0],[-60,-30]],
          3:[[-30,0],[0,30],[30,0],[60,30]]},
      "z":
        { 0:[[60,-30],[30,0],[0,-30],[-30,0]],
          1:[[-60,30],[-30,0],[0,30],[30,0]],
          2:[[60,-30],[30,0],[0,-30],[-30,0]],
          3:[[-60,30],[-30,0],[0,30],[30,0]]},
      "j":
        { 0:[[0,30],[30,0],[0,-30],[-30,-60]],
          1:[[30,0],[0,-30],[-30,0],[-60,30]],
          2:[[0,-30],[-30,0],[0,30],[30,60]],
          3:[[-30,0],[0,30],[30,0],[60,-30]]},
      "l":
        { 0:[[60,30],[30,0],[0,-30],[-30,0]],
          1:[[30,-60],[0,-30],[-30,0],[0,30]],
          2:[[-60,-30],[-30,0],[0,30],[30,0]],
          3:[[-30,60],[0,30],[30,0],[0,-30]]},


    };
    let rotate = rotations[this.activePieceType][this.activePieceRotate];
    if (this.rotationCollisionCheck(rotate) === false) {

      for (var i = 0; i < rotate.length; i++) {
        this.activePiece[i].x += rotate[i][0];
        this.activePiece[i].y += rotate[i][1];
      }
      this.activePieceRotate = (this.activePieceRotate + 1)%4;
    }

  }

  rotationCollisionCheck(rotate){
    let result = false;
    for (var i = 0; i < rotate.length; i++) {
      let hypotheticalBlock = new Block({x:this.activePiece[i].x,y:this.activePiece[i].y,width: 30, height: 30});
      hypotheticalBlock.x += rotate[i][0];
      hypotheticalBlock.y += rotate[i][1];
      if (this.pieceCollision(hypotheticalBlock)) {
        result = true;
      }
      if (hypotheticalBlock.x > 570 || hypotheticalBlock.x < 300) {
        result = true;
      }
    }
    return result
  }

  keydownHandler(e){
    if (e.keyCode === 39) {
      this.movePiece(30);
    } else if (e.keyCode === 37) {
      this.movePiece(-30);
    } else if (e.keyCode === 40) {
      this.ticker = 0;
      this.dropSpeed = 5;
    } else if (e.keyCode === 38) {
      this.rotate();
    } else if (e.keyCode === 32) {
      if (this.pause) {
        this.pause = false;
        document.getElementById("pause").hidden = true;
      } else {
        this.pause = true;
        document.getElementById("pause").hidden = false;
      }
    }

  }

  keyupHandler(e){
    if (e.keyCode === 40) {
      this.dropSpeed = 60;
    }
  }
}


module.exports = Game;
