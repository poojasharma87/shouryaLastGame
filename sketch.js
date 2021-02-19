var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;
var gamePlay,gameEnd;

function preload(){
  batmanRunning=loadAnimation("batmanRunning.gif");
  batmanDancing=loadAnimation("batmanAttack1.gif");
  backgroundImg=loadAnimation("bg1.gif");
  coinImg=loadAnimation("coin.gif");
  jokerRunning=loadAnimation("jokerRunning.gif");
  gamePlaySound=loadSound("play.wav");
  gameEndSound=loadSound("dance.wav");
  coinSound=loadSound("coin.wav");
}

function setup() {
  createCanvas(1350, 620);
  
  bg=createSprite(650,310,1350,620);
  bg.addAnimation("moving",backgroundImg);
  bg.scale=2;

  batman = createSprite(150,600,50,50);
  
  batman.addAnimation("running", batmanRunning);
  batman.addAnimation("dancing", batmanDancing);
 batman.scale = 0.5;
  //batman.debug=true;
  ground = createSprite(600,615,1350,5);
  ground.visible = false;
  
  coinGroup = new Group();
  jokerGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(0);
  
 
  if (gameState===PLAY){
    gamePlaySound.play();
    ground.velocityX = -4;
  
    if(keyDown("space") && batman.y >= 200) {
      batman.velocityY = -12;
    }
  
    batman.velocityY = batman.velocityY + 0.5;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    batman.collide(ground);
    spawnCoins();
    spawnJokers();
	if(coinGroup.isTouching(batman)){
		coinGroup.destroyEach();
        score= score+2;
        coinSound.play();
    }
  
    if(jokerGroup.isTouching(batman)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameEndSound.play();
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    batman.velocityY = 0;
    coinGroup.setVelocityXEach(0);
    jokerGroup.setVelocityXEach(0);
    coinGroup.destroyEach();
	jokerGroup.destroyEach();
    //change the trex animation
    batman.changeAnimation("dancing",batmanDancing);
	batman.x=500;
	batman.y=450;
    batman.scale=1.0;
	
    //set lifetime of the game objects so that they are never destroyed
    
    
    
  }
  
  
  drawSprites();
  fill("black");
  textSize(35);
  text("Score: "+ score, 1200,50);
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var coin = createSprite(1350,300,40,10);
    coin.y = Math.round(random(250,300));
    coin.addAnimation("movingcoin",coinImg);
    coin.scale = 0.5;
    coin.velocityX = -4;
   // coin.debug=true;
     //assign lifetime to the variable
    coin.lifetime = 600;
    coin.setCollider("rectangle",0,0,20,20);
     
    //add each cloud to the group
    coinGroup.add(coin);
  }
  
}

function spawnJokers() {
  if(frameCount % 200 === 0) {
    var joker = createSprite(1350,550,10,40);
    joker.addAnimation("runningJoker", jokerRunning);
    joker.scale = 0.6;
    joker.velocityX = -5;
   // joker.debug=true;
	joker.setCollider("rectangle",0,0,100,100);
     //assign lifetime to the variable
    joker.lifetime = 600;
    
     
    //add each cloud to the group
    jokerGroup.add(joker);
  }
}

