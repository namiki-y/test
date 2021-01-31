//
//game2.js
//

//オブジェクト
var kaitoutyuu2 = 0;
var score2 = 0;
var timer2;
var mondai2 = [];
var s2;

//初期化
function init2(){
  kaitoutyuu2 = 0;
  score2 = 0;
  mondai2.length = 0;
}

//時間測定
function time2() {
  if (mondai2[kaitoutyuu2].s>0) mondai2[kaitoutyuu2].s-=1;
}

//
//ゲーム
//

//メイン
function game2() {
  canvas.removeEventListener('click',game2);
  ctx.fillStyle ="white";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);

  mondai2.push(new Mondai2(rand(1,5),rand(1,5)))
  mondai2[0].draw();

  kaitou2();
  timer2 = setInterval(time2,100);
}

//スタート画面
function start2(){
  canvas.removeEventListener("click",start2);
  canvas.addEventListener('click',game2);
  document.getElementById("kaitoubutton2_con").style.display = "flex";
  init2();

  ctx.font = "40px 'Arial'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";

  s = "問題2";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 100;
  ctx.fillText(s,x,y);

  ctx.font = "30px 'Arial'";
  s = "出来るだけ速く";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 190;
  ctx.fillText(s,x,y);

  s = "文字自体の色を答えてください";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 240;
    ctx.fillText(s,x,y);

  s = "click   START!";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 340;
  ctx.fillText(s,x,y);
}

//ゲーム終了画面
function gameOver2(){
  clearInterval(timer2);
  document.getElementById("kaitoubutton2_con").style.display="none";

  ctx.font = "30px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";
  var s = "終了";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  s = "score  "+score2/10;
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =150;
  ctx.fillText(s,x,y);
  
  s = "NEXT ≫";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =350;
  ctx.fillText(s,x,y);

  canvas.addEventListener("click",start3);
}

//
//問題
//

class Mondai2 {
  constructor(c,hc){
    this.c = c;
    this.hc = hc;
    this.s = 50;
    do {
      this.haikei = rand(1,5)
    } while (this.haikei==this.c);
  }

  draw(){
    ctx.font = "bold 100px 'Arial'"

    //背景色
    if (this.haikei==1) ctx.fillStyle = "red";
    else if (this.haikei==2) ctx.fillStyle = "blue";
    else if (this.haikei==3) ctx.fillStyle = "yellow";
    else if (this.haikei==4) ctx.fillStyle = "green";
    else ctx.fillStyle = "black";

    ctx.fillRect(0,0,canvasWidth,canvasHeight);

    //文字自体の色
    if (this.c==1) ctx.fillStyle = "red";
    else if (this.c==2) ctx.fillStyle = "blue";
    else if (this.c==3) ctx.fillStyle = "yellow";
    else if (this.c==4) ctx.fillStyle = "green";
    else ctx.fillStyle = "black"

    //書いてある文字
    if (this.hc==1) s2 = "あか";
    else if (this.hc==2) s2 = "あお";
    else if (this.hc==3) s2 = "きいろ";
    else if (this.hc==4) s2 = "みどり";
    else if (this.hc==5) s2 = "くろ";

    w = ctx.measureText(s2).width;
    x = canvasWidth/2 - w/2;
    y = canvasHeight/2;

    ctx.fillText(s2,x,y);
  }
}

//
//回答関連
//

function kaitou2(){
  document.getElementById("kaitoubutton2_red").addEventListener("click",function(){kenshou2(1)});
  document.getElementById("kaitoubutton2_blue").addEventListener("click",function(){kenshou2(2)});
  document.getElementById("kaitoubutton2_yellow").addEventListener("click",function(){kenshou2(3)});
  document.getElementById("kaitoubutton2_green").addEventListener("click",function(){kenshou2(4)});
  document.getElementById("kaitoubutton2_black").addEventListener("click",function(){kenshou2(5)});
}

//回答の検証
function kenshou2(c){
  //正解
  if (mondai2[kaitoutyuu2].c==c) {
    ctx.fillStyle = "black"
    ctx.font = "30px 'Arial'";
    ctx.fillText("〇",kaitoutyuu2*27+30,30);
    score2 += mondai2[kaitoutyuu2].s;
  }
  //不正解
  else {
    ctx.fillStyle = "black"
    ctx.font = "40px 'Arial'";
    ctx.fillText("×",kaitoutyuu2*27+33,35);
  }

  if (kaitoutyuu2!=19) {
    kaitoutyuu2++;
    //新しい問題作成
    ctx.clearRect(0,40,canvasWidth,canvasHeight);
    mondai2.push(new Mondai2(rand(1,5),rand(1,5)));
    mondai2[kaitoutyuu2].draw();
  }
  //ゲーム終了
  else gameOver2();
}
