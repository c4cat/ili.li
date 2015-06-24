// @MRC
// 2015/06/24
// i@ili.li

// common

function c(a){
	console.log(a);
}

function rd(m,n){
    var c = n-m+1;  
    return Math.random()*c+m;
}

var s = Snap("#svg");

var width = 1280,
	height = 800,
	length = 125;

var offset = Math.sqrt(1/2) * length;

//center one
var center = {
	x:width/2,
	y:height/2-20
}


