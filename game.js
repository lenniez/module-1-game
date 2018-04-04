"use strict"

function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement; 
  self.gameSpaceElement = null;
  self.pardonCountElement = null;

  self.player = null;
  self.sin = null;
  self.pardons = null;

}

// @todo understand what this does
Game.prototype.onEnded = function(cb) {
  var self = this;
  self.callback = cb;
};


Game.prototype.build = function () {
  var self = this;

  self.gameScreenElement = createHtml(`
  <div>
    <p>pardons remaining:<span id = "pardons"></span></p>
    <div id= "game-space">
    </div>
    <div id = "sins-footer">
      <p>anger - sloth - greed - pride - lust - envy - wrath - gluttony</p>
    </div>
  </div>`);
  
  self.parentElement.appendChild(self.gameScreenElement);

  self.gameSpaceElement = self.gameScreenElement.querySelector("#game-space");
  self.pardonCountElement = self.gameScreenElement.querySelector('#pardons');
} 


Game.prototype.playerMove = function() {
  var self = this;

  self.player.update();
};


Game.prototype.startGame = function () {
  var self = this;

  self.player = new Player(30, 400, self.parentElement);
  self.player.build();

  self.sin = new Sin (self.parentElement);
  self.sin.build();
  
  self.sin = new Sin(self.parentElement);
  self.sin.build();

  self.sin = new Sin(self.parentElement);
  self.sin.build();

  self.sin = new Sin(self.parentElement);
  self.sin.build();

  self.sin = new Sin(self.parentElement);
  self.sin.build();

  self.sin = new Sin(self.parentElement);
  self.sin.build();
  
  self.playerMove();
  // call several new Sins (4-6) + build Sins
  // call several new Pardons (1-2) + build Pardons
}


//update Existing sins, pardons; add new sins, pardons; check for collisions; update pardons if needed
// Game.prototype.update = function () {
  // var self = this;
  // Create new Sins 

  // Create new Pardons + build them

  // Call check Collisions function

  // Update PardonCount

// }

//check for collisions and call in .update
// Game.prototype.checkCollision = function () {
  // var self = this;
// }


// Draw all updated positions on the DOM

// Game.prototype.draw = function () {
  // Build new Sins from .update

  // Build new Pardons from .update

  // Update PardonCountElement number

// }







// @todo determine logic for generating new pardons

