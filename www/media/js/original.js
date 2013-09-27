
$(function() {
	// Set up style buttons.
	var OriginalStyles = ['chinese', 'burger', 'coffee'];
	var	OriginalColours = {'chinese': '#f9db34', 'burger': '#e21112', 'coffee': '#522819'};
	var OriginalAnimTime = 200;
	var OriginalCookieTimeout = 20;
	var OriginalStyleDrop = '60px'
	
	function styleCookie()  {
		var styleName = '';
		var i, key, val, cookies;
		
		cookies = document.cookie.split(";");
		
		for (i = 0; i < cookies.length; i++)  {
			key = cookies[i].substr(0,cookies[i].indexOf("="));
			val = cookies[i].substr(cookies[i].indexOf("=")+1);
			
			key = key.replace(/^\s+|\s+$/g,"");
			if (key == 'original-style')  {
				styleName = unescape(val);
				break;
			}
		}
		return styleName;
	}
	
	function setStyleCookie(styleName)  {
		var exdate = new Date();
		exdate.setMinutes(exdate.getMinutes()+OriginalCookieTimeout);
		//exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(styleName) + "; expires="+exdate.toUTCString() + "; path=/";
		document.cookie = 'original-style' + "=" + c_value;
		
	}
	
	var cookieStyle = styleCookie();
	if (cookieStyle.length == 0)  {
		var	i = Math.floor(Math.random()*OriginalStyles.length);
		cookieStyle = OriginalStyles[i];
		setStyleCookie(cookieStyle);
	}
	$('body').removeClass().addClass(cookieStyle);
	
	
	$('.style-menu .tab').hover(
		function () {
			$(this).stop().animate({'margin-top': OriginalStyleDrop, 'background-color':OriginalColours[$(this).parent().parent().attr('class')]},OriginalAnimTime);
			$(this).find('.logo').animate({'opacity': 1}, OriginalAnimTime);
		},
		function () {
			$(this).stop().animate({'margin-top':'0px','background-color':'#666666'},OriginalAnimTime);
			$(this).find('.logo').animate({'opacity': 0}, OriginalAnimTime);
		}
	 );
	 $('.style-menu a').click(
	 	function ()  {
	 		var style = $(this).parent('li').attr('class');
	 		
	 		$('body').removeClass().addClass(style);
	 		setStyleCookie(style);
	 		
	 		return false;
	 	}
	 );
});
