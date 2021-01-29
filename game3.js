//
//game3.js
//

//オブジェクト
var mondai3 = [];
var count3 = 120;
var timer3;
var kaitoutyuu3 = 0;
var score3 = 0;

//初期化
function init3(){
  mondai3.length = 0;
  count3 = 120;
  kaitoutyuu3 = 0;
  score3 = 0;
}

//枠線
function wakusen3(){
  ctx.strokeStyle = "black";
  ctx.strokeRect(1,5,canvasWidth-150,canvasHeight);

  for (var i = 0; i < mondai3.length; i++) {
    ctx.strokeRect((i%10)*45+1,Math.floor(i/10)*90+5,45,45);
  }
}

//
//ゲーム
//

//スタート画面
function start3(){
  canvas.removeEventListener("click",start3);
  canvas.addEventListener('click',kiokuGamen3);
  document.getElementById("kaitoubutton3_con").style.display = "flex";
  init3();

  ctx.font = "40px 'Arial'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";

  s = "問題3";
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y = 100;
  ctx.fillText(s,x,y);

  ctx.font = "30px 'Arial'";
  s = "2分間で絵の配置を覚えてください";
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
function gameOver3(){
  document.getElementById("kaitoubutton3_con").style.display="none";

  ctx.font = "30px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";
  var s = "終了";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  s = "score  "+ score3*2.5;
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =150;
  ctx.fillText(s,x,y);

  canvas.addEventListener("click",start4);
}

//
//問題
//

class Mondai3{
  constructor(i){
    this.a = rand(1,3);
    this.n = i;
  }

  draw(){
    ctx.fillStyle ="black";
    ctx.font = "40px 'Arial'"
    x = (this.n%10)*45+3;
    y = Math.floor(this.n/10)*90+8;

    if (this.a==1) ctx.drawImage(appleImg,x,y,40,40);
    else if (this.a==2) ctx.drawImage(dogImg,x,y,40,40);
    else if (this.a==3) ctx.drawImage(carImg,x,y,40,40);
  }
}

//記憶時間
function kiokuJikan3(){
  if (count3>0) {
    ctx.clearRect(canvasWidth-135,0,135,100);
    count3--;
    s = "残り " + count3 + "秒";
    ctx.fillText(s,canvasWidth-135,50);

    if(count3==0) kaitouGamen3();
  }
}

//記憶画面
function kiokuGamen3() {
  canvas.removeEventListener('click',kiokuGamen3);
  ctx.fillStyle ="white";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);

  for (var i = 0; i < 40; i++) mondai3.push(new Mondai3(i));
  for (var i = 0; i < 40; i++) mondai3[i].draw();

  wakusen3();

  //残り時間の表示
  s = "残り " + count3 + "秒";
  ctx.font = "25px 'Arial'";
  ctx.fillText(s,canvasWidth-135,50);
  timer3 = setInterval(kiokuJikan3,1000);
}

//
//回答
//

//回答画面
function kaitouGamen3(){
  clearInterval(timer3);
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  wakusen3();
  kaitou3();
  //回答マークの表示
  ctx.clearRect(0,4,47,47);
  ctx.strokeStyle = "red";
  ctx.strokeRect(1,5,45,45);
}

//回答ボタン
function kaitou3(){
  document.getElementById("kaitoubutton3_1").addEventListener("click",function(){kenshou3(1)});
  document.getElementById("kaitoubutton3_2").addEventListener("click",function(){kenshou3(2)});
  document.getElementById("kaitoubutton3_3").addEventListener("click",function(){kenshou3(3)});
}

//回答の検証
function kenshou3(num){
  ctx.fillStyle = "black";
  ctx.font = "60px 'Arial'";
  //正解
  if (mondai3[kaitoutyuu3].a == num) {
    score3++;
    s = "○";
    x = (mondai3[kaitoutyuu3].n%10)*45+5;
    y = Math.floor(mondai3[kaitoutyuu3].n/10)*90+86;
    ctx.fillText(s,x,y);
  }
  //不正解
  else{
  s = "×";
  x = (mondai3[kaitoutyuu3].n%10)*45+5;
  y = Math.floor(mondai3[kaitoutyuu3].n/10)*90+90;
  ctx.fillText(s,x,y);
  }

  mondai3[kaitoutyuu3].draw();

  kaitoutyuu3++;

  //ゲーム終了
  if(kaitoutyuu3==40) gameOver3();
  //回答マークの移行
  else{
    ctx.clearRect((mondai3[kaitoutyuu3].n%10)*45,Math.floor(mondai3[kaitoutyuu3].n/10)*90+4,47,47);
    ctx.strokeStyle = "red";
    ctx.strokeRect((mondai3[kaitoutyuu3].n%10)*45+1,Math.floor(mondai3[kaitoutyuu3].n/10)*90+5,45,45);
  }
}
