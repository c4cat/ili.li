// drag
// base on jquery.pep.js
// https://github.com/briangonzalez/jquery.pep.js

//
var pep = Pep();

function Pep(el,opt) {
	console.log(this);
	this.init();
	return this;
}	

  //
  Pep.prototype.init = function () {
	 	this.drag = d3.behavior.drag()
					.origin(function(){ 
			        	var t = d3.select(this);
			        	return {x: t.attr("x"), y: t.attr("y")};
			    	});

		this.drag.on("drag",function(d){
				d3.select(this)
				      .attr("x", d.x = Math.max(0, Math.min(width - 100, d3.event.x)))
				      .attr("y", d.y = Math.max(0, Math.min(height - 100, d3.event.y)))
				      .attr("id", "isdragging");
				});

		this.drag.on("dragend",function(d){
			        var t = d3.select(this),
			        	x = parseInt(d3.select(this).attr('x')),
			        	y = parseInt(d3.select(this).attr('y'));


			        var time = new Date()-this.beforeTimeStamp;

					t.transition()
					.duration(args.time*1.5)
					.ease("poly(2)")
					.attr('x',x+parseInt(args.distanceX))
					.attr('y',y+parseInt(args.distanceY));

					setTimeout(function(){t.attr("id","");},300);
				});
	}

  // resetVelocityQueue()
  //
  Pep.prototype.resetVelocityQueue = function() {
    this.velocityQueue = new Array(5);
  };	

  //  velocity();
  //    using the LIFO, calculate velocity and return
  //    velocity in each direction (x & y)
  Pep.prototype.velocity = function(){
    var sumX = 0;
    var sumY = 0;

    for ( var i = 0; i < this.velocityQueue.length -1; i++  ){
      if ( this.velocityQueue[i] ){
        sumX        += (this.velocityQueue[i+1].x - this.velocityQueue[i].x);
        sumY        += (this.velocityQueue[i+1].y - this.velocityQueue[i].y);
        this.dt     = ( this.velocityQueue[i+1].time - this.velocityQueue[i].time );
      }
    }

    // return velocity in each direction.
    return { x: sumX*this.options.velocityMultiplier, y: sumY*this.options.velocityMultiplier};
  };

  //  addToLIFO();
  //    a Last-In/First-Out array of the 5 most recent
  //    velocity points, which is used for easing
  Pep.prototype.addToLIFO = function(val){
    // last in, first out
    var arr = this.velocityQueue;
    arr = arr.slice(1, arr.length);
    arr.push(val);
    this.velocityQueue = arr;
  };



