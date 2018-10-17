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

eval("class Block{\n  constructor(options){\n    this.x = options.x;\n    this.y = options.y;\n    this.width = options.width;\n    this.height = options.height;\n    this.dy = options.dy;\n  }\n\n  drawBlock(ctx){\n      this.y += this.dy;\n      ctx.beginPath();\n      ctx.rect(this.x, this.y, this.width, this.height);\n      ctx.fillStyle = \"#FF0000\";\n      ctx.fill();\n      ctx.closePath();\n    }\n\n}\n\nmodule.exports = Block;\n\n\n//# sourceURL=webpack:///./block.js?");

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\nconst Piece = __webpack_require__(/*! ./piece */ \"./piece.js\");\n\nclass Game{\n  constructor(canvas,ctx){\n    this.ctx = ctx;\n    this.canvas = canvas;\n    this.activePiece = [];\n    this.staticPieces = [];\n    this.createPiece = this.createPiece.bind(this);\n    this.collisionHandling = this.collisionHandling.bind(this);\n    this.collisionCheck = this.collisionCheck.bind(this);\n    this.pieceCollision = this.pieceCollision.bind(this);\n    this.keydownHandler = this.keydownHandler.bind(this);\n    this.movePiece = this.movePiece.bind(this);\n    this.sideBoundaryCheck = this.sideBoundaryCheck.bind(this);\n    this.sideBlockCheck = this.sideBlockCheck.bind(this);\n  }\n\n\n\n  draw(){\n    if (this.activePiece.length === 0) {\n      this.createPiece();\n    }\n    this.collisionHandling();\n    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);\n    this.activePiece.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n    this.staticPieces.forEach((block)=>{\n      block.drawBlock(this.ctx);\n    });\n  }\n\n  nextType(){\n    const types = [\"i\",\"o\",\"t\",\"s\",\"z\",\"j\",\"l\"];\n    return types[Math.floor(Math.random() * types.length)];\n    \n  }\n\n  createPiece(){\n    const piece = new Piece;\n    const blocks = piece.addPiece(this.nextType());\n    this.activePiece = blocks;\n  }\n\n  collisionHandling(){\n    if (this.collisionCheck()) {\n      this.activePiece.forEach((block)=>{\n        block.dy = 0;\n        this.staticPieces.push(block);\n      });\n      this.activePiece = [];\n    }\n  }\n\n  collisionCheck(){\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      if (block.y >= 760) {\n        result = true;\n      } else if (this.pieceCollision(block)){\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  pieceCollision(block){\n    let result = false;\n    this.staticPieces.forEach((staticBlock)=>{\n      if (\n        (block.x < staticBlock.x + staticBlock.width &&\n         block.x + block.width > staticBlock.x &&\n         block.y < staticBlock.y + staticBlock.height + 1 &&\n         block.y + block.height + 1 > staticBlock.y)\n      ) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n\n  sideBoundaryCheck(move){\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      let pos = block.x;\n      if (pos + move < 0 || pos + move > 360) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  sideBlockCheck(move){\n\n    let result = false;\n    this.activePiece.forEach((block)=>{\n      let hypotheticalBlock = new Block({x:block.x + move,y:block.y,width: 40, height: 40});\n      if (this.pieceCollision(hypotheticalBlock)) {\n        result = true;\n      }\n    });\n    return result;\n  }\n\n  movePiece(move){\n    let outOfBounds = false;\n    outOfBounds = this.sideBoundaryCheck(move);\n\n    let sideBlocked = false;\n    sideBlocked = this.sideBlockCheck(move);\n    if (outOfBounds === false && sideBlocked === false) {\n      this.activePiece.forEach((block)=>{\n        block.x += move;\n      });\n    }\n  }\n\n  rotate(){\n\n  }\n\n  keydownHandler(e){\n    if (e.keyCode === 39) {\n      this.movePiece(40);\n    } else if (e.keyCode === 37) {\n      this.movePiece(-40);\n    } else if (e.keyCode === 40) {\n      this.activePiece.forEach((block)=>{\n        block.y += 10;\n      });\n    } else if (e.keyCode === 38) {\n\n\n    }\n\n  }\n}\n\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./piece.js":
/*!******************!*\
  !*** ./piece.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./block.js\");\n\nclass Piece{\n  constructor(){\n    this.shapes = {\n      \"i\": [[160,0],[160,40],[160,80],[160,120]],\n      \"o\": [[160,0],[160,40],[200,0],[200,40]],\n      \"t\": [[160,40],[160,0],[120,40],[200,40]],\n      \"s\": [[120,40],[160,0],[160,40],[200,0]],\n      \"z\": [[120,0],[160,0],[160,40],[200,40]],\n      \"j\": [[120,0],[120,40],[160,40],[200,40]],\n      \"l\": [[120,40],[160,40],[200,0],[200,40]]\n    };\n  }\n\n  addPiece(type){\n    const piece = [];\n    this.shapes[type].forEach((el)=>{\n      piece.push(new Block({x:el[0],y:el[1],dy:1, width: 40, height: 40}));\n    });\n    return piece;\n  }\n}\n\nmodule.exports = Piece;\n\n\n//# sourceURL=webpack:///./piece.js?");

/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./game.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"myCanvas\");\n  const ctx = canvas.getContext(\"2d\");\n  const game = new Game(canvas, ctx);\n\n  document.addEventListener(\"keydown\", game.keydownHandler);\n  \n  function drawFrame(){\n    game.draw();\n    requestAnimationFrame(drawFrame);\n  }\n  requestAnimationFrame(drawFrame);\n\n});\n\n\n//# sourceURL=webpack:///./tetris.js?");

/***/ })

/******/ });