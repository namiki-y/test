//
//game5
//

//オブジェクト
var mondai5 = [];
var jiki5 = [];
var kaitoutyuu5 = 0;
var jiki5_ok;
var score5 = 0
var stage5 = 50;

//初期化
function init5(){
  mondai5.length = 0;
  jiki5.length = 0;
  kaitoutyuu5 = 0;
  score5 = 0;
  stage5 = 50;
}

//スタート画面
function start5(){
  canvas.removeEventListener("click",start5);
  canvas.addEventListener('click',game5);
  document.getElementById("kaitoubutton5_con").style.display = "flex";
  init5();

  ctx.font = "40px 'Arial'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  ctx.fillStyle = "black";

  s = "問題5";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 100;
  ctx.fillText(s,x,y);

  ctx.font = "40px 'Arial'";
  s = "はめてください";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 220;
  ctx.fillText(s,x,y);

  ctx.font = "40px 'Arial'";
  s = "click   START!";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 340;
  ctx.fillText(s,x,y);
}

//ゲーム終了画面
function gameOver5(){
  document.getElementById("kaitoubutton5_con").style.display="none";
  ctx.font = "30px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";
  var s = "終了";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  s = "score  "+ score5*10;
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =150;
  ctx.fillText(s,x,y);
  
  s = "NEXT ≫";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =350;
  ctx.fillText(s,x,y);

  canvas.addEventListener("click",kekkaHyouji);
}

//メイン
function game5(){
  canvas.removeEventListener("click",game5);
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  mondaiHyouji5();
}

//
//問題
//

class Mondai5 {
  constructor(t){
    this.a = t;
  }

  draw(){
    for (var i = 0; i < stage5; i++) {
      ctx.fillRect((canvasWidth/stage5)*i,0,canvasWidth/stage5,20)
      ctx.clearRect((canvasWidth/stage5)*this.a,0,canvasWidth/stage5,20)
    }
  }
}

function mondaiHyouji5() {
  ctx.clearRect(0,0,canvasWidth,21);

  mondai5.push(new Mondai5(rand(2,stage5-3)));
  mondai5[kaitoutyuu5].draw();

  if (kaitoutyuu5>=7) {
    ctx.fillRect(0,20,canvasWidth,350);
  }

  jiki5.push(new Jiki5());
  jiki5[0].draw();

  kaitou5();
}

//自機
class Jiki5{
  constructor(){
    this.x = (canvasWidth/stage5)*(stage5/2-10);
    this.y = canvasHeight-20;
    this.w = canvasWidth/stage5;
    this.h = 20;
    this.vy = 10;
  }

  draw(){
    ctx.fillRect(this.x,this.y,this.w,this.h);
  }

  update(){
    if (this.y>0) this.y -=this.vy;
  }
}

//
//回答
//

//回答ボタン
function kaitou5(){
  document.getElementById("kaitoubutton5_0").addEventListener("click",jikiIdou5_leftleft);
  document.getElementById("kaitoubutton5_1").addEventListener("click",jikiIdou5_left);
  document.getElementById("kaitoubutton5_2").addEventListener("click",jikiIdou5_right);
  document.getElementById("kaitoubutton5_3").addEventListener("click",jikiIdou5_rightright);
  document.getElementById("ok5").addEventListener("click",kenshou5);
}

//自機の移動
function jikiIdou5_leftleft(){
  ctx.clearRect(0,canvasHeight-21,canvasWidth,21);
  if (jiki5[0].x-((canvasWidth/stage5)*2)>=0) jiki5[0].x-=(canvasWidth/stage5)*2;
  jiki5[0].draw();
}
function jikiIdou5_left(){
  ctx.clearRect(0,canvasHeight-21,canvasWidth,21);
  if (jiki5[0].x!=0) jiki5[0].x-=canvasWidth/stage5;
  jiki5[0].draw();
}

function jikiIdou5_right(){
  ctx.clearRect(0,canvasHeight-21,canvasWidth,21);
  if(jiki5[0].x!=canvasWidth-(canvasWidth/stage5)) jiki5[0].x+=canvasWidth/stage5;
  jiki5[0].draw();
}
function jikiIdou5_rightright(){
  ctx.clearRect(0,canvasHeight-21,canvasWidth,21);
  if(jiki5[0].x+((canvasWidth/stage5)*2)<=canvasWidth-(canvasWidth/stage5)) jiki5[0].x+=(canvasWidth/stage5)*2;
  jiki5[0].draw();
}

function jikiIdou5_ok(){
  ctx.clearRect(0,20,canvasWidth,canvasHeight-20);
  jiki5[0].update();
  jiki5[0].draw();

  //回答の検証
  if (jiki5[0].y ==0) {
    clearInterval(jiki5_ok);
    //正解
    if(jiki5[0].x/(canvasWidth/stage5) == mondai5[kaitoutyuu5].a) score5++;
    //不正解
    else {
      ctx.clearRect(0,0,canvasWidth,20);
      ctx.fillStyle = "red";
      for (var i = 0; i < stage5; i++) {
        ctx.fillRect((canvasWidth/stage5)*i,0,canvasWidth/stage5,20);
        ctx.clearRect((canvasWidth/stage5)*mondai5[kaitoutyuu5].a,0,canvasWidth/stage5,20)
      }
    }

    kaitoutyuu5++;

    if(kaitoutyuu5==10) gameOver5();

    else{
      if(kaitoutyuu5==3) stage5 = 100;
      ctx.fillStyle = "black";
      jiki5.shift();
      setTimeout(mondaiHyouji5,500);
    }
  }
}

//回答の検証
function kenshou5(){
  document.getElementById("kaitoubutton5_1").removeEventListener("click",jikiIdou5_left);
  document.getElementById("kaitoubutton5_2").removeEventListener("click",jikiIdou5_right);
  document.getElementById("ok5").removeEventListener("click",kenshou5);
  jiki5_ok = setInterval(jikiIdou5_ok,1000/60);
}
