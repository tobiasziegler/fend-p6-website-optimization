# Website Optimization Project

This repository takes the [mobile portfolio website](https://github.com/udacity/frontend-nanodegree-mobile-portfolio)
supplied by Udacity as its starting point and optimises the site with two aims:

1. Optimize PageSpeed Insights score for index.html to achieve a score of at
least 90 for mobile and desktop.

1. Optimize Frames per Second in pizza.html to render with a consistent 60fps
frame-rate.

I've optimized this site as part of the [Front-End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).

## Running the Application

You have two options for viewing and testing the site:

1. You can [visit the deployed site on GitHub Pages.](https://tobiasziegler.github.io/fend-p6-website-optimization/)

1. For testing and development on a local server:

	1. Clone or download the `master` branch.

	1. Run `npm install` to install dev dependencies.

	1. Use `gulp serve` to open the site in your browser. Note that you'll be
	shown an `ngrok` URL in the terminal that can be used for access from other
	devices or for testing with PageSpeed Insights.

	1. After changing any of the source files, run `gulp build` to update the
	site.

## Baseline Performance Testing

Initial PageSpeed Insights scores - tested on GitHub Pages:

![Mobile PageSpeed: Poor 27/100](img/psi-mobile-gh-pages.png)
![Desktop PageSpeed: Poor 29/100](img/psi-desktop-gh-pages.png)

Initial PageSpeed Insights scores - tested on local Browsersync server (URL via ngrok):

![Mobile PageSpeed: Needs Work 73/100](img/psi-mobile-ngrok.png)
![Desktop PageSpeed: Good 88/100](img/psi-desktop-ngrok.png)

## Optimizations Made

### Part 1: Optimize PageSpeed Insights score for index.html

- Automatically optimize images using `gulp-imagemin`.
- Add media type to the print stylesheet link to prevent render blocking.
- Load the Google Analytics script asynchronously.
- Use Web Font Loader for loading Google Fonts to prevent render blocking.
- Inline the main stylesheet using `gulp-inline-source`.
- Minify the HTML files using `gulp-htmlmin`.
- Minify the JavaScript files using `gulp-uglify`.
- Minify the CSS files using `gulp-cssnano`.
- Replace the large pizzeria image on the homepage with a resized version.
- Replace Cameron's profile picture with PageSpeed Insights' optimized version.

### Part 2: Optimize Frames per Second in pizza.html

- Fix the forced synchronous layout problem when the pizza size is switched.
The existing code iterated through each DOM element that has the class
randomPizzaContainer, first checking its current size then calculating a new
size and setting the corresponding style. The revised code calculates the size
that all pizzas will need to be first and then sets all of their sizes
afterward. This fix brings the time taken to resize the pizzas down from around
100ms to around 3ms.

- Fix a forced synchronous layout issue with the movement of the background
pizzas during scrolling. The original code iterates through each background
item, calculates a new position based on a sine-curve algorithm that checks
the current vertical position of the scroll bar, and then sets the style for
the item to its new horizontal position. The revised code first performs the
calculations for all items and then updates styles for the whole batch of items.
This fix brings the average scripting time to generate 10 frames, as measured
with the User Timing API, down from around 20ms to around 1ms.

- Refactor `updatePositions()` so that scroll position is checked by a single
call and stored instead of queried in a loop for every item, and that the
sine-curve calculations are only performed as many times as needed to obtain
the necessary values (five times) instead of once per element.

- Call `updatePositions()` via `requestAnimationFrame` to optimize the timing
of when the animation code executes.

- Use `transform` for animation rather than updating the `left` style. As
[CSS Triggers](https://csstriggers.com/) indicates, `transform` doesn't trigger
layout or painting, which should allow the animation to be carried out by the
compositor thread assisted by the GPU.

- Reduce the number of background pizzas from 200 to 32. This gives four rows of
8 pizzas, which is adequate for large screen sizes.
