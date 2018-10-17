const Block = require("./block");

class Piece{
  constructor(){
    this.shapes = {
      "i": [[160,0],[160,40],[160,80],[160,120]],
      "o": [[160,0],[160,40],[200,0],[200,40]],
      "t": [[120,40],[160,0],[160,40],[200,40]],
      "s": [[120,40],[160,40],[160,0],[200,0]],
      "z": [[120,0],[160,0],[160,40],[200,40]],
      "j": [[120,0],[120,40],[160,40],[200,40]],
      "l": [[120,40],[160,40],[200,0],[200,40]]
    };
  }

  addPiece(type){
    const piece = [];
    this.shapes[type].forEach((el)=>{
      piece.push(new Block({x:el[0],y:el[1],dy:1, width: 40, height: 40}));
    });
    return piece;
  }
}

module.exports = Piece;
