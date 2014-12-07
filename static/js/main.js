// MRC
// background
// use d3js
// ver 0.0.1
// 2014-11-24 21:43:03
var wh = new Wh(),
    width = window.innerWidth,
    height = window.innerHeight,
    row = Math.ceil(width/100),
    col = Math.ceil(height/100),
    bg_arr = [];

for(var i=0;i<row;i++)
    for(var j=0;j<col;j++)
        bg_arr.push([i,j]);

//d3
d3.select('body').append('svg')
    .attr({'width':width,'height':height,'x':0,'y':0})
    .append('g').attr('class','bg')
    .attr({'width':width,'height':height,'x':0,'y':0})
    .selectAll('rect')
    .data(bg_arr)
    .enter()
    .append('rect')
    .attr('class','bg-box')
    .attr({'width':99,'height':99,'rx':5,'ry':5,'fill':'rgba(0,0,0,0.8)'})
    .attr('x',function(d,i){
        console.log(d[0]);
        return d[0]*100;
    })
    .attr('y',function(d,i){
        return d[1]*100;
    });

//end background

// MRC
// common.js
// 2014-11-25 23:01:54
//

//start common

function Wh(){ //get window width and height
	this.width = $(window).width();
	this.height = $(window).height();
}

function inOrNot(obj,arr){
	for(var i=0;i<arr.length;i++){
 		if(obj.toString() == arr[i].toString()){
 				return true;
 			}
		}
	return false;	
}


//end commen
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


console.log(dragbox_arr);


d3.select('svg').append('g')
	.attr({'width':width,'height':height,'x':0,'y':0})
	.selectAll('rect')
	.data(dragbox_arr)
	.enter()
	.append('rect')
	.attr('class','drag-box')
	.attr({'width':99,'height':99,'rx':5,'ry':5,'fill':'red'})
	.attr('x',function(d,i){
        console.log(d[0]);
        return d[0]*100;
    })
    .attr('y',function(d,i){
        return d[1]*100;
    });






