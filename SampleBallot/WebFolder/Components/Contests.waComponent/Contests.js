
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
	var buttonBallot = {};	// @button
	var buttonVote = {};	// @button
	var buttonCandidates = {};	// @button
	var buttonContest = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonBallot.click = function buttonBallot_click (event)// @startlock
	{// @endlock
		reLabel("Ballot");
		$('#componentMain_dataGridContests').hide()
		$('#componentMain_matrixCandidates').hide()
		$('#componentMain_dataGridBallot').show()
	};// @lock

	buttonVote.click = function buttonVote_click (event)// @startlock
	{// @endlock
		sources.componentMain_varCandidates.query("Vote=true")
		//add to ballot
		

	};// @lock

	buttonCandidates.click = function buttonCandidates_click (event)// @startlock
	{// @endlock
		reLabel("Candidates and Referendums")
		sources.componentMain_varCandidates.query("id=null")
		if (sources.componentMain_varCandidates.length == 0 && sources.componentMain_varParams.contests[sources.componentMain_varContests.id].type !=='Referendum') 
		{
		d=sources.componentMain_varParams.contests[sources.componentMain_varContests.id].district;
		v=sources.componentMain_varParams.contests[sources.componentMain_varContests.id].candidates;
		o=sources.componentMain_varParams.contests[sources.componentMain_varContests.id].office;
		for (var i=0;i<v.length;i++) {
			var x={};
			x.id=i;
			x.Vote=null;
			x.Party=v[i].party;
			x.Name=v[i].name;
			x.ElectionID =sources.componentMain_varParams.election.id + ':' + sources.componentMain_varParams.election.name;
			x.Identifier=d.id + ':' + o;
			sources.componentMain_varCandidates.addNewElement(x)	

		} 
		}
		else
		{
			
		}
//		sources.componentMain_varCandidates=z;
//		sources.componentMain_varCandidates.sync();
		
		
		$('#componentMain_dataGridContests').hide()
		$('#componentMain_matrixCandidates').show()
		$('#componentMain_dataGridBallot').hide()
	};// @lock

	buttonContest.click = function buttonContest_click (event)// @startlock
	{// @endlock
		reLabel("Contests");
		$('#componentMain_dataGridContests').show()
		$('#componentMain_matrixCandidates').hide()
		$('#componentMain_dataGridBallot').hide()

	};// @lock

	// @region eventManager// @startlock
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
