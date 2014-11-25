// MRC
// background
// ver 0.0.1
// 2014-11-24 21:43:03



var window_width = window.innerWidth,
    window_height = window.innerHeight,
    bg_row = Math.ceil(window_width/101),
    bg_col = Math.ceil(window_height/101);

var stage = new Kinetic.Stage({
    width: window_width,
    height: window_height,
    container: container
});

var BgLayer = new Kinetic.Layer();

for(var i=0;i<bg_row;i++){
    for(var j=0;j<bg_col;j++){
        var bgBox = new Kinetic.Rect({
            x:i*101,
            y:j*101,
            width:100,
            height:100,
            strokeWidth:1,
            cornerRadius:5,
            fill:'black',
            stroke:'red'
        });
        bgBox.on('click', function() {
            console.log(this.x());
            this.opacity(0.5);
            BgLayer.draw();
        },true);
        BgLayer.add(bgBox);
    }
}

// BgLayer.on('contentMouseover', function() {
//     console.log(123);
//     });

stage.add(BgLayer);