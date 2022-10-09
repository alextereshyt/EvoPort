var paused = false;
var fps;
var speed = 1;
function drawer() {
  if(paused == false){
    const canvas = document.getElementById('mainCanvas');
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      allObjects.forEach(element => {
       ctx.fillStyle = element.color; 
       ctx.fillRect(element.x, element.y, element.width, element.height);
      });
    }
    update();
    spawnFood();
    window.requestAnimationFrame(drawer);
    }
    observ();
}
function observ(){
var panel = document.getElementsByClassName("control-panel")[0];
var Log = '';
Log += "fps: " + countFPS() + "\n";
Log += "count of cells: " + allObjects.length + "\n";

var div = document.getElementsByClassName("log")[0];
div.textContent = Log;

}

function update(){
  allObjects.forEach(element => {
   mover(element);
   eat(element);
   life(element);
  });
}


function mover(element){
        if(element.type == "eater" || element.type == "tEater" || element.type == "hunter" ){
        if(element.steps<=0){
        let newVec = Math.floor(Math.random() * 4);
        switch(newVec){
        case 0:
        element.vector = "up";    
        break;
        case 1:
        element.vector = "down";    
        break;
        case 2:
        element.vector = "left";    
        break;
        case 3:
        element.vector = "right";    
        break;
        case 4:
        element.vector = "none";    
        break;
        }
        element.steps =  Math.floor(Math.random() * 10);
        }
        else{
            switch(element.vector){
                case "up":
                if(mapChecker(element.x,element.y - 1))
                element.y -=1;  
                else element.steps = 0;
                break;
                case "down":
                if(mapChecker(element.x,element.y + 1))
                element.y +=1;  
                else element.steps = 0;
                break;
                case "left":
                if(mapChecker(element.x - 1,element.y))
                element.x -=1;  
                else element.steps = 0;
                break;
                case "right":
                if(mapChecker(element.x + 1,element.y))
                element.x +=1;  
                else element.steps = 0;
                break;
        }
        element.steps--;
        }
        }
}
function pause(){
if(paused == false){
  paused = true;
  document.getElementsByClassName("control-button")[0].textContent = "▶";
}
else{
  paused= false;
  document.getElementsByClassName("control-button")[0].textContent = "◼";
  drawer();
}
}
function clearCells(){
  allObjects.forEach(element => {
    allObjects.pop();
  });
  time = 0;
}
function faster(){
if(speed == 1){
drawer();
document.getElementsByClassName("control-button")[1].textContent = "x2";
speed = 2;
}
else if(speed == 2){
drawer();
document.getElementsByClassName("control-button")[1].textContent = "x3";
speed = 3;
}
else if(speed == 3){
  drawer();
document.getElementsByClassName("control-button")[1].textContent = "x4";
speed = 4;
}
else if(speed == 4){
  pause();
  speed = 1;
document.getElementsByClassName("control-button")[1].textContent = "▶▶";
    }

}


function eat(element){
        if(element.type == "eater"){
        allObjects.forEach(food => {
        if(distance(element,food)<=10&& food.type == "food"){
        removeItemOnce(allObjects,food);
        createEaterAt(element.x,element.y);
        }
        });
        }
       else if(element.type == "tEater"){
            allObjects.forEach(food => {
            if(distance(element,food)<=10 && food.type == "dead"){
            removeItemOnce(allObjects,food);
            createTrashEaterAt(element.x,element.y);
            }
        });
        }
        else if(element.type == "hunter"){
          allObjects.forEach(food => {
          if(distance(element,food)<=15 && food.type == "eater"){
          removeItemOnce(allObjects,food);
          createHunterAt(element.x,element.y);
          }
      });
      }
}
function life(element){
        if(element.type == "eater"||element.type == "tEater"||element.type == "hunter"){
    element.life--;
    if(element.life<=0){
    if(element.type == "eater" &&  document.getElementById('isTrash').checked == true){
  createDeadAt(element.x,element.y);
 
  }
    removeItemOnce(allObjects,element);
    }    
    }
}
function distance(a,b){
return Math.abs(a.x - b.x)+ Math.abs(a.y - b.y);
}
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }


function mapChecker(x,y){
    const canvas = document.getElementById('mainCanvas');
    if(x < 0 || y <0 || x>canvas.width || y > canvas.height)return false;
    else return true;
}

window.countFPS = (function () {
    var lastLoop = (new Date()).getMilliseconds();
    var count = 1;
    var fps = 0;
  
    return function () {
      var currentLoop = (new Date()).getMilliseconds();
      if (lastLoop > currentLoop) {
        fps = count;
        count = 1;
      } else {
        count += 1;
      }
      lastLoop = currentLoop;
      return fps;
    };
  }());
