const canvas=document.querySelector("#canvas");
const context=canvas.getContext("2d");
const bounceSound=new Audio("punch.mp3")
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
canvas.style.background="yellow";

let randx=Math.floor(Math.random()*100)+1;
let randy=Math.floor(Math.random()*100)+1;
class Circle{
    constructor(posx,posy,radius){
        this.collisions=0;
        this.posx=posx;
        this.posy=posy;
        this.radius=radius;
        this.color="red";
        this.factorX=randx;
        this.factorY=randy;
        randx=Math.floor(Math.random()*100)+1;
        randy=Math.floor(Math.random()*100)+1;

    }
    draw(){
        context.beginPath();
        context.fillStyle=this.color;
        context.strokeStyle="green";
        context.arc(this.posx,this.posy,this.radius,0,2*Math.PI);
        context.lineWidth=2;
        context.stroke();
        context.fillText(this.collisions,this.posx,this.posy);
        context.closePath()
    }
    update(){
        this.posx+=this.factorX;
        this.posy+=this.factorY;
        this.draw();
        
        if((this.posy+this.radius)>=(canvas.height)){
            this.factorY=-randy;
            this.collisions++;
            bounceSound.currentTime=0;
            bounceSound.play();
        }
        else if((this.posy-this.radius)<=0){
            this.factorY=randy;
            this.collisions++;
            bounceSound.currentTime=0;
            bounceSound.play();
        }
        if((this.posx+this.radius)>=(canvas.width)){
            this.factorX=-randx;
            this.collisions++;
            bounceSound.currentTime=0;
            bounceSound.play();
        }
        else if((this.posx-this.radius)<=0){
            this.factorX=randx;
            this.collisions++;
            bounceSound.currentTime=0;
            bounceSound.play();
        }
    }
}
const circlist=[];
window.addEventListener("click",function(e){
let radius=Math.floor(Math.random()*100)+1;
let c=new Circle(e.x,e.y,radius);
circlist.push(c);
c.draw();
console.log("dx:",randx,"dy:",randy,"size:",radius);
    //console.log(e);
//console.log("clicked")

})
function circleAnimation(){
    requestAnimationFrame(circleAnimation);
    context.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<circlist.length;i++){
        circlist[i].update();
    }
}
circleAnimation();
console.log(randx,randy);
