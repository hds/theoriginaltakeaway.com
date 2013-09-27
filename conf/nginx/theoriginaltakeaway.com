server  {
	listen		443 ssl;
	server_name	theoriginaltakeaway.com;

	access_log	/var/log/nginx/theoriginaltakeaway.com/access.log;
	error_log	/var/log/nginx/theoriginaltakeaway.com/error.log;

	ssl_certificate		/usr/local/ssl/unified.crt;
	ssl_certificate_key	/usr/local/ssl/DECRYPTED-private.key;

	location ~ /google(?:[a-f0-9]+).html  {
		root /var/www/google_verify/theoriginaltakeaway.com;
	}

	location /  {
		root /var/www/theoriginaltakeaway.com/;

#		gzip		on;
#		gzip_comp_level	7;
#		gzip_vary	on;
#		gzip_types	text/css text/javascript application/x-javascript;
#		expires		2h;
#		add_header	Cache-Control public;
#		add_header	Cache-Control no-transform;
	}

}

server  {
	listen		443 ssl;
	server_name	www.theoriginaltakeaway.com;

	rewrite ^/(.*) https://theoriginaltakeaway.com/$1 permanent;
}

server  {
	listen		80;
	server_name	theoriginaltakeaway.com www.theoriginaltakeaway.com;

	rewrite ^/(.*) https://theoriginaltakeaway.com/$1 permanent;
}

