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

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\nconst Piece = __webpack_require__(/*! ./piece */ \"./piece.js\");\n\nclass Game{\n  constructor(canvas,ctx){\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.createSides = this.createSides.bind(this);\n    this.sides = this.createSides();\n    this.activePiece = [];\n    this.activePieceRotate = 0;\n    this.activePieceRotate = \"\";\n    this.staticPieces = [];\n    this.ticker = 0;\n    this.dropSpeed = 60;\n    this.linesToErase = [];\n    this.createPiece = this.createPiece.bind(this);\n    this.collisionHandling = this.collisionHandling.bind(this);\n    this.collisionCheck = this.collisionCheck.bind(this);\n    this.pieceCollision = this.pieceCollision.bind(this);\n    this.keydownHandler = this.keydownHandler.bind(this);\n    this.movePiece = this.movePiece.bind(this);\n    this.sideBoundaryCheck = this.sideBoundaryCheck.bind(this);\n    this.sideBlockCheck = this.sideBlockCheck.bind(this);\n    this.rotate = this.rotate.bind(this);\n    this.lineCheck = this.lineCheck.bind(this);\n    this.keyupHandler = this.keyupHandler.bind(this);\n    this.lineErase = this.lineErase.bind(this);\n  }\n\n\n\n  draw(){\n    this.lineCheck();\n    if (this.linesToErase.length > 0) {\n      this.lineErase();\n    }\n    this.ticker++;\n    if (this.activePiece.length === 0) {\n      this.createPiece();\n    }\n    this.collisionHandling();\n    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);\n    if (this.ticker === this.dropSpeed) {\n      this.activePiece.forEach((block)=>{\n        block.y += 30;\n      });\n      this.ticker = 0;\n    }\n    this.activePiece.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n    this.staticPieces.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n    this.sides.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n  }\n\n  createSides(){\n    const sides = [];\n    for (var i = 0; i < 270; i +=30) {\n      for (var j = 0; j < 600; j += 30) {\n        sides.push(new Block({x:i,y:j, width: 30, height: 30, colors: [\"rgb(112, 112, 112)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    for (var i = 270; i < 300; i +=10) {\n      for (var j = 0; j < 600; j += 10) {\n        sides.push(new Block({x:i,y:j, width: 10, height: 10, colors: [\"rgb(183, 55, 0)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    for (var i = 600; i < 630; i +=10) {\n      for (var j = 0; j < 600; j += 10) {\n        sides.push(new Block({x:i,y:j, width: 10, height: 10, colors: [\"rgb(183, 55, 0)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    for (var i = 630; i < 900; i +=30) {\n      for (var j = 0; j < 600; j += 30) {\n        sides.push(new Block({x:i,y:j, width: 30, height: 30, colors: [\"rgb(112, 112, 112)\",\"rgb(89, 89, 89)\"]}));\n      }\n    }\n    return sides;\n  }\n\n  nextType(){\n    const types = [\"i\",\"o\",\"t\",\"s\",\"z\",\"j\",\"l\"];\n    return types[Math.floor(Math.random() * types.length)];\n  }\n\n  createPiece(){\n    const piece = new Piece;\n    const type = this.nextType();\n    const blocks = piece.addPiece(type);\n    this.activePiece = blocks;\n    this.activePieceRotate = 0;\n    this.activePieceType = type;\n\n  }\n  lineCheck(){\n    let hash = {};\n    this.staticPieces.forEach((block)=>{\n      if (hash[block.y]) {\n        hash[block.y]++;\n      } else {\n        hash[block.y] = 1;\n      }\n    });\n    let result = Object.entries(hash).filter(pair => pair[1] === 10);\n    let lines = [];\n    result.forEach((pair)=>{\n      lines.push(parseInt(pair[0]));\n    });\n    this.linesToErase = lines.sort();\n  }\n\n  lineErase(){\n    this.linesToErase.forEach((line)=>{\n      this.staticPieces = this.staticPieces.filter(block => block.y !== line)\n      this.staticPieces.forEach((block)=>{\n        if (block.y < line) {\n          block.y += 30;\n        }\n      });\n    });\n  }\n\n  collisionHandling(){\n    if (this.collisionCheck()) {\n      this.activePiece.forEach((block)=>{\n        this.staticPieces.push(block);\n      });\n      this.activePiece = [];\n      this.lineCheck();\n    }\n  }\n\n  collisionCheck(){\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      if (block.y >= 570) {\n        result = true;\n      } else if (this.pieceCollision(block)){\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  pieceCollision(block){\n    let result = false;\n    this.staticPieces.forEach((staticBlock)=>{\n      if (\n        (block.x < staticBlock.x + staticBlock.width &&\n         block.x + block.width > staticBlock.x &&\n         block.y < staticBlock.y + staticBlock.height + 1 &&\n         block.y + block.height + 1 > staticBlock.y)\n      ) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n\n  sideBoundaryCheck(move){\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      let pos = block.x;\n      if (pos + move < 300 || pos + move > 570) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  sideBlockCheck(move){\n\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      let hypotheticalBlock = new Block({x:block.x + move,y:block.y,width: 30, height: 30});\n      if (this.pieceCollision(hypotheticalBlock)) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  movePiece(move){\n    let outOfBounds = false;\n    outOfBounds = this.sideBoundaryCheck(move);\n\n    let sideBlocked = false;\n    sideBlocked = this.sideBlockCheck(move);\n    if (outOfBounds === false && sideBlocked === false) {\n      this.activePiece.forEach((block)=>{\n        block.x += move;\n      });\n    }\n  }\n\n  rotate(){\n    const rotations = {\n      \"i\":\n        { 0:[[-60,45],[-30,15],[0,-15],[30,-45]],\n          1:[[60,-45],[30,-15],[0,15],[-30,45]],\n          2:[[-60,45],[-30,15],[0,-15],[30,-45]],\n          3:[[60,-45],[30,-15],[0,15],[-30,45]]},\n      \"o\":\n        { 0:[[0,0],[0,0],[0,0],[0,0]],\n          1:[[0,0],[0,0],[0,0],[0,0]],\n          2:[[0,0],[0,0],[0,0],[0,0]],\n          3:[[0,0],[0,0],[0,0],[0,0]]},\n      \"t\":\n        { 0:[[30,30],[0,0],[0,0],[0,0]],\n          1:[[-30,-30],[0,60],[0,0],[0,0]],\n          2:[[0,0],[0,-60],[0,0],[-30,30]],\n          3:[[0,0],[0,0],[0,0],[30,-30]]},\n      \"s\":\n        { 0:[[30,0],[0,-30],[-30,0],[-60,-30]],\n          1:[[-30,0],[0,30],[30,0],[60,30]],\n          2:[[30,0],[0,-30],[-30,0],[-60,-30]],\n          3:[[-30,0],[0,30],[30,0],[60,30]]},\n      \"z\":\n        { 0:[[60,-30],[30,0],[0,-30],[-30,0]],\n          1:[[-60,30],[-30,0],[0,30],[30,0]],\n          2:[[60,-30],[30,0],[0,-30],[-30,0]],\n          3:[[-60,30],[-30,0],[0,30],[30,0]]},\n      \"j\":\n        { 0:[[0,30],[30,0],[0,-30],[-30,-60]],\n          1:[[30,0],[0,-30],[-30,0],[-60,30]],\n          2:[[0,-30],[-30,0],[0,30],[30,60]],\n          3:[[-30,0],[0,30],[30,0],[60,-30]]},\n      \"l\":\n        { 0:[[60,30],[30,0],[0,-30],[-30,0]],\n          1:[[30,-60],[0,-30],[-30,0],[0,30]],\n          2:[[-60,-30],[-30,0],[0,30],[30,0]],\n          3:[[-30,60],[0,30],[30,0],[0,-30]]},\n\n\n    };\n    let rotate = rotations[this.activePieceType][this.activePieceRotate];\n    for (var i = 0; i < rotate.length; i++) {\n      this.activePiece[i].x += rotate[i][0];\n      this.activePiece[i].y += rotate[i][1];\n    }\n    this.activePieceRotate = (this.activePieceRotate + 1)%4;\n\n  }\n\n  keydownHandler(e){\n    if (e.keyCode === 39) {\n      this.movePiece(30);\n    } else if (e.keyCode === 37) {\n      this.movePiece(-30);\n    } else if (e.keyCode === 40) {\n      this.ticker = 0;\n      this.dropSpeed = 5;\n    } else if (e.keyCode === 38) {\n      this.rotate();\n\n    }\n\n  }\n\n  keyupHandler(e){\n    if (e.keyCode === 40) {\n      this.dropSpeed = 60;\n    }\n  }\n}\n\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./piece.js":
/*!******************!*\
  !*** ./piece.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\n\nclass Piece{\n  constructor(){\n    this.shapes = {\n      \"i\": [[420,0],[420,30],[420,60],[420,90]],\n      \"o\": [[420,0],[420,30],[450,0],[450,30]],\n      \"t\": [[390,30],[420,0],[420,30],[450,30]],\n      \"s\": [[390,30],[420,30],[420,0],[450,0]],\n      \"z\": [[390,0],[420,0],[420,30],[450,30]],\n      \"j\": [[390,0],[390,30],[420,30],[450,30]],\n      \"l\": [[390,30],[420,30],[450,30],[450,0]]\n    };\n\n    this.colors = {\n      \"i\": [\"rgb(251, 44, 44)\",\"rgb(176, 118, 118)\"],\n      \"o\": [\"rgb(247, 220, 89)\",\"rgb(186, 160, 150)\"],\n      \"t\": [\"rgb(77, 166, 48)\",\"rgb(93, 133, 60)\"],\n      \"s\": [\"rgb(42, 176, 154)\",\"rgb(75, 143, 132)\"],\n      \"z\": [\"rgb(31, 82, 192)\",\"rgb(76, 99, 148)\"],\n      \"j\": [\"rgb(115, 76, 148)\",\"rgb(113, 98, 125)\"],\n      \"l\": [\"rgb(192, 16, 174)\",\"rgb(129, 79, 124)\"]\n    };\n  }\n\n  addPiece(type){\n    const piece = [];\n    this.shapes[type].forEach((el)=>{\n      piece.push(new Block({x:el[0],y:el[1], width: 30, height: 30, colors: this.colors[type]}));\n    });\n    return piece;\n  }\n\n  \n}\n\nmodule.exports = Piece;\n\n\n//# sourceURL=webpack:///./piece.js?");

/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./game.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"myCanvas\");\n  const ctx = canvas.getContext(\"2d\");\n  const game = new Game(canvas, ctx);\n\n  document.addEventListener(\"keydown\", game.keydownHandler);\n  document.addEventListener(\"keyup\", game.keyupHandler);\n\n  function drawFrame(){\n    game.draw();\n    requestAnimationFrame(drawFrame);\n  }\n  requestAnimationFrame(drawFrame);\n\n});\n\n\n//# sourceURL=webpack:///./tetris.js?");

/***/ })

/******/ });