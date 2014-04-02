
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'MyAddress';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonVerify = {};	// @button
	// @endregion// @endlock

function lookup(electionID, address, callback) {
/**
* Election ID for which to fetch voter info.
* @type {number}
*/
var electionId = electionID;
   
        /**
         * Request object for given parameters.
         * @type {gapi.client.HttpRequest}
         */
        var req = gapi.client.request({
            'path' : '/civicinfo/us_v1/voterinfo/' + electionId + '/lookup',
            'method' : 'POST', // Required. The API does not allow GET requests.
            'body' : {'address' : address}
        });
       req.execute(callback);
}

function stringFixer(objInput) {
	strOutput='';
	for (var key in objInput) {
  		if (objInput.hasOwnProperty(key)) {
   	 	strOutput+= ' ' + objInput[key];
  	}
	}
	strOutput=strOutput.trim();	
	return strOutput.replace(/\s{2,}/g,' ')
}

	// eventHandlers// @lock

	buttonVerify.click = function buttonVerify_click (event)// @startlock
	{// @endlock
		var strAddress='';	
		strAddress =($comp.sourcesVar.varAddress1 + ' ' + $comp.sourcesVar.varAddress2 + ' ' + $comp.sourcesVar.varCity + ' ' + $comp.sourcesVar.varState).replace(/\s{2,}/g,' ');
		refKeys.voterInfoAsync({
			onSuccess: function(event) {
				if (event.status == 'success') {
				$$('componentMain').loadComponent({
	    		path: "/Components/Verify.waComponent",
	    		userData: { voterInfo: event}

				})}
				else {$comp.sourcesVar.varMessage = 'It cannot be parsed';
				$comp.sources.varMessage.sync();
				}
			},
			onError: function(error) {
				$comp.sourcesVar.varMessage =event.status;
				$comp.sources.varMessage.sync();
			},
			params: [ strAddress]	
			});
//		$$('componentMain').loadComponent("/Components/Verify.waComponent");


	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonVerify", "click", buttonVerify.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
