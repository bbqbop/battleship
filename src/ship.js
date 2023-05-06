exports.Ship = function(length){
    this.length = length;
    this.hitCount = 0;
    this.isSunk = false;
}
this.Ship.prototype = {
    hit: function(){
        this.hitCount++;
        this.checkSunk();
    },
    checkSunk: function(){
        if(this.hitCount >= this.length){
            this.isSunk = true;
        }
    }
}
