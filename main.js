//キャンバス
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvasWidth = 600;
var canvasHeight = 450;
canvas.width=canvasWidth;
canvas.height=canvasHeight;

var myCanvas2 = document.getElementById("myCanvas2");

//結果表示
function kekkaHyouji(){
  document.getElementById("myCanvas2con").style.display = "block";
  kekka2();
  kekka();
}

function kekka(){
  var scoreAll = Math.round(100-(((score1/10)+(score2/10)+(score3*2.5)+(score4/10)+(score5*10))/5)) + "歳";

  ctx.font = "50px 'Impact'";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  ctx.fillStyle = "black";

  w = ctx.measureText(scoreAll).width;
  x = canvasWidth/2 - w/2;
  y =canvasHeight/2;
  ctx.fillText(scoreAll,x,y);
  
  myCanvas.addEventListener("click",function(){window.location.reload();})
}

function kekka2(){
  var myChart = new Chart(myCanvas2, {
  type: 'radar',
  data: {
    labels: ["問題１", "問題２", "問題３", "問題４", "問題５"],
    datasets: [{
      label: 'apples',
      backgroundColor: "rgba(153,255,51,0.4)",
      borderColor: "rgba(153,255,51,1)",
      data: [score1/10, score2/10, score3*2.5, score4/10, score5*10]
    },]
  },
  options: {
    title: {
      display: true,
      text: '結果'
    },
    scale:{
      ticks:{
        suggestedMin: 0,
        suggestedMax: 100,
        stepSize: 10,
      }
    },
    legend:{
      display:false
    }
  }
});
}

window.onload = start1();
