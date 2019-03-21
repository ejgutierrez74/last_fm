var url = window.location.href; // or window.location.href for current url
var captured = /token=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var result = captured ? captured : 'myDefaultValue';
console.log(captured);
sessionStorage.setItem("mytoken",captured);
var myAPI_key="b6720a4ef50c0a1f63419e334fbf9c74";

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
					    console.log("Completat: " + progres + "%")
					  } else {
					    console.log("No es pot calcular el progrés");
					  }
}
