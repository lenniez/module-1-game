"use strict"

function Player(x, y, parentElement) {
  var self = this;

  self.x = x;
  self.y = y;
  self.width = 50;
  self.height = 50;
  self.speed = 10;
  self.xLeftBound = document.body.clientWidth * 0.1; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.xRightBound = document.body.clientWidth * 0.9; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.yTopBound = 100; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js
  self.yBottomBound = document.body.clientHeight * 0.9; // starting value to be adjusted - needs to be adjusted in player.js, sin.js, pardon.js

  self.parentElement = parentElement;
  self.playerElement = null;
}

// Create player's HTML and link DOM

Player.prototype.build = function () {
  var self = this;

  self.playerElement = createHtml(`<div class = "player"></div>`);
  self.parentElement.appendChild(self.playerElement);

  // Set CSS x & y equal to constructor x & y
  self.playerElement.style.left = self.x + 'px';
  self.playerElement.style.top = self.y + 'px';
  self.playerElement.style.height = self.width + "px";
  self.playerElement.style.width = self.height + "px";
  
};


// Update the player's properties

Player.prototype.update = function () {
  var self = this;

  window.addEventListener("keydown", function (event) {

    switch (event.key) {
      case "ArrowDown":
        if (self.y + self.speed < self.yBottomBound) {
          self.y += self.speed;
        }
        self.draw();
        break;
      case "ArrowUp":
        if (self.y > self.yTopBound) {
          self.y -= self.speed;
        }
        self.draw();
        break;
      case "ArrowLeft":
        if (self.x > self.xLeftBound) {
          self.x -= self.speed;
        }
        self.draw();
        break;
      case "ArrowRight":
        if (self.x + self.speed < self.xRightBound) {
          self.x += self.speed;
        }
        self.draw();
        break;
      default:
        self.y = self.y;
        self.x = self.x;
        break;
    }

  });
};

// Remove old player and draw new player
Player.prototype.draw = function () {
  var self = this;
  
  self.playerElement.remove(0);
  self.build();

};