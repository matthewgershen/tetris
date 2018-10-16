const Block = require("./block");

class Piece{
  constructor(){
    this.shapes = {
      "i": [[180,0],[180,40],[180,80],[180,120]]
    }
  }

  addPiece(type){
    const piece = []
    this.shapes[type].forEach((el)=>{
      piece.push(new Block({x:el[0],y:el[1],dy:1}));
    });
    return piece
  }
}

module.exports = Piece;
