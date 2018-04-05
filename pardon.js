"use strict"

function Pardon(parentElement) {
  var self = this;

  self.xLeftBound = document.body.clientWidth * 0.1; // starting value to be adjusted -  eeds to be adjusted in player.js, sin.js, pardon.js
  self.xRightBound = document.body.clientWidth * 0.9; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.yTopBound = 100; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.yBottomBound = document.body.clientHeight * 0.9; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js

  self.x = Math.floor(Math.random() * (self.xRightBound - self.xLeftBound) + self.xLeftBound); // random value between left and right bounds
  self.y = Math.floor(Math.random() * (self.yBottomBound - self.yTopBound) + self.yTopBound); // random value between top and bottom bounds
  self.width = 30;
  self.height = 30;
  self.speed = 15;
  self.directionArray = ["up", "down", "left", "right"];
  self.randomDirection = self.directionArray[Math.floor(Math.random() * self.directionArray.length)]; // pull random index in directionArray

  self.parentElement = parentElement;
  self.pardonElement = null;
}

// create new Pardons & store values in pardonArray
Pardon.prototype.build = function() {
  var self = this;

  // ---- DOM MANIPULATION
  self.pardonElement = createHtml(`<div class = "pardon"></div>`);
  self.parentElement.appendChild(self.pardonElement);

  // Set CSS x & y equal to constructor x & y to update DOM position
  self.pardonElement.style.left = self.x + "px";
  self.pardonElement.style.top = self.y + "px";
  self.pardonElement.style.height = self.width + "px";
  self.pardonElement.style.width = self.height + "px";

};

Pardon.prototype.update = function() {
  var self = this;

  switch (self.randomDirection) {
    case "down":
      if (self.y + self.speed + self.height < self.yBottomBound) {
        self.y += self.speed;
        self.pardonElement.style.top = self.y + "px";
      } else {
        self.pardonElement.remove(0);
      }
      break;
    case "up":
      if (self.y > self.yTopBound) {
        self.y -= self.speed;
        self.pardonElement.style.top = self.y + "px";
      } else {
        self.pardonElement.remove(0);
      }
      break;
    case "left":
      if (self.x > self.xLeftBound) {
        self.x -= self.speed;
        self.pardonElement.style.left = self.x + "px";
      } else {
        self.pardonElement.remove(0);
      }
      break;
    case "right":
      if (self.x + self.speed + self.width < self.xRightBound) {
        self.x += self.speed;
        self.pardonElement.style.left = self.x + "px";
      } else {
        self.pardonElement.remove(0);
      }
      break;
  }
};