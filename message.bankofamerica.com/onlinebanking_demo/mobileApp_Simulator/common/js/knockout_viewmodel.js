//declare your viewmodel OUTSIDE your $(document).ready statement.
var viewModel = new innitialViewModel;

// This is the basic viewmodel declaration. It can be added to in other js files by putting
// viewModel.my_new_observable = ko.observable("");
// OUTSIDE the document.ready()

function innitialViewModel() {

	var self = this;
	self.debug = ko.observable(false);
    self.user_name_first = ko.observable("Robin");
    self.user_name_last = ko.observable("Lee"); 
	self.user_name_full = ko.computed(function() {
        return this.user_name_first() + " " + this.user_name_last();
     }, this);
	self.user_name_caps = ko.computed(function() {
        return this.user_name_full().toUpperCase();
     }, this);
     
    
	//you can define functions as part of the viewmodel and then bind them to page elements
	this.maskPhone = function(full_phone) {
        var vars = full_phone;
        var maskedPhone = "***-***-" + full_phone.slice(full_phone.length-4, full_phone.length);
        return maskedPhone;
    };
	
} //end innitialViewModel()



