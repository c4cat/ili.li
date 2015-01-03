//mrc
//email:i#ili.li
//2014-12-30 splite
//
//aroundbox function
//

var AroundBox = Backbone.Model.extend({
	defaults:{
		x:'',
		y:'',
		url:'',
		thumbnail:'',
		content:'',
		parentXY:''
	}
});
var AroundBoxView = Backbone.View.extend({
	tagName: "div",
	model:AroundBox,
	template: _.template($("#around-img-template").html()),
	initialize:function(){
		this.listenTo(this.model, 'change', this.render);
	},
	events:{
		
	},
	render: function(){
		var x = this.model.get('x'),
			y = this.model.get('y'),
			parentXY = this.model.get('parentXY')

		$('#region').append(this.$el.html(this.template(this.model.toJSON())));
		$(this.el).stop();
		$(this.el).addClass('drag')
				  .attr({'x':x,'y':y})
				  .css({'transition':'none','left':parentXY.x*100+'px','top':parentXY.y*100+'px'})
				  .animate({'left':x*100+'px','top':y*100+'px'},_.random(100,400));
				  
		return this;
	}
});
