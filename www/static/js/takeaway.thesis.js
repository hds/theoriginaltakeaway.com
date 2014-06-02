
$(function() {
	var commits = [];
	var current = 0;
	var interval = null;
	// var url = '/data/tesi-tn-5.json';
	var last_checked = null;

	function load_commits()  {
		var url = '/data/tesi-tn.json';

		last_checked = new Date();
		$.ajax(url, {
			success: function(data, status, req)  {
				commits = data;
				init_timeline();
			},
			error: function(req, status, error)  {
				console.log("There was an error retrieving commit info.");
			}
		});
		// url = '/data/tesi-tn.json';
	}

	function check_for_update()  {
		var now = new Date();

		// Check for updates once every 10 minutes.
		if (now - last_checked > (1000 * 600))  {
			load_commits();
		}
	}

	function init_timeline()  {
		var timeline = $('.thesis .timeline');
		var commit, marker;

		timeline.empty();

		for (i = 0; i < commits.length; i++)  {
			commit = $('<div class="commit skin-border"></div>');
			commit.css('left', position(i));
			timeline.append(commit);
		}

		current = 0;

		marker = $('<span class="marker glyphicon glyphicon-chevron-down"></span>');
		marker.css('left', marker_position(current, marker));
		timeline.append(marker);

		$(window).resize(function (event)  {
			var commit_elements = $('.thesis .timeline .commit');
			for (i = 0; i < commits.length; i++)  {
				$(commit_elements.get(i)).css('left', position(i));
			}
		});

		set_frame(current);
		if (!interval)
			start_animation();
	}

	function position(i)  {
		var width = $('.thesis .timeline').width();
		return (width*i)/(commits.length-1);
	}

	function marker_position(i, marker)  {
		if (! marker)
			marker = $('.thesis .timeline .marker');
		var pos = position(i) - (marker.width()/2)-1;
		return pos;
	}

	function set_frame(i)  {
		c = commits[i];
		$('.thesis img').attr('src', '/data/'+c['filename']);
		$('.thesis .commit-date').html(c['date'] + ' (' + c['commit'] + ')');

		var marker = $('.thesis .timeline .marker');
		marker.css('left', marker_position(i, marker));
	}

	function start_animation()  {
		var update_frame = function()  {
			current = (current+1) % commits.length;

			if (current == 0)  {
				check_for_update();
			}

			set_frame(current);
		};

		interval = setInterval(update_frame, 1000);
	}

	load_commits();
});