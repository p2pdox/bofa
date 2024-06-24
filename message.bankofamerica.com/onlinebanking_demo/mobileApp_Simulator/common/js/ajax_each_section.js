
// instead of loading all sections immediately via php, 
// keep sections signin and accounts in the main index.php so that the user sees them immediately
// then ajax in the rest of the app while the user is still on the splash and login screens.
// Use loadSection() to load each section's index.php file and append it to the body element.
var loadSectionCount = 0;
var sectionsLoaded = 0;
loadSection = function(section){
    loadSectionCount++;
    $.ajax({
        url: section, // path to the section
        async: true,   // asynchronous request? (synchronous requests are discouraged...)
        cache: false,   // with this, you can force the browser to not make cache of the retrieved data
        dataType: "html",  // jQuery will infer this, but you can set explicitly
        success: function( data, textStatus, jqXHR ) {
            $("body").append(data);
            // console.log( "successfully loaded section " + section );
            doneLoadingSectionsCheck();
        },
        fail: function( data, textStatus, jqXHR ) {
            console.log( "********** failed to load section " + section + "************");
            doneLoadingSectionsCheck();
        }
    });
    // console.log("loadSectionCount : sectionsLoaded " +loadSectionCount + " : " + sectionsLoaded );
};

function doneLoadingSectionsCheck(){
     // not 100% sure this will work. We're assuming loadSectionCount gets incremented faster than sectionsLoaded
     // ie: that the series of loadSection() functions are called faster than the ajax returns a result for each one.
    sectionsLoaded++;
    if (sectionsLoaded >= loadSectionCount){
        setTimeout(function() {
            $( "body" ).trigger( "allSectionsLoaded" ); // trigger the listeners where you do your onload DOM manipulations
		}, 1000); 

    }
};

$( "body" ).on( "allSectionsLoaded", function() {
  // do stuff you would normally put in a document.ready listener
  // such as targeting a DOM element in an AJAX-loaded section
});

// Now ajax in a the sections
$(function(){
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_accounts/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_billpay/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_open_account/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_transfers/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_deposit_checks/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_paperless_settings/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_statements_documents/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_spending_and_budgeting/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_bankamerideals/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_card_settings/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_profile/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_alerts/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_fico/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_order_checks/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_card_rewards/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_help_and_support/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_change_pin/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/modules/signin/my_balance_terms.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/modules/atm_withdrawal/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_contact_us/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_contact_us/section_secure_inbox/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/modules/signin/passcode_simpflication.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/modules/signin/sign_in_mid.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/modules/signin/sign_in_mid2.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_piechart/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/modules/menu/menu_more.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_our_products/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_giving/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_my_rewards/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/modules/dynamic_templates.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_erica/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_mobile_orders/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_life_plan/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_security_center/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_me_trade/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_balance_connect/index.php");
    loadSection("/onlinebanking_demo/mobileApp_Simulator/section_wires/index.php");
    // loadSection("/onlinebanking_demo/mobileApp_Simulator/section_test/index.php");

});


