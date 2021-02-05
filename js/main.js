
for (let index = 0; index < 10; index++) {
    
    let coin = document.createElement("div");
    coin.classList.toggle("coin");
    
    let coinTop  = Math.floor(Math.random() * 101);
    let coinLeft  = Math.floor(Math.random() * 101); 
    coin.style.top =  "calc(" + coinTop.toString().concat("vh - 50px)"); 
    coin.style.left =  "calc(" + coinLeft.toString().concat("vw - 50px)"); 
    console.log(coin);

    document.querySelector(".pantalla").appendChild(coin);
}







