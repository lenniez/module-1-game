"use strict"

function Sin (parentElement) {
  var self = this;

  self.xLeftBound = 80;  // starting value to be adjusted - also needs to be adjusted in player.js
  self.xRightBound = 600; // starting value to be adjusted - also needs to be adjusted in player.js
  self.yTopBound = 100; // starting value to be adjusted - also needs to be adjusted in player.js
  self.yBottomBound = 600; // starting value to be adjusted - also needs to be adjusted in player.js

  self.x = (Math.floor(Math.random() * (self.xRightBound - self.xLeftBound) + self.xLeftBound)); // random value between left and right bounds
  self.y = (Math.floor(Math.random() * (self.yBottomBound - self.yTopBound) + self.yTopBound)); // random value between top and bottom bounds
  self.sinClassArray = ["greed", "wrath", "lust", "envy", "gluttony", "sloth", "pride"];
  self.randomSinClass = self.sinClassArray[Math.floor(Math.random() * self.sinClassArray.length)]; // pull random index in sinClassArray
  self.directionArray = ["up", "down", "left", "right"];


  self.parentElement = parentElement;
  self.sinElement = null;

}

// create new Sins - HTML & DOM
Sin.prototype.build = function () {
  var self = this;

  self.sinElement = createHtml(`<div class = "sin"></div>`);
  self.parentElement.appendChild(self.sinElement);

  //add random sin class to newly created Sin
  self.sinElement.classList.add(self.randomSinClass);

  // Set CSS x & y equal to constructor x & y
  self.sinElement.style.left = self.x + 'px';
  self.sinElement.style.top = self.y + 'px';
  
};


// Sin.prototype.update = function (direction) {
//   //create array of directions
//   //randomly call one of the elements in the array to choose a random direction
//   //use that element as a "direction" parameter in updatePosition function
//   //switch function that uses direction to determine movement
//   //store new x & y values
//   //set boundaries - at boundary, sin is removed


//   case "ArrowDown":
//     if (self.y <self.yBottomBound) {
//       self.y += 20;
//     }
//     console.log(self.y);
//     self.draw();
//     break;
//   case "ArrowUp":
//     if (self.y >self.yTopBound) {
//       self.y -= 20;
//     }
//     console.log(self.y);
//     self.draw();
//     break;
//   case "ArrowLeft":
//     if (self.x >self.xLeftBound) {
//       self.x -= 20;
//     }
//     console.log(self.x);
//     self.draw();
//     break;
//   case "ArrowRight":
//     if (self.x <self.xRightBound) {
//       self.x += 20;
//     }
//     console.log(self.x);
//     self.draw();
//     break;

// }


