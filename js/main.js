var myAPI_key="b6720a4ef50c0a1f63419e334fbf9c74";
var myshared_secret="5df5d9e40e9375f043edf1e1fb629236";

var url = window.location.href; // or window.location.href for current url
var captured = /token=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var result = captured ? captured : 'myDefaultValue';
console.log(captured);

function calculateApiSignature(){
  String.prototype.hashCode = function(){

  	    var hash = 0;

  	    if (this.length == 0) return hash;

  	    for (i = 0; i < this.length; i++) {

  	        char = this.charCodeAt(i);

  	        hash = ((hash<<5)-hash)+char;

  	        hash = hash & hash; // Convert to 32bit integer

  	    }

  	    return hash;

  	};
  var string = "api_key" + "b6720a4ef50c0a1f63419e334fbf9c74"+ "methodauth.getSessiontoken"+captured;
  var textoUtf8 = encodeURI(string);
  textoUtf8 = textoUtf8 + myshared_secret;
  console.log("String a firmar : " + textoUtf8);
  var ApiSignature = textoUtf8.hashCode();
  console.log("Api Signature" + ApiSignature);

}


function calculateApiSignatureStack()
{

  // Set elsewhere but hacked into this example:
var last_fm_data = {
    'last_token':captured,
    'user': 'bob',
    'secret': '5df5d9e40e9375f043edf1e1fb629236'
};

// Kick it off.
last_fm_call('auth.getSession', {'token': last_fm_data['last_token']});


// Low level API call, purely builds a POSTable object and calls it.
function last_fm_call(method, data){
    // param data - dictionary.
    last_fm_data[method] = false;
    // Somewhere to put the result after callback.

    // Append some static variables
    data.api_key = "b6720a4ef50c0a1f63419e334fbf9c74";
    //data['format'] = 'json';
    data['method'] = method;

    post_data = last_fm_sign(data);
/*
    token (Required) : A 32-character ASCII hexadecimal MD5 hash returned by step 1 of the authentication process (following the granting of permissions to the application by the user)
api_key (Required) : A Last.fm API key.
api_sig (Required) : A Last.fm method signature. See authentication for more information.*/
    console.log("Post data: Last token " + post_data.token + "ApiKey: "+ post_data.api_key + "ApiSig: " + post_data.api_sig);
    var last_url="http://ws.audioscrobbler.com/2.0/";
    $.ajax({
      type: "GET",
      url: last_url,
      data: post_data,
      dataType: 'json',
      success: function(res){
          last_fm_data[method] = res;
          console.log(res['key'])// Should return session key.
      },
      error : function(code, message){
          console.log("Error en autenticacion");
      }
     });
}

function last_fm_sign(params){
    ss = "";
    st = [];
    so = {};
    so['api_key'] = params['api_key'];
    so['token'] = params['token'];
    Object.keys(params).forEach(function(key){
        st.push(key); // Get list of object keys
    });
    st.sort(); // Alphabetise it
    st.forEach(function(std){
        ss = ss + std + params[std]; // build string
    });
    ss += last_fm_data['secret'];
        // console.log(ss + last_fm_data['secret']);
        // api_keyAPIKEY1323454formatjsonmethodauth.getSessiontokenTOKEN876234876SECRET348264386
    //hashed_sec = $.md5(unescape(encodeURIComponent(ss)));
    var hashed_sec = md5(unescape(encodeURIComponent(ss))); // "2063c1608d6e0baf80249c42e2be5804"
    console.log("La apiSig es: " + hashed_sec);
    so['api_sig'] = hashed_sec; // Correct when calculated elsewhere.
    return so; // Returns signed POSTable object
}
}
//Despues de coger token tengo que hacer getSession
//Idea similar:
//utf8encoded api_keyxxxxxxxxmethodauth.getSessiontokenxxxxxxx
//append secret:
//mysecret:5df5d9e40e9375f043edf1e1fb629236
//tokenkc-yjBlWeFmeojGH3Gq_xo46RlbPTNg-
//api signature = md5("api_keyxxxxxxxxmethodauth.getSessiontokenxxxxxxxmysecret")
//http://ws.audioscrobbler.com/2.0/api_keyb6720a4ef50c0a1f63419e334fbf9c74methodauth.getSessiontokenkc-yjBlWeFmeojGH3Gq_xo46RlbPTNg-
//32-character hexadecimal md5 hash.
/*
String.prototype.hashCode = function(){

	    var hash = 0;

	    if (this.length == 0) return hash;

	    for (i = 0; i < this.length; i++) {

	        char = this.charCodeAt(i);

	        hash = ((hash<<5)-hash)+char;

	        hash = hash & hash; // Convert to 32bit integer

	    }

	    return hash;

	}
some string”.hashCode(), and receive a numerical hash code
sessionStorage.setItem("mytoken",captured);
var myAPI_key="b6720a4ef50c0a1f63419e334fbf9c74";
*/
//TAke data user from https://www.last.fm/api/show/user.getInfo
//eXAMPLE URL: http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=rj&api_key=YOUR_API_KEY&format=json
//mYurl: http://ws.audioscrobbler.com/2.0/?method=user.getinfo&api_key=b6720a4ef50c0a1f63419e334fbf9c74&format=json
$.ajax({
    type : 'GET',
    url : 'http://ws.audioscrobbler.com/2.0/?',
    data : 'method=user.getinfo&' +
           'user=edufissure&'+
           'api_key=b6720a4ef50c0a1f63419e334fbf9c74&' +
           'format=json',
    dataType : 'json',
    success : function(data) {
            $('#success #artistName').html(data.user.name);
           $('#success #artistImage').html('<img src="' + data.user.image['#text'] + '" />');
           $('#success #artistBio').html(data.user.playcount);
       },
    error : function(code, message){
         $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
    }
});
/*
//http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=INSERT_API_KEY&format=json&mbid=251f6d72-a1d9-4b9d-944a-2df9b26f6212

$.ajax({
    type : 'GET',
    url : 'http://ws.audioscrobbler.com/2.0/',
    data : 'method=user.getinfo&' +
           'api_key=b6720a4ef50c0a1f63419e334fbf9c74&' +
           'format=json',
    dataType : 'json',
    success : function(data) {
            $('#success #artistName').html(data.user.name);
           $('#success #artistImage').html('<img src="' + data.user.image['#text'] + '" />');
           $('#success #artistBio').html(data.user.playcount);
       },
    error : function(code, message){
         $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
    }
});
*/
function loadUserInfoXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=edufissure&api_key=b6720a4ef50c0a1f63419e334fbf9c74", true);
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Data</th><th>Value</th><th>Altre</th></tr>";
  var x = xmlDoc.getElementsByTagName("user");
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("playcount")[0].childNodes[0].nodeValue +
    "</td><td><img src="+
    x[i].getElementsByTagName("image")[2].childNodes[0].nodeValue +
   "></img></td></tr>";
   console.log(x[i]);
  }
  document.getElementById("demo").innerHTML = table;
}
/*

chart.getTopArtists
example url: http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=YOUR_API_KEY&format=json
myurl:  http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=b6720a4ef50c0a1f63419e334fbf9c74&format=json

Params
page (Optional) : The page number to fetch. Defaults to first page.
limit (Optional) : The number of results to fetch per page. Defaults to 50.
api_key (Required) : A Last.fm API key.
*/
function loadChartTopArtistsJSONDoc()
{
  if (window.XMLHttpRequest) {
					// Mozilla, Safari, IE7+
					httpRequest = new XMLHttpRequest();
					console.log("Creat l'objecte a partir de XMLHttpRequest.");
				}
				else if (window.ActiveXObject) {
					// IE 6 i anteriors
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
					console.log("Creat l'objecte a partir de ActiveXObject.");
				}
				else {
					console.error("Error: Aquest navegador no suporta AJAX.");
				}

			//	httpRequest.onload = processarResposta;
				httpRequest.onprogress = mostrarProgres;
        var urlquery ="http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=b6720a4ef50c0a1f63419e334fbf9c74&format=json";
        httpRequest.onreadystatechange = processarCanviEstat;



        httpRequest.open('GET', urlquery, true);
				httpRequest.overrideMimeType('text/plain');
				httpRequest.send(null);

        function processarCanviEstat() {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            console.log("Exit transmissio.");
            processarResposta(httpRequest.responseText);
          }
        }
				function processarResposta(dades) {
				  var	myObj = JSON.parse(dades);
          var llista = document.createElement('ul');
          var txt,x="";
          txt += "<table border='1'>";
          txt += "<tr><th>Nom</th><th>URL</th><th>Imatge</th></tr>";
          console.log("Cantidad de artistas:" + myObj.artists.artist.length);
          for (var i=0; i< 10;i++) {
              txt += "<tr><td>" + myObj.artists.artist[i].name + "</td><td>"+ myObj.artists.artist[i].url + "</td><td><img src="+ myObj.artists.artist[i].image[2]["#text"] +"/></td></tr>";
              }
/*
          for (x in myObj) {
              txt += "<tr><td>" + myObj[x].artists.artist.name + "</td></tr>";
            }*/
          txt += "</table>";
          document.getElementById("artist").innerHTML = txt;
        }

				}

				function mostrarProgres(event) {
					  if (event.lengthComputable) {
					    var progres = 100 * event.loaded / event.total;
					    console.log("Completat: " + progres + "%");
					  } else {
					    console.log("No es pot calcular el progrés");
					  }
}
