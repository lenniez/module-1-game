"use strict"

function Player (x, y, parentElement) {
  var self = this;

  self.x = x;
  self.y = y; 
  self.pardon = 3;

  self.parentElement = parentElement;

}

// How to build the player initially

Player.prototype.build = function () {
  var self = this;

  self.playerElement = createHtml(`<div class = "player"></div>`);

  self.parentElement.appendChild(self.playerElement);

  self.playerElement.style.left = self.x + 'px';
  self.playerElement.style.top = self.y + 'px';
  
}


// Update the player's position

Player.prototype.updatePosition = function () {
  var self = this;
  

  window.addEventListener("keydown", function (event) {
    console.log(event.key);

    switch (event.key) {
      case "ArrowDown":
        self.y -= 100;
        console.log(self.y);
        break;
      case "ArrowUp":
        self.y += 100;
        break;
      case "ArrowLeft":
        self.x -= 100;
        break;
      case "ArrowRight":
        self.x += 100;
        break;
    }
  
  
  });
  
  self.draw(); // FIGURE OUT WHERE TO CALL THIS!
}


Player.prototype.draw = function () {
  var self = this;
  // self.parentElement.remove(self.playerElement);

  self.build();

}

/*

Player.prototype.updatePardons = function () {
  var self = this;

}

// MVP two - vague AZ explanation of how you can add a class that will make the player look like she has been hit 
Player.prototype.collision() {
  self.hit = true;
  sertTimeout(function () {\
    self.hit = false;
  })
}




*/