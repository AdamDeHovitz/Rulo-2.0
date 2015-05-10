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
	    var neweventdict = {}
	    neweventdict.ename = $("#newEvent").val();
	    neweventdict.numb = $("#numb").val();
	    neweventdict.desc = $("desc").val();
	    neweventdict.total = $("total").val();
	    neweventdict.price = $("price").val();
	    neweventdict.lon; // need to integrate maps for this
	    neweventdict.lat;
	    neweventdict.location;
	    neweventdict.address;
	    this.collection.add(new Event({e:neweventdict}));

	    /* ??? */
            var n = $("#newEvent").val();
            if (n.length != 0){
                this.collection.add(new Event({e:n}));
                $("#newEvent").val("");
            }
	    
	    $("#newEvent").val("");
	    $("#numb").val("");
	    $("#desc").val("");
	    $("#total").val("");
	    $("#price").val("");
        }
    }
});

App.buttonsView = Marrionette.ItemView.extend({

    // hmm

});

App.topBar = Marrionette.CompositeView.extend({
    childView : App.buttonsView, // can you make the child view buttons?
    childViewContainer: "ol",
     events : {
        "click #yourEvents" : function() {
	    // load url or open the your events view
	}
	 "click #eventsButton" : function(){
	     
	 }
	 "click #settings" : function(){
	     
	 }
	 "click #logout" : function(){
	     
	 }
     }
});
	 
    

// list of events... this might not need to be compositeView.
App.eventView = Marionette.CompositeView.extend({
    childView : App.eventView,
    childViewContainer: "ol",
    template : "#eventList"
});
    

// how would this work for personal info
App.userNameView = Marrionette.ItemView.extend({
    template : "#username",
    modelEvent : {
	"change" : function() { this.render(); }
    }
})

App.passWordView = Marrionette.ItemView.extend({
    template : "#password",
    modelEvent : {
	"change" : function() { this.render(); }
    }
})

App.emailView = Marrionette.ItemView.extend({
    template : "#email",
    modelEvent : {
	"change" : function() { this.render(); }
    }
})

// unsure if we need a compite view or not
// we can add events, as above, but how do you change username, etc

App.changeSettingsView = Marionette.CompositeView.extend({
    childView : App.userNameView, // unsure
    childViewContainer: "ol",
    template : "#personalInfo",
    events : {
        "click #change" : function() {

	    var editPersonalInfoDict = {} //get the person's infodict
	    editPersonalInfoDict.name = $("#name").val();
	    editPersonalInfoDict.password = $("#pword").val();
	    editPersonalInfoDict.email= $("email_address").val();
	    editPersonalInfoDict.pic = $("picture").val(); // upload
	    this.collection.add(new User({e:editPersonalInfoDict}));
	    // needs to not be an add but a change.

	    // other way, but this doesnt have a dictionary
            var n = $("#name").val();
            if (n.length != 0){
                this.collection.add(new User({u:n})); //not a collection?
                $("#name").val("");
            }
	    var m = $("#pword").val();
            if (m.length != 0){
                this.collection.add(new Password({p:m})); //not a collection?
                $("#pword").val("");
            }
	    var l = $("#email_address").val();
            if (l.length != 0){
                this.collection.add(new Email({email:l})); //not a collection?
                $("#email_address").val("");
            }
	    var s = $("#picture").val();
            if (s.length != 0){
                this.collection.add(new Picture({pic:s})); //not a collection?
                $("#picture").val("");
            }
        }
	/*
	 "click #changePassword" : function() {
            var n = $("#pword").val();
            if (n.length != 0){
                this.collection.add(new Password({p:n})); //not a collection?
                $("#pword").val("");
            }
         }
	 "click #changeEmail" : function() {
            var n = $("#email_address").val();
            if (n.length != 0){
                this.collection.add(new Email({email:n})); //not a collection?
                $("#email_address").val("");
            }
        } */
    }
});

App.rateUserView = Marionette.CompositeView.extend({
    childView : App.userNameView, // unsure
    childViewContainer: "ol",
    template : "#otherUser",
    events : {
        "click #submit_comment" : function() {
	    var commentsDict = {}
	    commentsDict.title = $("#title").val();
	    commentsDict.stars = $("#stars").val();
	    commentsDict.comment = $("#comment").val();
	    this.collection.add(new Comment({e:commentsDict}));
	    
          /*
	    var n = $("#stars").val();
            if (n.length != 0){
                this.collection.add(new Stars({s:n})); //not a collection?
                $("#stars").val("");
            }
	    var m = $("#comment").val();
            if (m.length != 0){
                this.collection.add(new Comment({c:m})); //not a collection?
                $("#comment").val(""); */
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

var Password = Backbone.Model.extend();
var p1 = new User({p:"password"});

var Picture = Backbone.Model.extend();
var pic = new User({pic:"upload a thing!"});

var Email = Backbone.Model.extend();
var u1 = new User({email:"blah@blah"});

var Comment = Backbone.Model.extend(); // Given that a user gets these, do we need this
var c1 = new User({c:"comment"});

var Stars = Backbone.Model.extend(); // Given that a user gets these, do we need this
var s1 = new Stars({s:"number"});`
	
/*
var Word = Backbone.Model.extend();
var StoryView = Backbone.Collection.extend({
    model:Word
}); 

var w1 = new Word({w:"hi"});
var w2 = new Word({w:"Establish"});
var c = new StoryView([w1]); */

App.start();
