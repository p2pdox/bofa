// Knockout for Mobile Onboarding Flow
viewModel.mobile_enrollment = ko.observable("");

// Console tester
function MO(){
	viewModel.mobile_enrollment("enroll");
}

// Show the Mobile Enrollment Section
function showMobileEnroll(){
		
	$('.btn_help_back').addClass('hidden');
	$('#mobile_authorization').show().animate({'top':'0' }, 300);
	$('#mo_get_auth_code_nav').animate({'bottom':'0' }, 300);
	$('.device_items').css("z-index", 8010);
	
	console.log("Mobile Enrollment Authorization screen");
}

function showMobileOnboard(){
	
	$('#mobile_authorization').fadeOut(function() {
		$('#mobile_authorization').css({'left':windowWidth+'px'});
		$('#mo_consent').hide();
	});
	$('#mo_consent_nav').fadeOut();
	
	setTimeout(function() {
		$('#mobile_authorization').addClass("mo_charlotte_cityscape");
		$('#mo_welcome').show();
		$('#mobile_authorization').show().animate({'left':'0'}, 300);
		$('#mo_welcome_nav').show().animate({'left':'0' }, 300);
	}, 1000);
	setTimeout(function() {
		loadPage("accounts.html",{animation:"fade"});
	}, 1300);
	
	console.log("Mobile Enrollment Authorization screen closes!");
}

// Hide the Mobile Enrollment Section
function hideMobileOnboard(){
	$('#mobile_authorization').fadeOut(function() {
		$('#mobile_authorization').css({'left':windowWidth+'px'});
	});
	viewModel.mobile_enrollment("");
	showModal('.mo_modal_complete','.mask1');
}

// Activate consent checkboxes
function mo_ecd_checked(){
	$("#mo_chkbox_ecd").addClass("mo_consent_chkbox_checked");
	$("#mo_chkbox_ecd").removeClass("mo_consent_chkbox_unchecked");
	if($("#mo_chkbox_ecd").hasClass("mo_consent_chkbox_checked") && $("#mo_chkbox_service_agree").hasClass("mo_consent_chkbox_checked")){
		$("#mo_consent_nav_agree").removeClass("disabled");
	}
}
function mo_service_agree_checked(){
	$("#mo_chkbox_service_agree").addClass("mo_consent_chkbox_checked");
	$("#mo_chkbox_service_agree").removeClass("mo_consent_chkbox_unchecked");
	if($("#mo_chkbox_ecd").hasClass("mo_consent_chkbox_checked") && $("#mo_chkbox_service_agree").hasClass("mo_consent_chkbox_checked")){
		$("#mo_consent_nav_agree").removeClass("disabled");
	}
}

// Authorization Section Transitions
// function mobileOnboardAuthTrans(screenHide,screenShow){
// needed to convert this to a single event parameter object, so that multiple parameters can be passed via the new $("#div").on("click", function) method required by CSP changes
function mobileOnboardAuthTrans(event){
	screenHide = event.data.screenHide;
	screenShow = event.data.screenShow;

	$("#"+screenHide).animate({'left':'-'+windowWidth+'px'},400, function() {
		$("#"+screenHide).hide();
	});
	$("#"+screenHide+"_nav").animate({'left':'-'+windowWidth+'px'},400, function() {
		$("#"+screenHide+"_nav").hide();
	});
	$("#"+screenShow).css({'left': windowWidth}).show().animate({'left': '0'},400);
	$("#"+screenShow+"_nav").css({'left': windowWidth}).show().animate({'left': '0'},400);
	
}
// function mobileOnboardAuthTransBack(screenHide,screenShow){
// needed to convert this to a single event parameter object, so that multiple parameters can be passed via the new $("#div").on("click", function) method required by CSP changes
function mobileOnboardAuthTransBack(event){
	screenHide = event.data.screenHide;
	screenShow = event.data.screenShow;

	$("#"+screenShow).show().animate({'left':'0px'},400);
	$("#"+screenShow+"_nav").show().animate({'left':'0px'},400);
	$("#"+screenHide).animate({'left':windowWidth+'px'},400, function() {
		$("#"+screenHide).hide();
	});
	$("#"+screenHide+"_nav").animate({'left':windowWidth+'px'},400, function() {
		$("#"+screenHide+"_nav").hide();
	});
	$("#mo_get_auth_code_send1").hide();
	$("#mo_get_auth_code_send2").show();

}
// Mobile Onboarding Section Transitions
// function mobileOnboardTrans(screenHide,screenShow){
// needed to convert this to a single event parameter object, so that multiple parameters can be passed via the new $("#div").on("click", function) method required by CSP changes
function mobileOnboardTrans(event){ 

	screenHide = event.data.screenHide;
	screenShow = event.data.screenShow;
	console.log("param1 = " + screenHide);
	console.log("param2 = " + screenShow);

	$("#"+screenHide).animate({'left':'-'+windowWidth+'px'},400, function() {
		$("#"+screenHide).hide();
	});
	$("#"+screenHide+"_nav").animate({'left':'-'+windowWidth+'px'},400, function() {
		$("#"+screenHide+"_nav").hide();
	});
	$("#"+screenShow).css({'left': windowWidth}).show().animate({'left': '0'},400);
	$("#"+screenShow+"_nav").css({'left': windowWidth}).show().animate({'left': '0'},400);
	// Get background-image position
	var backgroundPos = $('.mo_charlotte_cityscape').css('backgroundPosition').split(" ");
	var x_pos = backgroundPos[0];
	var new_x_pos =  parseInt(x_pos, 10) - 90 +"px";
	console.log(new_x_pos);
	$('.mo_charlotte_cityscape').animate({
  		'background-position-x': new_x_pos
  	}, 500, 'linear');
}
function mobileOnboardTransBack(screenHide,screenShow){
	$("#"+screenHide).animate({'left':windowWidth+'px'},400, function() {
		$("#"+screenHide).hide();
	});
	$("#"+screenHide+"_nav").animate({'left':windowWidth+'px'},400, function() {
		$("#"+screenHide+"_nav").hide();
	});
	$("#"+screenShow).css({'left': '-'+windowWidth}).show().animate({'left': '0'},400);
	$("#"+screenShow+"_nav").css({'left': '-'+windowWidth}).show().animate({'left': '0'},400);
	// Get background-image position
	var backgroundPos = $('.mo_charlotte_cityscape').css('backgroundPosition').split(" ");
	var x_pos = backgroundPos[0];
	var new_x_pos =  parseInt(x_pos, 10) + 90 +"px";
	console.log(new_x_pos);
	$('.mo_charlotte_cityscape').animate({
  		'background-position-x': new_x_pos
  	}, 500, 'linear');
}


// Document Ready

$(document).on("init", function(event, data) {
    var page = event.target;
    
	// Close Touch ID Success Bubble
	$('#touch_id_on div.mo_success_bubble_close', page).click(function(){
		$('#touch_id_on').fadeOut();
	});
	
	// Close Alerts Success Bubble
	$('#mo_alerts_on div.mo_success_bubble_close', page).click(function(){
		$('#mo_alerts_on').fadeOut();
	});

});

// END Document Ready