// JavaScript Document

/**********************
	  Toggle Android/iOS 
	  by presing Control Shift D
	*********************/
	
//Begin Document Ready 
$(document).ready(function() {


	var map_device = []; 
	keyPressDevice = function(e){
		e = e || event; // to deal with IE
		map_device[e.keyCode] = e.type == 'keydown';
		if(map_device[17] && map_device[16] && map_device[68]){ // CTRL+SHIFT+D
			// console.log('Control Shift D');
			/*$('body').toggleClass('android').toggleClass('');*/
			$("body").toggleClass('apple android');
		}
	}	
	$(document.body).keydown(function(e) {keyPressDevice(e)});
	$(document.body).keyup(function(e) {keyPressDevice(e)});

	var map_device_chrome = []; 
	keyPressDeviceChrome = function(e){
		e = e || event; // to deal with IE
		map_device_chrome[e.keyCode] = e.type == 'keydown';
		if(map_device_chrome[17] && map_device_chrome[16] && map_device_chrome[77]){ // CTRL+SHIFT+M
			console.log('Control Shift M');
			$("body").toggleClass('apple android');
		}
	}	
	$(document.body).keydown(function(e) {keyPressDeviceChrome(e)});
	$(document.body).keyup(function(e) {keyPressDeviceChrome(e)});
	
}); // END document(ready)