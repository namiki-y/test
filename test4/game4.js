//
//game4.js
//

//オブジェクト
var mondai4 = [];
var score4 = 0;
var kaitoutyuu4 = 0;
var timer4;

//初期化
function init4(){
  mondai4.length = 0;
  score4 = 0;
  kaitoutyuu4 = 0;
}

//スタート画面
function start4(){
  canvas.removeEventListener("click",start4);
  canvas.addEventListener('click',game4);
  document.getElementById("kaitoubutton4_con").style.display = "block";
  init4();

  ctx.font = "40px 'Arial'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  ctx.fillStyle = "black";

  s = "問題4";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 100;
  ctx.fillText(s,x,y);

  ctx.font = "20px 'Arial'";
  s = "出来るだけ速く";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 190;
  ctx.fillText(s,x,y);

  s = "表示される矢印の反対方向の矢印を押してください";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 240;
  ctx.fillText(s,x,y);

  ctx.font = "40px 'Arial'";
  s = "click   START!";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 340;
  ctx.fillText(s,x,y);
}

//ゲーム終了画面
function gameOver4(){
  document.getElementById("kaitoubutton4_con").style.display = "none";
  ctx.font = "30px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";
  var s = "終了";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  s = "score  "+ score4/10;
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =150;
  ctx.fillText(s,x,y);

  canvas.addEventListener("click",start5);
}

//メイン
function game4(){
  canvas.removeEventListener("click",game4);
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  kaitou4();
  mondaiHyouji4();
}

//
//問題
//
class Mondai4{
  constructor(t){
    this.type = t;
    this.s = 50;
  }

  draw(){
    ctx.font = "200px 'Arial'";
    if (this.type==1) {
      s = "↑";
      w = ctx.measureText(s).width;
      x = canvasWidth/2 - w/2;
      y = 300;
      ctx.fillText(s,x,y);
    }
    else if (this.type==2) {
      s = "→";
      w = ctx.measureText(s).width;
      x = canvasWidth/2 - w/2;
      y = 300;
      ctx.fillText(s,x,y);
    }
    else if (this.type==3) {
      s = "↓";
      w = ctx.measureText(s).width;
      x = canvasWidth/2 - w/2;
      y = 300;
      ctx.fillText(s,x,y);
    }
    else {
      s = "←";
      w = ctx.measureText(s).width;
      x = canvasWidth/2 - w/2;
      y = 300;
      ctx.fillText(s,x,y);
    }
  }
}

//問題表示
function mondaiHyouji4(){
  mondai4.push(new Mondai4(rand(1,4)));
  mondai4[kaitoutyuu4].draw();
  timer4 = setInterval(time4,70);
}

//時間で減算
function time4(){
  if (mondai4[kaitoutyuu4].s>0) mondai4[kaitoutyuu4].s--;
  else clearInterval(timer4);
}

//
//回答
//

//回答の受付
function kaitou4(){
  document.getElementById("kaitoubutton4_down").addEventListener("click",function(){kenshou4(1)});
  document.getElementById("kaitoubutton4_left").addEventListener("click",function(){kenshou4(2)});
  document.getElementById("kaitoubutton4_up").addEventListener("click",function(){kenshou4(3)});
  document.getElementById("kaitoubutton4_right").addEventListener("click",function(){kenshou4(4)});
}

//回答の検証
function kenshou4(num){
  //正解
  if (mondai4[kaitoutyuu4].type == num) {
    ctx.fillStyle = "black"
    ctx.font = "30px 'Arial'";
    ctx.fillText("〇",kaitoutyuu4*27+30,30);
    score4 += mondai4[kaitoutyuu4].s;
  }
  //不正解
  else {
    ctx.fillStyle = "black"
    ctx.font = "40px 'Arial'";
    ctx.fillText("×",kaitoutyuu4*27+33,35);
  }

  clearInterval(timer4);

  if (kaitoutyuu4!=19) {
    kaitoutyuu4++;

    ctx.clearRect(0,50,canvasWidth,canvasHeight-50);
    mondaiHyouji4();
  }
  else gameOver4();
}
