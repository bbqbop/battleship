exports.Ship = function(length){
    this.length = length;
    this.hitCount = 0;
    this.isSunk = false;
    this.coords = [];
}
this.Ship.prototype = {
    hit: function(){
        this.hitCount++;
        let result = this.checkSunk();
        return result;
    },
    checkSunk: function(){
        let result = 'HIT!'
        if(this.hitCount >= this.length) {
            this.isSunk = true;
            result = 'SUNK!'
        }
        return [result, this];
    }
}