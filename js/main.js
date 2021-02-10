// Init the main container to add elements
const canvas = document.querySelector('.canvas');
// Get the currect screen size of the user
const screen = {
  w: canvas.clientWidth,
  h: canvas.clientHeight,
};

/** Main Arrow function to create the world
 * 
 * @param {int} player_x -> is the position in the eye x of the character
 * @param {int} player_y -> is the position in the eye y of the character
 * @param {int} coinsNum -> is the total of coins in the world
 */
const createWorld = (player_x, player_y, coinsNum) => {
  let coins = [];
  
  // Create a div and save in 'player'
  let player = document.createElement("div");
  // Set the class of .player (see styles.css) in player (div) 
  player.classList.add('player');
  // Set the top and left position in pixels to player 
  player.style.left = player_x + "px";
  player.style.top = player_y + "px";
  // Set the player on canvas (the div container in html)
  canvas.appendChild(player);

  // Loop to each coin
  for (i = 0 ; i < coinsNum; i ++){
    // Create a coint jus like player
    let coin = document.createElement("div");
    coin.classList.add('coin');
    // Set top and left whit random numbers in the range of (0 - current screen size) minus 60 (for overflow)
    coin.style.left = Math.floor(Math.random() * (screen.w - 60)) + "px";
    coin.style.top = Math.floor(Math.random() * (screen.h - 60)) + "px";
    // Set the coin
    canvas.appendChild(coin);

    // Save the coin into an array
    coins.push(coin);
    }
    
    // Call the gameEngine Function
    gameEngine(player,coins);

}

// Call the main function
createWorld(380, 350, 10);

/** Engine Function to envents in the game
 * 
 * @param {DOM} player -> the div element that it's role is to be the player
 * @param {Array[DOM]} coins -> the array of elemt div that it's role is be a collectable
 */
function gameEngine(player, coins){
  // flag to stop showing the gameOver
  let flag = false;
  document.onkeydown = event => { 
    // Are coins left to collect?
    if(coins.length != 0){
      /** For each arrow key pressed:
       *  change the background-image of the character (player) depending of the key direction 
       *  Increase or Reduce 10 pixels in the top or left of the player depending of key direction
       */
      switch (event.key) { 
        case "ArrowLeft": 
            player.style.left = player.getBoundingClientRect().x  - 10 + "px";
            player.style.backgroundImage = "url('../img/spriteR.png')";
            break; 
        case "ArrowRight": 
            player.style.left =player.getBoundingClientRect().x  + 10 + "px";
            player.style.backgroundImage = "url('../img/spriteL.png')";
            break; 
        case "ArrowUp":
            player.style.top = player.getBoundingClientRect().y - 10 + "px"; 
            player.style.backgroundImage = "url('../img/spriteU.png')";
            break; 
        case "ArrowDown": 
            player.style.top = player.getBoundingClientRect().y + 10 + "px"; 
            player.style.backgroundImage = "url('../img/spriteL.png')";
            break;  
      } 
      // Check out for collisions
      onCollision(player.getBoundingClientRect(), coins);
    }else{
      // Was Game Over showed?
      if(!flag)
        // Call the game over function
        gameOver();
        // Game over showed succefully
        flag = true;
    }
    
    
  }
}

/** Game Over function:
 *  this will show another div in the (almost) center of the screen
 */
function gameOver(){
  // Set a new sound function
  let end = new sound('../res/passed.mp3');
  // Play the sound
  end.play();

  // Set a div whit a class gameover (see styles.css) into the screen
  let over = document.createElement("div");
  over.classList.add('gameover');
  canvas.appendChild(over);

}

/** Function to detect collision beetwen the player and the coins
 * @param {DOM} player -> the div element that it's role is to be the player
 * @param {Array[DOM]} coins -> the array of elemt div that it's role is be a collectable 
 */
function onCollision(player, coins)	{		

  coins.forEach(coin => {
    let target = coin.getBoundingClientRect();
    if (player.x < target.x + target.width &&
      player.x + player.width > target.x &&
      player.y < target.y + target.height &&
      player.height + player.y > target.y){
        // Remove the current coin of the screen
        canvas.removeChild(coin);
        // Remove the current coin of the list
        const index = coins.indexOf(coin);
        if (index > -1) {
          coins.splice(index, 1);
        }
        // Set a new sound function and play it
        let audio = new sound('../res/powerup.mp3');
        audio.play();
      }		        
  });
  	
}

/** Sound function to create an audio element to play it
 *  @param {String} src -> the path of the sound
 *  */ 
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  canvas.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} 
