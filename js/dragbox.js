// MRC
// drag box
// use d3js
// ver 0.0.1
// 2014-12-07 21:05:17

//ceate drag box arr 
var dragbox_arr = [];

var dragBoxNum = 6,
	dragBoxNum_count =0;

while(dragBoxNum_count < 6){
	var random = [_.random(0,row-2),_.random(0,col-2)]
	if(!inOrNot(random,dragbox_arr)){
		dragbox_arr.push(random);
		dragBoxNum_count++;
	}
}
var temp;
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

			    // console.log(d3.event.sourceEvent);
			    // this.beforeTimeStamp = d3.event.sourceEvent.timeStamp;
			    this.beforeTimeStamp = new Date();
			    this.distance = {
			    	before : temp,
			    	after : d3.event.x
			    }
			    temp = d3.event.x;
			    // console.log(this.distance);
			})
			.on("dragend",function(d){
		        var t = d3.select(this);
		        var x = parseInt(d3.select(this).attr('x'));
		        var distance = this.distance.after - this.distance.before;
		        //console.log(distance);
		        var time = new Date()-this.beforeTimeStamp;
		        // console.log(time);
		        //var speed = distance/time;
		        var args = momentum(distance,time,0);
		        console.log(x);
		        console.log(args.distance);

				t.transition()
				.duration(1000)
				.attr('x',x+parseInt(args.distance));	        
				// copy form https://github.com/vastwu/Blog/issues/9
				function momentum(distance, time, maxDist) {
			        var deceleration = 0.01,
			            speed = Math.abs(distance) / time,
			            newDist = (speed * speed) / (2 * deceleration),
			            newTime = 0;

			        // if (Math.abs(newDist) > maxDist) {
			        //     newDist = maxDist;
			        //     speed = speed / 6;
			        // }
			        newDist = newDist * (distance < 0 ? -1 : 1);
			        newTime = speed / deceleration;
			        return { 
			            'distance': newDist, 
			            'time': newTime 
			        };
			    };
				setTimeout(function(){t.attr("id","");},300);
			});

d3.select('svg').append('g')
	.attr({'width':width,'height':height,'x':0,'y':0})
	.selectAll('rect')
	.data(dragbox_arr)
	.enter()
	.append('rect')
	.attr('class','drag-box')
	.attr({'width':99,'height':99,'rx':5,'ry':5,'fill':'red'})
	.attr('x',function(d,i){
        return d[0]*100;
    })
    .attr('y',function(d,i){
        return d[1]*100;
    }).call(drag);


d3.selectAll('.drag-box').on('click',function(){
	if(d3.select(this).attr('id')=='isdragging') return false;
	var local = {
		x:d3.select(this).attr('x')/100,
		y:d3.select(this).attr('y')/100
	};
	var edge = {
		x: Math.round(width/100),
		y: Math.round(height/100)
	};
	var aroundBoxObj = createAroundBox(3,edge,local);

	d3.select('svg').append('g')
		.attr({'width':width,'height':height,'x':0,'y':0})
		.selectAll('rect')
		.data(aroundBoxObj.re_arr)
		.enter()
		.append('rect')
		.attr({'width':99,'height':99,'rx':5,'ry':5,'fill':'blue'})
		.attr('x',function(d,i){
	        return d[0]*100;
	    })
	    .attr('y',function(d,i){
	        return d[1]*100;
	    });
});


function createAroundBox(num,edge,local){
	var arr = [],
		length = Math.ceil(Math.sqrt(num+1))<3? 3:Math.ceil(Math.sqrt(num+1)),
		floor = 3;

		while(arr.length<num){
			if(floor>999) break; //stop

			var start = {
				x: local.x-Math.floor(floor/2),
				y: local.y-Math.floor(floor/2)
			};
			var local_item = [[local.x,local.y]];
			for(i=0;i<floor;i++){
				for(j=0;j<floor;j++){
					var item = [start.x+j,start.y+i];
					if(start.x+j+1>0&&start.y+i+1>0&&start.x+j<edge.x&&start.y+i<edge.y) //edge
						if(!inOrNot(item,arr))
							if(!inOrNot(item,local_item))
								arr.push(item);
				}
			}
			floor++;
		}	

		var arr_clone = arr.concat();
		var arr_inside = [];
		var inside = (length-1)*(length-1)<9? num:(length-1)*(length-1)-1;
		var random_arr = [];

		console.log(arr_clone);
		//inside
		for(var i=0;i<inside;i++){
			if(inside<9) arr_clone.sort(function(){ return 0.5 - Math.random(); });
			arr_inside.push(arr_clone[0]);
			arr_clone.shift();
		}
		console.log(arr_inside);
		console.log(arr_clone);
		//outside
		while(random_arr.length<(num-inside)){
			var random = _.random(0,arr_clone.length-1);

			if(!inOrNot(arr_clone[random],random_arr))
				random_arr.push(arr_clone[random]);
		}

		var re = {
			inside_arr:arr_inside,
			inside_num:inside,
			outside_arr:random_arr,
			re_arr: arr_inside.concat(random_arr)
		}
		console.log(re);
		return re;
}



