+++
title = "Initial commit"
author = "hds"
date = "2016-03-26"
+++

The first post on The Original Takeaway revamped.

I'm trying out the static site generator [Cactus](https://github.com/koenbok/Cactus), primarily because it's Django based (and uses Django templates). This creates a nice on-ramp for me, as I've worked with Django a bit before.

As a test of the markdown code-higlighting I've installed, here's my email signature in Perl (it's old). Bonus points if you can work out what it does.

```perl
#!/usr/bin/perl
chop($_=<>);@s=split/ /;foreach$m(@s){if($m=='*'){$z=pop@t;$x=
pop@t;$a=eval"$x$m$z";push@t,$a;}else{push@t,$m;}}print"$a\n";
```

