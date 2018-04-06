"use strict"

function main() {
  var game;
  var music = new Audio ("sounds/bites-the-dust-queen.mp3");
  var yeahSound = new Audio("sounds/yeah.mp3");
  var ughSound = new Audio("sounds/ugh-lose.wav");
  var woohooSound = new Audio("sounds/woohoo.mp3");

  // var player;
  var mainContentElement = document.getElementsByClassName("main-content")[0];

  // -- SPLASH SCREEN

  var splashScreenElement;
  var startButtonElement;

  function buildSplashScreen() {
    music.play();
    splashScreenElement = createHtml(`
    <div>
      <div class = "splash-bg"></div>
      <img id = "splash-img" src = 'images/heart-bg.gif'>
      <div class= "title-bg">
        <h1>EIGHT WAYS TO DIE</h1>
        <div>
          <p class = "sins-text">we were born sinners, but will you die better than that?</p>
        </div>
        <button><span id="destiny">define your destiny</span></button>
      </div>
      <div class = "splash-bg">
      </div>
    </div>`);

    mainContentElement.appendChild(splashScreenElement);

    startButtonElement = splashScreenElement.querySelector('#destiny');

    startButtonElement.addEventListener('click', handleStartClick);
  }

  function handleStartClick() {
    destroySplashScreen();
    buildGameScreen();
    yeahSound.play(); 
  }

  function destroySplashScreen() {
    splashScreenElement.remove();
    startButtonElement.removeEventListener('click', handleStartClick);
  }

  // build game screen

  function buildGameScreen () {
    game = new Game(mainContentElement);
    game.build();
    game.startGame();
    game.onEnded(function() {
      gameEnded();
    });
  }

  // Update game screen at intervals with new elements

  function gameEnded() {
    game.destroy();
    music.pause();
    buildGameOverScreen();
  }

  // build game over screen 
  var resetButtonElement;
  var gameOverScreenElement;

  function buildGameOverScreen() {
    var inner;
    if (game.pardonCount > 0) {
      inner = 
      `<div class = "game-over-wrapper">
      <img src = "images/gameover-wings.jpg">
      <h2>you lived a life of virtue... but you're still dead ;-)</h2>
      <button class="reset">live differently?</button>
      </div>`;
      woohooSound.play();
    } else {
      inner = `<div class = "game-over-wrapper">
      <img src="images/gameover-skull.jpg">
      <h2>you lived a life of sin and died for it</h2>
      <button class="reset">repent and try again?</button>
      </div>`;
      ughSound.play();
    } // FIGURE OUT IF THIS WILL CAUSE A WEIRD FLASH
    gameOverScreenElement = createHtml(inner);

    mainContentElement.appendChild(gameOverScreenElement);

    resetButtonElement = gameOverScreenElement.querySelector(".reset");

    resetButtonElement.addEventListener("click", handleResetClick);
  }

  function handleResetClick() {
    destroyGameOverScreen();
    buildGameScreen();
  }

  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    resetButtonElement.removeEventListener("click", handleResetClick);
  }



  // start the app

  buildSplashScreen();

}

window.addEventListener("load", main);