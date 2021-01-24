//キャンバス
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");

var canvasWidth = 600;
var canvasHeight = 450;
canvas.width=canvasWidth;
canvas.height=canvasHeight;

//ゲームスピード

//初期化

//オブジェクト
var kaitoutyuu = 0;
var score = 0;
var count = 0;
var timer;

//時間測定
function time() {
  if (mondai[kaitoutyuu].s>0) mondai[kaitoutyuu].s-=1;
}

//メイン
function gameloop() {
  ctx.fillStyle ="white";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);

  for (var i = 1; i < 5; i++) mondai.push(new Mondai(rand(1,3),i))
  for (var i = 0; i < 4; i++) mondai[i].draw();
  ctx.fillStyle = "black"
  ctx.strokeRect(canvasWidth/2-200,50,430,60);

  kaitou();
  timer = setInterval(time,175);
}

window.onload = start();
