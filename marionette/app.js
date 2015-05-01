// All of the code in the marionette file will need to be moved
// into the static and template files as appropriate

var App = new Marionette.Application();

// 1.add the ids to the html
App.addRegions({
    // Game: "#game"
    Login: "#login",
    Register: "#register",
    About: "#about",
    Home: "#home",
    Personal: "#personal",
    Create_Event: "#create_event",
    Event_Page: "#event_page",
    User: "#user"
});

App.on("start", function(){
    console.log("starting");
    })

// Have yet to touch any of this
App.on("start",function(){
       console.log("Starty doo bop");       
       
       var addword = new App.AddWord({collection:c, model:w1});
       App.Game.show(addword);
       Backbone.history.start();
});

App.WordView = Marionette.ItemView.extend({
     template : "#word",
     tagName : "li",
     modelEvents : {
         "change" : function() { this.render(); }
     }                                      
})

App.StoryView = Marionette.CollectionView.extend({
    childView : App.WordView,
});

App.AddWord = Marionette.CompositeView.extend({
    childView : App.WordView,
    childViewContainer: "ol",
    template : "#stuff",
    events : {
        "click #add" : function() {
            var n = $("#newWord").val();
            if (n.length != 0){
                this.collection.add(new Word({w:n}));
                $("#newWord").val("");
            }
        }
    }
});

var Word = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Word
});

var w1 = new Word({w:"hi"});
var w2 = new Word({w:"Establish"});
var c = new StoryView([w1]);

App.start();
