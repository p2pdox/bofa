$(document).ready(function(){
/* BEGIN get URL Variables. 
	-This can be used with Universal Content Changer to change content in other places which is we left out the content switching.
	-Add universal_content_changer class to the LI or pass through the URL in order to swap out content.  
	-See common_elements/js/common.js for the directions for universal content changer
*/
    $.extend({
      getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      },
      getUrlVar: function(name){
        return $.getUrlVars()[name];
      }
    });
// END get URL Variables 
}); //End document ready

$(document).on("init", function(event, data) {
    var page = event.target;
// BEGIN Accordion targeted opening upon page load
// Note: this will only work when there is a url variable passed, otherwise it skips over it
	var accordionActive = $.getUrlVar('accordionActive');
	if (accordionActive != undefined) { 
	$('.accordion .acc_element').removeClass('open');
	$('.accordion .acc_element.'+accordionActive).addClass('open');
	$('.accordion .acc_element.'+accordionActive+' div.acc_group').css('display','block');
	}
// END Accordion targeted opening upon page load


/*BEGIN Accordion targeted opening upon page load 
	**ADDS Class to the accordion div from the URL**
	url variable: "?accordionStyle=default" (default has its own arrows, but other css can be altered too)
	Note: this will only work when there is a url variable passed, otherwise it skips over it*/	
	var accordionStyle = $.getUrlVar('accordionStyle');
	if (accordionStyle != undefined) { 
	$('.accordion', page).addClass(' '+accordionStyle);
	}
// END Accordion targeted opening upon page load

/* BEGIN Accordion OLB 3.6 version
	Usage: Classes available: 
		"animated_ants" for animation
		"default" for older arrows also can add more styles under this one
		"autoclose" for making the opened element close itself
	url variables available: 
			animation=yes (turns on the animation, can change timer below in 3 places)
			accordionTarget=pointer_1 (2, 3 etc match the pointer #) (opens the proper accordion)
			sample url ending: 	"?animation=yes&accordionActive=pointer_3&autoclose=yes"
			
*/
    $('.accordion .acc_element h4', page).click(function() {

    var animation = $.getUrlVar('animation');
    var autoclose = $.getUrlVar('autoclose');
    var ScrollTarget = $(this).attr('ScrollTarget');
    //var ScrollTargetPointer1 = $(ScrollTarget=="pointer_1");
    //var ScrollTargetPointer2 = $(ScrollTarget=="pointer_2");
    //console.log("What is the ScrollTarget: "+ScrollTarget);

        // $('.option_rebook').addClass('hidden');

        if(($(this).parent('.acc_element').hasClass('open'))) 
            { //Already open
            $('div.panel').scrollTo(0, 800);
            $('#subject_section').animate({'margin-top': '10px'}, 800);
            $(this).find('.description').removeClass('hidden');
            console.log("test this thing: already open");

            if((autoclose == 'yes')||($(this).parent().parent('.accordion').hasClass('autoclose'))) 
                { //Autoclose on
                    if(($(this).parent().parent('.accordion').hasClass('animated_ants'))||(animation=='yes'))		
                    //Animation on
                    {
                    console.log('autoclose is on with animation');
                
                    $('.accordion .acc_element.open .acc_group').slideUp('800');
                    //Option 1 animation comment out
                
                    $(this).parent('.acc_element').removeClass('open');
                    //Option 2 Toggle closed comment out
                
                    return false;
                    }

                    else {  //Close this without animation
                    console.log('autoclose is on without animation');
                    $(this).parent('.acc_element').removeClass('open');  //Option 2 Toggle closed - comment to disable
                    $(this).parent('.acc_element').find('.acc_group').css('display','none');  //Sets non animated css properly 
                    return false;
                    }
                } //END accordion animated for acc_element open
            } //END acc_element open
            
        else{  //Not already open
    //		ScrollTargetPointer1 ? $('#subject_section').animate({'margin-top': '-100px'}, 400) : null;
    //		ScrollTargetPointer2 ? $('#subject_section').animate({'margin-top': '-360px'}, 400) : null;
        
            if(($(this).parent().parent('.accordion').hasClass('animated_ants'))||(animation=='yes'))
                {
                //console.log('non-open animated item was selected');
                $('.accordion .acc_element.open .acc_group').slideUp('800');  //Option 1 animation
                $(this).parent().find('div.acc_group').slideDown('800'); //Option 1 animation
                $(this).parent().parent('.accordion .acc_element').removeClass('open');
                $(this).parent('.acc_element').addClass('open');
                console.log('should animate');

                } //END animation for choosing the non open acc_element
            else
                {
                //console.log('non-open non-animated item was selected');
                $(this).parent().parent('.accordion .acc_element').removeClass('open');
                $(this).parent().parent('.accordion').find('.acc_group').css('display','none');  //Sets non-animated acc_group css to display none 
                $(this).parent('.acc_element').addClass('open');
                $(this).parent('.acc_element').find('.acc_group').css('display','block');  //Sets non animated css properly 
                $('.description').removeClass('hidden');  // Show all the topic bullets
                $(this).find('.description').addClass('hidden');  // Hide the topic bullets on for item clicked
                console.log("test this thing: not open");

            if($(this).parent().parent('.accordion').hasClass('statements_accordion'))
                {

                $('div.panel').scrollTo('.acc_element.open', 1500);
                }

            else	if(ScrollTarget=='banking') // BBA Topic - Everyday Banking
                    {
                        $('div.panel').scrollTo('#everyday_banking_accordion_pointer', 400);
                    } 
    
                else if(ScrollTarget=='investments') // BBA Topic - Investments
                    {
                        $('div.panel').scrollTo('#investments_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='home_loans') // BBA Topic - Home Loans
                    {
                        $('div.panel').scrollTo('#home_loan_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='small_business') // BBA Topic - Small Business
                    {
                        $('div.panel').scrollTo('#sbbanking_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='location_1') // BBA Location List - Tryon St.
                    {
                        $('div.panel').scrollTo('#tryon_st_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='location_2') // BBA Location List - Trade St.
                    {
                        $('div.panel').scrollTo('#trade_st_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='location_3') // BBA Location List - S Tryon St.
                    {
                        $('div.panel').scrollTo('#stryon_st_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='location_4') // BBA Location List - King St.
                    {
                        $('div.panel').scrollTo('#king_st_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='location_5') // BBA Location List - E Blvd.
                    {
                        $('div.panel').scrollTo('#e_blvd_accordion_pointer', 400);
                    } 
                else if(ScrollTarget=='location_6') // BBA Location List - Iverson Way
                    {
                        $('div.panel').scrollTo('#iverson_accordion_pointer', 400);
                    } 
                else  // BBA Only item
                    {
                        return false;
                    } 

                } //END non-animated behavior for acc_element
            
            
            }

        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 2000);

    });


    /*Multi-check function for travel only */	
    $('.accordion .acc_element ul.icon_checkbox_grey.multi_select li ', page).click(function() {
        $(this).toggleClass('checked');
        console.log('Multi check click');
    });
    /*Multi-check function for travel only */	

    /*REMOVED AND replaced by above multi-check
    $('.accordion .acc_element ul.icon_checkbox_grey li ').click(function() {
        $('ul.icon_checkbox_grey li').removeClass('checked');
        $(this).addClass('checked');
    
    });
    */


}); //End page init