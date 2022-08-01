var john,johnWalk,johnImg,johnDead;
var ground;
var enemyRun,enemyGroup,enemy;
var trofeu,trofeuImg,backGround;
var life = 3;
var lifeImg,lifeImg2,lifeImg3;
var power,powerImg,powerGroup;
var coin,coinGroup,coinImg;

function preload(){
  johnImg = loadAnimation("./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_000.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_001.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_002.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_003.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_004.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_005.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_006.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_007.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_008.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_009.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_010.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_011.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_012.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_013.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/IdleBlinking/0_Reaper_Man_Idle Blinking_014.png",);
  
  johnWalk = loadAnimation("./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_000.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_001.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_002.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_003.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_004.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_005.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_006.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_007.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_008.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_009.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_010.png",
  "./assets/Reaper_Man_2/PNG/PNGSequences/Running/0_Reaper_Man_Running_011.png");
  
  johnDead = loadImage("./assets/Reaper_Man_2/PNG/PNGSequences/Dying/0_Reaper_Man_Dying_000.png");

  enemyRun = loadAnimation("./assets/Running/0_Reaper_Man_Running_000.png",
  "./assets/Running/0_Reaper_Man_Running_001.png",
  "./assets/Running/0_Reaper_Man_Running_002.png",
  "./assets/Running/0_Reaper_Man_Running_003.png",
  "./assets/Running/0_Reaper_Man_Running_004.png",
  "./assets/Running/0_Reaper_Man_Running_005.png",
  "./assets/Running/0_Reaper_Man_Running_006.png",
  "./assets/Running/0_Reaper_Man_Running_007.png",
  "./assets/Running/0_Reaper_Man_Running_008.png",
  "./assets/Running/0_Reaper_Man_Running_009.png",
  "./assets/Running/0_Reaper_Man_Running_010.png",
  "./assets/Running/0_Reaper_Man_Running_011.png")

  backGround = loadImage("./assets/game_background_3.png");

  trofeuImg = loadImage("./assets/16.png");
  lifeImg = loadImage("./assets/life1.png");
  lifeImg2 = loadImage("./assets/life2.png");
  lifeImg3 = loadImage("./assets/life3.png");

  coinImg = loadImage("./assets/11.png");

  powerImg = loadImage("./assets/8.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  john = createSprite(300,50)
  john.addAnimation("idle", johnImg);
  john.addImage(johnDead);
  john.addAnimation("walk", johnWalk);
  john.scale = 0.1

  trofeu = createSprite(random(50,550),random(300,550));
  trofeu.shapeColor = "yellow";
  trofeu.addImage(trofeuImg);
  trofeu.scale = 0.2

  enemyGroup = new Group();

  powerGroup = new Group();

  coinGroup = new Group();

  john.debug = true

  john.setCollider("rectangle",0,0,50,50)

}

function draw(){
  background(backGround);

  john.changeAnimation("idle");
  moviment();
  powerControl();
 
  createEnemies();

  if(enemyGroup.isTouching(john)){
    life -= 1;
    john.y -= 10 
  }
  //if(powerGroup.isTouching(enemyGroup)){
  //  enemy.destroy();
  //}

  coinsCreate();

  drawSprites();

}


function createEnemies(){
  if(frameCount % 120 === 0){
    enemy = createSprite(100,100)
    enemy.addAnimation("run", enemyRun);
    enemy.scale = 0.1;
    enemy.x = Math.round(random(1,600));
    enemy.velocityX = 3
    enemy.y = Math.round(random(1,600));
    enemy.lifetime = (width/3);
    enemyGroup.add(enemy);
  }
}

function moviment(){

  if(keyDown(87)){
    john.y -= 10;
    john.changeAnimation("walk");
  }
  if(keyDown(83)){
    john.y += 10;
    john.changeAnimation("walk");
  }
  if(keyDown(68)){
    john.x += 10;
    john.changeAnimation("walk");
  }
  if(keyDown(65)){
    john.x -= 10;
    john.changeAnimation("walk");
  }

}

function powerCreate(X,Y){
  power = createSprite(john.x,john.y,20,20);
  power.velocityX = X;
  power.velocityY = Y;
  power.addImage(powerImg);
  power.scale = 0.1;
  power.lifetime = (width/2);
}

function powerControl(){
  if(keyDown(38)){
    powerCreate(0,-2);
  }
  if(keyDown(40)){
    powerCreate(0,2);
  }
  if(keyDown(37)){
    powerCreate(-2,0);
  }
  if(keyDown(39)){
    powerCreate(2,0);
  }
}

function coinsCreate(){
  if(frameCount % 180 === 0){
    coin = createSprite(100,100)
    coin.addImage(coinImg);
    coin.scale = 0.2;
    coin.x = Math.round(random(1,600));
    coin.y = Math.round(random(1,600));
    coin.lifetime = (60);
    coinGroup.add(coin);
  }
}