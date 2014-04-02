/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'refKeys' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(refKeys.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/
var googleApiKey='AIzaSyAtsDPcU5s5ieIubAN86mzOZq1y8Px9YRY'

exports.google_api_key = function google_api_key () {
	return (googleApiKey);
	
};

exports.doStuff=function doStuff() {
	return (googleApiKey);
	}
	
exports.voterInfo = function voterInfo(varAddress) {

	var xhr = new XMLHttpRequest(); 	
	var url = 'https://www.googleapis.com/civicinfo/us_v1/voterinfo/4000/lookup?key=' + googleApiKey;
	xhr.open('POST', url, false); // to connect to a Web site synchronously
	var data = { address: varAddress };
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify(data)); // send the request
	if (xhr.status == 200)
		return (JSON.parse(xhr.responseText));
	else
		return (xhr.responseText);	
}

exports.getZip9 = function(addr1, addr2, city, state, zip, debug) {
	if (debug) debugger;

	var fullAddress={}
	var address1='';
	var address2='';
	var addstate='';
	var addcity='';
	var zip4='';
	var zip5='';
	var zip9='';
	var str='';
	
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = function() {
		var state = this.readyState;
		if (state !== 4) { // while the status event is not Done we continue
			return;
		}
		
        v = this.responseText;
	}
	
	var getString='http://production.shippingapis.com/ShippingAPI.dll?API=ZipCodeLookup&XML='
	str+='<ZipCodeLookupRequest USERID="732ALLIA0659"><Address>'
	str+='<Address1>' + addr1 + '</Address1>';
	str+='<Address2>' + addr2 + '</Address2>';
	str+='<City>' + city + '</City>';
	str+='<State>' + state + '</State>';
	str+='</Address></ZipCodeLookupRequest>'
	
	getString+=encodeURIComponent(str)

	try {
		xhr.open('GET', getString, false); // to connect to a Web site synchronously
		xhr.send(); // send the request
	} catch (e) {
		return ( { success: false, id: 'uspsNotFound', message: 'Address could not be verified.' } );
	}
	v=xhr.responseText;

	if (!v.indexOf("Address Not Found") == -1) {
		return {success: false, id:'nullstate', message: 'Address could not be verified.'}
	}
	jsonText=XmlToJSON(v, "json-bag", 'ZipCodeLookupResponse');
	j=JSON.parse(jsonText);

	k=j.Address[0];
	for (var key in k) {
		if (k.hasOwnProperty(key)) {
			switch(key) {
				case "Address1":
					address1= k.Address1[0].__CDATA || ''
					break;	
				case "Address2":
					address2= k.Address2[0].__CDATA || ''
					break;
				case "City":
					addcity= k.City[0].__CDATA || ''
					break;
				case "State":
					addstate= k.State[0].__CDATA || ''
					break;
				case "Zip5":
					zip5= k.Zip5[0].__CDATA || ''
					break;				
				case "Zip4":
					zip4= k.Zip4[0].__CDATA || ''
					break;				
				default:
					return {success: false, id:'nullstate', message: 'USPS error'}  				
			}	
		}
	}
	zip9=zip5+ '-' + zip4;

	fullAddress.address1=address1;
	fullAddress.address2=address2;
	fullAddress.addcity=addcity;
	fullAddress.addstate=addstate;
	fullAddress.zip5=zip5;
	fullAddress.zip4=zip4;
	fullAddress.zip9=zip9;	
	fullAddress.full=(address1 + ' ' + address2 + ' ' + addcity + ' ' + addstate + ' ' + zip9).replace(/\s{2,}/g,' ');

	return {success: true, address:fullAddress};
}