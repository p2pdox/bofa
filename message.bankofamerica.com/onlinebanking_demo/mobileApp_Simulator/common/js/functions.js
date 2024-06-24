var allowHTTPLoading = false; // set this to true to allow Onsen to load external templates via HTTP. But be careful -- a failed attempt will halt Onsen

var bamd_scroll_flag = false; //used to prevent page swipe during BaMD mouse event
var bill_pay_parity_2_0 = true;   //goto new bill pay (by default)
var bill_pay_parity_2_0_calendar = false //new styling for bill pay parity calendar

var skipTracking = false; //flag for backStack tracking
const backStack = []; //history stack for reverse navigation w/ backbuttons

// JavaScript Document


// need to replace jqmCalendar. this is a placeholder that prevents "jqmCalendar is not a function" errors
$.fn.jqmCalendar = function() {console.log("jqmCalendar placeholder function called");};


setTimeout(function() {
	// $('#new_loading_page').animate({ top: '-900'}, 750);

    $('#new_loading_page').animate(
        {  top: '-1920' },
         750, function() {
            $('#new_loading_page').hide();
      });
	$("#modal_mask_loading").addClass('hidden');
},2000); //<--time in milliseconds

/**********************
  Toggle Spanish/English 
  by presing Control Shift S
*********************/
$(document).ready(function() {
    var map = []; 
    keyPress = function(e){
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        if(map[17] && map[16] && map[83]){ // CTRL+SHIFT+S
            console.log('Control Shift S');
            $('body').toggleClass('spanish').toggleClass('english');
        }
    }	
    $(document.body).keydown(function(e) {keyPress(e)});
    $(document.body).keyup(function(e) {keyPress(e)});  

    // setup knockout-secure-binding to replace data-bind function so that knockout
    // data-binds don't trigger CSP warning
    var options = {
        attribute: "data-bind",        // default "data-sbind"
        globals: window,               // default {}
        bindings: ko.bindingHandlers,  // default ko.bindingHandlers
        noVirtualElements: false       // default true
     };
     ko.bindingProvider.instance = new ko.secureBindingsProvider(options);
    
      
    // this gets triggered after all sections have been ajaxed in
    // it's in a doc.ready because it's not getting triggered if we try to bind it too soon
    $( "body" ).on( "allSectionsLoaded", function() {
        console.log("********allSectionsLoaded listener triggered*******");
        
        bindAnchorHref("body") // bind all the <a href> that are not in a <ons-page>.
        ko.applyBindings(window.viewModel); // initialize knockout bindings that are not in a <ons-page>.
        
        /* calcDate() init */
        $('.calcDate').each(function() {
            $(this).text(calcDate($(this).text()));
        });
        /* calcLongDate() init - displays Long Date format using moment.js */
        $('.calcLongDate').each(function() {
            $(this).text(calcLongDate($(this).text()));
        });
        
        if (hash) {
            loadPage(hash, { animation: 'fade' });
        }

        // clicking the backarrow loads the returnLink attribute or that page, or else pops the backstack and loads that page
        $('a.button_back_arrow,  a.close_red_x').click(function(){
            skipTracking = true; // so this doesn't get added to the backStack history. Otherwise we can get circular navigation
            var returnLink =  $('#'+myNavigator.topPage.id).attr( "returnLink" ); // backstack override
            if (returnLink != ('') && returnLink != (undefined)) {
                returntopage = returnLink;
            } else {  
                returntopage = backStack.pop();
            }
           loadPage(returntopage , { animation: 'reverseSlide'});;
        });


        // ------------------------------------------------------------------- //
        // All inline functions were converted to event listeners here for CSP
        // CSP - Functions -> Event Listeners should go here 
        // ------------------------------------------------------------------- //


    });
}); // END (document).ready


//hash change handler
function locationHashChanged() {
    var hash = window.location.hash;
    var page = hash.slice(1, hash.length); //remove the leading #
    if (document.getElementById(page + '.html')!=null && myNavigator.topPage.id != page ) { //check to see if page exists as a template & is not already showing
        loadPage(hash, { animation: 'fade' });  // then load the page
    }
}
window.onhashchange = locationHashChanged;


// Loading screen with new message
// setTimeout(function() {
// 	$('.message_power_to_do').removeClass('hidden');
// },4000); //<--time in milliseconds


// setTimeout(function() {
// 	$('.message_power_to_do').addClass('hidden');
// 	$('.message_action_buttons').removeClass('hidden');
// },8000); //<--time in milliseconds


// ***************
// Onsen init
// ***************
var hash; // using this to display current page in the URL hash
var myNavigator; // pointer to the <ons-navigator> page stack 
ons.ready(function() {
    myNavigator = document.querySelector('ons-navigator');
    hash = window.location.hash;
    loadPage('FP.html', { animation: 'fade' }); // the first page shown. Change this to load a different page first
});


// ***************
// loadPage()
// ***************
// Use this for all page transitons. 
// usage: loadPage('template_name.html', { animation: 'fade' });
// page is a reference to the template in format template_name.html 
var loadPage = function(page, data) {
    if (page.search('.html') != -1) { // if page is in template_mame.html format
        newhash = page.slice(0, page.indexOf('.html'));
        onsPage = '#'+newhash;
    } else if (page.search('#') == 0) { // if page is in #page_ID format
        onsPage = page; 
        page = page.slice(1, page.length); //get rid of the leading hash
        newhash = page;
        page += '.html'; // add .html to the end
    }
    
    // check is the page template exists. If not, log error to console
    // then return to prevent http request
    if (document.getElementById(page)==null) {
        if (allowHTTPLoading){ 
            // bringPageTop will automatically look on the server for the missing template
            console.log("Making http request for template " + page + ". If it's not on the server, javascript will hang.");
        } else {
            // preventing server requests for templates
            console.log('template ' + page + ' does not exist. Executing return to prevent onsen http request.');
            return;
        }
    }
    
    // set up the menus & nav icons for the incoming page if it is in the DOM already
    // setupPage() is called on new pages by the page init listener. We can't use a "show" listener
    // for pre-existing pages because that fires AFTER the page animation is complete, which looks goofy.
    // so we do it here when loadpage() is called.
    onsPage = $('ons-navigator').find(onsPage); // does the page already exist?
    if (onsPage.length == 1){setupPage(onsPage)}; // YES! set it up.
   
    // bringPageTop first looks for the page in the navigator stack & makes it active, 
    // otherwise loads the page from the template is it's not already in the navigator stack
    console.log('loading page ' + page);
    myNavigator.bringPageTop(page, data);
    window.location.hash = newhash; //update the url display
};
 

// ***************
// setupPage()
// ***************
// do things that happen concurrently with the page transition animation, particularly nav icon changes
// loadPage() calls this function if the page is in the DOM already
// The page init listener calls this function on new pages
function setupPage(page){
    //console.log("setting up page " + $(page).attr('id'));
    var $thisPage = $(page); //the page we are navigating to
	var returnLink = $thisPage.attr('returnLink');
	var thisPageID = $(page).attr('id'); //the page we are navigatng to
	var has_arrow = $thisPage.hasClass('has_arrow');
	var shopping_cart = $thisPage.hasClass('shopping_cart');
	var cart_full = $thisPage.hasClass('cart_full');
	var alert_left = $thisPage.hasClass('alert_left');
	var device_items_reverse = $thisPage.hasClass('device_items_reverse'); //black apple_device_items on white background
	var activeMenu = $thisPage.attr('active_menu');  // Figure out which menu is active
	var rewardspages = $thisPage.hasClass('rewards_pages');   //NEW for 7.0
	var no_icons = $thisPage.hasClass('no_icons');
	var no_help_btn = $thisPage.hasClass('no_help_btn');
    var show_erica = $thisPage.hasClass('show_erica');
    var no_shopping_cart = $thisPage.hasClass('no_shopping_cart');

    // Header Background Zone - Faded style below header
	$thisPage.hasClass('no_header_fade') ? $('.header_background_zone').removeClass('fadeIn') : $('.header_background_zone').addClass('fadeIn'); // hide the header background zone when neccesary
    // Adjust Header Background Zone - Height change to move shadow for when segment controls nav is present
	$thisPage.hasClass('segment_control_shadow') ? $(".header_background_zone").addClass('header_background_zone_shadow') : $(".header_background_zone").removeClass('header_background_zone_shadow');
    $thisPage.hasClass('segment_control_shadow_billpay') ? $(".header_background_zone").addClass('header_background_zone_shadow_billpay') : $(".header_background_zone").removeClass('header_background_zone_shadow_billpay');

    //Remove header_background_zone's bottom divider
    $thisPage.hasClass('header_no_divider') ? $('.header_background_zone').addClass('header_no_divider') : $('.header_background_zone').removeClass('header_no_divider');

    //Apple Device items
	$thisPage.hasClass('no_device_items') ? $('.device_items').addClass('hidden') : $('.device_items').removeClass('hidden'); // hide the apple device item icon bar on select pages

	$('.sign_out_utility').fadeOut('fast').addClass('hidden').removeClass('has_arrow'); //New for 7.1 the has arrow
	$('.button_dynamic_help').fadeOut('fast').addClass('hidden').removeClass('no_icons');//New for 7.1 
	$('.shop_cart_icon').fadeOut('fast').addClass('hidden');//New for Max - 8.3 

	has_arrow ? $(".button_back_arrow").fadeIn('fast').removeClass('hidden') : $('.button_back_arrow').fadeOut('fast').addClass('hidden');
	device_items_reverse ? $('.device_items').addClass('reverse') : $('.device_items').removeClass('reverse');

	shopping_cart ? $('.shopping_cart_area').fadeIn('fast').removeClass('hidden') : $('.shopping_cart_area').fadeOut('fast').addClass('hidden');
	cart_full ? $('body').addClass('cart_full') : $('body').removeClass('cart_full');

	$thisPage.attr('footer-menu') ? $('#global_footer_menu').addClass('fadeIn') : $('#global_footer_menu').removeClass('fadeIn');  // if the new page has attribute footer-menu==true, show the menu, otherwise hide it.
	$thisPage.attr('footer-menu') ? $('.sign_out_utility').fadeIn('fast').removeClass('hidden').removeClass('icons_only') : null;   // if the new page has attribute footer-menu==true, show the sign out utility, otherwise hide it.
	$thisPage.attr('footer-menu') && has_arrow ? $('.sign_out_utility').addClass('has_arrow') : null; //New for 7.1 removing the words and bumping the icons over to the right
    $thisPage.attr('footer-menu') && !has_arrow ? $('a.menu_more_icon').fadeIn('fast').removeClass('hidden') : $('a.menu_more_icon').fadeOut('fast').addClass('hidden');  // show/hide the menu_more

	rewardspages ? $(".button_back_arrow").addClass('rewards_reset') : $(".button_back_arrow").removeClass('rewards_reset');  //NEW for 7.0

	if (thisPageID!='FP') { //don't show help button on login page
		// no_icons && !no_help_btn ? $('.button_dynamic_help').addClass('no_icons').fadeIn('fast').removeClass('hidden') : null ;  //New for 7.1 the arrow Help button // hide this to remove erica button
		no_icons && !no_help_btn && !no_shopping_cart? $('.shop_cart_icon').fadeIn('fast').removeClass('hidden')  : null ; //New for Max - 8.3 
		// $thisPage.attr('footer-menu') ? $('.button_dynamic_help').fadeIn('fast').removeClass('hidden') : null; // hide this to remove erica button
		$thisPage.attr('footer-menu') && !no_shopping_cart ? $('.shop_cart_icon').fadeIn('fast').removeClass('hidden') : null;
	    // $thisPage.attr('footer-menu') && no_icons ? $('.button_dynamic_help').addClass('no_icons') : null;
        if ($('.sign_out_utility').hasClass('hidden')) {
            $('.shop_cart_icon').addClass('shop_cart_icon_right');
        } else if (!$('.sign_out_utility').hasClass('hidden')) {
            $('.shop_cart_icon').removeClass('shop_cart_icon_right');
        } 

         // new as of NBAA. Shows erica icon in top header if the page has the show_erica class
        if (show_erica) {
            $('.button_dynamic_help').fadeIn('fast').removeClass('hidden').addClass('no_icons');
            $thisPage.attr('footer-menu') ? $('.button_dynamic_help').removeClass('no_icons') : null;
            $('.shop_cart_icon').addClass('hidden').fadeOut('fast');
         } 
    }
	
    //Change active-menu
	$(".menu a").removeClass('on');
	$(".menu a."+activeMenu).addClass('on');

	// Scroll the current page to the top on page show
	$thisPage.find('div[data-role="content"]').scrollTop(0);
	$('#help_dynamic_wrapper').scrollTop(0);
    
	//close dynamic help if open
	if ($('body').hasClass('help_open')) { 
		hideDynamicHelp(); // defined in /section_help_and_support/help.js
	}
    //** Mobile Dashboard - hide alerts and lock icons on main menu
    // if (thisPageID == 'dashboard_travel_rewards'  || thisPageID =='dashboard_spending_budgeting'  || thisPageID =='dashboard_fico_score'  || thisPageID =='dashboard_better_money_habits'  || thisPageID =='dashboard_bamd'  || thisPageID =='dashboard_zelle'  || thisPageID =='dashboard_alerts' ) {

    //     $(".sign_out_utility span.mail").addClass("hide").hide();
    //     $(".sign_out_utility span.lock").addClass("hide").hide();

    // } else {
    //     $(".sign_out_utility span.mail").removeClass("hide").show();
    //     $(".sign_out_utility span.lock").removeClass("hide").show();
    // }

    
} // END setupPage()


// ***************
/* bindAnchorHref() */
// ***************
var bodybound = false;
function bindAnchorHref(scope) {
    scope = scope ||  "body";
    if (scope == "body" && bodybound){
        console.log('ERROR: attempting to do a 2nd global href bind in bindAnchorHref().')
        return;
    };
    if (scope=="body") {bodybound=true};
    $('a', scope).not("[href='#']").not('.button_back_arrow, .close_red_x').on( "click", function(event) { //exclude backarrows and blank hrefs
        var myurl = $(this).attr('href');
        var trans = $(this).attr('data-transition');
        var direction = $(this).attr('data-direction');
        var mytrans;
        //myurl has to be an <ons-page> ID reference format #page_ID
        if (myurl) {
            if (myurl.search('javascript:void') != -1) { return; } // url == 'javascript:void(0)' so do nothing
            // url has to be an ID format of #page_ID, otherwise return
            if (myurl.search('#') != 0 || myurl.length <= 1) { //must start with a # and not be only a #
                console.log('href is not in format #page_ID : ' + myurl);
                return; 
            } 
            event.preventDefault(); 
            //convert jqmobile transitions to onsen animation types
            myurl = myurl.slice(1, myurl.length); //get rid of the leading hash
            if (myurl.search('.html') == -1 ) {myurl += '.html';} // add .html to the end if it is missing
            if (trans) {
                mytrans = trans;
                if (trans == 'slideup') { mytrans = 'lift'; }
                if (trans == 'pop2') { mytrans = 'pop'; }
				if (trans == "slidedown") { mytrans = "slideDown"}
                //if (direction == 'reverse') {mytrans = 'reverseSlide';}
            }
            loadPage(myurl, { animation: mytrans }); // uses default animation (slide) if mytrans is unknown or undefined
         }
    });
};

// when a page unloads, put it in the backStack so we can go back to it
$(document).on("hide", function(event, data) {	
   var page = event.target; //the page that was hidden
   //push the incoming page into the history stack
   if (!skipTracking) { backStack.push('#'+$(page).attr('id')) }
   skipTracking = false;
});

// The pages are cloned from templates, so we have to bind listeners and knockout after creation,
// this is a general page init listener, which is triggered one time when a page is created.
$(document).on("init", function(event, data) {	
 	// bind click listener to old jqmobile href #ID clicks to Onsen page load function.
	var page = event.target; //the page that was inited
	var pageID = $(page).attr('id');
    if (pageID != undefined && pageID != "FP") { // FP is already in the DOM by the time allSectionsLoaded is triggered, so it gets inited by the allSectionsLoaded listener
	    bindAnchorHref('#'+pageID);
        ko.applyBindings(window.viewModel, page);
        setupPage(page);
    }

    // setup back arrows on newly inited pages
    $('a.button_back_arrow,  a.close_red_x', page).click(function() {
        skipTracking = true;
        console.log('loading oage from backstack');
        loadPage(backStack.pop(), { animation: 'reverseSlide' });
    });
    
    /* calcDate() init */
    $('.calcDate', page).each(function() {
        $(this).text(calcDate($(this).text()));
    });
    /* calcLongDate() init - displays Long Date format using moment.js */
    $('.calcLongDate', page).each(function() {
        $(this).text(calcLongDate($(this).text()));
    });
 }); // END on init


$(document).on("show", function(e, data) {
    var oid = myNavigator.pages.length - 2 < 0 ? 0 : myNavigator.pages.length - 2 ; // position of previous page. Or 0 if there is no prev page.
    var originatingid = myNavigator.pages[oid].id;
	var gotoPageid = myNavigator.topPage.id;
	var $goingtoPage = $('#'+gotoPageid); //the page we are navigating to
	//var returnLink = $goingtoPage.attr('returnLink'); //replacing with new backStack return navigation
	//console.log('gotoPageid: '+gotoPageid);
	
	if (gotoPageid == "bill_pay" || gotoPageid == "bill_pay_details" || gotoPageid == "bill_pay_add_reminder" ) {
		bill_pay_parity_2_0_calendar = true;				
	} else { 
	    bill_pay_parity_2_0_calendar = false; 
	}
});


$(document).on("show", function (e, data) {
 	var thisPageID = myNavigator.topPage.id; //the page we are navigatng to
	var $thisPage = $('#'+ thisPageID); //the page we are navigating to


	if (thisPageID == "bill_pay") {
		bill_pay_parity_2_0 = true;
		reset_billpay_overview_payees_list();
	}
	
	if (thisPageID == "bill_pay_1_0") {
		bill_pay_parity_2_0 = false;
	}
	
	if (thisPageID == "bill_pay" || thisPageID == "bill_pay_details" || thisPageID == "bill_pay_add_reminder" || thisPageID == "payee_details_cashrewards" || thisPageID == "payee_details_dukeenergy") {
		bill_pay_parity_2_0_calendar = true;	
			
	} else 
	{	
		bill_pay_parity_2_0_calendar = false;		
	}	

//BEGIN Android menu Animation
	if ($('body').hasClass('android')) {

        switch (thisPageID) {
            case "accounts": //First item for most flows
            $('.menu').animate( { scrollLeft: '0' }, 500, 'easeOutQuad' );
            break;
            case "transfers": //First item for most flows
            $('.menu').animate( { scrollLeft: '0' }, 500, 'easeOutQuad' );
            break;
            case "menu_more": //First item for most flows
            if ($('body').hasClass('sscc_demo')) {
                console.log('Am I good?  I am good.');
            }
            else {
            $('.menu').animate( { scrollLeft: '+=50' }, 500, 'easeOutQuad' );
                console.log('Non SSC flow.');
            }
            break;
    //    	case "menu_more": //First item for most flows
    //		$('.menu').animate( { scrollLeft: '+=50' }, 500, 'easeOutQuad' );
    //		break;
       }
        $('.menu').removeClass().addClass('menu').addClass(thisPageID);  //Remove the former active and add
        console.log('The menu shift now should have a class of menu_shift and :'+thisPageID);
	}

/*BEGIN Time of Day Greeting */
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
    //		console.log("Hours is initialized to: "+hours);
        var suffix = ' AM';
    
        var weekday_abbreviated = new Array(7);
        weekday_abbreviated[0]=  "Sun";
        weekday_abbreviated[1] = "Mon";
        weekday_abbreviated[2] = "Tue";
        weekday_abbreviated[3] = "Wed";
        weekday_abbreviated[4] = "Thu";
        weekday_abbreviated[5] = "Fri";
        weekday_abbreviated[6] = "Sat";
        var today_is = weekday_abbreviated[now.getDay()];

/*BEGIN Time Set*/
      if (minutes < 10) { 
			minutes = '0' + minutes;
			}
      if (hours == 12) { 
			hours = 12;
//			console.log("Equal to 12 condition: "+hours);
			suffix = " PM";
			}
      else if (hours == 0) { 
			hours = 12;
//			console.log("Equal to 12 midnight: "+hours);
			}
	  else if (hours < 12 || hours == 23) { 
			bannerclass = "morning";
				if (hours == 23) {
					hours = hours - 11;
				}
//			console.log("Between equivalent of 11pm and 12pm: "+hours);
			}
	  else if (hours > 12 && hours < 18) { 
			hours = hours - 12;
			suffix = " PM";
//		console.log("Greater than 12 and less than 18 condition: "+hours);
			}

      else if (hours >= 18 && hours < 23) {
		  	hours = hours - 12;
			suffix = " PM";
//			console.log("Greater than or equal to 18 condition but less than 11pm: "+hours);
			}

      $('#device_time').text(hours+':'+minutes+suffix);
	  $('.device_time.apple_only').text(hours+':'+minutes+suffix);
      $('.device_time.android_only').text(hours+':'+minutes);
	  $('#erica_today').text(today_is +' '+hours+':'+minutes+suffix);
/*END Time Set*/

/*BEGIN Front Page Greeting and Image Set*/
      if (($thisPage).attr('id')=="FP") { 

          var now = new Date();
          var hours = now.getHours();
          var msg;
          var image_number = Math.floor(Math.random() * 9) + 1 
          var bannerclass;

          if (hours >= 0 && hours < 12 || hours == 23) { 
                msg = "Good Morning";
                bannerclass = "morning";
                }
          if (hours >= 12 && hours < 18) { 
                msg = "Good Afternoon";
                bannerclass = "afternoon";
                }
          if (hours >= 18 && hours < 23) {
                msg = "Good Evening";
                bannerclass = "evening";
                }

          $('#greeting').text(msg);
          $('#banner_front_page').removeClass().addClass(bannerclass+image_number);
	  }
/*END Front Page Greeting and Image Set*/

/* BEGIN Check to Display Erica */	

/* END Check to Display Erica */	
	
/*    Hide Help Icon on AO - Erica Search/Help field to replace    */
	if ( $thisPage.attr('hide-help-icon')) {
			$("a.button_dynamic_help").css("display","none");
	}


		
	/*   New Erica Affordance location on AO   */
	
/*	if ($thisPage.attr('erica-help-input')) {
		$("#erica_cta").css({
			'bottom': 'unset',
			'top': '150px',
			'right': '28px'
		});
	} else {
		$("#erica_cta").css({
			'bottom':'55px',
			'top': 'unset',
			'right': '10px'
		});
	}*/

});
// END document on show


/*******************************/
/* calcDate() */
function calcDate(offset){
	offset=Number(offset);
	var d = new Date();
	d.setDate(d.getDate()+offset);
	return d.toLocaleDateString();
}; 
/* calcLongDate() - Displays Long Date format (Sep, 23) using moment.js */
function calcLongDate(offset){
	offset=Number(offset);
	var d = moment().subtract(offset, 'days').format("MMM, D");
	return d;
};


  /****************************************************************
  ******** replacing with new backStack return navigation *********
/var _returnLink = "";
var _returnLinkTarget = "";
$(document).on("show", function(event, data) {
    var page = event.target;
    //console.log("_returnLink = " + _returnLink + " : _returnLinkTarget = " + _returnLinkTarget);
    //console.log("_returnLink = " + _returnLink + " : _returnLinkTarget = " + _returnLinkTarget);
    if (_returnLink && _returnLinkTarget && _returnLinkTarget!="#") {
        $(_returnLinkTarget).attr('returnLink',_returnLink);
    }
    _returnLink = "";
    _returnLinkTarget = "";
}); // END On Init
  ****************************************************************/

//Begin On Init 
$(document).on("init", function(event, data) {	
	var page = event.target; //the page we are navigating to

  /****************************************************************
  ******** replacing with new backStack return navigation *********
   //BEGIN Return Link for changing back to proper Accounts area
    $('a.return_link', page).click(function() {
    //	var returnLink = $(this).closest('div.page_bg').attr('id');
        var _returnLinkTarget = $(this).attr('href');
        var targetReturnLink = $(this).attr('targetReturnLink');
        var returnLink = $('#'+myNavigator.topPage.id).attr('returnLink');
        var returnLinkabsent = $('#'+myNavigator.topPage.id).attr('id');

        if (targetReturnLink != ('') && targetReturnLink != (undefined)) {
            _returnLink = targetReturnLink;
            //console.log('Override the Return Link: '+targetReturnLink);
        }

        else if (returnLink != ('') && returnLink != (undefined)) {
             _returnLink = returnLink;
            //console.log('This one had a return link attribute of: '+returnLink);
        }
    
        else {
             _returnLink = '#'+returnLinkabsent;
            //console.log('This one grabbed the ID of: '+returnLinkabsent);
    //	console.log('No return link back button seto to: '+originatingid);
        }	
    });
    //END Return Link for changing back to proper Accounts area
     ****************************************************************/

    // ANDROID: swipe handlers for Android L1 page
    $("div.bankamerideals_container", page).on( "vmousedown", function() {
      bamd_scroll_flag = true; //used to prevent page swipe during BaMD mouse event
    });
    $("div.bankamerideals_container", page).on( "vmouseup", function() {
      bamd_scroll_flag = false; //used to prevent page swipe during BaMD mouse event
    });

    $("body.android .page_bg[swipeleft]", page).on("swipeleft", function(){
        bamd_scroll_flag ? null : loadPage( $(this).attr('swipeleft'), { animation: "slide" });
    });
    $("body.android .page_bg[swiperight]", page).on("swiperight", function(){
        bamd_scroll_flag ? null : loadPage( $(this).attr('swiperight'), { animation: 'reverseSlide' });
    });

    // ANDROID: for android, disable all <a> links not tagged with the class "permanent_link"
    // commented out until we get some links tagegd
    // $("body.android a").not(".permanent_link").attr("href","javascript:void(0)");

    // clone the dynamic disclaimer on app load
    $( ".dynamic_disclaimer", page ).html($( "#dynamic_disclaimer_source" ).html())

    // clone the dynamic MWeb footer on app load
    $( ".dynamic_mweb_footer", page ).html($( "#mweb_disclosure_source" ).html())



    $('input.cmn-toggle', page).focus(function() {  // 
        console.log('toggle was focused');
    });

	/**********************
	  Integrate back arrow with help system. If back arrow href
	  starts with help_page_, then open help and display that page
	*********************/	
	$('a.button_back_arrow', page).click(function() {
	var my_href = $(this).attr('href');
		if (my_href.search("#help_page_") == 0) { // back arrow href starts with "help_page_"
			// so open the help system and show that page. Help backstack is preserved from previous use.
			showHelpPage(my_href, true);
		}

	});

	$('div.toggle_blue', page).click(function() {
		$(this).parent().find('.toggle_blue').removeClass('activated');
		$(this).addClass('activated');
	});

}); // END On Init


