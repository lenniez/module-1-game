"use strict"

function Game(parentElement) {
  var self = this;

  self.player = null;
  self.sins = [];
  self.pardons = [];
  self.pardonCount = null;
  self.age = 0;

  self.mainContentElement = document.getElementsByClassName("main-content")[0];
  self.parentElement = parentElement;
  self.gameScreenElement = null;
  self.pardonCountElement = null;
  self.ageElement = null;
  self.intervalID1 = null;
  self.intervalID2 = null;
  self.intervalID3 = null;
}

// @todo understand what this does
Game.prototype.onEnded = function(cb) {
  var self = this;
  self.callback = cb;      
};

Game.prototype.build = function () {
  var self = this;

  self.gameScreenElement = createHtml(`
  <div class = "game-wrapper">
    <div id = "gamescreenheader">
      <p id = "age">age:</p>
      <p id = "pardonCount"></p>
    </div>
    <div id= "game-container">
    </div>
    <div id = "sins-footer">
      <p>anger - sloth - greed - pride - lust - envy - wrath - gluttony</p>
    </div>
  </div>`);
  
  self.parentElement.appendChild(self.gameScreenElement);
  self.pardonCountElement = self.gameScreenElement.querySelector('#pardonCount');
  self.ageElement = self.gameScreenElement.querySelector("#age");
};


Game.prototype.playerMove = function() {
  var self = this;
  self.player.update();
};


Game.prototype.startGame = function () {
  var self = this;
  this.pardonCount = 3;
  self.pardonCountElement.innerText = "pardons remaining: " + this.pardonCount;

  self.player = new Player(20, 400, self.gameScreenElement);
  self.player.build();
 
  for (var x = 0; x < 6; x++) {
    self.sins.push(new Sin(self.gameScreenElement));
    self.sins[x].build();
  }

  // create new pardon
  self.pardons.push(new Pardon(self.gameScreenElement));
  self.pardons[self.pardons.length - 1].build();
  
  self.playerMove();

  function updatePardonCount() {
    self.checkCollisionsUpdatePardons();
  }

  function updateSins() {
    self.sinUpdate();
  }

  function updatePardons() {
    self.pardonUpdate();
  }

  self.intervalID1 = window.setInterval(updatePardonCount, 200);
  self.intervalID2 = window.setInterval(updateSins, 300);
  self.intervalID3 = window.setInterval(updatePardons, 10000);

};


//update Existing sins, pardons; add new sins, pardons; check for collisions; update pardons if needed
Game.prototype.sinUpdate = function() {
  var self = this;

  // Create new Sin + build
    self.sins.push(new Sin(self.gameScreenElement));
    self.sins[self.sins.length - 1].build();

  // Update existing sins' positions

  self.sins.forEach(function(item) {
    item.update();
  }); 

};


Game.prototype.pardonUpdate = function () {
  var self = this;

  // Create new Pardons + build them
  self.pardons.push(new Pardon(self.gameScreenElement));
  self.pardons[self.pardons.length - 1].build();

  // Update existing Pardons
  self.pardons.forEach(function(item) {
    item.update();
  });

};

// Checks collisions and update PardonCount (value & DOM)
Game.prototype.checkCollisionsUpdatePardons = function () {
  var self = this;

  var playerRightEdge = self.player.x + self.player.width;
  var playerLeftEdge = self.player.x;
  var playerTopEdge = self.player.y;
  var playerBottomEdge = self.player.y + self.player.height;

  self.sins.forEach(function (item, index){
    var sinRightEdge = item.x + item.width;
    var sinLeftEdge = item.x;
    var sinTopEdge = item.y;
    var sinBottomEdge = item.y + item.height;

    if (sinRightEdge > playerLeftEdge && sinLeftEdge < playerRightEdge && sinTopEdge < playerBottomEdge && sinBottomEdge > playerTopEdge) {
      self.pardonCount-= 1;
      self.sins[index].sinElement.remove();
      self.sins.splice(index, 1);
    }
  });

  self.pardons.forEach(function (item, index){
    var pardonRightEdge = item.x + item.width;
    var pardonLeftEdge = item.x;
    var pardonTopEdge = item.y;
    var pardonBottomEdge = item.y + item.height;

    if (pardonRightEdge > playerLeftEdge && pardonLeftEdge < playerRightEdge && pardonTopEdge < playerBottomEdge && pardonBottomEdge > playerTopEdge) {
      self.pardonCount+= 1;
      self.pardons[index].pardonElement.remove();
      self.pardons.splice(index, 1);
    }
  });

  // Update pardonCountElement & check for Game Over
  self.pardonCountElement.innerText = "pardons: " + this.pardonCount;

  if (self.pardonCount <= 0) {
    clearInterval(self.intervalID1);
    clearInterval(self.intervalID2);
    clearInterval(self.intervalID3);
    self.callback();
  };
  
};


Game.prototype.destroy = function() {
  var self = this;
  self.gameScreenElement.remove();
};
