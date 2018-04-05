"use strict"

function Player (x, y, parentElement) {
  var self = this;

  self.x = x;
  self.y = y; 
  self.width = 30;
  self.height = 30; 
  self.pardonCount = 3;
  self.xLeftBound = 80;
  self.xRightBound = 600;
  self.yTopBound = 100;
  self.yBottomBound = 600;
  

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
        if (self.y < self.yBottomBound) {
          self.y += 20;
        }
        self.draw();
        break;
      case "ArrowUp":
        if (self.y > self.yTopBound) {
          self.y -= 20;
        }
        self.draw();
        break;
      case "ArrowLeft":
        if (self.x > self.xLeftBound) {
          self.x -= 20;
        }
        self.draw();
        break;
      case "ArrowRight":
        if (self.x < self.xRightBound) {
          self.x += 20;
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


// Player.prototype.updatePardonCount = function () {
//   var self = this;

// };