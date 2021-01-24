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
  if(mondai[kaitoutyuu].type==1) a2 = mondai[kaitoutyuu].q1 + num;
  else if (mondai[kaitoutyuu].type==2) a2 = mondai[kaitoutyuu].q1 - num;
  else a2 = mondai[kaitoutyuu].q1 * num;
//結果
  //正解
  if (mondai[kaitoutyuu].a1==a2) {
    ctx.font = "30px 'Arial'";
    ctx.fillText("〇",kaitoutyuu*27+30,30);
    score+= mondai[kaitoutyuu].s;
  }
  //不正解
  else {
    ctx.font = "40px 'Arial'";
    ctx.fillText("×",kaitoutyuu*27+33,35);
  }

//ゲーム終了
if(kaitoutyuu==19) gameOver();
else{
  //回答中マークの移行
    if (kaitoutyuu%4 !=3) {
      ctx.clearRect(canvasWidth/2-202,(kaitoutyuu%4)*100+48,444,4);
      ctx.clearRect(canvasWidth/2-202,(kaitoutyuu%4)*100+50,4,60);
      ctx.clearRect(canvasWidth/2-202,(kaitoutyuu%4)*100+108,444,4);
      ctx.clearRect(canvasWidth/2+228,(kaitoutyuu%4)*100+48,4,60);
      ctx.strokeRect(canvasWidth/2-200,(kaitoutyuu%4+1)*100+50,430,60);
    }else{
      ctx.clearRect(canvasWidth/2-202,348,444,4);
      ctx.clearRect(canvasWidth/2-202,348,4,60);
      ctx.clearRect(canvasWidth/2-202,408,444,4);
      ctx.clearRect(canvasWidth/2+228,348,4,60);
    }

    kaitoutyuu++;

    if (kaitoutyuu%4==0) {
      ctx.clearRect(0,40,canvasWidth,canvasHeight);
      for (var i = 1; i < 5; i++) mondai.push(new Mondai(rand(1,3),i))
      for (var i = kaitoutyuu; i < kaitoutyuu+4; i++) mondai[i].draw();
      ctx.strokeRect(canvasWidth/2-200,50,430,60);
    }
  }
}
