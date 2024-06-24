//BEGIN Document Ready 
// $( "body" ).on( "allSectionsLoaded", function() {

// 	$(".menu a").click(function(){

//   if ($(this).hasClass('on')) { return false; }
//   else {
// 		$(".menu a").removeClass("on");
// 		$(this).addClass("on");
// 	} 
// 	});
// }); 
// END Document Ready

/** menu highight is changed via js/functions/js setuppage() **/



$(document).on("init", function(event, data) {
    var page = event.target;
    //BEGIN Fix horizontal IE artifact on the horizontal scroller on the Menu More Page
    $("div.bankamerideals_container", page).mouseenter(function(){
        console.log('Yes you are focused');
        $(this).closest('.content_bg').css('overflow-y','hidden');
     {
    
    }
    });

    $("div.bankamerideals_container", page).mouseleave(function(){
        console.log('And now things are blurry');
        $(this).closest('.content_bg').css('overflow-y','scroll');
    });
    //END Fix horizontal IE artifact on the horizontal scroller on the Menu More Page

    $('.menu_more_dynamic_help').click(function() {
      showDynamicHelp()
     });


}); // END init page

