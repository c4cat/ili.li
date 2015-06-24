// @MRC
// 2015/06/24
// i@ili.li

// class loading effect

function LoadSquare(){	
	Square.call(this);
	// u should overwrite here
	this.x = center.x,
	this.class = 'loadSquare';
}

LoadSquare.prototype = Object.create(Square.prototype);

LoadSquare.prototype.getStartCoordinate = function(){
	// top right bottom left
	var coordinate = {
		x1:this.x-offset,
		y1:this.y,
		x2:this.x-offset,
		y2:this.y,
		x3:this.x-offset,
		y3:this.y,
		x4:this.x-offset,
		y4:this.y
	}

	return coordinate;
}

LoadSquare.prototype.getStopCoordinate = function(){
	// top right bottom left
	var coordinate = {
		x1:this.x,
		y1:this.y,
		x2:this.x+offset,
		y2:this.y,
		x3:this.x,
		y3:this.y,
		x4:this.x-offset,
		y4:this.y
	}

	return coordinate;
}

LoadSquare.prototype.getRandomCoordinate = function(){
	// top right bottom left
	var coordinate = {
		x1:this.x,
		y1:this.y-offset+rd(-offset/2,offset/2),
		x2:this.x+offset+rd(-offset/2,offset/2),
		y2:this.y,
		x3:this.x,
		y3:this.y+offset+rd(-offset/2,offset/2),
		x4:this.x-offset+rd(-offset/2,offset/2),
		y4:this.y
	}

	console.log(coordinate);
	return coordinate;
}

LoadSquare.prototype.draw = function(){
	var startCoordinate = this.getStartCoordinate();
	var pathFormat = this.pathFormat(startCoordinate);

	this.path = s.paper.path(pathFormat);
	this.path.attr({
		fill:'#fff',
		stroke:'#000',
		strokeWidth:2,
		opacity:this.opacity
	});
	this.aniLoad();
	this.bindClick();
}

LoadSquare.prototype.aniLoad = function(){
	var stopCoordinate = this.getStopCoordinate();
	var endCoordinate = this.getCoordinate();
	var stopPathFormat = this.pathFormat(stopCoordinate);
	var endPathFormat = this.pathFormat(endCoordinate);

	var time = 0.5;

	var tl = new TimelineMax();
		tl.add(TweenMax.to(this.path,time*2,{snap:{d:stopPathFormat},ease:Power4.easeInOut}));
		tl.add(TweenMax.to(this.path.node,time,{rotation:180,transformOrigin:'50% 50%',ease:Power4.easeInOut}));
		tl.add(TweenMax.to(this.path,time,{snap:{d:endPathFormat},ease:Elastic.easeInOut,delay:0.2}));
}

LoadSquare.prototype.bindClick = function(){
	var t = this;
	this.path.mouseover(function(){
		var randomCoordinate = t.getRandomCoordinate();
		var randomPathFormat = t.pathFormat(randomCoordinate);
		console.log(randomCoordinate);
		var tl = new TimelineMax();
			tl.add(TweenMax.to(this,4,{snap:{d:randomPathFormat},ease:Back.easeInOut}));
	});
}

var load = new LoadSquare();
	load.draw();

