
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Contests';
	// @endregion// @endlock

	this.load = function (data) {// @lock

		var infoParams=data.userData.infoParams;
//		debugger;
		if (infoParams !== null) {
		$comp.sourcesVar.varLabel = "Contests in your area";
		$comp.sources.varLabel.sync();
		}
		voterFindInfo(infoParams.address, infoParams.elecID)

	// @region namespaceDeclaration// @startlock
	var contestsGrid = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	contestsGrid.onRowClick = function contestsGrid_onRowClick (event)// @startlock
	{// @endlock
		alert($comp.sources.varContests.type)
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_contestsGrid", "onRowClick", contestsGrid.onRowClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock

function voterFindInfo(vAddress, vElectionID) {
gapi.client.setApiKey(refKeys.google_api_key());
lookup(vAddress, vElectionID, renderResults);
}

function lookup(address, electionId, callback) {
/**
 * Election ID for which to fetch voter info.
 * @type {number}
 */
//electionId = 2000;

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

 
function renderResults(response, rawResponse) {
//	debugger;
//	strOutput='';
	for (var key in response) {
  		if (response.hasOwnProperty(key)) {
//  		debugger;
//   	 	strOutput = response[key];
		switch(key) {
			case 'kind':
				break;
			
			case 'status':
				break;
			
			case 'election':
				break;
			
			case 'normalizedInput':
				break;
			
			case 'pollingLocations':
				break;
				
			case 'contests':
				renderContests(response[key])
				break;
				
			case 'state':
				break;
			
			default:
				alert(key);			
		}
  	}}	
}

function renderContests(objContests) {
	//expects an array
	

//objContests.forEach({onSuccess:function(event){

//}
//})
	for (var i = 0; i < objContests.length; i++) {

		var varContest=objContests[i];
		var varKey=varContest['key'];
		var varDistrict=varContest['district'];
		var varLevel=varContest['level'];
		var varOffice=varContest['office'];
		var varSources=varContest['sources'];
		var varType=varContest['type'];
		var varRefendumTitle=varContest['referendumTitle'];
		var varReferendumSubtitle=varContest['referendumSubtitle'];
		var varReferendumUrl=varContest['referendumUrl'];
		vContest={};
		vContest.id=i + 1;
//		debugger;
		vContest.type=(i + 1).toString() + "." + varType;
		if (varType == 'Referendum') {
			vContest.name=varRefendumTitle;
		}
		else {
			vContest.name=varOffice;
		}
		sources.componentMain_varContests.addNewElement(vContest);

	}
//	debugger;
//	sources.componentMain_varContests=vContest;
	
}
