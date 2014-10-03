Creator: Jan Nowotny

<h1>GOG Task - Divinity Bundle v0.98</h1>

demo: http://neatcoding.com/gog-task/


<h2>Angular</h2>

Game data is stored in app/data/gamesData.json (which can be generated by Symfony, handling also sold games and calculating average prices that users paid).
Note: it would be faster for user to just put it in HTML of the site.

I use page route just to demonstrate.

gogPriceSlider directive is created to have customized slider.

You can try to click on the slider, click on games, or write price.


<h2>Grunt</h2>

Grunt combines javascript to one file with uglify.
Compiles compass to css.
It is ready to use coffeescript (compile before uglify).


<h2>Styles</h2>

I reduced grey colors, because you shouldn't use so many colors in a project. :)

CSS mapping is enabled in config.rb, so You can see see .scss file and line easily in chrome (enable css source maps in devtools options). (see config.rb:21 if getting errors)


<h2>Cross-Browsing</h2>

Works in IE9+, IE8 doesn't work because of custom tag directives.
