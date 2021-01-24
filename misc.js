//
//misc.js その他
//

//ランダム
function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

//初期化
function init(){
  kaitoutyuu=0;
  score=0;
  mondai.length = 0;
  count = 0;
}

//ゲーム開始
function gamestart(){
  canvas.removeEventListener('click',gamestart);
  gameloop();
}

//スタート画面表示
function openstart(){
  canvas.removeEventListener('click',openstart);
  init();
  start();
}

//スタート画面
function start(){
  canvas.addEventListener('click',gamestart);
  ctx.font = "40px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";
  var s = "click   START!";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);
}

//ゲーム終了画面
function gameOver(){
  clearInterval(timer);
  document.getElementById("kaitoubutton_con").style.display="none";

  ctx.font = "30px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";
  var s = "終了";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  s = "score  "+score/10;
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =150;
  ctx.fillText(s,x,y);

  canvas.addEventListener("click",function(){location.reload()});
}
