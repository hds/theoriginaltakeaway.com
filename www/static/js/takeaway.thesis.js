
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
				set_frame(0);
				start_animation();
			},
			error: function(req, status, error)  {
				console.log("There was an error retrieving commit info.");
			}
		});


	}

	function set_frame(i)  {
		c = commits[i];
		$('.thesis img').attr('src', '/data/'+c['filename']);
		$('.thesis .commit-date').html(c['date']);

		var width = $('.thesis .timeline').width();
		var left = (width*current)/commits.length - 3;
		console.log(left);
		$('.thesis .timeline .marker').css('left', left);
	}

	function start_animation()  {
		var update_frame = function()  {
			current = (current+1) % commits.length;

			set_frame(current);
		};

		setInterval(update_frame, 1000);
	}

	load_commits();
});