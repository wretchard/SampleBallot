
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Verify';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	var voterInfo=data.userData.voterInfo;
	var election=voterInfo.election;
	//check to see if new data is up
	if (election.id=="4000") {
	election.id = "2000",
 	election.name ="VIP Test Election",
    election.electionDay = "2013-06-06"
	}
    
	var kind = voterInfo.kind;
	var normalizedInput=voterInfo.normalizedInput;
	var success = voterInfo.status;
	var str=''
	str=stringFixer(normalizedInput)
	$comp.sourcesVar.varNorm = str.toUpperCase()
	$comp.sources.varNorm.sync();
	$comp.sourcesVar.varMessage="Address Verified As";
	$comp.sources.varMessage.sync();
	$comp.sources.varElection.addNewElement(election)

//	for( var i in election ) 
//	{ if (election.hasOwnProperty(i))
//		{$comp.sourcesVar.varElection.addNewElement(election[i]); } 
//	}
//	$comp.sources.varElection.sync();

	// @region namespaceDeclaration// @startlock
	var buttonVerify = {};	// @button
	// @endregion// @endlock



	// eventHandlers// @lock

	buttonVerify.click = function buttonVerify_click (event)// @startlock
	{// @endlock
		
		var findInfoParams={}
		findInfoParams.address=$comp.sourcesVar.varNorm
		findInfoParams.elecID=$comp.sources.varElection.id
				$$('componentMain').loadComponent({
	    		path: "/Components/Contests.waComponent",
	    		userData: { infoParams: findInfoParams}
				});		



	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonVerify", "click", buttonVerify.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock


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





