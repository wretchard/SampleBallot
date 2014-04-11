//function test_google() {
//	var xhr = new XMLHttpRequest(); 	
//	var url = 'https://www.googleapis.com/civicinfo/us_v1/elections?key=' + require('google.civic.api_key').get_google_civic_api_key();
//	xhr.open('GET', url, false); // to connect to a Web site synchronously
//	xhr.send(''); // send the request
//	return (JSON.parse(xhr.responseText));
	
//	var xhr = new XMLHttpRequest(); 	
//	var url = 'https://www.googleapis.com/civicinfo/us_v1/voterinfo/4000/lookup?key=' + require('refKeys').google_api_key();
//	xhr.open('POST', url, false); // to connect to a Web site synchronously
////	var data = { address: '1182 Hornbeam Rd, Sabina, OH 45169' };
//	var data = { address: '3 Pequosette Rd, Belmont, MA 02478' };
//	xhr.setRequestHeader('Content-Type','application/json');
//	xhr.send(JSON.stringify(data)); // send the request
//	if (xhr.status == 200)
//		return (JSON.parse(xhr.responseText));
//	else
//		return (xhr.responseText);	
//}

//require('refKeys').google_api_key()
varAddress="675 N Wisconsin St Pomona CA"
var e = require('refKeys').voterInfo(varAddress)
//e;
//function stringFixer(objInput) {
//	strOutput='';
//	for (var key in objInput) {
//  		if (objInput.hasOwnProperty(key)) {
//   	 	strOutput+= ' ' + objInput[key];
//  	}
//	}
//	strOutput=strOutput.trim();	
//	return strOutput.replace(/\s{2,}/g,' ')
//}

//  var x ={"line1": "1263 Pacific Ave",
//  "city": "Kansas City",
//  "state": "KS",
//  "zip": "66102"}
  
//stringFixer(x);

