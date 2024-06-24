	/* My Balance functionality */
myBalanceReset = function(){
		$('.my_balance_open_link').addClass('red');
		$('.my_balance_open_link').find('div').addClass('icon_arrow_red').removeClass('icon_arrow_grey').removeClass('direction_down').addClass('direction_up');
		$('a.my_balance_open_link').removeClass('my_balance_open').removeClass('my_balance_demo');
		$("#my_balance_container_top").addClass('border_solid_bottom_grey');
		$(".my_balance_open_link").addClass('red');
		$("#my_balance_containers").animate({'margin-top': '0px'}, 500);
		$('#my_balance_enrolled_view').hide();
		$("#my_balance_containers").hide();
		$("#my_balance_unenrolled_view").hide();
}

// #FP click bindings are not in a page init handler because 
// this js script is included inside the #FP onsen page, which means
// the init message fires BEFORE this script is fully loaded, so a #FP init listener here
// would never trigger. Instead, this script initializes at the time the #FP page is loaded into the onsnavigator.
	$('a.my_balance_open_link', "#FP").click(function() {
		console.log('My Balance has been asked to be opened');
		$(this).toggleClass('my_balance_open');

		if (!$(this).hasClass('my_balance_demo')) {  //Check to see if Enroll link is active
			console.log('Enrollment was not clicked');

			$("#my_balance_unenrolled_view").hide()  //Makes sure enroll flow is hidden
			
			if ($(this).hasClass('my_balance_open')) {		
			
				//$("#my_balance_container_top").addClass('border_solid_bottom_grey');  //Check
 				$("#my_balance_containers").show();
                var offsetY = (window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop));
                var slide_to = 0-(Number($('#my_balance_containers').offset().top) - Number($('#mhpMain').offset().top) + Number(offsetY) +8);
 				$("#my_balance_containers").animate({'margin-top': slide_to+'px'}, 500); //Check
				$("#my_balance_enrolled_view").show();
				$(this).find('.icon_arrow_red').removeClass('direction_up').addClass('direction_down'); //Check
			
			}

			else{
				$("#my_balance_container_top").removeClass('border_solid_bottom_grey');  //Check
				$("#my_balance_containers").animate({'margin-top': '0px'}, 500); //Check
				$(this).find('.icon_arrow_red').removeClass('direction_down').addClass('direction_up'); //Check
                setTimeout(function() {
                    $('#my_balance_enrolled_view').hide();
                    $("#my_balance_containers").hide();
                },600); //<--time in milliseconds
                    }

                }
                else { 
                    if ($(this).hasClass('my_balance_open')) { //Open the Enroll Container and mop up everything		 

                        console.log('Enrollment was clicked');
                        $("#my_balance_containers").show().animate({'margin-top': '-555px'}, 500); //Check
                        $("#my_balance_unenrolled_view").show();
                        $('#my_balance_container_top').find('.icon_arrow_grey').removeClass('direction_up').addClass('direction_down');
                    }

                    else{  //Close the Enroll Container and mop up everything
                        $("#my_balance_container_top").removeClass('border_solid_bottom_grey');  //Check
                        $("#my_balance_containers").show().animate({'margin-top': '0px'}, 500); //Check
                        $(this).find('.icon_arrow_grey').removeClass('direction_down').addClass('direction_up'); //Check
                setTimeout(function() {
                    $('#my_balance_unenrolled_view').hide();
                    $("#my_balance_containers").hide();
                },600); //<--time in milliseconds
			}

		}
	
	});

	$("a.my_balance_close_link", "#FP").click(function() {
		console.log("The My Balance has been asked to be closed");

		$('a.my_balance_open_link').removeClass('my_balance_open');
		$("#my_balance_container_top").removeClass('border_solid_bottom_grey');  //Check
		
		if ($('.my_balance_open_link').hasClass('my_balance_demo')) {
			console.log("Did it work?");
			$('a.my_balance_open_link').find('.icon_arrow_grey').removeClass('direction_down').addClass('direction_up');
			}

			else{
			$('a.my_balance_open_link').find('.icon_arrow_red').removeClass('direction_down').addClass('direction_up');
			}

			$("#my_balance_containers").animate({'margin-top': '0px'}, 500); //Check
			setTimeout(function() {
				$('#my_balance_enrolled_view').hide();
				$("#my_balance_containers").hide();
				$("#my_balance_unenrolled_view").hide();
			},600); //<--time in milliseconds

	});
	


$(".demo_flows_list li").click(function() {
	console.log("The unenrolled flow has been clicked");
	var flowChosen = $(this).attr('flow');

	console.log('The flow is '+flowChosen);

	if (flowChosen == 'my_balance_demo') {

		$("a.my_balance_open_link").addClass('my_balance_demo');

    	} else {
		$("a.my_balance_open_link").removeClass('my_balance_demo');
    }	
	//$('#my_balance_container_top').find('.icon_arrow_red').removeClass('icon_arrow_red').addClass('icon_arrow_grey').removeClass('direction_down').addClass('direction_up');
	});
	
//});