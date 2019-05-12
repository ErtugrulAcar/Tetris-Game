//###########################   Superrior Class START   ###########################//
class Shape{
    constructor(color, leftVals, topVals){
        this.number_of_divs = 4;
        this.divs = [
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div")
        ];
        this.color = color;
        this.leftVals = leftVals;
        this.topVals = topVals;
        this.position = 0;
        this.setStyle();
    }
    appendShape(boxRef){
        for(var i=0;i<this.divs.length;i++){
            boxRef.appendChild(this.divs[i]);
        }
    }
    setStyle(){
        for(var i=0;i<this.divs.length;i++){
            this.divs[i].style.position = "absolute";
            this.divs[i].style.width = "20px";
            this.divs[i].style.height = "20px";
            this.divs[i].style.border = "1px solid black";
            this.divs[i].style.backgroundColor = this.color;
            this.divs[i].style.left = this.leftVals[i];
            this.divs[i].style.top = this.topVals[i];
        }
    }
    getPositionsOfShape(){
        var positions = {
            left : [],
            top : []
        };
        for(var i=0;i<this.number_of_divs;i++){
            positions.left.push(parseInt(this.divs[i].style.left));
            positions.top.push(parseInt(this.divs[i].style.top));
        }
        return positions;
    }

    fallShape(){
        for(var i=0;i<this.number_of_divs;i++){
            this.divs[i].style.top = (parseInt(this.divs[i].style.top) + 20) + "px";
        }
    }
    moveLeftShape(){
        if(this.checkLeftGoingShape()){
            for(var i=0;i<this.number_of_divs;i++){
                this.divs[i].style.left = (parseInt(this.divs[i].style.left) - 20) + "px";
            }
        }
    }
    moveRightShape(){
        if(this.checkRightGoingShape()){
            for(var i=0;i<this.number_of_divs;i++){
                this.divs[i].style.left = (parseInt(this.divs[i].style.left) + 20) + "px";
            }
        }
    }
    checkLeftGoingShape(){
        if(parseInt(getCurrentShape().get_most_left_div().style.left) <= 0)  return false;
        var positions = this.getNextPositionOfLeftGoingShape();
        for(var i=0;i<this.number_of_divs;i++){
            var mapX = positions.left[i] / 20;
            var mapY = positions.top[i] /20;
            var st = mapX+":"+mapY;
            if (window.mapping[st])    return false;
        }
        return true;
    }
    checkRightGoingShape(){
        if(parseInt(getCurrentShape().get_most_right_div().style.left) >=580)   return false;
        var positions = this.getNextPositionOfRightGoingShape();
        for(var i=0;i<this.number_of_divs;i++){
            var mapX = positions.left[i] / 20;
            var mapY = positions.top[i] /20;
            var st = mapX+":"+mapY;
            if (window.mapping[st])    return false;
        }
        return true;
    }
    checkFallShape(){
        for(var i=0;i<this.number_of_divs;i++){
            var topVal = parseInt(this.divs[i].style.top) + 20;
            if(topVal > 880) return false;
        }
        var positions = this.getNextPositionsOfFallingShape();
        for(var i=0;i<this.number_of_divs;i++){
            var mapX = positions.left[i] / 20;
            var mapY = positions.top[i] /20;
            var st = mapX+":"+mapY;
            if (window.mapping[st])    return false;
        };
        return true;
    }
    getNextPositionsOfFallingShape(){
        var positions = {
            left : [],
            top : []
        };
        for(var i=0;i<this.number_of_divs;i++){
            positions.left.push((parseInt(this.divs[i].style.left)));
            positions.top.push((parseInt(this.divs[i].style.top))+20);

        }
        return positions;
    }
    getNextPositionOfLeftGoingShape(){
        var positions = {
            left : [],
            top : []
        };
        for(var i=0;i<this.number_of_divs;i++){
            positions.left.push((parseInt(this.divs[i].style.left)) -20);
            positions.top.push(parseInt(this.divs[i].style.top));
        }
        return positions;
    }
    getNextPositionOfRightGoingShape(){
        var positions = {
            left : [],
            top : []
        };
        for(var i=0;i<this.number_of_divs;i++){
            positions.left.push((parseInt(this.divs[i].style.left)) + 20);
            positions.top.push(parseInt(this.divs[i].style.top));
        }
        return positions;
    }
    doMapping() {
       for(var i=0;i<this.number_of_divs;i++){
           var mapX = parseInt(this.divs[i].style.left) / 20;
           var mapY = parseInt(this.divs[i].style.top) / 20;
           var st = mapX + ":" + mapY;
           window.mapping[st] = true;
       }

    }
    change_top_and_left (divNumber, leftVal, topVal){
        this.divs[divNumber].style.left = (parseInt(this.divs[divNumber].style.left) + leftVal) + "px";
        this.divs[divNumber].style.top = (parseInt(this.divs[divNumber].style.top) + topVal) + "px";
    }
    //mapping de eklenecek buraya
    check_top_and_left (divNumber, leftVal, topVal){
        var left = parseInt(this.divs[divNumber].style.left) + leftVal;
        var top = parseInt(this.divs[divNumber].style.top) + topVal;

        var mapX = left / 20;
        var mapY = top /20;
        var st = mapX+":"+mapY;
        if(window.mapping[st] == true) return false;

        if(left >= 0 && left < 600 && top < 900)   return true;
        else                                        return false;
    };

    change_position(){
        if(this.position == 0){
            if( this.check_top_and_left(0, 20, 0)  &&
                this.check_top_and_left(1, 0, 20)  &&
                this.check_top_and_left(2, -20, 0) &&
                this.check_top_and_left(3, -40, 20)){

                this.change_top_and_left(0, 20, 0);
                this.change_top_and_left(1, 0, 20);
                this.change_top_and_left(2, -20, 0);
                this.change_top_and_left(3, -40, 20);
                this.position = 1;
            }

        }
        else {
            if( this.check_top_and_left(0, -20, 0)  &&
                this.check_top_and_left(1, 0, -20)  &&
                this.check_top_and_left(2, 20, 0)   &&
                this.check_top_and_left(3, 40, -20)) {

                this.change_top_and_left(0, -20, 0);
                this.change_top_and_left(1, 0, -20);
                this.change_top_and_left(2, 20, 0);
                this.change_top_and_left(3, 40, -20);
                this.position = 0;
            }
        }
    }

}

//###########################   Superrior Class END   ###########################//

class I extends Shape{
    constructor(){
        super("cyan", ["280px", "280px", "280px", "280px"], ["20px", "40px", "60px", "80px"]);

    }
    //Overriding
    change_position(){
        if(this.position == 0){
            if( this.check_top_and_left(0, 20, 20)  &&
                this.check_top_and_left(2, -20, -20)  &&
                this.check_top_and_left(3, -40, -40)){

                this.change_top_and_left(0, 20, 20);
                this.change_top_and_left(2, -20, -20);
                this.change_top_and_left(3, -40, -40);
                this.position = 1;
            }


        }
        else{
            if( this.check_top_and_left(0, -20, -20)  &&
                this.check_top_and_left(2, 20, 20)  &&
                this.check_top_and_left(3, 40, 40)){

                this.change_top_and_left(0, -20, -20);
                this.change_top_and_left(2, 20, 20);
                this.change_top_and_left(3, 40, 40);
                this.position = 0;
            }

        }
    }
    get_most_left_div(){
        return this.divs[3];
    }
    get_most_right_div(){
        return this.divs[0];
    }
}
class O extends Shape{
    constructor(){
        super("yellow", ["280px","300px", "280px", "300px"], ["20px", "20px", "40px", "40px"]);
    }
    get_most_left_div(){
        return this.divs[0];
    }
    get_most_right_div(){
        return this.divs[1];
    }
    //overloading
    change_position(){}

}
class T extends Shape{
    constructor(){
        super("purple", ["280px", "300px", "320px", "300px"], ["20px", "20px", "20px", "40px"]);
    }
    //Overriding
    change_position(){
        if(this.position == 0){
            if(this.check_top_and_left(2, -20, -20)){
                this.change_top_and_left(2, -20, -20);
                this.position = 1;
            }
        }
        else if(this.position == 1){
            if(this.check_top_and_left(3, 20, -20)){
                this.change_top_and_left(3, 20, -20);
                this.position = 2;
            }
        }
        else if(this.position == 2){
            if(this.check_top_and_left(0, 20, 20)){
                this.change_top_and_left(0, 20, 20);
                this.position = 3;
            }
        }
        else if(this.position ==3){
            if(
                this.check_top_and_left(0, -20, -20) &&
                this.check_top_and_left(2, 20, 20) &&
                this.check_top_and_left(3, -20, 20)
                ){
                this.change_top_and_left(0, -20, -20);
                this.change_top_and_left(2, 20, 20);
                this.change_top_and_left(3, -20, 20);
                this.position = 0;
            }

        }
    }
    get_most_left_div(){
        return this.divs[0];
    }
    get_most_right_div(){
        if(this.position == 0 || this.position == 1)    return this.divs[2];
        else return this.divs[3];
    }
}

class S extends Shape{
    constructor(){
        super("green", ["280px", "300px", "300px", "320px"], ["40px", "40px", "20px", "20px"]);
    }
    //change position comes from superrior class
    get_most_left_div(){
        if(this.position == 0)  return this.divs[0];
        else                    return this.divs[2];
    }
    get_most_right_div(){
        if(this.position == 0)  return this.divs[3];
        else                    return this.divs[1];
    }
}
class Z extends Shape{
    constructor(){
        super("red", ["280px", "300px", "300px", "320px"], ["20px", "20px", "40px", "40px"]);
    }
    //change position comes from superrior class
    get_most_left_div(){
        if(this.position == 0)  return this.divs[0];
        else                    return this.divs[2];
    }
    get_most_right_div(){
        if(this.position == 0)  return this.divs[3];
        else                    return this.divs[1];
    }
}
class J extends Shape{
    constructor(){
        super("blue", ["300px", "300px", "300px", "280px"], ["20px", "40px", "60px", "60px"]);
    }
    change_position() {
        if(this.position == 0){
            if(
                this.check_top_and_left(0, 40, 40) &&
                this.check_top_and_left(1, 20, 20) &&
                this.check_top_and_left(3, 20, -20)
            ){
                this.change_top_and_left(0, 40, 40);
                this.change_top_and_left(1, 20, 20);
                this.change_top_and_left(3, 20, -20);
                this.position = 1;
            }
        }
        else if(this.position == 1){
            if(
                this.check_top_and_left(0, -40, 40) &&
                this.check_top_and_left(1, -20, 20) &&
                this.check_top_and_left(3, 20, 20)
            ){
                this.change_top_and_left(0, -40, 40);
                this.change_top_and_left(1, -20, 20);
                this.change_top_and_left(3, 20, 20);
                this.position = 2;
            }
        }
        else if(this.position == 2){
            if(
                this.check_top_and_left(0, -40, -40) &&
                this.check_top_and_left(1, -20, -20) &&
                this.check_top_and_left(3, -20, 20)
            ){
                this.change_top_and_left(0, -40, -40);
                this.change_top_and_left(1, -20, -20);
                this.change_top_and_left(3, -20, 20);
                this.position = 3;
            }
        }
        else if(this.position == 3){
           if(
               this.check_top_and_left(0, 40, -40) &&
               this.check_top_and_left(1, 20, -20) &&
               this.check_top_and_left(3, -20, -20)
           ){
               this.change_top_and_left(0, 40, -40);
               this.change_top_and_left(1, 20, -20);
               this.change_top_and_left(3, -20, -20);
               this.position = 0;
           }
        }
    }
    get_most_left_div(){
        if(this.position == 0 || this.position == 1)    return this.divs[3];
        else                                            return this.divs[0];

    }
    get_most_right_div(){
        if(this.position == 0 || this.position == 1)    return this.divs[0];
        else                                            return this.divs[3];
    }
}
class L extends Shape{
    constructor(){
        super("orange", ["280px", "280px", "280px", "300px"], ["20px", "40px", "60px", "60px"]);
    }
    change_position() {
        if(this.position == 0){
            if(
                this.check_top_and_left(0, 40, 40) &&
                this.check_top_and_left(1, 20, 20) &&
                this.check_top_and_left(3, -20, 20)

            ){
                this.change_top_and_left(0, 40, 40);
                this.change_top_and_left(1, 20, 20);
                this.change_top_and_left(3, -20, 20);
                this.position = 1;
            }
        }
        else if(this.position == 1){
            if(
                this.check_top_and_left(0, -40, 40) &&
                this.check_top_and_left(1, -20, 20) &&
                this.check_top_and_left(3, -20, -20)
            ){
                this.change_top_and_left(0, -40, 40);
                this.change_top_and_left(1, -20, 20);
                this.change_top_and_left(3, -20, -20);
                this.position = 2;
            }

        }
        else if(this.position == 2){
            if(
                this.check_top_and_left(0, -40, -40) &&
                this.check_top_and_left(1, -20, -20) &&
                this.check_top_and_left(3, +20, -20)
            ){
                this.change_top_and_left(0, -40, -40);
                this.change_top_and_left(1, -20, -20);
                this.change_top_and_left(3, +20, -20);
                this.position = 3;
            }
        }
        else if(this.position == 3){
            if(
                this.check_top_and_left(0, 40, -40) &&
                this.check_top_and_left(1, 20, -20) &&
                this.check_top_and_left(3, 20, 20)
            ){
                this.change_top_and_left(0, 40, -40);
                this.change_top_and_left(1, 20, -20);
                this.change_top_and_left(3, 20, 20);
                this.position = 0;
            }
        }
    }
    get_most_left_div(){
        if(this.position == 0 || this.position == 1)return this.divs[2];
        else if(this.position == 2)                 return this.divs[3];
        else                                        return this.divs[0];

    }
    get_most_right_div(){
        if(this.position == 0 || this.position == 3)return this.divs[3];
        else                                        return this.divs[0];
    }
}

















