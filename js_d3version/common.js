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