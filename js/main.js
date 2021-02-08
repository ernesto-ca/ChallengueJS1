
const  GameObject =  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    collide: function collide(target) {
        if (this.x < target.x + target.width &&
            this.x + this.width > target.x &&
            this.y < target.y + target.height &&
            this.height + this.y > target.y) {
             return true;
         }
         return false
    },
};

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

  player = Object.create(GameObject);
  player.x = player_x;
  player.y = player_y;

  for (i = 0 ; i < coinsNum; i ++){
    let coin = document.createElement("div");
    coin.classList.add('coin');
    coin.style.left = Math.floor(Math.random() * (screen.w - 60)) + "px";
    coin.style.top = Math.floor(Math.random() * (screen.h - 60)) + "px";
    canvas.appendChild(coin);
  }

// Colisión a proposito
    coin = Object.create(GameObject);
    coin.x = player_x;
    coin.y = player_y;
    coin.width = 50;
    coin.height = 50;
    console.log(onCollision(player,coin))


}
createWorld(380, 150, 10);


function onCollision(gameobject, target)	{		

    if (gameobject.collide(target)) 			
             return true;		
    return false;	
}








