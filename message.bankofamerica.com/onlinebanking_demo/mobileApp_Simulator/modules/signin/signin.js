// JavaScript Document
viewModel.auth_text_number = ko.observable("");
viewModel.card_acct_num = ko.observable("");
viewModel.ssn_or_tin = ko.observable("");
viewModel.passcode = ko.observable("");
viewModel.online_pin = ko.observable("");
viewModel.first_time_user = ko.observable("");
viewModel.forgot_passcode = ko.observable("");
viewModel.billpay_enrollment_flow = ko.observable("");
viewModel.bill_pay_enroll = ko.observable("");
viewModel.life_plan_flow = ko.observable("first");  //New for Life Plan
viewModel.sscc_flow = ko.observable("");

var closeState_initial = "";
var myBalance_unenrolled_selected = 0;
var myBalance_declined = "";
var demoFlowID = "standard_flow";
var send_code = 0;
/*
var show_myBalance = localStorage.getItem("myBalance_status");
console.log("My balance status is: "+show_myBalance);
*/

// CSP - first loading button
// document.onreadystatechange = () => {
// 	if (document.readyState === "complete") {
// 		document.getElementByID('first_screen_button').addEventListener('click', $('#new_loading_page').addClass('hidden'));
// 	}
// };

// CSP - Passcode Simplify
// document.onreadystatechange = () => {
// 	if (document.readyState === "complete") {
// 		document.getElementByClass('goToPasscodeSimplify').addEventListener('click', goToPasscodeSimplify);
// 	}
// };

// CSP Fix - binding listener to old jqmobile href #ID clicks to Onsen page load function.
// Function exisits in prototypes/mobile_dev/section_erica/erica.js
$(document).on("init", function(event, data) {	
	// bind click listener to old jqmobile href #ID clicks to Onsen page load function.
   var page = event.target; //the page that was inited
   var pageID = $(page).attr('id');	
	if (pageID != undefined && pageID != "FP") { // Don't run on log-in screen, because erica.js hasn't loaded yet
	    $('.csp_showErica_js').on('click', showErica);
    }
});

function goToPasscodeSimplify(){
	loadPage("passcode_simplification.html",{animation:"fade"});
	viewModel.forgot_passcode('yes');
};
// CSP Fix - binding listener to old jqmobile href #ID clicks to Onsen page load function.
$(document).on("init", "#FP", function() {	
	$('.goToPasscodeSimplify').on('click', goToPasscodeSimplify);
	//modules/signin/section_mobile_onboard/mobile_onboard.js
	$('.csp_mobileOnboardTrans_alert_paperless').on('click', {
		screenHide: 'mo_alerts',
		screenShow:'mo_paperless'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_touch_alerts').on('click', {
		screenHide: 'mo_touch_id',
		screenShow:'mo_alerts'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_deposit_bamd').on('click', {
		screenHide: 'mo_deposit',
		screenShow:'mo_bamd'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_bamd_deposit').on('click', {
		screenHide: 'mo_bamd',
		screenShow:'mo_deposit'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_bamd_zelle').on('click', {
		screenHide: 'mo_bamd',
		screenShow:'mo_zelle'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_zelle_bamd').on('click', {
		screenHide: 'mo_zelle',
		screenShow:'mo_bamd'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_welcome_touch').on('click', {
		screenHide: 'mo_welcome',
		screenShow: 'mo_touch_id'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_paperless_almost').on('click', {
		screenHide: 'mo_paperless',
		screenShow:'mo_almost'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_paperless_thanks_almost').on('click', {
		screenHide: 'mo_paperless_thanks',
		screenShow:'mo_almost'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardTrans_almost_deposit').on('click', {
		screenHide: 'mo_almost',
		screenShow:'mo_deposit'
	}, mobileOnboardTrans);
	$('.csp_mobileOnboardAuthTrans_getAuth_selectEmail').on('click', {
		screenHide: 'mo_get_auth_code',
		screenShow:'mo_select_email'
	}, mobileOnboardAuthTrans);
	$('.csp_mobileOnboardAuthTrans_getAuth_enterAuth').on('click', {
		screenHide: 'mo_get_auth_code',
		screenShow:'mo_enter_auth_code'
	}, mobileOnboardAuthTrans);
	$('.csp_mobileOnboardAuthTrans_enterAuth_securityPrefs').on('click', {
		screenHide: 'mo_enter_auth_code',
		screenShow:'mo_security_preferences'
	}, mobileOnboardAuthTrans);
	$('.csp_mobileOnboardAuthTrans_securityPrefs_agreement').on('click', {
		screenHide: 'mo_security_preferences',
		screenShow:'mo_agreements'
	}, mobileOnboardAuthTrans);
	$('.csp_mobileOnboardAuthTrans_agreement_consent').on('click', {
		screenHide: 'mo_agreements',
		screenShow:'mo_consent'
	}, mobileOnboardAuthTrans);
	$('.csp_mobileOnboardAuthTransBack_selectEmail_getAuth').on('click', {
		screenHide: 'mo_select_email',
		screenShow:'mo_get_auth_code'
	}, mobileOnboardAuthTransBack);
	$( "#mo_select_email_nav a:nth-of-type(2)" ).on('click', function(){
		$('.auth_send_button').removeClass('inactive'); 
		$('.mo_auth_code_email').show();
	});
	$('.csp_hideTouchID').on('click', $('#touch_id_on').hide());
	$('.csp_hidealerts_on').on('click', $('#mo_alerts_on').hide());
	$('.csp_hideMobileOnboard').on('click', hideMobileOnboard);
	$('.csp_showModal_mo_alerts').on('click', {
		modal: '.mo_modal_alerts',
		modalMask:'.mask1'
	}, showModalEvent);
	$('.csp_showModal_mo_touch').on('click', {
		modal: '.mo_modal_touch',
		modalMask:'.mask1'
	}, showModalEvent);
	$('.csp_showMobileOnboard').on('click', showMobileOnboard);
	$( "#mo_enter_auth_code input" ).on('click', function(){
		$(this).val('123456').addClass('bac_black');
		$('#mo_enter_auth_code_nav a.mobile_onboard_nav_button').removeClass('disabled');
	});
	$( "#mo_paperless_nav a:first-of-type" ).on('click', function(){
		$('#mo_paperless').fadeOut(); 
		$('#mo_paperless_nav').fadeOut(); 
		$('#mo_paperless_settings').fadeIn(); 
		$('#mo_paperless_settings_nav').fadeIn();
	});
	$( "#mo_paperless_settings_nav a:first-of-type" ).on('click', function(){
		$('#mo_paperless_settings').fadeOut(); 
		$('#mo_paperless_settings_nav').fadeOut(); 
		$('#mo_paperless_thanks').fadeIn(); 
		$('#mo_paperless_thanks_nav').fadeIn();
	});
	$( ".csp_mo_ecd_checked" ).on('click', mo_ecd_checked);
	$( ".csp_mo_service_agree_checked" ).on('click', mo_service_agree_checked);
});

// CSP - Set Up Face ID modal
// document.onreadystatechange = () => {
// 	if (document.readyState === "complete") {
// 		document.getElementByID('chkbox_touch_ID').addEventListener('click', showModal('.modal_touch_id','.mask1'));
// 		document.getElementByID('chkbox_touch_ID').addEventListener("keydown", (event) => {
// 			if (event.isComposing || event.keyCode === 13) {
// 			  return;
// 			}
// 			showModal('.modal_touch_id','.mask1');
// 		  });
// 	}
// };


// activate erica_cta
function activateErica(){	
	setTimeout(function() {
		$("#erica_cta").fadeIn();
		setTimeout(function() {
			$("#erica_cta img").attr('src', 'images/icons/icon_erica_cta.svg');
		}, 0);
	 }, 1000);
	 if( (viewModel.erica_enrollment() != "enroll") && (viewModel.erica_enrollment() != "first_run") ){
		 setTimeout(function() {
			$("#erica_cta div.barker").fadeIn(500);
		 }, 6500);
	 }
	 /*$("#erica_cta").removeClass('first_run');
	 setTimeout(function() {
		$("#erica_cta").fadeTo( "slow", 0.3 );
	 }, 15000);*/
}


// CSP - replace event handler
// document.onreadystatechange = () => {
// 	if (document.readyState === "complete") {
// 		document.getElementById('sign_in_button').addEventListener('click', getUserFlowType);
// 	}
//   };
// identify the user flow needed on sign-in
function getUserFlowType(){
	// console.log('getUserFlow function begins execution');
	var message = "Your sign-in flow is called ";
	$('body').removeClass('standard_flow').addClass(demoFlowID);

	// console.log('getUserFlow function addClass DemoFLowID');

	switch(demoFlowID){
		case "first_time_user_demo":
			viewModel.mobile_enrollment("enroll");
			console.log("mobile onboarding = ");
			showMobileEnroll();
			console.log(message + demoFlowID);
			break;
		case "p2p_enroll_demo":
			console.log(message + demoFlowID);
			loadPage('accounts.html', { animation: 'fade' });
			/*activateErica()*/;
			break;
		case "bill_pay_enroll_demo":
			console.log(message + demoFlowID);
			billPayEnrollment();
			viewModel.billpay_enrollment_flow('bill_pay_enrollment');
			loadPage('accounts.html', { animation: 'fade' });
			/*activateErica();*/
			break;
		case "sscc_demo":
			console.log(message + demoFlowID);
			billPayEnrollment();
			viewModel.sscc_flow('sscc');
			loadPage('credit_card_summary.html', { animation: 'fade' });
			//$(".menu .bill_pay").attr("href","#billpay_set-up");
			$('#global_footer_menu div.menu a.bill_pay').attr('href','#billpay_set-up');
			bill_pay_parity_2_0 = false;
			/*activateErica();*/
			break;
		case "english_spanish_demo":
			console.log(message + demoFlowID);
			break;
		case "my_balance_demo":
			console.log(message + demoFlowID);
			loadPage('accounts.html', { animation: 'fade' });
			break;
		case "cas_demo":
			console.log(message + demoFlowID);
			viewModel.cas_flow('past_due');
			//$( "#accounts div.alert_box_yellow" ).removeClass('hidden');
			loadPage('accounts.html', { animation: 'fade' });
			/*activateErica();*/
			break;
		case "passcode_simplify_demo":
			console.log(message + demoFlowID);
			$( "#FP div.alert_passcode_simplify" ).removeClass('hidden').animate({height: "75px"}, 400);
			viewModel.forgot_passcode('yes');
			break;
		case "mortgage_demo_flow":
			console.log(message + demoFlowID);
			loadPage('accounts.html', { animation: 'fade' });
			break;
		case "life_plan_demo":
			console.log(message + demoFlowID);
			viewModel.life_plan_flow('returning');
            console.log('The Life PLan flow is: '+viewModel.life_plan_flow());
            loadPage('accounts.html', { animation: 'fade' });
			break;
		default:
			console.log("default " + message + demoFlowID);
			loadPage('accounts.html', { animation: 'fade' });
			/*activateErica();*/
			break;
			
	}

	// console.log('getUserFlow function switch statement run');

};
// CSP Fix - binding listener to old jqmobile href #ID clicks to Onsen page load function.
$(document).on("init", "#FP", function() {	
	$( "#sign_in_button").on('click', getUserFlowType);
	console.log("getUserFlowType initiated?")
});


$(document).on("init", '#billpay_add_success', function(event, data) {
    if (demoFlowID == 'sscc_demo') {
        $("#billpay_add_success .billpay_add_continue a.bac_button ").attr("href","#bill_pay_1_0");
	}
});
$(document).on("init", '#accounts', function(event, data) {
    if (demoFlowID == 'mortgage_demo_flow') {
		$( "li.activate_open_new_account a" ).removeClass('inactive').attr("href", "#open_account");
	}
});


$(document).on("init", '#passcode_simplification', function(event, data) {
    var page = event.target;
	//When card account/SSN is clicked, bring up the pseudo keyboard
	$(' .passcode_card_acct', page).click(function(){
		$('#passcode_simplification .img_passcode_keyboard_alpha').animate({ bottom : '0' }, 200 ).show();
	});
	$(' .passcode_ssn_tin', page).click(function(){
		$('#passcode_simplification .img_passcode_keyboard_alpha').animate({ bottom : '0' }, 200 ).show();
	});	
	// close keyboar and populate card acct/ssn	
	$(' .img_passcode_keyboard_alpha', page).click(function(){
		if ($('.passcode_card_acct').html() != '****'){
			$('.passcode_card_acct').html('****');
			$('.passcode_ssn_tin').html('**-***-****');
		}
		if (($('.passcode_card_acct').html() != '') && ($('.passcode_ssn_tin').html() != '')){
			$('#passcode_simplification #forgot_id_button').removeClass('inactive');
		}
		$('#passcode_simplification .img_passcode_keyboard_alpha').animate({ bottom : '-255px'}, 100.).hide();
	});
});
$(document).on("init", '#FP', function(event, data) {
    var page = event.target;
	// close alert when accessing passcode reset
	$(' a.alert_passcode_simplify_link').click(function() {
		$( "#FP div.alert_passcode_simplify" ).animate({height: "-20px"}, 400);
		setTimeout(function() {
			$( "#FP div.alert_passcode_simplify" ).addClass('hidden');
		},300); //<--time in milliseconds
	});
});  //END init
$(document).on("init", '#forgot_passcode_success', function(event, data) {
    var page = event.target;
	$(' a').click(function() {
		demoFlowID = "standard_flow";
		viewModel.forgot_passcode('');
		console.log("forgot_passcode = " + viewModel.forgot_passcode());
	});
});  //END init
$(document).on("init", '#authorization_code_start', function(event, data) {
    var page = event.target;
	$(" input").click(function(){
        var radioValue_1 = $("input[name='auth_code_radio_1']:checked").val();
		var radioValue_2 = $("input[name='auth_code_radio_2']:checked").val();
		if (radioValue_1 && radioValue_2){
			$('#authorization_code_start #send_code_button_1').removeClass('inactive');
		}
	});
});  //END init
$(document).on("init", '#forgot_passcode_new_passcode', function(event, data) {
    var page = event.target;
	// reset passcode form
	$(' #reset_passcode_button').click(function(){
		$('.passcode_card_acct').html('Enter last 6 digits');
		$('.passcode_ssn_tin').html('###-##-####');
		$('#passcode_simplification #forgot_id_button').addClass('inactive');
		$('.passcode_atm_number').html('Enter here');
		$('.passcode_atm_pin').html('####');
		$('.passcode_checking_savings_number').html('Enter here');
		$('#passcode_no_ssn_tin #forgot_id_button').addClass('inactive');
		$('#authorization_code_sent input').val('Authorization Code');
		$("#authorization_code_start input[name='auth_code_radio_1']:checked").prop('checked', false);
		$("#authorization_code_start input[name='auth_code_radio_2']:checked").prop('checked', false);
		$('#forgot_passcode_new_passcode input').val('');
		
	});
});  //END init
$(document).on("init", '#consent', function(event, data) {
    var page = event.target;
	// reset first time user flow
	$(' a.bac_button').click(function() {
		demoFlowID = "standard_flow";
		viewModel.first_time_user('');
		console.log("first_time_user = " + viewModel.first_time_user());
	});
});  //END init


// BEGIN document(ready)
$(document).on("init", '#FP', function(event) {
//	console.log("Signin.js ready");
	
	/*
	console.log("Here is show my balance: "+show_myBalance);
 
 	if(show_myBalance == "off"){
		console.log("The myBalance checkbox isn't checked");
		$( "#myBalance_outer" ).hide();
		$( "#profile-mybalance-checkbox" ).attr("checked", false);
	 }else{
		$( "myBalance_outer" ).show();
		$( "#profile-mybalance-checkbox" ).attr("checked", true);
	 }
	 */
 
	$("#username_field").val("User ID").removeClass("active").addClass("font_grey_666");
	$("#username_field_sp").val("Identificación de usuario").removeClass("active").addClass("font_grey_666");
	$("#passcode_field").val("Password").attr("type", "text").removeClass("black").addClass("font_grey_666");
	$("#passcode_field_sp").val("Contraseña").attr("type", "text").removeClass("black").addClass("font_grey_666");

     $("#username_field").focus(function() {
        if ($('#username_field').val() == 'User ID')	{
            $(this).val('').removeClass("font_grey_666").addClass("active");
            //console.log('Username has been focused');
        }
     });
	 $("#username_field_sp").focus(function() {
        if ($('#username_field_sp').val() == 'Identificación de usuario')	{
            $(this).val('').removeClass("font_grey_666").addClass("active");
            //console.log('Username has been focused');
        }
     });

     $("#username_field").focusout(function() {
        if ($('#username_field').val() == '')	{
            $(this).val('User ID').addClass("font_grey_666").removeClass("active");
    //	console.log('Username has been unfocused and empty');
        }
        else {
            return false;
    //	console.log('Username has been unfocused');
        }
     });
	 $("#username_field_sp").focusout(function() {
        if ($('#username_field_sp').val() == '')	{
            $(this).val('Identificación de usuario').addClass("font_grey_666").removeClass("active");
    //	console.log('Username has been unfocused and empty');
        }
        else {
            return false;
    //	console.log('Username has been unfocused');
        }
     });

     $("#passcode_field").focus(function() {
        if ($('#passcode_field').val() == 'Password')	{
       $(this).val('').removeClass("font_grey_666").addClass("black");
       $(this).attr("type", "password");
    //	console.log('Passcode has been focused');
        }
     });
	 $("#passcode_field_sp").focus(function() {
        if ($('#passcode_field_sp').val() == 'Contraseña')	{
       $(this).val('').removeClass("font_grey_666").addClass("black");
       $(this).attr("type", "password");
    //	console.log('Passcode has been focused');
        }
     });

     $("#passcode_field").focusout(function() {
        if ($('#passcode_field').val() == '')	{
            $(this).val('Password').addClass("font_grey_666").removeClass("active").removeClass("black").attr("type", "text");
        $("#sign_in_button").addClass("inactive");
    //	console.log('Passcode is unfocused and empty');
        }
        else {
    //	console.log('Passcode is unfocused');
            return false;
        }
     });
	 $("#passcode_field_sp").focusout(function() {
        if ($('#passcode_field_sp').val() == '')	{
            $(this).val('Contraseña').addClass("font_grey_666").removeClass("active").removeClass("black").attr("type", "text");
        $("#sign_in_button").addClass("inactive");
    //	console.log('Passcode is unfocused and empty');
        }
        else {
    //	console.log('Passcode is unfocused');
            return false;
        }
     });

     $("#passcode_field").keyup(function() {

        var passcode_value = $(this).val();

            if ($('#username_field').val() != '')	{

                if ( passcode_value.length > 5 ) { 
                    $("#sign_in_button").removeClass("inactive");
                    }
                else {
                    $("#sign_in_button").addClass("inactive");
                        }
            }

            else {
                    return false;
            }
      });
	  $("#passcode_field_sp").keyup(function() {

        var passcode_value = $(this).val();

            if ($('#username_field_sp').val() != '')	{

                if ( passcode_value.length > 5 ) { 
                    $("#sign_in_button").removeClass("inactive");
                    }
                else {
                    $("#sign_in_button").addClass("inactive");
                        }
            }

            else {
                    return false;
            }
      });

    /*BEGIN Global Sign Out */
     $("a.sign_out").click(function() {
        console.log('Signed out button pressed');
            $('.chkcircle').removeClass('checked');
            $("#erica_cta").css("display","none");
    //		loadPage( "FP.html", { animation: "lift"} );  //Change the page back to Front Page
      });
    /*END Global Sign Out */


     $('#username_field_mid').focus(function() {
        console.log('Username focused');
       $(this).val("").removeClass("font_grey_666").addClass("active");
        }); 

       $('#passcode_field_mid').focus(function() {
        console.log('Passcode clicked');
       $(this).val("").removeClass("font_grey_666").addClass("black").attr("type", "password");
      }); 
  
     $("#passcode_field_mid").keyup(function() {
        $("#sign_in_button_mid").removeClass("inactive");
      }); 

    //////////////////////////	
    //Logout Checker
    //////////////////////////
    $('a.logged_out').click(function() {
        finalDestination= $(this).attr('finalDestination');
        console.log(finalDestination);
        console.log('You are logged out');
        loadPage( "sign_in_mid.html", { animation: "slideup"} );  //Sign in midstream 
        $('#sign_in_button_mid').attr('href','#'+finalDestination);
        });
    
    /* removed to consolidate and implement getUserFlowType() on line 34 */
    /*$('a#first-time-flow-link').click(function() {
        //console.log("You click the first time flow button!");
        var $accountsBtn = '<a id="sign_in_button" class="bac_button blue inactive radius_0 font_16px" href="#accounts">Sign In</a>';
        var $firstTimeFlowBtn = '<a id="sign_in_button" class="bac_button blue inactive radius_0 font_16px" href="#authorization_code_start">Sign In</a>';
        $('#dynamic_signin_btn').html($firstTimeFlowBtn);
    });*/

	
	/* Front page checkboxes */
	$('.chkcircle').click(function() {
		$(this).toggleClass('checked');
//	console.log('RIP Kimbo Slice');

	if($(this).hasClass('circletouchid'))
		{
			 showModal('.modal_touch_id','.mask1');
		}
	});
	
	/* Consent checkboxes */
	$('#consent_chkbx_frame_ecommunications_disclosure').click(function() {
		//console.log('You clicked one of the consent chkbox frames!');
		$('#chkbox_ecomm').toggleClass('chkbox_unchecked chkbox_checked');
	});
	
	$('#consent_chkbx_frame_service_agreements').click(function() {
		//console.log('You clicked one of the consent chkbox frames!');
		$('#chkbox_agreements').toggleClass('chkbox_unchecked chkbox_checked');
	});	
			
	$('.remote_chekbox_trigger').click(function() {
		//console.log('Remote checkbox trigger called!');
		
		if ( $('#chkbox_touch_ID').hasClass( "chkcircle_checked" ) ) {
			$('#chkbox_touch_ID').click();
		}
		closeModal();
	});
	
	$.fn.preload = function() {
		this.each(function() {
			$('<img/>')[0].src = this;
		});
	}
	$(['/onlinebanking_demo/mobileApp_Simulator/modules/signin/images/circle_blue_checked.png']).preload();
	

//BEGIN REP DEMO SIGNIN USER FLOWS 

	// Demo flow assignment on sign-in
	
	$('ul.demo_flows_list li').on("click", function() {
		demoFlowID = $(this).attr('flow');
		console.log("demoFlowID = " + demoFlowID);
	});
	

	//ACCORDION
    $(".expand_trigger").on("click",function(){
        $(".expand_div").slideToggle();
        $(".closed, .opened").toggle();
    });

	// Demo Flow Checked

    $('#demo_flow_area ul.demo_flows_list li').click(function() {  
        selectedID = this.id;
        // console.log("This demo flow is selected");
        $('#demo_flow_area .demo_flows_list li').removeClass('selected');
        $(this).addClass('selected');
    });	
	//END Demo Flow Checked
	
	// Language Flow Checked

    $('#language_preference ul.lang_flows_list li').click(function() {  
        selectedID = this.id;
        // console.log("This demo flow is selected");
        $('#language_preference ul.lang_flows_list li').removeClass('selected');
        $(this).addClass('selected');
    });	
	//END Language Flow Checked
	
//END REP DEMO SIGNIN USER FLOWS

	// Close Passcode Simpflication Alert
	$('.alert_passcode_simplify svg.icon_circle_x_white').click(function() {
		$( "#FP div.alert_passcode_simplify" ).animate({height: "-20px"}, 400);
		setTimeout(function() {
			$( "#FP div.alert_passcode_simplify" ).addClass('hidden');
		},300); //<--time in milliseconds
	});
	
	//When card ATM Number/PIN is clicked, bring up the pseudo keyboard
	$('#passcode_no_ssn_tin .passcode_atm_number').click(function(){
		$('#passcode_no_ssn_tin .img_passcode_keyboard_alpha').animate({ bottom : '0' }, 200 ).show();
	});
	$('#passcode_no_ssn_tin .passcode_atm_pin').click(function(){
		$('#passcode_no_ssn_tin .img_passcode_keyboard_alpha').animate({ bottom : '0' }, 200 ).show();
	});	
	$('#passcode_no_ssn_tin .passcode_checking_savings_number').click(function(){
		$('#passcode_no_ssn_tin .img_passcode_keyboard_alpha').animate({ bottom : '0' }, 200 ).show();
	});
	// close keyboar and populate card acct/ssn	
	$('#passcode_no_ssn_tin .img_passcode_keyboard_alpha').click(function(){
		$('.passcode_atm_number').html('***************');
		$('.passcode_atm_pin').html('****');
		$('.passcode_checking_savings_number').html('***************');
		$('#passcode_no_ssn_tin #forgot_id_button').removeClass('inactive');
		$('#passcode_no_ssn_tin .img_passcode_keyboard_alpha').animate({ bottom : '-255px'}, 100.).hide();
	});

	// reset user demo flow to 'standard' when passcode reset completes or user remembers passcode
	$('#forgot_passcode_signin_now').click(function() {
		demoFlowID = "standard_flow";
		viewModel.first_time_user('');
	});
	
	// Passcode Reset Options Radio button - id="authorization_code_start"
	//   $('#authorization_code_start .auth_code_request_options').find('.radio').toggleClass('checked');
	
	
}); // END #FP init