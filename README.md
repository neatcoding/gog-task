<h1>GOG Task - Divinity Bundle</h1>

demo: http://neatcoding.com/gog-task/


<h2>AngularJS</h2>

Game data is stored in app/data/gamesData.json (which can be generated by Symfony, handling also sold games and calculating average prices that users paid).
Note: it would be faster for UX to just put it in HTML of the site.

I use page route just to demonstrate.

gog-price-slider directive is created to have customized slider with Draggable.

You can try to click on the slider, click on games, or write price. Label is responsive to being close to each other in simple way.

I didn't use ngAnimate, because there is no need for it in this project - but I really like it with GSAP JS. ( see http://greensock.com/ )


<h2>Grunt</h2>

Grunt combines javascript to one file with uglify.
Compiles compass to css.
It is ready to use coffeescript (compile before uglify).


<h2>Styles</h2>

I reduced some grey colors, because you shouldn't use so many colors in a project.

CSS mapping is enabled in config.rb, so you can see .scss file and line nr easily in Chrome DevTools (enable css source maps in devtools options). (see config.rb:21 if getting errors)


<h2>Cross-Browsing</h2>

Works in IE9+, IE8 doesn't work because of custom tag directives.


<h2>Deploy</h2>

npm install --save-dev
gem install sass --pre
grunt
