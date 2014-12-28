// drag
// base on jquery.pep.js
// https://github.com/briangonzalez/jquery.pep.js

//
var drag = d3.behavior
	.drag()
	.origin(function() {
		var t = d3.select(this);

			console.log(t.attr("x")+','+t.attr("y"));

		return {
			x: t.attr("x"),
			y: t.attr("y")
		};
	})
	.on("dragstart", function(d) {
		// resetVelocityQueue()
		this.velocityQueue = new Array(5);
	})
	.on("drag", function(d) {
		var t = this;
		var timeStamp = d3.event.sourceEvent.timeStamp,
			curX = d3.event.x,
			curY = d3.event.y;

		var radians = Math.atan2(curX - 10, curY - 10) * 2;
        var degree = (radians * (180 / Math.PI) * -1) + 120;

		d3.select(this)
			.attr("x", d.x = Math.max(0, Math.min(width - 100, d3.event.x)))
			.attr("y", d.y = Math.max(0, Math.min(height - 100, d3.event.y)))
			.attr("transform","rotate("+degree+","+(d.x+50)+","+(d.y+50)+")")
			.attr("id", "isdragging");

		addToLIFO({
			time: timeStamp,
			x: curX,
			y: curY
		});
		//  addToLIFO();
		//  a Last-In/First-Out array of the 5 most recent
		//  velocity points, which is used for easing
		function addToLIFO(val) {
			// last in, first out
			var arr = t.velocityQueue;
			arr = arr.slice(1, arr.length);
			arr.push(val);
			t.velocityQueue = arr;
		};
	})
	.on("dragend", function(d) {
		var t = this,
			dx = d3.event.sourceEvent.pageX,
			dy = d3.event.sourceEvent.pageY;
			// console.log(d3.event);
		//ease 
		var vel = velocity(),
			dt = t.dt,
			x = vel.x,
			y = vel.y;

		var xOp = ( vel.x > 0 ) ? Math.abs(x) : x - Math.abs(x),
       		yOp = ( vel.y > 0 ) ? Math.abs(y/2) : y - Math.abs(y);

        //target x y      
        var tx = Math.round((dx+xOp)/100)*100,
        	ty = Math.round((dy+yOp)/100)*100;

        d3.select(this).transition()
			.duration(1000)
			.ease("elastic",1.2,99)
			.attr('x', tx)
			.attr('y', ty);

		d3.select(this).attr("transform","rotate("+0+","+(tx+50)+","+(ty+50)+")");

		setTimeout(function() {
			d3.select(t).attr("id", "");
		}, 300);

		//  velocity();
		//  using the LIFO, calculate velocity and return
		//  velocity in each direction (x & y)
		function velocity() {
			var sumX = 0;
			var sumY = 0;
			var velocityMultiplier = 1.9;

			for (var i = 0; i < t.velocityQueue.length - 1; i++) {
				if (t.velocityQueue[i]) {
					sumX += (t.velocityQueue[i + 1].x - t.velocityQueue[i].x);
					sumY += (t.velocityQueue[i + 1].y - t.velocityQueue[i].y);
					t.dt = (t.velocityQueue[i + 1].time - t.velocityQueue[i].time);
				}
			}

			// return velocity in each direction.
			return {
				x: sumX * velocityMultiplier,
				y: sumY * velocityMultiplier
			};
		};
	});