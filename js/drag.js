// drag
// base on jquery.pep.js
// https://github.com/briangonzalez/jquery.pep.js

//
var drag = d3.behavior
	.drag()
	.origin(function() {
		var t = d3.select(this);

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
		d3.select(this)
			.attr("x", d.x = Math.max(0, Math.min(width - 100, d3.event.x)))
			.attr("y", d.y = Math.max(0, Math.min(height - 100, d3.event.y)))
			.attr("id", "isdragging");

		var t = this;
		var timeStamp = d3.event.sourceEvent.timeStamp,
			curX = d3.event.x,
			curY = d3.event.y;

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
			x = parseInt(d3.select(this).attr('x')),
			y = parseInt(d3.select(this).attr('y'));

		//ease 
		var vel = velocity(),
			dt = t.dt,
			x = vel.x,
			y = vel.y;

		var xOp = ( vel.x > 0 ) ? x + x : x - Math.abs(x);
        var yOp = ( vel.y > 0 ) ? y + y : y - Math.abs(y);

        console.log(xOp);
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

		d3.select(this).transition()
			.duration(200)
			.ease("poly(2)")
			.attr('x', xOp)
			.attr('y', yOp);

		// setTimeout(function() {
		// 	d3.select(this).attr("id", "");
		// }, 300);
	});