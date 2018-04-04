"use strict"

var sinArray = []; // @todo Is it bad that this is global? YES!

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
  self.randomDirection = self.directionArray[Math.floor(Math.random() * self.directionArray.length)]; // pull random index in directionArray

  self.parentElement = parentElement;
  self.sinElement = null;

}

// create new Sins & store values in sinArray
Sin.prototype.build = function () {
  var self = this;

  // ---- DOM MANIPULATION
  self.sinElement = createHtml(`<div class = "sin"></div>`);
  self.parentElement.appendChild(self.sinElement);

  //add random sin class to newly created Sin
  self.sinElement.classList.add(self.randomSinClass);

  // Set CSS x & y equal to constructor x & y to update DOM position
  self.sinElement.style.left = self.x + 'px';
  self.sinElement.style.top = self.y + 'px';

  // ---- LOGIC
  //push new Sin object into sinArray to store values - x & y will be needed for position update and collisions
  sinArray.push(self);
  console.log(sinArray);
};


Sin.prototype.update = function () {
  //switch function that uses direction to determine movement
  //set boundaries - at boundary, sin is removed - MVP2

  switch (self.randomDirection) {
    case "down":
      if (self.y <self.yBottomBound) {
        self.y += 20;
      }
      console.log(self.y);
      self.draw();
      break;
    case "up":
      if (self.y >self.yTopBound) {
        self.y -= 20;
      }
      console.log(self.y);
      self.draw();
      break;
    case "left":
      if (self.x >self.xLeftBound) {
        self.x -= 20;
      }
      console.log(self.x);
      self.draw();
      break;
    case "right":
      if (self.x <self.xRightBound) {
        self.x += 20;
      }
      console.log(self.x);
      self.draw();
      break;
    }

  self.sinElement.remove(0);
  self.build();
}


