"use strict"

function Player (x, y, parentElement) {
  var self = this;

  self.x = x;
  self.y = y; 
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
  
};


// Update the player's properties

Player.prototype.update = function () {
  var self = this;

  window.addEventListener("keydown", function (event) {
    console.log(event.key);

    switch (event.key) {
      case "ArrowDown":
        if (self.y < self.yBottomBound) {
          self.y += 20;
        }
        console.log(self.y);
        self.draw();
        break;
      case "ArrowUp":
        if (self.y > self.yTopBound) {
          self.y -= 20;
        }
        console.log(self.y);
        self.draw();
        break;
      case "ArrowLeft":
        if (self.x > self.xLeftBound) {
          self.x -= 20;
        }
        console.log(self.x);
        self.draw();
        break;
      case "ArrowRight":
        if (self.x < self.xRightBound) {
          self.x += 20;
        }
        console.log(self.x);
        self.draw();
        break;
      default:
        self.y = self.y;
        self.x = self.x;
        break;
    }

  });
};
// @todo add boundaries

// Remove existing player from DOM, draw player with updated x,y in DOM

// When it arrives at this function, for some reason the new x and y are not retained
Player.prototype.draw = function () {
  var self = this;
  
  self.playerElement.remove(0);
  self.build();

};


// Player.prototype.updatePardonCount = function () {
//   var self = this;

// };