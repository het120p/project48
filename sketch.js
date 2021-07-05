var bg,bgImage;
var fg,fgImage;
var bird,birdImage;
var pipe1,pipeNorthImage;
var pipe2,pipeSouthImage;
var pipe1Group,pipe2Group;
var score;
var PLAY=1;
var END=0;
var gameState= PLAY;
var restart,r;

function preload(){
bgImage=loadImage("Images/background.png");
fgImage=loadImage("Images/footGround.png");
birdImage=loadImage("Images/bird.png");
pipeNorthImage=loadImage("Images/pipe2Image.png");
pipeSouthImage=loadImage("Images/pipeImage.png");
r=loadImage("Images/restart.png")

}

function setup() {
  createCanvas(350,600);
  bg=createSprite(144,256,10,10);
  bg.addImage(bgImage);
  bg.scale=1.5;
  
  fg=createSprite(144,590,20,20)
  fg.addImage(fgImage)
  fg.scale=0.5;

  bird=createSprite(125,250,20,20)
  bird.addImage(birdImage)
  bird.scale=0.2;

  pipe1Group=new Group();
  pipe2Group=new Group();

  score=0;

  restart=createSprite(144,256,10,10)
  restart.addImage(r);
  restart.visible=false;
  restart.scale=0.4;

  console.log(fg.width);
 
}

function draw() {
  background(255,255,255);

   bird.debug=true;
   bird.setCollider("circle",0,0,90)
  if(gameState===PLAY){
    fg.velocityX=-1;
   
    if(fg.x<0){
      fg.x=140;
    }
   
    if(keyDown("space")){
      bird.y=bird.y-13;
    }else{
      bird.velocityY=5;
    }
    pipe_move();

     if(frameCount%75===0){
       score++;
     }
     if(bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
       gameState=END;
     }
     if(bird.isTouching(fg)){
       gameState=END;
     }
    }else if(gameState===END){
      fg.velocityX=0;
      bird.visible=false;
      bird.x=25;
      bird.y=256;
      pipe1Group.setVelocityXEach(0);
      pipe2Group.setVelocityXEach(0);
      pipe1Group.setLifetimeEach(-1);
      pipe2Group.setLifetimeEach(-1);
      restart.visible=true;
      if(mousePressedOver(restart)){
        reset();
      }
    }
   
 console.log(fg.x);

 
  drawSprites();
  textSize(30);
  text("Score:" + score,170,500)
}

function pipe_move (){
if(frameCount%75===0){
  pipe1=createSprite(360,70,10,10)
  pipe1.addImage(pipeNorthImage);
  pipe1.scale=random(0.15,0.3)
  pipe1.height=random(175,275)
  pipe1.velocityX=-2;
  pipe1Group.add(pipe1)
  pipe1.lifetime=190;
  pipe1.debug=true;
  //pipe1.setCollider("rectangle", 0, 0, 20, 80, -45);

  pipe2=createSprite(360,400,10,10)
  pipe2.addImage(pipeSouthImage);
  pipe2.scale=random(0.15,0.2)
  pipe2.height=random(275,375)
  pipe2.velocityX=-2;
  pipe2Group.add(pipe2)
  pipe2.lifetime=190;
  pipe2.debug=true;
  //pipe2.setCollider("rectangle", 0, 0, 20, 80, -45);

}
}
 
function reset(){
  gameState=PLAY;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score=0;
  bird.visible=true;
  restart.visible=false;
}

