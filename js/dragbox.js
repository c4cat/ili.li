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






