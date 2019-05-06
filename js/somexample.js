/*Some code to get artists data from an array of artists*/

for (var v = 0; v < artists.length; v++)  {
       $.ajax({
           type: 'POST',
           url: 'http://ws.audioscrobbler.com/2.0/',
           data: 'method=artist.getsimilar&' +
               'artist=' + artists[v] + '&' +
               'api_key=xxxxxxxxxxxxx' +
               'format=json',
           dataType: 'jsonp',
           success: function (data) {

               var Json = data
               var current = Json.similarartists["@attr"]['artist']
               textlist = ""

               messageRef.doc(String(current)).set({name: (String(current))})
               for (var i = 0; i < 10; i++) {   // 10 candidate artists per current artist
                   textlist += '<img src="' + Json.similarartists.artist[i].image[2]['#text'] + '" /> ' + " " + (Json.similarartists.artist[i].name) + " <br>";
                       messageRef.doc(String(current)).collection('candidates').doc(String(Json.similarartists.artist[i].name)).set({
                       name: (Json.similarartists.artist[i].name),      // gets and store the name
                       match: (Json.similarartists.artist[i].match)         // gets and store  match value

                   })

                       .then(function (docRef) {
                           //console.log("Document written with ID: ", docRef.id);
                       })
                       .catch(function (error) {
                           console.error("Error adding document: ", error);
                       });

               }
               $('#success #artists').html(textlist);

           },

           error: function (code, message) {
               // Handle error here
           }
       });
   }
  // });

//EXAMPLES FROM GET IMAGES FROM FANART.TV ( POSSIBLY NOT ALL ARTISTS THE MOST FAMOUS)
  //Code to get images from fanart https://codepen.io/lawrencenull/pen/NVWWwR
  //Please don't use my API keys necsitamos apikey de fanart: It's a fanart.tv one. https://fanart.tv/get-an-api-key/
  //They use musicbrainz id as the artist ids for lookup.

function lFMartist(artist_name){
  function fanArtTV(musicBrainzID){
    // Replace this with the img id or class
    var artistProfile = document.querySelector('.artistImage');

        // Create a request variable and assign a new XMLHttpRequest object to it, pulling in the Musicbrainz ID.
        var request = new XMLHttpRequest();

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'https://webservice.fanart.tv/v3/music/'+musicBrainzID+'&?api_key=06f56465de874e4c75a2e9f0cc284fa3&format=json', true);

        request.onload = function () {
            var fanartData = JSON.parse(this.response);

                               artistProfile.setAttribute('src',fanartData.artistthumb[0].url);
        }

        // Send request
        request.send();
    }
        // Create a request variable and assign a new XMLHttpRequest object to it for lastFM.
        var request = new XMLHttpRequest();

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artist_name+'&api_key=985dbd5db901948856e11fab8e0ff76b&limit=1&format=json', true);

        request.onload = function () {
            var data = JSON.parse(this.response);

                 if(data.artist.mbid !== "")
                {
                  fanArtTV(data.artist.mbid);
                }


            }


        // Send request
        request.send();
    }
//the simplified function to get an artist profile picture
lFMartist("ariana grande");

/*En el html va <img class="artistImage"/> y en css body{
  background:#222;
}

img.artistImage{
 width:300px;
 height:300px;
}
*/

/*Second option using bing https://jsfiddle.net/1vajnbgt/*/
function bingProfileImage(bing_Image){

  document.querySelector('.image_src_to_change').setAttribute('src','https://tse2.mm.bing.net/th?q='+bing_Image+' artist+spotify.com&w=300&h=300&c=7&rs=1&p=0&dpr=3&pid=1.7&mkt=en-IN&adlt=on');

   }


bingProfileImage("taylor momsen");

//Como antes <img class="image_src_to_change"/> en el html, y nada css, aunque si quieres puedes tocarlo como antes...
