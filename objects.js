const templateObject = { type: "eater", x: 0, y: 0, rotation: 0, width: 10, height: 10, color: 'rgb(0, 0, 200)', vector: "none", steps: 0, life: 100 };

var allObjects = new Array();
allObjects.push(templateObject);

function spawnFood() {
    if(document.getElementById('isFood').checked == true){
    createProducer();
    createProducer();
}
}

function createProducer() {
    const canvas = document.getElementById('mainCanvas');
    allObjects.push({ type: "food", x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), rotation: 0, width: 7, height: 7, color: 'rgb(0, 200, 0,0.8)', vector: "none", steps: 0, life: -1 });
}
function createEater() {
    const canvas = document.getElementById('mainCanvas');
    allObjects.push({ type: "eater", x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height), rotation: 0, width: 10, height: 10, color: 'rgb(0, 0, 200,0.8)', vector: "none", steps: 0, life: 200 });
}
function createEaterAt(x, y) {
    allObjects.push({ type: "eater", x: x, y: y, rotation: 0, width: 10, height: 10, color: 'rgb(0, 0, 200,0.8)', vector: "none", steps: 0, life: 300 });
}
function createDeadAt(x, y) {
   allObjects.push({type:"dead", x:x,y:y,rotation:0,width:10,height:10,color:'rgb('+(242+Math.floor(Math.random() * 40)-35)+', '+(216+Math.floor(Math.random() * 40)-35)+', 68,0.8)',vector:"none",steps:0,life:-1});
}
function createTrashEaterAt(x, y) {
    allObjects.push({type:"tEater", x:x,y:y,rotation:0,width:7,height:7,color:'rgb(50, 205, 240,0.8)',vector:"none",steps:0,life:500});
}
function createHunterAt(x, y) {
    allObjects.push({type:"hunter", x:x,y:y,rotation:0,width:10,height:10,color:'rgb(179, 9, 51)',vector:"none",steps:0,life:1000});
 }
function createCell(){
    const canvas = document.getElementById('mainCanvas');
    const sb = document.querySelector('#cells');
    if(sb.selectedIndex == 0){createEater();}
    if(sb.selectedIndex == 1){createProducer();}
    if(sb.selectedIndex == 2){createDeadAt( Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));}
    if(sb.selectedIndex == 3){createTrashEaterAt( Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));}
    if(sb.selectedIndex == 4){createHunterAt( Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));}

}







