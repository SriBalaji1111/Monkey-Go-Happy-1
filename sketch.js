
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var ground,groundImage;

var PLAY = 1;
var END = 0;
var gameState = 1;

var gameOver, gameOverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverImage = loadImage("gameOver.png");
  
  groundImage = loadImage("ground.png")
}

function setup() {

  foodGroup = new Group();
  rockGroup = new Group();
  
  monkey = createSprite(50,315,20,20);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;
  
  ground = createSprite(200,350,900,10);
  ground.addImage(groundImage);
  ground.velocityX = -4;
  ground.x = ground.width/2
  
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage);
  
}


function draw() {

  background("lightblue")
 
  if(gameState === PLAY){
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/10);
    text("Survival Time : "+survivalTime, 100,50)
  
    
    if(keyDown("space") && monkey.y >= 220){
      monkey.velocityY = -12;
    }
    
    food();
    rock();
    
    gameOver.visible = false;
    
    if(rockGroup.isTouching(monkey)){     
      gameState = END
    }
    
  }
  
  else if(gameState === END){
    rockGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    foodGroup.destroyEach();
    rockGroup.destroyEach();
    
    gameOver.visible = true;
    monkey.visible = false;
    ground.visible = false;
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Prss R to restart", 120,250);
    
    if(keyDown("R")){
      reset();
    }
    
  }
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);

  if (ground.x < 0){
    ground.x = ground.width/2;
  }  
  
  drawSprites()
}
function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,random(120,200),20,20);
    banana.addImage(bananaImage)
    banana.scale = 0.1;
    banana.velocityX = -5
    foodGroup.add(banana);
    foodGroup.setLifetimeEach(100);
  }
}
function rock(){ 
  if(frameCount % 150 === 0){
    obstacle = createSprite(400,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    obstacle.velocityX = -5;
    rockGroup.add(obstacle);
    rockGroup.setLifetimeEach(100);
  }
}
function reset(){
  gameState = PLAY;
  monkey.visible = true;
  gameOver.visible = false;
  ground.visible = true;
}



