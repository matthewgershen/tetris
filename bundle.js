/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tetris.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./block.js":
/*!******************!*\
  !*** ./block.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Block{\n  constructor(options){\n    this.x = options.x;\n    this.y = options.y;\n    this.width = options.width;\n    this.height = options.height;\n    this.colors = options.colors;\n  }\n\n  drawBlock(ctx){\n      ctx.beginPath();\n      ctx.rect(this.x, this.y, this.width, this.height);\n      ctx.fillStyle = this.colors[0];\n      ctx.fill();\n      ctx.lineWidth = 1;\n      ctx.strokeStyle = \"black\";\n      ctx.stroke();\n      ctx.closePath();\n\n      ctx.beginPath();\n      ctx.rect(this.x+4, this.y+4, this.width-8, this.height-8);\n      ctx.fillStyle = this.colors[1];\n      ctx.fill();\n      ctx.closePath();\n    }\n\n}\n\nmodule.exports = Block;\n\n\n//# sourceURL=webpack:///./block.js?");

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\nconst Piece = __webpack_require__(/*! ./piece */ \"./piece.js\");\n\nclass Game{\n  constructor(canvas,ctx){\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.createSides = this.createSides.bind(this);\n    this.sides = this.createSides();\n    this.activePiece = [];\n    this.activePieceRotate = 0;\n    this.activePieceType = \"\";\n    this.nextPiece = [];\n    this.nextPieceRotate = 0;\n    this.nextPieceType = \"\";\n    this.staticPieces = [];\n    this.ticker = 0;\n    this.linesToErase = [];\n    this.score = 0;\n    this.linesCleared = 0;\n    this.level = 0;\n    this.moveLeft = false;\n    this.moveRight = false;\n    this.pause = false;\n    this.dropSpeed = (60-this.level) > 10 ? (60-this.level) : 10;\n    this.gameOver = false;\n    this.createPiece = this.createPiece.bind(this);\n    this.collisionHandling = this.collisionHandling.bind(this);\n    this.collisionCheck = this.collisionCheck.bind(this);\n    this.pieceCollision = this.pieceCollision.bind(this);\n    this.keydownHandler = this.keydownHandler.bind(this);\n    this.movePiece = this.movePiece.bind(this);\n    this.sideBoundaryCheck = this.sideBoundaryCheck.bind(this);\n    this.sideBlockCheck = this.sideBlockCheck.bind(this);\n    this.rotate = this.rotate.bind(this);\n    this.lineCheck = this.lineCheck.bind(this);\n    this.keyupHandler = this.keyupHandler.bind(this);\n    this.lineErase = this.lineErase.bind(this);\n    this.rotationCollisionCheck = this.rotationCollisionCheck.bind(this);\n    this.scoringAndLevel = this.scoringAndLevel.bind(this);\n    this.drawSides = this.drawSides.bind(this);\n    this.drawScoresLevels = this.drawScoresLevels.bind(this);\n    this.gameOverCheck = this.gameOverCheck.bind(this);\n  }\n\n\n\n  draw(){\n\n    this.lineCheck();\n    if (this.linesToErase.length > 0) {\n      this.lineErase();\n    }\n    this.ticker++;\n    this.gameOverCheck();\n    if (this.activePiece.length === 0) {\n\n      this.nextPiece.forEach((block)=>{\n        if (block.x === 735 || block.x === 765) {\n          block.x -= 315\n          block.y -= 435;\n        } else {\n          block.x -= 300;\n          block.y -= 435;\n        }\n      });\n      this.activePiece = this.nextPiece;\n      this.activePieceRotate = this.nextPieceRotate;\n      this.activePieceType = this.nextPieceType;\n      this.createPiece();\n    }\n    if (this.moveRight && this.ticker % 4 === 0) {\n      this.movePiece(30);\n    } else if (this.moveLeft && this.ticker % 4 === 0) {\n      this.movePiece(-30);\n    }\n    this.collisionHandling();\n    this.ctx.clearRect(300,0,300,600);\n    this.ctx.clearRect(690,390,150,150);\n    this.ctx.clearRect(690,60,150,60);\n    this.ctx.clearRect(690,210,150,60);\n    if (this.ticker === this.dropSpeed) {\n      this.activePiece.forEach((block)=>{\n        block.y += 30;\n      });\n      this.ticker = 0;\n    }\n    this.activePiece.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n    this.staticPieces.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n    this.nextPiece.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n    this.drawScoresLevels();\n  }\n\n  createSides(){\n    const sides = [];\n    for (var i = 0; i < 270; i +=30) {\n      for (var j = 0; j < 600; j += 30) {\n        sides.push(new Block({x:i,y:j, width: 30, height: 30, colors: [\"rgb(112, 112, 112)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    for (var i = 270; i < 300; i +=10) {\n      for (var j = 0; j < 600; j += 10) {\n        sides.push(new Block({x:i,y:j, width: 10, height: 10, colors: [\"rgb(183, 55, 0)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    for (var i = 600; i < 630; i +=10) {\n      for (var j = 0; j < 600; j += 10) {\n        sides.push(new Block({x:i,y:j, width: 10, height: 10, colors: [\"rgb(183, 55, 0)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    for (var i = 630; i < 900; i +=30) {\n      for (var j = 0; j < 600; j += 30) {\n        sides.push(new Block({x:i,y:j, width: 30, height: 30, colors: [\"rgb(112, 112, 112)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    return sides.filter(block =>\n      (block.x < 690 ||\n      block.x > 810 ||\n      block.y < 390 ||\n      block.y > 510) &&\n      (block.x < 690 ||\n      block.x > 810 ||\n      block.y < 210 ||\n      block.y > 240) &&\n      (block.x < 690 ||\n      block.x > 810 ||\n      block.y < 60 ||\n      block.y > 90) &&\n      (block.x < 30 ||\n      block.x > 210 ||\n      block.y < 120 ||\n      block.y > 300) &&\n      (block.x < 30 ||\n      block.x > 210 ||\n      block.y < 420 ||\n      block.y > 510) &&\n      (block.x < 30 ||\n      block.x > 210 ||\n      block.y < 30 ||\n      block.y > 60)\n    );\n  }\n\n  drawSides(){\n    this.sides.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n  }\n\n  drawScoresLevels(){\n    this.ctx.font = `22px Gadget`;\n    this.ctx.fillStyle = \"gray\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(\"Score\", 765, 78);\n\n    this.ctx.font = `22px Gadget`;\n    this.ctx.fillStyle = \"gray\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(this.score, 765, 105);\n\n    this.ctx.font = `22px Gadget`;\n    this.ctx.fillStyle = \"gray\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(\"Level\", 765, 228);\n\n    this.ctx.font = `22px Gadget`;\n    this.ctx.fillStyle = \"gray\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(this.level, 765, 255);\n\n  }\n\n  nextType(){\n    const types = [\"i\",\"o\",\"t\",\"s\",\"z\",\"j\",\"l\"];\n    return types[Math.floor(Math.random() * types.length)];\n  }\n\n  createPiece(){\n    const piece = new Piece;\n    const type = this.nextType();\n    const blocks = piece.addPiece(type);\n    this.nextPiece = blocks;\n    this.nextPieceRotate = 0;\n    this.nextPieceType = type;\n\n  }\n  lineCheck(){\n    let hash = {};\n    this.staticPieces.forEach((block)=>{\n      if (hash[block.y]) {\n        hash[block.y]++;\n      } else {\n        hash[block.y] = 1;\n      }\n    });\n    let result = Object.entries(hash).filter(pair => pair[1] === 10);\n    let lines = [];\n    result.forEach((pair)=>{\n      lines.push(parseInt(pair[0]));\n    });\n    this.linesToErase = lines.sort();\n  }\n\n  lineErase(){\n    this.scoringAndLevel(this.linesToErase);\n    this.linesToErase.forEach((line)=>{\n      this.staticPieces = this.staticPieces.filter(block => block.y !== line)\n      this.staticPieces.forEach((block)=>{\n        if (block.y < line) {\n          block.y += 30;\n        }\n      });\n    });\n  }\n\n  scoringAndLevel(linesToErase){\n    let lines = linesToErase.length\n    this.linesCleared = this.linesCleared + lines;\n    this.level = Math.floor(this.linesCleared/10);\n    this.score = this.score + (lines * lines * 100);\n  }\n\n  gameOverCheck(){\n    this.nextPiece.forEach((block)=>{\n      let hypotheticalBlock = new Block({x:block.x,y:block.y,width: 30, height: 30});\n      if (hypotheticalBlock.x === 735 || hypotheticalBlock.x === 765) {\n        hypotheticalBlock.x -= 315\n        hypotheticalBlock.y -= 435;\n      } else {\n        hypotheticalBlock.x -= 300;\n        hypotheticalBlock.y -= 435;\n      }\n\n      if (this.pieceCollision(hypotheticalBlock)) {\n        this.gameOver = true;\n        window.score = this.score;\n        document.getElementById(\"highScore\").hidden = false;\n        document.getElementById(\"restart\").hidden = false;\n      }\n    });\n  }\n\n  collisionHandling(){\n    if (this.collisionCheck()) {\n      this.activePiece.forEach((block)=>{\n        this.staticPieces.push(block);\n      });\n      this.activePiece = [];\n      this.lineCheck();\n    }\n  }\n\n  collisionCheck(){\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      if (block.y >= 570) {\n        result = true;\n      } else if (this.pieceCollision(block)){\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  pieceCollision(block){\n    let result = false;\n    this.staticPieces.forEach((staticBlock)=>{\n      if (\n        (block.x < staticBlock.x + staticBlock.width &&\n         block.x + block.width > staticBlock.x &&\n         block.y < staticBlock.y + staticBlock.height + 1 &&\n         block.y + block.height + 1 > staticBlock.y)\n      ) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n\n  sideBoundaryCheck(move){\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      let pos = block.x;\n      if (pos + move < 300 || pos + move > 570) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  sideBlockCheck(move){\n\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      let hypotheticalBlock = new Block({x:block.x + move,y:block.y,width: 30, height: 30});\n      if (this.pieceCollision(hypotheticalBlock)) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  movePiece(move){\n    let outOfBounds = false;\n    outOfBounds = this.sideBoundaryCheck(move);\n\n    let sideBlocked = false;\n    sideBlocked = this.sideBlockCheck(move);\n    if (outOfBounds === false && sideBlocked === false) {\n      this.activePiece.forEach((block)=>{\n        block.x += move;\n      });\n    }\n  }\n\n  rotate(){\n    const rotations = {\n      \"i\":\n        { 0:[[-60,30],[-30,0],[0,-30],[30,-60]],\n          1:[[60,-30],[30,0],[0,30],[-30,60]],\n          2:[[-60,30],[-30,0],[0,-30],[30,-60]],\n          3:[[60,-30],[30,0],[0,30],[-30,60]]},\n      \"o\":\n        { 0:[[0,0],[0,0],[0,0],[0,0]],\n          1:[[0,0],[0,0],[0,0],[0,0]],\n          2:[[0,0],[0,0],[0,0],[0,0]],\n          3:[[0,0],[0,0],[0,0],[0,0]]},\n      \"t\":\n        { 0:[[30,30],[0,0],[0,0],[0,0]],\n          1:[[-30,-30],[0,60],[0,0],[0,0]],\n          2:[[0,0],[0,-60],[0,0],[-30,30]],\n          3:[[0,0],[0,0],[0,0],[30,-30]]},\n      \"s\":\n        { 0:[[30,0],[0,-30],[-30,0],[-60,-30]],\n          1:[[-30,0],[0,30],[30,0],[60,30]],\n          2:[[30,0],[0,-30],[-30,0],[-60,-30]],\n          3:[[-30,0],[0,30],[30,0],[60,30]]},\n      \"z\":\n        { 0:[[60,-30],[30,0],[0,-30],[-30,0]],\n          1:[[-60,30],[-30,0],[0,30],[30,0]],\n          2:[[60,-30],[30,0],[0,-30],[-30,0]],\n          3:[[-60,30],[-30,0],[0,30],[30,0]]},\n      \"j\":\n        { 0:[[0,30],[30,0],[0,-30],[-30,-60]],\n          1:[[30,0],[0,-30],[-30,0],[-60,30]],\n          2:[[0,-30],[-30,0],[0,30],[30,60]],\n          3:[[-30,0],[0,30],[30,0],[60,-30]]},\n      \"l\":\n        { 0:[[60,30],[30,0],[0,-30],[-30,0]],\n          1:[[30,-60],[0,-30],[-30,0],[0,30]],\n          2:[[-60,-30],[-30,0],[0,30],[30,0]],\n          3:[[-30,60],[0,30],[30,0],[0,-30]]},\n\n\n    };\n    let rotate = rotations[this.activePieceType][this.activePieceRotate];\n    if (this.rotationCollisionCheck(rotate) === false) {\n\n      for (var i = 0; i < rotate.length; i++) {\n        this.activePiece[i].x += rotate[i][0];\n        this.activePiece[i].y += rotate[i][1];\n      }\n      this.activePieceRotate = (this.activePieceRotate + 1)%4;\n    }\n\n  }\n\n  rotationCollisionCheck(rotate){\n    let result = false;\n    for (var i = 0; i < rotate.length; i++) {\n      let hypotheticalBlock = new Block({x:this.activePiece[i].x,y:this.activePiece[i].y,width: 30, height: 30});\n      hypotheticalBlock.x += rotate[i][0];\n      hypotheticalBlock.y += rotate[i][1];\n      if (this.pieceCollision(hypotheticalBlock)) {\n        result = true;\n      }\n      if (hypotheticalBlock.x > 570 || hypotheticalBlock.x < 300) {\n        result = true;\n      }\n    }\n    return result\n  }\n\n  keydownHandler(e){\n    if (e.keyCode === 39) {\n      this.moveRight = true;\n    } else if (e.keyCode === 37) {\n      this.moveLeft = true;\n    } else if (e.keyCode === 40) {\n      this.ticker = 0;\n      this.dropSpeed = 5;\n    } else if (e.keyCode === 38) {\n      this.rotate();\n    } else if (e.keyCode === 32) {\n      if (this.pause) {\n        this.pause = false;\n        document.getElementById(\"pause\").hidden = true;\n      } else {\n        this.pause = true;\n        document.getElementById(\"pause\").hidden = false;\n      }\n    }\n\n  }\n\n  keyupHandler(e){\n    if (e.keyCode === 40) {\n      this.dropSpeed = 60;\n    } else if (e.keyCode === 39) {\n      this.moveRight = false;\n    } else if (e.keyCode === 37) {\n      this.moveLeft = false;\n    }\n  }\n}\n\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./piece.js":
/*!******************!*\
  !*** ./piece.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\n\nclass Piece{\n  constructor(){\n    this.shapes = {\n      \"i\": [[750,405],[750,435],[750,465],[750,495]],\n      \"o\": [[735,435],[735,465],[765,435],[765,465]],\n      \"t\": [[720,465],[750,435],[750,465],[780,465]],\n      \"s\": [[720,465],[750,465],[750,435],[780,435]],\n      \"z\": [[720,435],[750,435],[750,465],[780,465]],\n      \"j\": [[720,435],[720,465],[750,465],[780,465]],\n      \"l\": [[720,465],[750,465],[780,465],[780,435]]\n    };\n\n\n    this.colors = {\n      \"i\": [\"rgb(251, 44, 44)\",\"rgb(176, 118, 118)\"],\n      \"o\": [\"rgb(247, 220, 89)\",\"rgb(186, 160, 150)\"],\n      \"t\": [\"rgb(77, 166, 48)\",\"rgb(93, 133, 60)\"],\n      \"s\": [\"rgb(42, 176, 154)\",\"rgb(75, 143, 132)\"],\n      \"z\": [\"rgb(31, 82, 192)\",\"rgb(76, 99, 148)\"],\n      \"j\": [\"rgb(115, 76, 148)\",\"rgb(113, 98, 125)\"],\n      \"l\": [\"rgb(192, 16, 174)\",\"rgb(129, 79, 124)\"]\n    };\n  }\n\n  addPiece(type){\n    const piece = [];\n    this.shapes[type].forEach((el)=>{\n      piece.push(new Block({x:el[0],y:el[1], width: 30, height: 30, colors: this.colors[type]}));\n    });\n    return piece;\n  }\n\n\n}\n\nmodule.exports = Piece;\n\n\n//# sourceURL=webpack:///./piece.js?");

/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./game.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"myCanvas\");\n  const ctx = canvas.getContext(\"2d\");\n  let game = new Game(canvas, ctx);\n  let animationId = null;\n  const restart = document.getElementById(\"restart\");\n\n  document.addEventListener(\"keydown\", game.keydownHandler);\n  document.addEventListener(\"keyup\", game.keyupHandler);\n  game.drawSides();\n  function drawFrame(){\n    if (game.gameOver) return;\n    if (!game.pause) game.draw();\n    animationId = requestAnimationFrame(drawFrame);\n  }\n  animationId = requestAnimationFrame(drawFrame);\n\n  restart.addEventListener(\"click\", (e)=>{\n    cancelAnimationFrame(animationId);\n    document.getElementById(\"highScore\").hidden = true;\n    document.getElementById(\"pause\").hidden = true;\n    game = new Game(canvas, ctx);\n    document.addEventListener(\"keydown\", game.keydownHandler);\n    document.addEventListener(\"keyup\", game.keyupHandler);\n    game.drawSides();\n    function drawFrame(){\n      if (game.gameOver) return;\n      if (!game.pause) game.draw();\n      animationId = requestAnimationFrame(drawFrame);\n    }\n    animationId = requestAnimationFrame(drawFrame);\n  });\n\n});\n\n\n//# sourceURL=webpack:///./tetris.js?");

/***/ })

/******/ });