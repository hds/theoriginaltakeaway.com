
$(function() {
	var commits = [];
	var current = 0;

	function load_commits()  {
		var url = '/data/tesi-tn.json';

		$.ajax(url, {
			success: function(data, status, req)  {
				commits = data;

				console.log(status);
				console.log(commits[0]);
			},
			error: function(req, status, error)  {
				console.log("There was an error retrieving commit info.");
			}
		})
	}

	function start_animation()  {
		
	}

	load_commits();
});