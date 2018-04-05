"use strict"

function Sin (parentElement) {
  var self = this;

  self.xLeftBound = document.body.clientWidth * 0.1;  // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.xRightBound = document.body.clientWidth * 0.9; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.yTopBound = 100; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.yBottomBound = document.body.clientHeight * 0.9; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js

  self.width = 40;
  self.height = 40;
  self.x = (Math.floor(Math.random() * (self.xRightBound - self.xLeftBound) + self.xLeftBound)); // random value between left and right bounds
  self.y = (Math.floor(Math.random() * (self.yBottomBound - self.yTopBound) + self.yTopBound)); // random value between top and bottom bounds
  self.sinClassArray = ["greed", "wrath", "lust", "envy", "gluttony", "sloth", "pride"];
  self.randomSinClass = self.sinClassArray[Math.floor(Math.random() * self.sinClassArray.length)]; // pull random index in sinClassArray
  self.directionArray = ["up", "down", "left", "right"];
  self.randomDirection = self.directionArray[Math.floor(Math.random() * self.directionArray.length)]; // pull random index in directionArray

  self.parentElement = parentElement;
  self.sinElement = null;

  self.speed = 3;

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
  self.sinElement.style.height = self.height + "px";
  self.sinElement.style.width = self.width + "px";

};

//uses random direction to determine movement of each sin
//at gam boundary, sin is removed
Sin.prototype.update = function () {
  var self = this;

  switch (self.randomDirection) {
    case "down":
      if (self.y + self.speed + self.height < self.yBottomBound) {
        self.y += self.speed;
        self.sinElement.style.top = self.y + "px";
      } else {
        self.sinElement.remove(0); 
      }
      break;
    case "up":
      if (self.y > self.yTopBound) {
        self.y -= self.speed;
        self.sinElement.style.top = self.y + "px";
      } else {
        self.sinElement.remove(0);
      }
      break;
    case "left":
      if (self.x > self.xLeftBound) {
        self.x -= self.speed;
        self.sinElement.style.left = self.x + "px";
      } else {
        self.sinElement.remove(0);
      }
      break;
    case "right":
      if (self.x + self.speed + self.width < self.xRightBound) {
        self.x += self.speed;
        self.sinElement.style.left = self.x + "px";
      } else {
        self.sinElement.remove(0);
      }
      break;
  }

};


