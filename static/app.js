//this is just to test out with the menu bar


App.addRegions({
    top-menu: "#topMenu",
});


App.on("start",function(){
    console.log("Starting");
    
    var menuview = new App.MenuView({model:p1});
    App.top-menu.show(menuview);
    
    Backbone.history.start();
});


App.MenuItemView = Marionette.ItemView.extend({
    template : "#menu-item",
    tagName : "li",
    //events : { },
    modelEvents : {
	"change" : function() { this.render(); }
    }	
});

App.MenuView = Marionette.CollectionView.extend({
    childView : App.MenuItemView
});


var MenuItem = Backbone.Model.extend();
var Menu = Backbone.Collection.extend({
		model:MenuItem
});

var p1 = new Place({name:"Terry's",rating:5});
var p2 = new Place({name:"Ferry's",rating:8});
var c = new Places([p1,p2]);

var m = [['about','<img src="../static/RuloPic.png" width="30" height="30">'],
['events','All Events'],['your_events','Your Events'],['create_events','New Event'],['personal','Personal'],['logout','Logout']];

for (var i = 0; i < m.length; i++){
    m[i] = new MenuItem({href:m[i][0],name:m[i][1]});
}

console.log(m);

var menu = new Menu(m);

App.start();
