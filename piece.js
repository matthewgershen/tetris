const Block = require("./block");

class Piece{
  constructor(){
    this.shapes = {
      "i": [[180,0],[180,40],[180,80],[180,120]],
      "o": [[160,0],[160,40],[200,0],[200,40]],
      "t": [[180,40],[180,0],[140,40],[220,40]],
      "s": [[140,40],[180,0],[180,40],[220,0]],
      "z": [[140,0],[180,0],[180,40],[220,40]],
      "j": [[140,0],[140,40],[180,40],[220,40]],
      "l": [[140,40],[180,40],[220,0],[220,40]]
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
