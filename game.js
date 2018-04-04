"use strict"

function Game(parentElement) {
  var self = this;
  
  self.mainContentElement = document.getElementsByClassName("main-content")[0];
  self.parentElement = parentElement; 
  self.gameSpaceElement = null;
  self.pardonCountElement = null;
  self.intervalID = null;

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

  function callUpdate() {
    self.update();
  }

  self.intervalID = window.setInterval(callUpdate, 4000);

 

  // call several new Pardons (1-2) + build Pardons
}


//update Existing sins, pardons; add new sins, pardons; check for collisions; update pardons if needed
Game.prototype.update = function () {
  var self = this;

  // Create new Sins + build
  self.sin = new Sin (self.mainContentElement);
  self.sin.build();
  
  self.sin = new Sin(self.mainContentElement);
  self.sin.build();

  // Update existing sins' positions

  sinArray.forEach(function (item) {
    console.log(item);
  });     //uses global sinArray var from sin.js file

  // Create new Pardons + build them

  // Update existing Pardons

  // Call check Collisions function

  // Update PardonCount

}

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



// End game when pardons = 0 and clear interval

// clearInterval(self.intervalID);
