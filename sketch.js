//Create variables here
var sadDog,happyDog,garden,washroom,bedroom,fedTime,lastFed,currentTime,feed,addFood,gameState,food;
var dog,database,foods,footstock;
function preload()
{
  //load images here
  sadDog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png");
  bedroom=loadImage("images/Bed Room.png");
}

function setup() {
  createCanvas(400, 500);
  database=firebase.database();
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  footstock=database.ref("food");
  footstock.on("value",readStock);
food= new Food();
fedTime=database.ref("feedtime")
fedTime.on("value",function(data){
  lastFed=data.val();
})
readState=database.ref("gameState")
readState.on("value",function(data){
  gameState=data.val();
})
feed=createButton("feedthedog")
feed.position(700,95);
feed.mousePressed(feedDog)
addFood=createButton("addfood")
addFood.position(800,95);
addFood.mousePressed(addFoods)

  
}


function draw() {  
currentTime=hour();
if(currentTime==(lastFed+1)){
  update("playing")
  food.garden();
}
else if(currentTime==(lastFed+2)){
  update("sleeping")
  food.bedroom();
}
else if(currentTime>lastFed+2 && currentTime<=lastFed+4){
  update("bathing")
  food.washroom();
}
else{update("hungry")
food.display()
}
if(gameState!="hungry"){
  feed.hide();
  addFood.hide()
  dog.remove();

}
else{feed.show()
  addFood.show()
  dog.addImage(sadDog)
}
drawSprites()
}
function readStock(data){
  foods=data.val();
food.updatefoodStock(foods);
}
function feedDog(){
  dog.addImage(happyDog);
  food.updatefoodStock(food.getfoodstock()-1)
  database.ref('/').update({
    food:food.getfoodstock(),
    feedTime:hour(),
    gameState:"hungry"
  })
}
function addFoods(){
foods++
database.ref('/').update({
  food:foods
})
}
function update(state){
database.ref('/').update({
  gameState:state
})
}