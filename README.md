Creator: Jan Nowotny

<h1>GOG Task - Divinity Bundle v0.92</h1>

demo: http://neatcoding.com/gog-task/

Counter is counting in the footer, there are some text and styles missing.


<h2>Angular</h2>

Game data is stored in app/data/gamesData.json (which can be generated by Symfony).
Note: it would be faster for user to just put it in HTML of the site.

I use page route just to demonstrate.

gogPriceSlider directive is created to have customized slider coming from my hands.

You can try to click on the slider, click on games, or write price.


<h2>Grunt</h2>

Grunt combines javascript to one file with uglify.
It is ready to use coffeescript (compile before uglify).


<h2>Styles</h2>

I reduced grey colors, because you shouldn't use so many colors in a project. :)

CSS mapping is enabled in config.rb, so You can see see .scss file and line easily in chrome (enable css source maps in devtools options).


<h2>Cross-Browsing</h2>

Works in IE9+, IE8 doesn't work probably because of custom tag directive.
