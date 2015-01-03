//
var AppView = Backbone.View.extend({
	el:'',
	// model:DragBox,
	initialize:function(){		
		that=this;
		//nav
		dragBoxs.fetch({
			success:function(col,arr){
				that.createDragBoxs();
			},
			error:function(){
				console.log('Get json error,please check the json file');
			}
		});
		$(window).on("resize",this.whenResize);
	},
	whenResize:function(){
		var dragBoxsLength = $('.drag').length;
		that.createDragBoxs('no need to create view again');
	},
	createDragBoxs:function(bool){
		var arr = this.randomArr(dragBoxs.length),
			i = 0; 
		dragBoxs.each(function(obj){
			// console.log(obj.get('id'));
			if(!bool)
				var view = new DragBoxView({model:obj});

			obj.set({'x':arr[i][0],'y':arr[i][1]});
			i++;
		});
	},
	randomArr:function(length){
		var i = 0,
			arr = [];
		while(i<length){
			var random = this.createRandom();
			if(!this.inOrNot(random,arr)){
				arr.push(random);
				i++;
			}
		}	
		return arr;
	},
	createRandom:function(){
		var wh = new Wh(),
			width = wh.width,
			height = wh.height;
		var rowNum = Math.floor(width/100),
			colNum = Math.floor(height/100),
			rowRandom = _.random(0,rowNum-1),
			colRandom = _.random(0,colNum-1);
		
		return([rowRandom,colRandom]);	
	},
	inOrNot:function(obj,arr){
		for(var i=0;i<arr.length;i++){
 			if(obj.toString() == arr[i].toString()){
 					return true;
 				}
			}
		return false;	
	}
});
