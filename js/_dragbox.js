//mrc
//email:i#ili.li
//2014-12-30 splite
//
//dragbox function
//

var DragBox = Backbone.Model.extend({
	defaults:{
		x:'',
		y:'',
		type:'',
		json:''
	}
});
var DragBoxList = Backbone.Collection.extend({
	model:DragBox,
	url:'nav.json'
});
var dragBoxs = new DragBoxList;
var DragBoxView = Backbone.View.extend({
	tagName: "div",
	model:DragBox,
	template: _.template($("#dragbox-template").html()),
	initialize:function(){
		var t = this;
		var wh = new Wh();
		this.width = wh.width;
		this.height = wh.height;
		this.listenTo(this.model, 'change', this.render);
	},
	events: {
		// 'click':'test',
		'mousedown':'whenMousedown',
		'mousemove':'whenMousemove',
		'mouseup':'whenMouseup'
	},
	render: function(){
		var x = this.model.get('x'),
			y = this.model.get('y');

		$('#region').append(this.$el.html(this.template(this.model.toJSON())));
		$(this.el).stop();
		$(this.el).addClass('drag')
				  .attr({'x':x,'y':y })
				  .css('transition','none')
				  .animate({'left':x*100+'px','top':y*100+'px'},_.random(100,400));
		return this;
	},
	whenMousedown: function(e){
		this.isdragging = true;
		this.velocityQueue = new Array(5);
		this.startPageXY = {
			x:e.pageX-Math.floor(e.pageX/100)*100,
			y:e.pageY-Math.floor(e.pageY/100)*100
		};

		$(this.el).addClass('isdragging');
	},
	whenMouseup: function(e){ //end ease
		var t = this;
		var dx = e.pageX,
			dy = e.pageY;

		var vel = this.velocity();
			dt = this.dt,
			x = vel.x,
			y = vel.y;

		// console.log(vel);

		var xOp = ( vel.x > 0 ) ? Math.abs(x) : x - Math.abs(x),
			yOp = ( vel.y > 0 ) ? Math.abs(y) : y - Math.abs(y);

		var tx = Math.max(0, Math.min((Math.floor(this.width/100)-1)*100, Math.floor((dx+xOp)/100)*100)),
        	ty = Math.max(0, Math.min((Math.floor(this.height/100)-1)*100, Math.floor((dy+yOp)/100)*100));

		// $(this.el).animate({
		// 		left:tx,
		// 		top:ty
		// 	},500,"linear",function(){
		// 	}).removeClass('isdragging');
		

		$(this.el).css({'transform':'rotate(0)'}).removeClass('isdragging');

		this.isdragging = false;
	},
	whenMousemove: function(e){
		var t=this;
		if(t.isdragging){
			t.temp = {
				x:'',
				y:'',
				time:''
			}
			t.addToLIFO({
				time:e.timestamp,
				x: e.pageX,
				y: e.pageY
			});
			$(document).mousemove(function(e){
				
					var timestamp = e.timeStamp,
						curX = e.pageX,
						curY = e.pageY;

					var radians = Math.atan2(curX-10,curY-10)*2,
						degree = (radians*(180/Math.PI)*-1)+120;

					$('.isdragging').css({
						'left': e.pageX - t.startPageXY.x,
						'top': e.pageY - t.startPageXY.y,
						'transform': 'rotate('+degree+'deg)'
					});
			});
		}	
	},
	clickFun: function(){
		var el = $(this.el),
			type = this.model.get('type'),
			json; //json file

			this.model.get('json')? json=this.model.get('json'):json=this.model.get('name')+'.json';

		if(el.hasClass('noclick')){
			setTimeout(function(){el.removeClass('noclick');},300);
		}else{
			switch(type){
				case 'aroundBox':
					console.log('aroundBox');
					aroundBoxFun(json);
					break;
				case 'about':
					console.log('about');
					aboutBoxFun();
					break;
				case 'contact':
					console.log('contact');		
			}
		}
	},
	fun4x5:function(){
		
	},
	aroundBoxFun: function(json){
		var AroundBoxList = Backbone.Collection.extend({
			model:AroundBox,
			url:json
		});
		this.aroundBoxs = new AroundBoxList;
		//end image box
		var that=this;
		//nav
		this.aroundBoxs.fetch({
			success:function(col,arr){
				that.createAroundBoxs();
			},
			error:function(){
				console.log('Get dragboxs json error,please check the json file');
			}
		});
	},
	createAroundBoxs: function(bool){
		var i = 0,
			j = 0,
			num = this.aroundBoxs.length,
			edge = {
				x: Math.floor(width/100),
				y: Math.floor(height/100)
			},
			local ={
				x: this.model.get('x'),
				y: this.model.get('y')
			}
			args = this.positionArr(num,edge,local);

		this.aroundBoxs.each(function(obj){
			// console.log(obj.get('id'));
			if(!bool) var view = new AroundBoxView({model:obj});
			obj.set({'parentXY':local});
			if(i<args.inside_num){
				obj.set({'x':args.inside_arr[i][0],'y':args.inside_arr[i][1]});
			}else{
				obj.set({'x':args.outside_arr[j][0],'y':args.outside_arr[j][1]});
				j++;
			}
			i++;
		});
	},
	positionArr: function(num,edge,local){
		var arr = [],
			length = Math.ceil(Math.sqrt(num+1))<3? 3:Math.ceil(Math.sqrt(num+1)),
			floor = 3;

		while(arr.length<num){
			if(floor>9999) break;

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
		var inside = (length-1)*(length-1)-1;
		var random_arr = [];

		//inside
		for(var i=0;i<inside;i++){
			$('#demo').append('<div class="box" style="left:'+arr[i][0]*50+'px;top:'+arr[i][1]*50+'px">'+arr[i]+'<div>');
			arr_clone.shift();
		}
		//outside
		while(random_arr.length<(num-inside)){
			var random = _.random(0,arr_clone.length-1);
			if(!inOrNot(arr_clone[random],random_arr))
				random_arr.push(arr_clone[random]);
		}

		for(var j=0;j<random_arr.length;j++){
			$('#demo').append('<div class="box" style="left:'+random_arr[j][0]*50+'px;top:'+random_arr[j][1]*50+'px">'+random_arr[j]+'<div>');
		}
		function inOrNot(obj,arr){
			for(var i=0;i<arr.length;i++){
	 			if(obj.toString() == arr[i].toString()){
	 					return true;
	 				}
				}
			return false;	
		}	

		var re = {
			inside_arr:arr,
			inside_num:inside,
			outside_arr:random_arr
		}
		return re;
	},
	velocity:function(){
		var sumX = 0;
		var sumY = 0;
		var velocityMultiplier = 1.9;

		for (var i = 0; i < this.velocityQueue.length - 1; i++) {
			if (this.velocityQueue[i]) {
				sumX += (this.velocityQueue[i + 1].x - this.velocityQueue[i].x);
				sumY += (this.velocityQueue[i + 1].y - this.velocityQueue[i].y);
				this.dt = (this.velocityQueue[i + 1].time - this.velocityQueue[i].time);
			}
		}

		// return velocity in each direction.
		return {
			x: sumX * velocityMultiplier,
			y: sumY * velocityMultiplier
		};
	},	
	addToLIFO:function(val) {
		var t = this;
		// last in, first out
		var arr = t.velocityQueue;
			arr = arr.slice(1, arr.length);

			// console.log(val.time+','+t.temp.time)
			if(val.time != t.temp.time){
				// console.log('fuck');
				arr.push(val);
				t.temp.time = val.time;
			}else{
				// arr.push(val);
			}

			t.velocityQueue = arr;
			
			console.log(arr);
	},
	test:function(){
		alert('this is a test!');
	}
});
