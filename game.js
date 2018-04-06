"use strict"
var SPEED = 2;
function Game(parentElement) {
  var self = this;

  self.player = null;
  self.sins = [];
  self.pardons = [];
  self.pardonCount = null;
  self.age = 0;
  self.timer = 0;
  self.sinSound = new Audio("sounds/sin-whoosh.wav");
  self.pardonSound = new Audio ("sounds/pardon-boop.wav");

  self.mainContentElement = document.getElementsByClassName("main-content")[0];
  self.parentElement = parentElement;
  self.gameScreenElement = null;
  self.pardonCountElement = null;
  self.ageElement = null;
  self.intervalId = null;
  self.timeOutId = null;
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
      <p id = "age"></p>
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


Game.prototype.startGame = function () {
  var self = this;
  self.checkTimeout();
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
  
  self.player.update(); 
  self.intervalId = window.setInterval(function () {
    self.update();
  }, 17);

};
  

Game.prototype.update = function () {
  var self = this; 
  self.timer++;

  if(self.timer % 2 === 0){
    self.checkCollisionsUpdatePardons();
  } 

  if (self.timer % 5 === 0 && self.sins.length < 25) {
    self.sinCreate();
  } 

  if(self.timer % 3 === 0){
    self.sinUpdate();
  }

  if (self.timer % 35 === 0) {
    self.sinDirectionUpdate();
  }

  if (self.timer % 100 === 0 && self.pardons.length < 6) {
    self.pardonCreate();
  }

  if (self.timer % 100 === 0 ) {
    self.pardonUpdate();
  }
};

 // Update existing sins' positions
Game.prototype.sinUpdate = function() {
  var self = this;
 
  self.sins.forEach(function(item, index) {
    item.update();
    if (item.dead === true) {
      self.sins.splice(index, 1)
    }
  }); 
};

Game.prototype.sinDirectionUpdate = function() {
  var self = this;

  self.sins.forEach(function(item, index) {
    item.randomDirection = item.directionArray[Math.floor(Math.random() * item.directionArray.length)]; // pull random index in directionArray
  });
};

// Create new Sin + build
Game.prototype.sinCreate = function() {
  var self = this;

  self.sins.push(new Sin(self.gameScreenElement));
  self.sins[self.sins.length - 1].build();
};

// Create new Pardons + build them
Game.prototype.pardonCreate = function () {
  var self = this;

  self.pardons.push(new Pardon(self.gameScreenElement));
  self.pardons[self.pardons.length - 1].build();
  
};

// Update existing Pardons
Game.prototype.pardonUpdate = function() {
  var self = this;

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
      self.sinSound.play();
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
      self.pardonSound.play();
    }
  });

  // Update pardonCountElement & check for Game Over
  self.pardonCountElement.innerText = "pardons: " + this.pardonCount;

  if (self.pardonCount <= 0) {
    clearInterval(self.intervalId);
    clearInterval(self.timeOutId);
    self.callback();
  };
  
};


Game.prototype.destroy = function() {
  var self = this;
  self.gameScreenElement.remove();
};

Game.prototype.checkTimeout = function () {
  var self = this;

  var age = 0;
  self.timeOutId = setInterval(function() {
    self.ageElement.innerHTML = "age: " + age;
    (age++)*2;
    if (age >= 99) {
      clearInterval(self.timeOutId);
      clearInterval(self.intervalId);
      self.callback();
    }
  }, 1000);
};