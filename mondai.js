//
//mondai.js 問題
//

var mondai = [];

class Mondai{
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
