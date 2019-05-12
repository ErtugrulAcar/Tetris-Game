class Box{
    constructor(){
        this.box = document.getElementById("box");
        this.setStyle();
    }
    getRef(){
        return this.box;
    }
    getStyle(){
        return this.box.style;
    }
    setStyle(){
        var style = this.getStyle();
        style.position = "relative";
        style.width = "600px";
        style.height = "900px";
        style.border = "1px solid black";
    }
}

//####################################################################//
function getRandomShape(){
    var random = Math.floor(Math.random() * 7);
    switch (random) {
        case 0:
            return new I();
            break;
        case 1:
            return new O();
            break;
        case 2:
            return new T();
            break;
        case 3:
            return new S();
            break;
        case 4:
            return new Z();
            break;
        case 5:
            return new J();
            break;
        case 6:
            return new L();
            break;
    }
}

//####################################################################//

var currentShape;
function setCurrentShape(shape) {
    currentShape = shape;
}
function getCurrentShape() {
    return currentShape;
}

//####################################################################//



function moveShape(event){
    if(event.keyCode == 37){
        move_shape_to_Left();
    }else if(event.keyCode == 38){
        getCurrentShape().change_position();
    }
    else if(event.keyCode == 39){
        move_shape_to_Right();
    }else if(event.keyCode == 40){
        move_shape_to_Down();
    }
}
function move_shape_to_Left(){
    getCurrentShape().moveLeftShape();
}

function move_shape_to_Right(){
   getCurrentShape().moveRightShape();
}
function move_shape_to_Down(){
    if(getCurrentShape().checkFallShape())
        getCurrentShape().fallShape();

}
//####################################################################//
var mapping = {};
function setMapping(){
    for(var i=0;i<30;i++){
        for(var j=0;j<45;j++){
            var st = i+":"+j;
            window.mapping[st] = false;
        }
    }
}

function checkMapping(positions) {
    var bool =[];
    for(var i=0;i<4;i++){
        var st = (positions.left[i]/20) + ":" + (positions.top[i]/20);
        bool[i] = window.mapping[st];
    }
    if(bool[0] || bool[1] || bool[2] || bool[3])    return true;
    else return false;      //return true = obje var
}

//####################################################################//
function checkBoom() {
    var counter = 0;

    for(var i=0;i<45;i++){
        counter=0;
        for(var j=0;j<30;j++){
            if(mapping[j+":"+i]) counter++;
        }
        if(counter == 30){
            removeRow(i);
            shiftShapes(i);
            deleteAndSetMapping();
        }
    }
}
function removeRow(rowNumber) {
    var shapes = boxRef.getElementsByTagName("div");
    for(var i=shapes.length-1;i>=0;i--){
        if(parseInt(shapes[i].style.top) == (rowNumber*20)){
            boxRef.removeChild(shapes[i]);
        }
    }
}
function shiftShapes(rowNumber) {
    var shapes = boxRef.getElementsByTagName("div");
    for(var i=shapes.length-1;i>=0;i--){
        if(parseInt(shapes[i].style.top) < (rowNumber*20)){
            shapes[i].style.top = parseInt(shapes[i].style.top) + 20 + "px";

        }

    }
}
function deleteAndSetMapping() {
    var shapes = boxRef.getElementsByTagName("div");
    for(var i=0;i<30;i++){
        for(var j=0;j<45;j++){
            mapping[i+":"+j] =false;
        }
    }
    for(var i=0;i<shapes.length;i++){
        var mapLeft = parseInt(shapes[i].style.left) / 20;
        var mapTop = parseInt(shapes[i].style.top) /20;
        mapping[mapLeft+":"+mapTop] = true;
    }
}
//####################################################################//
var box;
var boxRef;

window.onload = function () {
    box = new Box();
    boxRef = box.getRef();
    setMapping();
    window.addEventListener("keydown", moveShape);
    setCurrentShape(getRandomShape());
    getCurrentShape().appendShape(boxRef);
    setInterval(run, 500);





};

//####################################################################//

function run(){
    if(getCurrentShape().checkFallShape()){
        getCurrentShape().fallShape();
    }
    else{
        getCurrentShape().doMapping();
        checkBoom();
        setCurrentShape(getRandomShape());
        if(!checkMapping(getCurrentShape().getPositionsOfShape())){
            getCurrentShape().appendShape(boxRef);
        }
        else{
            window.alert("GAME OVER!");
        }
    }
}

//####################################################################//





















