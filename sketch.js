var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.4

  doorsGroup= new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group();
  spookySound.loop();
}

function draw() {
  background(200);
  if(gameState=== "play"){


  
  if(tower.y > 400){
      tower.y = 300

    
    }
    if(keyDown("right_arrow")){
      ghost.x += 3

    }
    if(keyDown("left_arrow")){
      ghost.x -= 3

    }
    if(keyDown("space")){
      ghost.velocityY = -2;

    }
    ghost.velocityY= ghost.velocityY + 0.4
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0

    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState= "end"
    }
    spawnDoors();
    drawSprites ();

  }if(gameState== "end"){
    stroke("yellow");
    fill("green");
    textSize (30);
    text ("GAME OVER", 230,250)
  }}

function spawnDoors() {
  if(frameCount % 300===0) {
  
  door=createSprite(200,-50)
  door.addImage(doorImg);
  door.velocityY = + 1;
    door.lifetime = 800
    door.x =Math.round(random(120,400)) 
    climber=createSprite(200, 10)
    climber.addImage(climberImg);
    climber.velocityY = + 1;
    climber.lifetime = 800;
    climber.x = door.x

    climbersGroup.add(climber);
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth += 1;

    invisibleBlock= createSprite(200,15)
    invisibleBlock.width= climber.width;
    invisibleBlock.height= 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug= true;
    invisibleBlockGroup.add(invisibleBlock)
  }
}
