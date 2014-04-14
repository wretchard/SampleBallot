
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Contests';
	// @endregion// @endlock

	this.load = function (data) {// @lock
//		debugger;
		var infoParams=data.userData.infoParams;

		if (infoParams !== null) {
		$comp.sourcesVar.varLabel = "Contests in your area";
		$comp.sources.varLabel.sync();
		}
		voterFindInfo(infoParams.address, infoParams.elecID)



	// @region namespaceDeclaration// @startlock
	var dataGridCandidates = {};	// @dataGrid
	var buttonBallot = {};	// @button
	var buttonVote = {};	// @button
	var buttonCandidates = {};	// @button
	var buttonContest = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGridCandidates.onRowClick = function dataGridCandidates_onRowClick (event)// @startlock
	{// @endlock
//		sources.componentMain_varCandidates.Vote= !sources.componentMain_varCandidates.Vote;
//		sources.componentMain_varCandidates.sync();
	};// @lock

	buttonBallot.click = function buttonBallot_click (event)// @startlock
	{// @endlock
		reLabel("Ballot");
		$('#componentMain_dataGridContests').hide()
		$('#componentMain_dataGridCandidates').hide()
		$('#componentMain_dataGridVote').hide()
		$('#componentMain_dataGridBallot').show()
	};// @lock

	buttonVote.click = function buttonVote_click (event)// @startlock
	{// @endlock
		reLabel("Vote");
		$('#componentMain_dataGridContests').hide()
		$('#componentMain_dataGridCandidates').hide()
		$('#componentMain_dataGridVote').show()
		$('#componentMain_dataGridBallot').hide()
	};// @lock

	buttonCandidates.click = function buttonCandidates_click (event)// @startlock
	{// @endlock
		reLabel("Candidates and Referendums")
		if (sources.componentMain_varParams.contests[sources.componentMain_varContests.id].type !=='Referendum') {
		v=sources.componentMain_varParams.contests[sources.componentMain_varContests.id].candidates;
		for (var i=0;i<v.length;i++) {
			var x={};
			x.Vote=null;
			x.Party=v[i].party;
			x.Name=v[i].name;
			sources.componentMain_varCandidates.addNewElement(x)	

		} }
		else
		{
			
		}
//		sources.componentMain_varCandidates=z;
//		sources.componentMain_varCandidates.sync();
		
		
		$('#componentMain_dataGridContests').hide()
		$('#componentMain_dataGridCandidates').show()
		$('#componentMain_dataGridVote').hide()
		$('#componentMain_dataGridBallot').hide()
	};// @lock

	buttonContest.click = function buttonContest_click (event)// @startlock
	{// @endlock
		reLabel("Contests");
		$('#componentMain_dataGridContests').show()
		$('#componentMain_dataGridCandidates').hide()
		$('#componentMain_dataGridVote').hide()
		$('#componentMain_dataGridBallot').hide()

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGridCandidates", "onRowClick", dataGridCandidates.onRowClick, "WAF");
	WAF.addListener(this.id + "_buttonBallot", "click", buttonBallot.click, "WAF");
	WAF.addListener(this.id + "_buttonVote", "click", buttonVote.click, "WAF");
	WAF.addListener(this.id + "_buttonCandidates", "click", buttonCandidates.click, "WAF");
	WAF.addListener(this.id + "_buttonContest", "click", buttonContest.click, "WAF");
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

	//storing for later use
	sources.componentMain_varParams = response;
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
//				alert(key);			
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
		vContest.id=i;

		vContest.type=(i).toString() + "." + varType;
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

function reLabel(vValue) {
	$$('componentMain_richTextLabel').setValue(vValue)
}
