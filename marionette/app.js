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


App.eventView = Marrionette.ItemView.extend({
    template : "#event",
    tagName : "li",
    modelEvent : {
	"change" : function() { this.render(); }
    }
})

App.eventCollection = Marrionette.CollectionView.extend({
    childView : App.eventView
})
    
//modeled after below
App.addEvent = Marionette.CompositeView.extend({
    childView : App.eventView,
    childViewContainer: "ol",
    template : "#addEvent",
    events : {
        "click #add" : function() {
            var n = $("#newEvent").val();
            if (n.length != 0){
                this.collection.add(new Event({e:n}));
                $("#newEvent").val("");
            }
        }
    }
});

// how would this work for personal info
App.userNameView = Marrionette.ItemView.extend({
    template : "#username",
    modelEvent : {
	"change" : function() { this.render(); }
    }
})

App.changeName = Marionette.CompositeView.extend({
    childView : App.userNameView,
    childViewContainer: "ol",
    template : "#personalInfo",
    events : {
        "click #change" : function() {
            var n = $("#name").val();
            if (n.length != 0){
                this.collection.add(new User({u:n})); //not a collection
                $("#name").val("");
            }
        }
    }
});  


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

var Event = Backbone.Model.extend();
var Events = Backbone.Collection.extend({
    model:Event
});

var e1 = new Event({e:"event"});
var es = new Events([e1]);

var User = Backbone.Model.extend();
var u1 = new User({u:"username"});

/*
var Word = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Word
}); 

var w1 = new Word({w:"hi"});
var w2 = new Word({w:"Establish"});
var c = new StoryView([w1]); */

App.start();
