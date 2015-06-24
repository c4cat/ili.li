// @MRC
// 2015/06/24
// i@ili.li

// class Square

function Square(){
	//screen 
	this.x = 0;
	this.y = center.y;
	this.l = length;
	this.bgc = '#aaa';
	this.bdc = '#aaa';
	this.opacity =1;
	this.class = 'box';
	this.id = '';
}

Square.prototype.getCoordinate = function(){
	// top right bottom left
	var coordinate = {
		x1:this.x,
		y1:this.y-offset,
		x2:this.x+offset,
		y2:this.y,
		x3:this.x,
		y3:this.y+offset,
		x4:this.x-offset,
		y4:this.y
	}

	return coordinate;
}

Square.prototype.getCenter = function(){
	var c = {
		x:this.x,
		y:this.y
	}
	return c;
}

Square.prototype.setX = function(x){
	this.x = x;
}

// Square.prototype.setXByOffset = function(x){
// 	this.x = x;
// }

Square.prototype.getX = function(){
	var x = this.x;
	return x;
}

Square.prototype.setBgc = function(bgc){
	this.bgc = bgc;
}

Square.prototype.setBdc = function(bdc){
	this.bdc = bdc;
}

Square.prototype.pathFormat = function(c){
	var pathFormat = "M"+c.x1+','+c.y1+'L'+c.x2+','+c.y2+'L'+c.x3+','+c.y3+'L'+c.x4+','+c.y4+'Z';
	return pathFormat;
}

// Square.prototype.addClass = function(){
// 	this.path.addClass(this.class);
// }

Square.prototype.setData = function(){
	var data = {
		x: this.getX(),//center.x
		y: this.y //center.y
	}

	this.path.data(data);
}

Square.prototype.setId = function(name){
	this.path.attr('id',name);
}

Square.prototype.draw = function(){
	var c = this.getCoordinate();
	var pathFormat = this.pathFormat(c);
	this.path = s.paper.path(pathFormat);
	this.path.attr({
		fill:this.bgc,
		stroke:this.bdc,
		strokeWidth:2,
		opacity:this.opacity
	})
	this.path.addClass(this.class);
	this.setData();
	this.bindClick();
	// return this.path;
}

Square.prototype.reDraw = function(){
	this.draw();
	this.path.addClass('close');
	// return this.path;
}


Square.prototype.bindClick = function(){
	var t = this;
	this.path.click(function(){
		if(this.hasClass('close')){
			s.selectAll('.box').forEach(function(elem,i){
				if(!elem.hasClass('close')){
					var distance = t.getX() - elem.data('x')
					t.aniRe(elem.node,distance);
				}
			});
			s.selectAll('.subBox').forEach(function(elem,i){
				var distance = t.getX() - elem.data('x')
				t.aniFall(elem.node,distance);
			});
			this.removeClass('close');
		}else{
			this.remove();
			$('.subBox').remove();
			s.selectAll('.box').forEach(function(elem,i){
				var distance = t.getX() - elem.data('x')
				t.aniFall(elem.node,distance);
			});
			t.reDraw();
			t.aniFan();
		}
	});
}

Square.prototype.aniFan = function(){
	var t = this;
	console.log(t.path.node);
	var tl = new TimelineLite();
		tl.to($(t.path.node), 1, {
			scaleX:4,
			scaleY:4,
			opacity:1,
			rotation:180,
			transformOrigin:'50% 50%',
			delay:Math.random()/4,
			ease:Back.easeInOut
		});
}

Square.prototype.aniRe = function(target,distance){
	var tl = new TimelineLite();
		tl.to(target, 1, {
			x:0,
			rotation:0,
			opacity:1,
			transformOrigin:"50% 50%",
			delay:0.5-Math.abs(distance/1000),
			ease:Back.easeOut
		}
		);
		// tl.to(target, 0.2, {
		// 	rotation:0}
		// );
}

Square.prototype.aniAround = function(target){
		var arr = this.getAroundArr();
		for(var i=0;i<arr.length;i++){
			var c = new SubSquare();
				c.setX(this.x);
				c.setY(this.y);
				c.draw();
				// c.path.transform(new Snap.Matrix().rotate(30,999,999));
				// $(c.path.node).css({'transform':'rotate(-120deg)', 'transform-origin': '50% 50%'});
				// $(c.path.node).css({'transform':'scale(0)', 'transform-origin': '50% 50%'});
			var origin = Math.random()*100+'%' + ' ' + Math.random()*100+'%';;

			var tl = new TimelineLite();
			tl.to(c.path.node, 1, {
				x:arr[i][0],
				y:arr[i][1],
				rotationY:360,
				rotationX:360,
				opacity:1,
				transformOrigin:origin,
				delay:Math.random()/4,
				ease:Back.easeInOut
			});
		}
}

Square.prototype.aniShakeOut = function(target){
		// level 1/3/5/7/9
		var t = this;
		var level = 1;
		var arr = [];

		for(var y=-level;y<=level;++y){
			for(var x=-level;x<=level;++x){
				var c = {
					x:x,
					y:y,
					v:spiral(x,y)
				}
				arr.push(c);
			}
		}
		arr.sort(compare);
		var i = 0;
		create();

		function create(){
			if(i == arr.length) return false;
			if(i !=0 ){
				var c = new SubSquare();
				var o,charset=1;

				console.log(i);
				i%2 == 0 ? o=1 : o=2;
				c.setX(t.x+ o*offset*arr[i-1].x);
				// c.setX(arr[i-1].x);
				// c.setY(arr[i-1].y);
				c.setY(t.y+ o*offset*arr[i-1].y);
				c.draw();
				// alert(i);

				if(arr[i].x-arr[i-1].x>0){
					// direction = 'right'
					origin = 'top center';
					charset = -1;
					console.log('right');
				}else if(arr[i].x-arr[i-1].x<0){
					// direction = 'left'
					origin = 'top right'; 
					console.log('left');
				}else if(arr[i].y-arr[i-1].y>0){
					// direction = 'down'
					origin = 'right center';
					charset = -2;
					console.log('down');
				}else{
					// direction = 'up';
					origin = 'bottom bottom'; 
					console.log('up');
				}


				var tl = new TimelineLite();
				tl.to(c.path.node, 1, {
					x:(arr[i].x-arr[i-1].x)*o*offset,
					y:(arr[i].y-arr[i-1].y)*o*offset,
					// rotation:90*charset,
					opacity:1,
					// transformOrigin:origin,
					delay:0.1*i,
					ease:Bounce.easeIn
				});
			}	
			i++;
			create();
		}
		// arr.forEach(function(item,index,array){
		// for(var index=0;index<arr.length;index++){
		// 	console.log(tmp);
		// 	var c = new SubSquare();
		// 		if(tmp){
		// 			var o = 1;
		// 			index%2 == 0 ? o=2 : o=1;
		// 			c.setX(t.x+ o*offset*tmp.x);
		// 			c.setY(t.y+ o*offset*tmp.y);
		// 			// alert(index);
		// 		}else{
		// 			c.setX(t.x);
		// 			c.setY(t.y);
		// 		}
		// 		c.draw();

		// 	var origin = '';

		// 	if(tmp){
		// 		if(arr[index].x-tmp.x>0){
		// 			// direction = 'right'
		// 			origin = 'top top' 
		// 		}else if(arr[index].x-tmp.x<0){
		// 			// direction = 'left'
		// 			origin = 'bottom right' 
		// 		}else if(arr[index].y-tmp.y>0){
		// 			// direction = 'down'
		// 			origin = 'bottom left' 
		// 		}else{
		// 			// direction = 'up';
		// 			origin = 'bottom bottom'; 
		// 		}
		// 	}
		// 	console.log(origin);

		// 	var tl = new TimelineLite();
		// 	tl.to(c.path.node, 1, {
		// 		// x:arr[][0],
		// 		// y:arr[i][1],
		// 		rotation:90,
		// 		opacity:1,
		// 		transformOrigin:origin,
		// 		delay:1*index,
		// 		ease:Back.easeInOut
		// 	});

		// 	tmp = arr[index];
		// }

		function compare(x1,x2){
			return x1.v-x2.v;
		}
		
		// **********************************************************
		// http://blog.csdn.net/yhmhappy2006/article/details/2934435
		// **********************************************************
		function spiral(){
			var c = Math.max(Math.abs(x),Math.abs(y));
			var max = (c*2+1)*(c*2+1);

			if (y == -c) { 			// up 
	            return max + (x + y);  
	        } else if (x == -c) {	// left  
	            return max + (3 * x - y);  
	        } else if (y == c) {	// down  
	            return max + (-x - 5 * y);  
	        } else {				// right  
	            return max + (-7 * x + y);  
	        }
		}
}

Square.prototype.aniSwap = function(target){
		// level 1/3/5/7/9
		var t = this;
		var level = 1;
		var arr = [];

		for(var y=-level;y<=level;++y){
			for(var x=-level;x<=level;++x){
				var c = {
					x:x,
					y:y,
					v:spiral(x,y)
				}
				arr.push(c);
			}
		}
		arr.sort(compare);
		arr.shift();
		var i = 0;

		var tmp='';
		// arr.forEach(function(item,index,array){
		for(var index=0;index<arr.length;index++){
			var c = new SubSquare();
			var o = 1;
				index%2 == 0 ? o=2 : o=1;
				// alert(index);
				c.setX(t.x);
				c.setY(t.y);
				c.draw();

			if(tmp){
				if(arr[index].x-tmp.x>0){
					// direction = 'right'
				}else if(arr[index].x-tmp.x<0){
					// direction = 'left'
				}else if(arr[index].y-tmp.y>0){
					// direction = 'down'
				}else{
					// direction = 'up';
				}
			}

			var cha = parseInt(Math.random()*10)%2 == 0? -1:1;
			var tl = new TimelineLite();
			tl.to(c.path.node, 1, {
				x:arr[index].x*o*offset,
				y:arr[index].y*o*offset,
				rotation:180*cha,
				opacity:1,
				transformOrigin:'50% 50%',
				delay:index/10,
				ease:Power4.easeInOut
			});

			tmp = arr[index];
		}

		function compare(x1,x2){
			return x1.v-x2.v;
		}
		
		// **********************************************************
		// http://blog.csdn.net/yhmhappy2006/article/details/2934435
		// **********************************************************
		function spiral(){
			var c = Math.max(Math.abs(x),Math.abs(y));
			var max = (c*2+1)*(c*2+1);

			if (y == -c) { 			// up 
	            return max + (x + y);  
	        } else if (x == -c) {	// left  
	            return max + (3 * x - y);  
	        } else if (y == c) {	// down  
	            return max + (-x - 5 * y);  
	        } else {				// right  
	            return max + (-7 * x + y);  
	        }
		}
}


Square.prototype.getAroundArr = function(count){
	var arr = [];
	var level = 3;
	var k = 0; 
	for(var i=1;i>-2;i--){
		for(var j=1;j>-2;j--){
			if(i==0 && j==0){

			}else{
				k%2==0 ? arr.unshift([i*offset,j*offset]):arr.push([i*offset*2,j*offset*2]);
			}
			k++;
		}
	}

	console.log(arr);
	return arr;
}

Square.prototype.aniFall = function(target,distance){
	var tl = new TimelineLite();
	tl.to(target,0.001,{scale:0.98,rotation:Math.random()*10-10,transformOrigin:"50% 50%",ease:Power4.easeOut});
	tl.to(target, 0.3, {
		y:600,
		scale:1.2,
		rotation:Math.random()*100-50,
		opacity:0,
		transformOrigin:"50% 50%",
		ease:Power4.easeIn,
		delay:Math.random()/10}
		);
	tl.to(target, 0, {
		x:distance,
		y:0,
		scale:1,
		rotation:Math.random()*200-100,
		opacity:0}
	);
	// The simple fall	
	// TweenLite.to(target, 0.3, {
	// 	y:600,
	// 	scale:1.2,
	// 	rotation:Math.random()*100-50,
	// 	opacity:0,
	// 	transformOrigin:"100% 100%",
	// 	ease:Power4.easeIn,
	// 	delay:Math.random()/10}
	// 	);
}

Square.prototype.animate = function(target,distance){
	// this.path.animate({d:"M100,50L200,100L100,200L50,100"}, 500, mina.bounce);
	TweenLite.to(target, 1, {x:distance, y:0, scale:1, rotation:10,opacity:1,transformOrigin:"50% 50%",ease:Power2.easeInOut,delay:Math.abs(distance/1000)});
}
