const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var apples = []
var banana = []
var pizza = []
var basket;
var score = 0;
var health = 100;
var gameState = "menu"

function preload(){
  bg = loadImage("Sprites/kitchen.png")
  playIMG = loadImage("Sprites/play.png")
  infoIMG = loadImage("Sprites/info.png")
  fruityAnim = loadAnimation("Sprites/sprite_0.png","Sprites/sprite_1.png","Sprites/sprite_2.png","Sprites/sprite_3.png","Sprites/sprite_4.png","Sprites/sprite_5.png")
  gameoverIMG = loadImage("Sprites/gameover.png")
  over = loadSound("Sound/over.mp3")
  click = loadSound("Sound/click.wav")
  scoreS = loadSound("Sound/score.wav")
  destroy = loadSound("Sound/destroy.wav")
  logoIMG = loadImage("Sprites/logo.png")
}

function setup() {
  var canvas = createCanvas(1200,600); 
  canvas.position(windowWidth/5.5,windowHeight/8)
  engine = Engine.create()
	world = engine.world;
  ground = new Ground(600,575,1200,10)
  ground1 = new Ground(width,height,10,1200)
  ground2 = new Ground(0,height/2,10,1200)

  basket = new Basket(500,390)

  knife = new Knife(1300,900)
  Engine.run(engine)
}
function draw() {
  Engine.update(engine)
  background(bg); 
  fruity = createSprite(width/2,100,10,10)
    fruity.addAnimation("title",fruityAnim)
    fruity.scale = 5
  
  if(gameState==="menu"){

    play = createSprite(width/2,300,10,10)
    play.addImage("play",playIMG)
    info = createSprite(width/2,400,10,10)
    info.addImage("info",infoIMG)
    logo = createSprite(1150,305,10,10)
    logo.addImage("info",logoIMG)
    logo.scale = 0.1
    drawSprites()
    
    if(mousePressedOver(play)){
      gameState="play"
      click.play()
      play.destroy()
      info.destroy()
    }
    if(mousePressedOver(info)){
      gameState = "info"
      click.play()
      info.destroy()
      play.destroy()
    }
   
  }

  if(gameState==="info"){
    textSize(30)
  textAlign(CENTER)
  fill("brown")
  stroke(rgb(160,82,45))
  strokeWeight(3)
  textFont("Garamond")
    text("This is a game about catching the fruits and destroying the junk food",width/2,280)
    text("Drag the mouse to move the basket and catch the fruits",width/2,320)
    text("Press the Spacebar to shoot with the knife but beware sometimes the knife backfires as well",width/2,360)
    text("Press B to go back",width/2,400)

    if(keyDown("b")){
      gameState="menu"
      click.play()
    }
}

  

  if(gameState=="play"){
    var rand = Math.round(random(1,9))
    console.log(rand)
    check = Math.round(random(10,100))
  if(frameCount%check==0){
    if(rand>3&&rand<7){
     apples.push(new Fruit(random(50, width-50), 10))
    }
    if(rand<=3){
      banana.push(new Fruit2(random(50, width-50), 10))
    }
    if(rand>=7){
      pizza.push(new Pizza(random(50, width-50), 10))
    }
  }



 for(var i=0;i<apples.length;i++){
  apples[i].display()
 }
 for(var f=0;f<banana.length;f++){
   banana[f].display()
 }
 for(var g=0;g<pizza.length;g++){
   pizza[g].display()
 }

  basket.display()
  knife.display()
  //ground.display()
  
  for(var k = 0;k<apples.length;k++){
    detectCollision(apples[k],basket)
  }
  for(var l = 0;l<banana.length;l++){
    detectCollision(banana[l],basket)
  }
  
 for(var h=0;h<pizza.length;h++){
    if(pizza[h].body.position.y>500&&pizza[h].body.position.x>0&&pizza[h].body.position.x<width){
      health = health - 10
      Matter.Body.setPosition(pizza[h].body,{x:1400,y:100})
      Matter.Body.setStatic(pizza[h].body,true)
      destroy.play()
    }
  }
  for(var l=0;l<pizza.length;l++){
    shootTouch(pizza[l],knife)
  }


  if(knife.body.position.y<0){
    Matter.Body.setPosition(knife.body,{x:10000,y:900})
  }

  if(health===0){
    gameState = "gameover"
    over.play()
  }
 
  textSize(30)
  textAlign(CENTER)
  fill("Black")
  textFont("fantasy")
  text("Score:"+score,100,50)
  fill(rgb(0,255,0))
  text("Health:"+health,1100,50)
  }

  if(gameState==="gameover"){

    textSize(50)
  textAlign(CENTER)
  fill("brown")
  stroke(rgb(160,82,45))
  strokeWeight(3)
  textFont("Garamond")
    text("GAME OVER",width/2,200)
    text("Press restart to continue",width/2,height/2)
    
    if(keyDown("r")){
     gameState="menu"
     click.play()
    }
  }
}

function mouseDragged(){
  Body.setPosition(basket.body,{x:mouseX,y:basket .body.position.y})
}

function keyPressed(){
  if(keyCode === 32){
    Matter.Body.setPosition(knife.body,{x:basket.body.position.x,y:500})
    Matter.Body.applyForce(knife.body,knife.body.position,{x:0,y:-50})  
  }
}

function detectCollision(body1,body2){
  var body1Pos = body1.body.position
  var body2Pos = body2.body.position
    var distance = dist(body1Pos.x,body1Pos.y,body2Pos.x,body2Pos.y)
	if (distance<body1.r+body2.height){   
		score = score + 5
    Matter.Body.setPosition(body1.body,{x:1400,y:700})
    scoreS.play()
	}
}
function damage(body3,body4){
  var body3Pos = body3.body.position
  var body4Pos = body4.body.position
    var distance2 = dist(body3Pos.x,body3Pos.y,body4Pos.x,body4Pos.y)
	if (distance2<=body3.r+body4.height){   
		health = health - 10
    Matter.Body.setPosition(body3.body,{x:1400,y:700})
	}
}

function shootTouch(body5,body6){
  var body5Pos = body5.body.position
  var body6Pos = body6.body.position
    var distance3 = dist(body5Pos.x,body5Pos.y,body6Pos.x,body6Pos.y)
	if (distance3<=body5.r+body6.r){   
    Matter.Body.setStatic(body5.body,true)
    Matter.Body.setPosition(body5.body,{x:1400,y:100})
    Matter.Body.setPosition(body6.body,{x:1400,y:700})
	}
}
