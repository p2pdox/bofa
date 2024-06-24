
$(document).on("init", "#FP", function() {	
	$('.csp_closeModal').on('click', closeModal);
	$('.csp_slideModalDown_js').on('click', slideModalDown);
    $('.csp_slideModalDown_key').on('keypress', slideModalDown);
	$( ".modal_touch_id" ).on('click', function(){
		$('body,html').addClass('logged_in');
	});
	// #change_pin_cancel - section_card_settings/more_options_menu.php
	$( ".change_pin_cancel" ).on('click', function(){
		$('#change_pin_cancel').attr('href','#card_settings');
	});
});

//BEGIN function opemModal and closeModal
var openModel;
var openMask;

function showModal(modal,modalMask){
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	console.log(windowWidth);
	var offsetY = (window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop));
	var modalLeft = ((windowWidth - $(modal).width())/2);
	var modalTop = (windowHeight - $(modal).height())/2 + offsetY;
	modalTop = modalTop > 0 ? modalTop : 0;
	
	$(modal).css({
		left: modalLeft,
		top: modalTop
	});
	
	$(modalMask).css({
		height: $(document).height()
	});
	
	$(modal).show();
	$(modalMask).show();
	
	openModel = modal;
	openMask = modalMask;
}
// needed to create this to an event object, so that multiple parameters can be passed via the new $("#div").on("click", function) method required by CSP changes
function showModalEvent(event){

	modal = event.data.modal;
	modalMask = event.data.modalMask;

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	console.log(windowWidth);
	var offsetY = (window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop));
	var modalLeft = ((windowWidth - $(modal).width())/2);
	var modalTop = (windowHeight - $(modal).height())/2 + offsetY;
	modalTop = modalTop > 0 ? modalTop : 0;
	
	$(modal).css({
		left: modalLeft,
		top: modalTop
	});
	
	$(modalMask).css({
		height: $(document).height()
	});
	
	$(modal).show();
	$(modalMask).show();
	
	openModel = modal;
	openMask = modalMask;
}


function closeModal(){
	$(openModel).hide();
	$(openMask).hide();
}
//END function opemModal and closeModal


//BEGIN function showMask used in BAMD
function showMask(){
	$('.modalMask').css({ height: $(document).height() }).show();
}
//END function showMask used in BAMD

// BEGIN Slide Modal Up for bottom menu (as in Card Settings -> More Options)
function slideModalUp(modal,modalMask){

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	//console.log(windowWidth);
	var offsetY = (window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop));
	var modalLeft = ((windowWidth - $(modal).width())/2);
	var modalTop = (windowHeight - $(modal).height())/2 + offsetY;
	modalTop = modalTop > 0 ? modalTop : 0;
	
	$(modal).animate({
		bottom: '0px'
	}, 300);
	
	$(modalMask).css({
		height: $(document).height()
	});
	
	$(modal).show();
	$(modalMask).show();
	
	openModel = modal;
	openMask = modalMask;
}


function slideModalDown(){
	var mheight = $(openModel).height();
	$(openModel).animate({
		bottom: -mheight
	}, 300);
	setTimeout(function() {
		$(openMask).hide();
	}, 300);
	
}
//END function opemModal and closeModal