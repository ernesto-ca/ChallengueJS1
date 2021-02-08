
const canvas = document.querySelector('.canvas');
const screen = {
  w: canvas.clientWidth,
  h: canvas.clientHeight,
};
const createWorld = (player_x, player_y, coinsNum) => {
  let player = document.createElement("div");
  player.classList.add('player');
  player.style.left = player_x + "px";
  player.style.top = player_y + "px";
  canvas.appendChild(player);


  for (i = 0 ; i < coinsNum; i ++){
    let coin = document.createElement("div");
    coin.classList.add('coin');
    coin.style.left = Math.floor(Math.random() * (screen.w - 60)) + "px";
    coin.style.top = Math.floor(Math.random() * (screen.h - 60)) + "px";
    canvas.appendChild(coin);
    
    console.log( onCollision(player.getBoundingClientRect(), coin.getBoundingClientRect()));
   
    }
  

}
createWorld(380, 150, 10);


function onCollision(player, target)	{		
    if (player.x < target.x + target.width &&
        player.x + player.width > target.x &&
        player.y < target.y + target.height &&
        player.height + player.y > target.y)		
             return true;		
    return false;	
}








