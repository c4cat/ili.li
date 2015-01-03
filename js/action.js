//mrc
//email:i#ili.li
//2014-12-30 splite
//
//action

var bg = new BgView();
	bg.setBgImage();

var app = new AppView();

//
//resize 
//
$(document).ready(function(){
	$(window).on('resize',function(){
		$('#bgNormal,#bgSpecial').empty();
		var afterResizeApp = new BgView();
	});
});