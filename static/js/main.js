// MRC
// background
// use div and css
// ver 0.0.1
// 2014-11-24 21:43:03

//BG view
var BgBox = Backbone.Model.extend({
    template:'<div class="box"></div>',
    create:function(rowNum,colNum,target){
        for(var i=0;i<colNum;i++)
            for(var j=0;j<rowNum;j++)
                $(target).append(this.template);    
    }
});

var BgView = Backbone.View.extend({
    el: "#background",
    initialize:function(){
        var wh = new Wh();
        this.width = wh.width;
        this.height = wh.height;

        var rowNum = Math.ceil(this.width/101),
            colNum = Math.ceil(this.height/101),
            offset = (rowNum-1) * 101;
        // nomarl
        var bgBox =  new BgBox();
        bgBox.create(rowNum,colNum,'#bgNormal');
        // special
        if(rowNum%101!=0){
            var bgBoxSpec = new BgBox();
            bgBoxSpec.create(1,colNum,'#bgSpecial');
        }
        //setting
        $('#bgSpecial').css('left',offset);
        $('#bgImage>img').css({'width':this.width,'min-height':this.height});
        // some browser should do this step,because html overflow hidden is not work, 
        // chrome 38 in win is not work, chrome 38 in os x is work,chrome 27 is work too,so add it. 
        $('#background').css({'width':this.width,'height':this.height}); 
        this.bgBoxHover();

    },
    setBgImage:function(){
        var arr = ['./static/img/b1.jpg','./static/img/b2.jpg','./static/img/b3.jpg','./static/img/b4.jpg','./static/img/b5.jpg','./static/img/b6.jpg','./static/img/b7.jpg','./static/img/b8.jpg','./static/img/b9.jpg','./static/img/b10.jpg','./static/img/b11.jpg'],
            random = _.random(0,10);
        $('#bgImage>img').attr('src',arr[random]);  
        // $('#bgImage>img').attr('src','./static/img/b2.jpg');  
    },
    bgBoxHover:function(){
        $('.box').hover(function(){
            $(this).stop(true,true)
            $(this).animate({opacity:0.6},200);
        },function(){
            $(this).animate({opacity:0.4},1000);
        });
    }
});
//BG view end 

var bg = new BgView();
    bg.setBgImage();

$(document).ready(function(){
    $(window).on('resize',function(){
        $('#bgNormal,#bgSpecial').empty();
        var afterResizeApp = new BgView();
    });
});


// use kineticjs
// var window_width = window.innerWidth,
//     window_height = window.innerHeight,
//     bg_row = Math.ceil(window_width/101),
//     bg_col = Math.ceil(window_height/101);

// var stage = new Kinetic.Stage({
//     width: window_width,
//     height: window_height,
//     container: container
// });

// var Overlayer = new Kinetic.Layer();
// //overlay
// var overlay = new Kinetic.Rect({
//     width:window_width,
//     height: window_height,
//     opacity:0.3,
//     // fill:'blue',//test
//     fillPatternRepeat:'repeat'
// });
// var overlayImage = new Image();
// overlayImage.onload = function(){
//     overlay.setFillPatternImage(overlayImage);
//     overlay.draw();
// }
// overlayImage.src = './static/img/bg4.gif';

// Overlayer.add(overlay);


// var BgLayer = new Kinetic.Layer();
// // every 100x100 box
// for(var i=0;i<bg_row;i++){
//     for(var j=0;j<bg_col;j++){
//         var bgBox = new Kinetic.Rect({
//             x:i*101,
//             y:j*101,
//             width:100,
//             height:100,
//             strokeWidth:0.5,
//             cornerRadius:5,
//             fill:'black',
//             opacity:0.2,
//             stroke:'#000'
//         });
//         bgBox.on('mouseenter', function() {
//             this.fill('white');
//             this.draw();
//         },true);
//         bgBox.on('mouseout', function() {
//             this.fill('black');
//             this.draw();
//         },true);
//         BgLayer.add(bgBox);
//     }
// }

// stage.add(Overlayer).add(BgLayer);
// MRC
// common.js
// 2014-11-25 23:01:54
//

function Wh(){ //get window width and height
	this.width = $(window).width();
	this.height = $(window).height();
}