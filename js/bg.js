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
