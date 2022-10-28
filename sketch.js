var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvens, nuvensImage; 
var aleatorio;
var cactos, cactosImage1, cactosImage2, cactosImage3, cactosImage4, cactosImage5,cactosImage6;
var randomNumber;
var count = 0;
var restart,gameoverSimble, game_Over, restartSimble;

var cactosGrupo, nuvensGrupo;

var INICIO=0,JOGANDO=1,GAMEOVER=2;

var estadoDeJogo=INICIO;



var som_jump, som_die, som_checkPoint



function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  nuvensImage= loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  cactosImage1 = loadImage("obstacle1.png");
  cactosImage2 = loadImage("obstacle2.png");
  cactosImage3 = loadImage("obstacle3.png");
  cactosImage4 = loadImage("obstacle4.png");
  cactosImage5 = loadImage("obstacle5.png");
  cactosImage6 = loadImage("obstacle6.png");
  restart = loadImage("restart.png");
  gameoverSimble = loadImage("gameOver.png");
  som_jump = loadSound("jump.mp3");
  som_die = loadSound("die.mp3");
  som_checkPoint= loadSound("checkPoint.mp3");

}

function setup() {
  createCanvas(600, 200);  

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);

  trex.addAnimation("morte", trex_collided);

  trex.scale = 0.5;
  trex.depth= 2;
  trex.debug= false;
  trex.setCollider ("circle",0,0,40)
  //trex.setCollider ("rectangle",0,0,300,100)

  invisibleGround = createSprite(50,195,600,15);
  invisibleGround.visible = false;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -8;
   
  cactosGrupo= new Group();
  nuvensGrupo= new Group();

  game_Over = createSprite(300,60,20,20);
  game_Over.addImage(gameoverSimble);
  game_Over.scale=0.5;
  game_Over.visible= false;

  restartSimble=createSprite(300,100,20,20);
  restartSimble.addImage(restart);
  restartSimble.scale= 0.5;
  restartSimble.visible= false;
  
}

function draw() {
  background("white");
  
  

  aleatorio = Math.round(random(20,75));

  randomNumber = Math.round(random(1,6));

  if (estadoDeJogo===INICIO){
    inicio()
  }

  if (estadoDeJogo===JOGANDO){
    jogando()
  }

  if (estadoDeJogo===GAMEOVER){
    gameover();
  }

  
  drawSprites();
}                                                                                                                                                                                                                          

function jump(){
  if (keyDown("space")&& trex.collide(invisibleGround)) {
    trex.velocityY = -15;
    som_jump.play();
    if(estadoDeJogo===INICIO){
      estadoDeJogo=JOGANDO;
      
    }
  }

  trex.velocityY = trex.velocityY + 1.2;

  
}

function infinityground(){
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
}

function nuvem(){
  if (frameCount%120===0){
    nuvens= createSprite(620, aleatorio,20,20);
    nuvens.addImage("cloud.png",nuvensImage);
    nuvens.velocityX= -2;
    nuvens.depth = 1;
    nuvens.lifetime = 340;
    nuvensGrupo.add(nuvens);
  }
}

function verMouse(){
  text ("x:"+mouseX+"|y:"+mouseY, mouseX,mouseY);
}

function cacto(){
  if (frameCount%50 === 0){
    cactos = createSprite(610, 165,20,20);
    switch(randomNumber){
      case 1:
        cactos.addImage(cactosImage1);
        break;
      case 2:
        cactos.addImage(cactosImage2);
        break;
      case 3:
        cactos.addImage(cactosImage3);   
        break;
      case 4:
        cactos.addImage(cactosImage4); 
        break;
      case 5:
        cactos.addImage(cactosImage5);
        break;
      case 6:
        cactos.addImage(cactosImage6);
        break;
      default:
        break;    
    }

    cactos.velocityX = -8;
    cactos.lifetime= 140;
    cactos.scale=0.55;
    cactosGrupo.add(cactos);
  }
}







function inicio(){
 

  infinityground();

  verMouse();

  nuvem();

  jump();

  

  trex.collide(invisibleGround);

  restartSimble.visible= false;
  game_Over.visible= false;

}

function jogando(){
  jump();

  nuvem();

  cacto();

  trex.collide(invisibleGround); 

  

  text ("Pontuação:"+count, 500,50);

  count = count+Math.round(frameRate()/60);

  
  if (count%100===0 && count>0){
    som_checkPoint.play();
  }

  infinityground();

  if (trex.isTouching(cactosGrupo)){
    //trex.velocityY= -7;

    estadoDeJogo= GAMEOVER;

    som_die.play();
    //som_jump.play();
  }

  restartSimble.visible= false;
  game_Over.visible= false;
}

function gameover(){
  trex.changeAnimation("morte", trex_collided);
  trex.velocityY=0;
  trex.velocityX=0
  nuvensGrupo.setVelocityXEach(0);
  cactosGrupo.setVelocityXEach(0)
  ground.velocityX=0;
  cactosGrupo.setLifetimeEach(-1);
  nuvensGrupo.setLifetimeEach(-1);

  
  restartSimble.visible= true;
  game_Over.visible= true;

  if (mousePressedOver(restartSimble)){
    reset();
    
  }
 
}

function reset(){
  estadoDeJogo= INICIO;

  cactosGrupo.destroyEach();

  nuvensGrupo.destroyEach();

  ground.velocityX=-8;

  trex.changeAnimation("running", trex_running);

  count = 0


}





