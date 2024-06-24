// <!--BEGIN Tealium Loader-->
//Define the utag_data object that the Tealium library will use to populate its data layer.
var utag_data = {
}

//Default environment is defined as notprod.
var bactm_envSelector = "notprod";

//BAC.COM SPECIFIC: Determine environment (prod or not)
function bactm_setTMLib() {
	var testString = window.location.href;
	if (testString.indexOf('uxsandbox.bankofamerica.com') > -1) {
		bactm_envSelector = "notprod";
		}
	   		else {
	   			bactm_envSelector = "prod";
	   		}
		}
bactm_setTMLib();

//Instrument the Tealium base library utilizing the environment defined above.
(function(a,b,c,d){
	a='//tags.tiqcdn.com/utag/bofa/mcoe/' + bactm_envSelector + '/utag.js';
	b=document;
	c='script';
	d=b.createElement(c);
	d.src=a;
	d.type='text/java'+c;
	d.async=true;
	a=b.getElementsByTagName(c)[0];
	a.parentNode.insertBefore(d,a);
})();
// <!--END Tealium Loader-->


// <!--BEGIN DDO-->
var digitalData = new Object();
digitalData = {
	pageInstanceID: "notprod",
	load_coremetrics: true,
	load_opinionlabs: true,
	load_touchcommerce: false,
	page: {
		pageInfo:[
		{
			pageID: "OSP:Mkt:Mobile;mobile-app-demo-desktop", //OSP:Mkt:Mobile;mobile-app-demo-mobile 
			destinationURL: null,
			referringURL: null,
			issueDate: null,
			language: null,
			segmentValue: null,
			appName: null,
			appStepNumber: null,
			appStepName: null,
			attr: "-_--_--_--_--_--_--_--_--_--_--_--_--_--_-"
		}],
		category: {
			primaryCategory: "OSP:Mkt:Mobile;simulator",
			addlCategory: null,
			pageType: null
		},
		attributes: {
			searchString: null,
			searchResults: null,
			olbSessionID: null,
			subCampaignCode: null,
			DARTUrl: null,
			stateCookie: null,
			needOLBcookie: false,
			standardDART:[],
            standardDARTes:[],
			clickDART: [],
            clickDARTes: [],
            gaId: [],
			chat : {
				account_type: null,
				boa_associate: null,
				boa_retiree: null,
				customer_lob: null,
				customer_segment: null,
				data: null,
				email_campaign: null,
				entitlement_code: null,
				error_category: null,
				error_count: null,
				first_login: null,
				inqSalesProductTypes: {},
				invitation_background: null,
				invitation_template: null,
				referral_campaign: null,
				getStateValue: false,
				cust_fn: null,
				cust_ln: null,
				target: null
			}
		}
	},
	user: {
		segment: null,
		online_id: null,
		preferred_rewards_tier: null,
		olb3rdpartyid: null
	},
	version: "BAC_0.11"
}
// <!--END DDO-->
