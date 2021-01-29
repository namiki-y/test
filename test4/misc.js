//
//misc.js その他
//

//ランダム
function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

//時間で減算
function timer(obj){
  if (obj>0) obj--;
  ctx.font = "20px 'Arial'";
  ctx.fillText(obj,20,20);
}

//読込
var appleImg = new Image();
appleImg.src = "image/ringo.png"
var dogImg = new Image();
dogImg.src = "image/inu.png"
var carImg = new Image();
carImg.src = "image/ball.png"
