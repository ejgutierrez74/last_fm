
		var myapplication_name="EduLastFM";
		var myAPI_key="b6720a4ef50c0a1f63419e334fbf9c74";
		var myshared_secret="5df5d9e40e9375f043edf1e1fb629236";

function myLoginFunction(){
			/*
			params api_key ( my api key)
			cb the web that goes when user is authenticated relative path ( depends on the server is launched): http://localhost:3000/mainpage.ht*/
			var url= 'http://www.last.fm/api/auth/?api_key=b6720a4ef50c0a1f63419e334fbf9c74&cb=http://localhost:3000/mainpage.html';

			window.location.replace(url);
}
