var seaGod, seaGodimg;
var background_img;
var MonsterImg;
var fishImg1, fishImg2, fishImg3, fishImg4, fishGroup;
var MonsterImg1, MonsterImg2, EnemyGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState= PLAY;
var restartImg, restart;
var edges;
var sound1, sound2, sound3;

function preload(){
  seaGodimg = loadImage("poseidon.png");
  background_img = loadImage("backg.jpg");
  MonsterImg1 = loadImage("m3.png");
  MonsterImg2 = loadImage("m4.png");
  fishImg1 = loadImage("f1.png");
  fishImg2 = loadImage("f2.png");
  fishImg3 = loadImage("f3.png");
  fishImg4 = loadImage("f5.png");
  restartImg = loadImage("restart.png");
  sound1 = loadSound("Goodbye-SoundBible.com-1660461090.mp3")
  sound2 = loadSound("1_person_cheering-Jett_Rifkin-1851518140.mp3")
  sound3 = loadSound("Pain-SoundBible.com-1883168362.mp3")

}

function setup() {
  createCanvas(800, 800);
  
  seaGod = createSprite(200, 580, 10, 10);
  seaGod.addImage(seaGodimg);
  seaGod.scale=0.2;
  fishGroup = new Group();
  EnemyGroup = new Group();
  
  edges = createEdgeSprites();
 
  restart = createSprite(400, 450, 10, 10);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.028;
}

function draw() {
  background(background_img);
  textSize(18);
  fill("black");
  text("Fishies Saved:"+score, 50, 60);
   seaGod.collide(edges[0]); 
   seaGod.collide(edges[1]); 
   seaGod.collide(edges[2]); 
   seaGod.collide(edges[3]); 
  
if(gameState === PLAY){
  
  MONSTER();
  FISHES();
  
   if(keyDown(UP_ARROW)){
    seaGod.y = seaGod.y-15;
  }
  
  if(keyDown(DOWN_ARROW)){
    seaGod.y = seaGod.y+15;
  }
  
  if(keyDown(LEFT_ARROW)){
    seaGod.x= seaGod.x-15;
  }
  
  if(keyDown(RIGHT_ARROW)){
    seaGod.x = seaGod.x+15;
  }
  
  if(EnemyGroup.isTouching(seaGod)){
    EnemyGroup.destroyEach();
    score = score+1;
    sound1.play();

  }
  
    if(fishGroup.isTouching(EnemyGroup)){
      fishGroup.destroyEach();
      EnemyGroup.destroyEach();
      gameState = END;
      sound3.play();
    }
  
  if(score>0 && score%10===0){
    sound2.play();
  }
  }
  
  else if(gameState === END){
    textSize(45);
    fill("blue");
    text("MONSTERS WON!", 200, 400);
    seaGod.velocityX = 0;
    seaGod.velocityY = 0;
    
    EnemyGroup.setVelocityYEach =0;
    fishGroup.setVelocityXEach = 0;
    
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      reset();
    }



}
  drawSprites();

}

function MONSTER(){
 if(frameCount % 100 === 0) {
    var monsters = createSprite(100,0,10,40);
    monsters.velocityY = (6 + 3*score/8);
    monsters.x = Math.round(random(150, 600));
    
    //generate random fishes
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: monsters.addImage(MonsterImg1);
              break;
      case 2: monsters.addImage(MonsterImg2);
              break;
      default: break;
    }
    
    monsters.scale = 0.2;
    monsters.lifetime = 300;
    EnemyGroup.add(monsters);
 }
}


function FISHES() {
  if(frameCount % 150 === 0) {
    var fishies = createSprite(800,165,10,40);
    fishies.velocityX = -(6 + 3*score/6);
    fishies.y = Math.round(random(300, 750));
    
    //generate random fishes
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fishies.addImage(fishImg1);
              break;
      case 2: fishies.addImage(fishImg2);
              break;
      case 3: fishies.addImage(fishImg3);
              break;
      case 4: fishies.addImage(fishImg4);
        break;
      default: break;
    }
    
    fishies.scale = 0.2;
    fishies.lifetime = 300;
    fishGroup.add(fishies);
    
    
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  score = 0;

}


