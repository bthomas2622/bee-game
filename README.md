Ben Thomas Bee Game 
===============================

Colony Collapse Disorder (CCD)

# **About**

Colony Collapse Disorder (CCD) is a procedurally generated adventure game where you play as an Oakland bee scouring a flower field. The goal is to accumulate royal jelly that nourishes additional Queen Bees. In order to accomplish this you must maintain honey reserves to replentish energy and navigate randomized encounters with contributors to "Colony Collapse Disorder". 

## How to Play 

CCD is composed of 3 central elements. 1. The **map** represents a flower field witch each hexagon representing a patch of grass or a particular flower. Navigate the flower field by selecting the hexagon you would like to fly to. 2. The **attributes** represent the statistics of your bee and the goals they are striving for. Attributes like energy are expended traversing the map. Attributes liked "Queens Produced" are a measure of how well you are doing. 3. The **Game Dialogue** prompts you to take action when random events occur and explain to you the reprocussions of those actions. 

A more detailed explanation of how to play CCD can be found by pressing the "How to Play" button in-game. 

## How to "Run"

To run this project simply open the "welcomeScreen.html" file in a browser of your choice.

## How it was programmed

###### Tools
CCD was programmed through JavaScript, HTML, and CSS. The "Bootstrap" front-end web dev framework was utilized for layout, modal, button, and design features. The "Knockout" JS framework was used for declarative bindings, automatic UI refresh, and dependency tracking. The "JQuery" JS framework was used extensively for event driven task and HTML manipulation. The Weather API from OpenWeatherMap is queried to get up to date weather information from Oakland, California. 

###### Design
I wanted to make a game about bees and Colony Collapse Disorder. I chose hexagons to make up my playing field as they look like honeycombs! It took a lot of research on how to make a hexagonal grid using CSS but I finally go it working. I use a loop to randomly generate the field and coloring of hexagons so that there is a dynamic feel to the game. Each time you return to the hive it's not clear what you will be up to next. I wanted random events with random outcomes to keep the game exciting and fresh. Randomness is a huge theme in games right now and smaller outfits like to use it as a way to add depth to a game without expending large amounts of resources. I tried to use a simple color pallette with tasteful fonts to give the game an appealing look. The pink-purple appearance of the royal jelly yielding flowers should accentuate their importance and rarity. 

#### Directory Structure

The index.html fild contains the main application. The css folder holds the stylesheets. The art folder holds the images. The javascript (js) folder holds the essential javascript. This includes the "app.js" file which is the game logic, the "weather.js" file which fetches the current weather info from API, and the necessary bootstrap, jquery, and knockout resources. The "dist" folder holds optimized files. 

#### Contributing

Anyone is welcome to re-use the code used in this project.

#### References

* [Udacity Front End Web Dev Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001)
* [JQueury Documentation](https://api.jquery.com/)
* [Knockout Documentation](http://knockoutjs.com/)
* [Bootstrap Documentation](http://getbootstrap.com/)
* [Hexagon Tiles by Graham Pyne](http://codepen.io/gpyne/pen/iElhp)
* [Hexagon Calculations by Red Blob Games](http://www.redblobgames.com/grids/hexagons/)
* [UC Berkeley Urban Bee Lab](http://www.helpabee.org/seasonal-bee-gardening.html)
* [Wikipedia Colongy Collapse Disorder](https://en.wikipedia.org/wiki/Colony_collapse_disorder)

#### Contact Me

For any questions please email me at _bthomas2622@gmail.com_

#### License

The content of this repository is not licensed. 