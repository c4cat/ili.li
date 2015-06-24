// @MRC
// 2015/06/24
// i@ili.li

// class SubSquare

function SubSquare(){	
	Square.call(this);

	// u should overwrite here
	this.class = 'subBox';
	this.opacity = 0;

}

SubSquare.prototype = Object.create(Square.prototype);

SubSquare.prototype.setY = function(y){
	this.y = y;
}

SubSquare.prototype.getY = function(y){
	return this.y;
}

SubSquare.prototype.bindClick = function(){
	return false;
}