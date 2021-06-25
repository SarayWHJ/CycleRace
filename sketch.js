var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var obstacle1,obstacle2,obstacle3;
var opponentsGroup,opponent1,opponent2,opponent3,opponent4,opponent5,opponent6;

var player1,player2,player3;
var pinkGroup,redGroup,yellowGroup;

var orangeCone,hole,nail;
var coneGroup,holeGroup,nailGroup;

var gameOver;

var gameoverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  opponent1=loadAnimation("opponent1.png","opponent2.png");
  
  opponent2=loadAnimation("opponent3.png");
  
  opponent3=loadAnimation("opponent4.png","opponent5.png");
  
  opponent4=loadAnimation("opponent6.png");
  opponent5=loadAnimation("opponent7.png","opponent8.png");
  
  opponent6=loadAnimation("opponent9.png");
  
  obstactle1=loadAnimation("obstacle1.png");
  obstactle2=loadAnimation("obstacle2.png");
  obstactle3=loadAnimation("obstacle3.png");
  
  gameoverImg=loadImage("gameOver.png");
  
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
gameOver=createSprite(300,100);
  gameOver.addImage("gameOver",gameoverImg);
  
   
  
  
  coneGroup=new Group();
  holeGroup=new Group();
  nailGroup=new Group();
  redGroup=new Group();
  pinkGroup=new Group();
  yellowGroup=new Group();
  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    
    gameOver.visible=false;
  
   mainCyclist.y = World.mouseY;
    
    distance=distance+Math.round(frameCount/60);
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
    path.velocityX=-3;
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
    
  }
   // if(keyDown()){
      
    //}
   
    var select_opponent=Math.round(random(1,6));
  if(frameCount % 150==0){
    if(select_opponent==1){
      pinkCycle();
    }else if(select_opponent==2){
      redCycle();
    }else if(select_opponent==2){
      yellowCycle();
    }else if(select_opponent==4){
        Cone();
      }else if(select_opponent==5){
        pit();
      }else{
        nails();
      }
  }
    
    
    if(pinkGroup.isTouching(mainCyclist)){
      gameState=END;
      player1.velocityX=0;
      player1.addAnimation("opponentPlayer1",opponent2);
      
    }
    
    if(redGroup.isTouching(mainCyclist)){
      gameState=END;
      player2.velocityX=0;
      player2.addAnimation("opponentPlayer2",opponent4);
      
    }
    
    if(yellowGroup.isTouching(mainCyclist)){
      gameState=END;
      player3.velocityX=0;
      player3.addAnimation("opponentPlayer3",opponent6);
      
    }
    
    
    
 }else if(gameState===END){
    gameOver.visible=true;
    text("Press Up Arrow to Restart the Game",200,200);
   mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    path.velocityX=0;
   
   pinkGroup.setVelocityEach(0);
   redGroup.setVelocityEach(0);
   yellowGroup.setVelocityEach(0);
   
   pinkGroup.setLifetimeEach(-1);
   redGroup.setLifetimeEach(-1);
   yellowGroup.setLifetimeEach(-1);
   
    if(keyDown(UP_ARROW)){
      reset();
     
    }
  }
   
}


function Cone(){
  orangeCone=createSprite(1100,Math.round(random(52,250)));
  orangeCone.scale=0.06;
  orangeCone.addAnimation("obstacleCone",obstacle1);
  orangeCone.lifetime=300;
  orangeCone.velocityX=-4;
  coneGroup.add(orangeCone);
  
}

function pit(){
  hole=createSprite(1100,Math.round(random(52,250)));
  hole.scale=0.06;
  hole.addAnimation("obstacleHole",obstacle2);
  hole.lifetime=300;
  hole.velocityX=-4;
  holeGroup.add(hole);
  
}

function nails(){
  nail=createSprite(1100,Math.round(random(52,250)));
  nail.scale=0.06;
  nail.addAnimation("obstacleNail",obstacle3);
  nail.lifetime=300;
  nail.velocityX=-4;
  nailGroup.add(nail);
  
}



    
   function pinkCycle(){
     player1=createSprite(1100,Math.round(random(52,250)));
     player1.scale=0.06;
     player1.addAnimation("opponentPlayer1",opponent1);
     player1.lifetime=300;
     player1.velocityX=-4;
     pinkGroup.add(player1);
     
   }

function redCycle(){
  player2=createSprite(1100,Math.round(random(52,250)));
     player2.scale=0.06;
     player2.addAnimation("opponentPlayer2",opponent3);
     player2.lifetime=300;
     player2.velocityX=-4;
     redGroup.add(player2);
  
}

function yellowCycle(){
  player3=createSprite(1100,Math.round(random(52,250)));
     player3.scale=0.06;
     player3.addAnimation("opponentPlayer3",opponent5);
     player3.lifetime=300;
     player3.velocityX=-4;
     yellowGroup.add(player3);
}

function reset(){
  gameState= PLAY;
  gameOver.visible=false;
  
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  
  
  pinkGroup.destroyEach();
  redGroup.destroyEach();
  yellowGroup.destroyEach();
  
  distance=0;
}


