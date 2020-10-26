
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var background;
var backgroundImage
var PLAY=1;
var END=0;
var gamestate=PLAY;

function preload(){
  
  backgroundImage=loadImage("jungle.jpg");
// monkey_collided=loadImage("spite_7.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);

  
  background=createSprite(0,0,400,400);
  background.addImage(backgroundImage);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
 // ground.velocityX=-5;
 // ground.x=ground.width/2;
 // console.log(ground.x);
 ground.visible=false;
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
 // monkey.setcollider("circle",0,0);
  
}


function draw() {
 background.velocityX=-3;
 
 // stroke("white");
 // textSize(20);
 // fill("white");
 //  text("survivaltime" + survivaltime,200,30);
  
  if(gamestate===PLAY){
    
    //stroke("black");
   // textSize(20);
   // fill("black");
    
    //text("survival Time: "+survivaltime,100,50);
    if(background.x<0){
    background.x=background.width/2;
  }
  
  if(keyDown("space") ){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.5;
 
spawnbanana();
  spawnobstacles();
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      survivaltime=survivaltime + 2;
      
    }
    if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.1;
gamestate=END;
      
    }
  }
  
 else if(gamestate===END){
  
   background.velocityX=0;
//    monkey.changeImage(monkey_collided);
    ground.velocityX=0;
    monkey.velocityX=0;
   FoodGroup.setLifetimeEach(-1);
   obstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0);
    
  }
  switch(survivaltime){
  case 10:monkey.scale=0.12;
    break;
    case 20: monkey.scale=0.14;
    break;
    case 30: monkey.scale=0.16;
    break;
    case 40 :monkey.scale=0.18;
    break;
    default :break;
    
}

   monkey.collide(ground);
  drawSprites();
  stroke("white");
  textSize(20);
 fill("white");
   text("survivaltime" + survivaltime,200,30);
  
}
function spawnbanana(){
  if(frameCount% 80===0){
    banana=createSprite(180,60,40,10);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
 banana.lifetime=100;
    FoodGroup.add(banana);
  }
}
function spawnobstacles(){
  if(frameCount% 300===0){
     obstacle=createSprite(200,330,10,40);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImage);
  obstacle.lifetime=20;
    obstacle.scale=0.1;
    obstaclesGroup.add(obstacle);
  }
}




