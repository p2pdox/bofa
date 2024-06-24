viewModel.pay_or_transfer = ko.observable("Pay");


$(document).ready(function() {
    $('.paytrans_modal_bulletlist a').on( "click", function(event){
        var $sibs = $(this).closest('.modal_wrapper').find('a.paytrans_modal_bullet');
        $sibs.removeClass('on');
        $(this).addClass('on');
        enable_pay_transfer_details_btn(); //check to see if we can enable the "Next" button
    });
});