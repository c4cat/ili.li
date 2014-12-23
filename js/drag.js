// drag
// base on jquery.pep.js
// https://github.com/briangonzalez/jquery.pep.js

var tempX,tempY;

var drag = d3.behavior.drag()
			.origin(function(){ 
		        var t = d3.select(this);
		        return {x: t.attr("x"), y: t.attr("y")};
		    })
			.on("drag",function(d){
				d3.select(this)
			      .attr("x", d.x = Math.max(0, Math.min(width - 100, d3.event.x)))
			      .attr("y", d.y = Math.max(0, Math.min(height - 100, d3.event.y)))
			      .attr("id", "isdragging");

			    // this.beforeTimeStamp = new Date();
			    // this.distanceX = {
			    // 	before : tempX,
			    // 	after : d3.event.x
			    // }
			    // this.distanceY = {
			    // 	before : tempY,
			    // 	after : d3.event.y 
			    // }
			    // tempX = d3.event.x;
			    // tempY = d3.event.y;

			    this.velocityQueue = resetVelocityQueue();
			})
			.on("dragend",function(d){
		        var t = d3.select(this),
		        	x = parseInt(d3.select(this).attr('x')),
		        	y = parseInt(d3.select(this).attr('y')),
		        	distanceX = this.distanceX.after - this.distanceX.before,
		        	distanceY = this.distanceY.after - this.distanceY.before;

		        //console.log(distance);
		        var time = new Date()-this.beforeTimeStamp;
		        // console.log(time);
		        //var speed = distance/time;
		        var args = momentum(distanceX,distanceY,time,0);
		        console.log(args);

				t.transition()
				.duration(args.time*1.5)
				.ease("poly(2)")
				.attr('x',x+parseInt(args.distanceX))
				.attr('y',y+parseInt(args.distanceY));

				// copy form https://github.com/vastwu/Blog/issues/9
				function momentum(distanceX,distanceY,time,maxDist) {
			        var deceleration = 0.01,
		        		distance = Math.sqrt(distanceX*distanceX+distanceY*distanceY),
			            speed = Math.abs(distance) / time,
			            speedX = Math.abs(distanceX) / time,
			            speedY = Math.abs(distanceY) / time,
			            newDistX = (speedX * speedX) / (2 * deceleration),
			            newDistY = (speedY * speedY) / (2 * deceleration),
			            newTime = 0;

			        // if (Math.abs(newDist) > maxDist) {
			        //     newDist = maxDist;
			        //     speed = speed / 6;
			        // }
			        newDistX = newDistX * (distanceX < 0 ? -1 : 1);
			        newDistY = newDistY * (distanceY < 0 ? -1 : 1);
			        newTime = speed / deceleration;
			        return { 
			            'distanceX': newDistX, 
			            'distanceY': newDistY, 
			            'time': newTime 
			        };
			    };
				setTimeout(function(){t.attr("id","");},300);
			});

//  velocity();
//  using the LIFO, calculate velocity and return
//  velocity in each direction (x & y)
function velocity(){
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

function addToLIFO(val){
    // last in, first out
    var arr = this.velocityQueue;
    arr = arr.slice(1, arr.length);
    arr.push(val);
    this.velocityQueue = arr;
};

function resetVelocityQueue() {
    var arr = new Array(5);
    return arr;
};


