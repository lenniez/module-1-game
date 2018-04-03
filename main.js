"use strict"

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
}

function main() {
  var game;
  var mainContentElement = document.getElementsByClassName("main-content");

  // -- SPLASH SCREEN

  var splashScreenElement;
  var startButtonElement;

  function buildSplashScreen() {
    
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

    mainContentElement[0].appendChild(splashScreenElement);

    startButtonElement = splashScreenElement.querySelector('#destiny');

    startButtonElement.addEventListener('click', handleStartClick);
  }

  function handleStartClick() {
    destroySplashScreen();
    buildGameScreen();
  }

  function destroySplashScreen() {
    splashScreenElement.remove();
    startButtonElement.removeEventListener('click', handleStartClick);
  }

  // build game screen

  var gameScreenElement;

  function buildGameScreen() {
    gameScreenElement = createHtml(`
    <div>
      <p id = "pardons">pardons remaining:</p>
      <div id= "game">
      <h2 id="birth">birth</h2>
      <div>
        <!-- INSERT GAME CONTENTS HERE -->
      </div>
      <h2 id="death">death</h2>
    </div>

    <div class = "sins-text">
      <p id = "sins-footer">anger - sloth - greed - pride - lust - envy - wrath - gluttony</p>
    </div>
    </div>`);

    mainContentElement[0].appendChild(gameScreenElement);
    /*
      game = new Game(mainContentElement);
      game.build();
      game.start();
      game.onEnded(function() {
        gameEnded();
      });
    */

      setTimeout(gameEnded, 3000); //REMOVE THIS ONCE GAME CONSTRUCTOR EXISTS AND GAME END FUNCTION EXISTS
  }

  function gameEnded() {
    gameScreenElement.remove();
    buildGameOverScreen();
  }




  // build game over screen 
  var resetButtonElement;
  var gameOverScreenElement;

  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`
      <div>
        <img src = "images/gameover-wings.jpg">
        <h2>you lived a life of virtue... but you're still dead ;-)</h2>
        <button class="reset">live differently?</button>

        <!-- DIED FOR IT
        <img src="images/gameover-skull.jpg">
        <h2>you lived a life of sin and died for it</h2>
        <button class="reset">repent and try again?</button>
        -->
      </div>`);

    mainContentElement[0].appendChild(gameOverScreenElement);

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

  buildSplashScreen ();

}

window.addEventListener("load", main);

