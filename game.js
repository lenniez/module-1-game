"use strict"

function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement; 
  self.gameSpaceElement = null;
  self.pardonsElement = null;

  self.player = null;
  self.sin = null;
  self.pardons = null;

}

Game.prototype.build = function () {
  var self = this;

  self.gameScreenElement = createHtml(`
  <div>
    <p id = "pardons">pardons remaining:</p>
    <div id= "game-space">
    </div>
    <div id = "sins-footer">
      <p>anger - sloth - greed - pride - lust - envy - wrath - gluttony</p>
    </div>
  </div>`);
  
  self.parentElement.appendChild(self.gameScreenElement);

  self.gameSpaceElement = self.gameScreenElement.querySelector("#game-space");
  self.pardonsElement = self.gameScreenElement.querySelector('#pardons');

  self.player = new Player(30, 400, self.parentElement);
  self.player.build();
  self.player.updatePosition();

} 




// Game.prototype.startGame = function () {

//   //call several new Sins
//   //call several new Pardons (1-2)
// }

/* -------- to be updated once constructors are ready
Game.prototype.update = function () {

}


Game.prototype.draw = function () {

}


Game.prototype.checkCollision = function () {

}


// Need to determine logic for generating new pardons
*/
