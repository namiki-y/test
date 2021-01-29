//
//game1.js
//

//オブジェクト
var kaitoutyuu1 = 0;
var score1 = 0;
var timer1;
var mondai1 = [];

//時間測定
function time1() {
  if (mondai1[kaitoutyuu1].s>0) mondai1[kaitoutyuu1].s-=1;
}

//
//ゲーム
//

//メイン
function game1() {
  canvas.removeEventListener('click',game1);
  ctx.fillStyle ="white";
  ctx.fillRect(0,0,canvasWidth,canvasHeight);

  for (var i = 1; i < 5; i++) mondai1.push(new Mondai1(rand(1,3),i))
  for (var i = 0; i < 4; i++) mondai1[i].draw();
  ctx.fillStyle = "black"
  ctx.strokeRect(canvasWidth/2-200,50,430,60);

  kaitou();
  timer1 = setInterval(time1,175);
}

//スタート画面
function start1(){
  canvas.removeEventListener('click',start1);
  init1();
  document.getElementById("kaitoubutton1_con").style.display = "flex";
  canvas.addEventListener('click',game1);
  ctx.font = "40px 'Arial'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";

  var s = "問題1";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  ctx.font = "30px 'Arial'";
  var s = "出来るだけ速く";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 190;
  ctx.fillText(s,x,y);

  ctx.font = "30px 'Arial'";
  var s = "？に入る数字を答えてください";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 240;
  ctx.fillText(s,x,y);

  var s = "click   START!";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 340;
  ctx.fillText(s,x,y);
}

//ゲーム終了画面
function gameOver1(){
  clearInterval(timer1);
  document.getElementById("kaitoubutton1_con").style.display="none";

  ctx.font = "30px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";
  var s = "終了";
  var w = ctx.measureText(s).width;
  var x = canvasWidth/2 - w/2;
  var y = 100;
  ctx.fillText(s,x,y);

  s = "score  "+score1/10;
  w = ctx.measureText(s).width;
  x = canvasWidth/2 - w/2;
  y =150;
  ctx.fillText(s,x,y);

  canvas.addEventListener("click",start2);
}

//初期化
function init1(){
  kaitoutyuu1=0;
  score1=0;
  mondai1.length = 0;
}

//
//問題
//

class Mondai1{
  constructor(t,y){
    this.type = t;
    this.y = y;
    this.s = 50;
    //足し算
    if (this.type==1) {
      this.q1 = rand(1,20);
    	this.q1_2 = rand(1,9);
    	this.a1 = this.q1 + this.q1_2;
    }
    //引き算
    else if (this.type==2) {
      this.q1 = rand(1,20);
    	this.q1_2 = rand(1,9);
    	this.a1 = this.q1 - this.q1_2;
    }
    //かけ算
    else {
      this.q1 = rand(2,9);
    	this.q1_2 = rand(1,9);
    	this.a1 = this.q1 * this.q1_2;
    }
  }

  draw(){
    ctx.fillStyle = "black"
    ctx.font = "60px 'Arial'"

    if (this.type==1) {
      this.que1 = this.q1 + "  +  ?  =  " + this.a1;
      ctx.fillText(this.que1,150,this.y*100);
    }
    else if (this.type==2) {
      this.que1 = this.q1 + "  -  ?  =  " + this.a1;
      ctx.fillText(this.que1,150,this.y*100);
    }
    else{
      this.que1 = this.q1 + "  ×  ?  =  " + this.a1;
      ctx.fillText(this.que1,150,this.y*100);
    }
  }
}


//
//回答関連
//

//回答ボタン
function kaitou(){
  document.getElementById("kaitoubutton_1").addEventListener("click",function(){keisan(1)});
  document.getElementById("kaitoubutton_2").addEventListener("click",function(){keisan(2)});
  document.getElementById("kaitoubutton_3").addEventListener("click",function(){keisan(3)});
  document.getElementById("kaitoubutton_4").addEventListener("click",function(){keisan(4)});
  document.getElementById("kaitoubutton_5").addEventListener("click",function(){keisan(5)});
  document.getElementById("kaitoubutton_6").addEventListener("click",function(){keisan(6)});
  document.getElementById("kaitoubutton_7").addEventListener("click",function(){keisan(7)});
  document.getElementById("kaitoubutton_8").addEventListener("click",function(){keisan(8)});
  document.getElementById("kaitoubutton_9").addEventListener("click",function(){keisan(9)});
}

function keisan(num){
//回答の検証
  if(mondai1[kaitoutyuu1].type==1) a2 = mondai1[kaitoutyuu1].q1 + num;
  else if (mondai1[kaitoutyuu1].type==2) a2 = mondai1[kaitoutyuu1].q1 - num;
  else a2 = mondai1[kaitoutyuu1].q1 * num;
//結果
  //正解
  if (mondai1[kaitoutyuu1].a1==a2) {
    ctx.font = "30px 'Arial'";
    ctx.fillText("〇",kaitoutyuu1*27+30,30);
    score1+= mondai1[kaitoutyuu1].s;
  }
  //不正解
  else {
    ctx.font = "40px 'Arial'";
    ctx.fillText("×",kaitoutyuu1*27+33,35);
  }

//ゲーム終了
if(kaitoutyuu1==19) gameOver1();
else{
  //回答中マークの移行
    if (kaitoutyuu1%4 !=3) {
      ctx.clearRect(canvasWidth/2-202,(kaitoutyuu1%4)*100+48,444,4);
      ctx.clearRect(canvasWidth/2-202,(kaitoutyuu1%4)*100+50,4,60);
      ctx.clearRect(canvasWidth/2-202,(kaitoutyuu1%4)*100+108,444,4);
      ctx.clearRect(canvasWidth/2+228,(kaitoutyuu1%4)*100+48,4,60);
      ctx.strokeRect(canvasWidth/2-200,(kaitoutyuu1%4+1)*100+50,430,60);
    }else{
      ctx.clearRect(canvasWidth/2-202,348,444,4);
      ctx.clearRect(canvasWidth/2-202,348,4,60);
      ctx.clearRect(canvasWidth/2-202,408,444,4);
      ctx.clearRect(canvasWidth/2+228,348,4,60);
    }

    kaitoutyuu1++;

    if (kaitoutyuu1%4==0) {
      ctx.clearRect(0,40,canvasWidth,canvasHeight);
      for (var i = 1; i < 5; i++) mondai1.push(new Mondai1(rand(1,3),i));
      for (var i = kaitoutyuu1; i < kaitoutyuu1+4; i++) mondai1[i].draw();
      ctx.strokeRect(canvasWidth/2-200,50,430,60);
    }
  }
}
