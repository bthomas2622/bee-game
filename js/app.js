/*the beeTypes object contains the information for all of possible bee species that the 
model can make observable and the controller and associated functions can manipulate */
var beeTypes = [
  {
	species : 'Honey Bee',
	maxEnergy : 20,
	pollenCount : 0,
	honeyCount: 0,
	beeswaxCount: 0,
	royalJellyCount: 0,
	age : 0,
	speed :  5,
	stingStrength : 2,
	armor : 3
  },
  {
	species : 'Carpenter Bee',
	maxEnergy : 25,
	pollenCount : 0,
	honeyCount: 0,
	beeswaxCount: 0,
	royalJellyCount: 0,
	age : 0,
	speed :  4,
	stingStrength : 4,
	armor : 4
  },
];

//bee chosen for adventure, right now just manually chosen in code
var chosenBee = beeTypes[1];

//beemodel is the knockout observable model object that will dynamically drive my in game statistics
var beeModel = function(data){
	this.species = ko.observable(data.species);
	this.maxEnergy = ko.observable(data.maxEnergy);
	this.pollenCount = ko.observable(data.pollenCount);
	this.honeyCount = ko.observable(data.honeyCount);
	this.beeswaxCount = ko.observable(data.beeswaxCount);
	this.royalJellyCount = ko.observable(data.royalJellyCount);
	this.age = ko.observable(data.age);
	this.speed = ko.observable(data.speed);
	this.stingStrength = ko.observable(data.stingStrength);
	this.armor = ko.observable(data.armor);
};

//Viewmodel/controller where data gets accessed from DOM and search
var controller = function () {
	//putting this into self where self is the controller avoids confusion
	var self = this;
	self.bee = ko.observableArray([]);
	self.bee.push(new beeModel(chosenBee));

	//i want the hive to be in the same location every game so I am going to determine the hive location outside of flowerfield simulation
	var hiveX = Math.floor(13*Math.random());
	var hiveY = Math.floor(20*Math.random());
	self.Pos = {x:hiveX,y:hiveY};

	//the listClick function is how I get from the flower field to the statistics
	self.listClick = function(clickedFlower) {
		var ageHolder = self.bee()[0].age();
		var ageHolder = ageHolder + 1;
		self.bee()[0].age(ageHolder); 
		self.createHexHive();
	};

	//variables holding temporary strings to be replaced in rgb formatting
	var rdata = '%red%';
	var gdata = '%green%';
	var bdata = '%blue%';
	var flowerRGBarray = [];

	//function to create the flowerfield that player bee with traverse
	self.createHexHive = function() {
		var i, j, r, g, b, rgb, flowerRoller, RGBobject, flower, formattedrgb, flowerRow = [];
		flowerRGBarray = [];
		//code to remove previous field if exists to regenerate
		$("div").remove(".hexagon");
		//for loop where a single flower (hexagon) is created each loop
		for(i=0; i<13; i++){
			//flowerRow is an array that holds the rgb values of each flower in a single row, has to be initialized in each row loop
			flowerRow = [];
			for(j=0; j<20; j++){
				rgb = '<div style="background-color:rgb(%red%,%green%,%blue%);"></div>';
				if (hiveX == i & hiveY == j){
					rgb = '<div style="background-color:rgb(%red%,%green%,%blue%);"></div>';
					r = 255;
					g = 255;
					b = 255;
				}
				else {
					flowerRoller = Math.floor(100*Math.random()).toString();
					//random number flowerRoller is the logic determines the color of the hexagon, determining whether it has pollen, royal jelly, or grass
					if (flowerRoller >= 0 & flowerRoller < 20) {
						//pollen, should be yellow hue
						r = Math.floor(25*Math.random() + 175).toString();
						g = Math.floor(20*Math.random() + 180).toString();
						b = Math.floor(25*Math.random() + 100).toString();
					}
					else if (flowerRoller >= 20 & flowerRoller < 25) {
						//royal jelly, shades of purple
						r = Math.floor(55*Math.random() + 200).toString();
						g = Math.floor(50*Math.random()).toString();
						b = Math.floor(55*Math.random() + 200).toString();
					}
					else {
						//green grass
						r = 61;
						g = 143;
						b = 61;
					}
				}
				RGBobject = {red:r, green:g, blue:b};
				flowerRow.push(RGBobject); 
				formattedrgb = rgb.replace(rdata, r);
				formattedrgb = formattedrgb.replace(gdata, g);  
				formattedrgb = formattedrgb.replace(bdata, b);    
			    flower = $(formattedrgb).addClass('hexagon').data("coord", {x:i, y:j});
			    flower.bind("click", function(){self.updatePos($(this).data("coord").x, $(this).data("coord").y)});
			    if (hiveX == i & hiveY == j){
			    	flower.bind("click", function(){self.createHexHive()});
			    }
			    //pushing flower to the html
			    $('#flowerfield').append(flower);
			}
			flowerRGBarray.push(flowerRow);
		}
	}

	self.updatePos = function(x, y){
		//converting offset coordinates to cube coordinates in order to do distance calculation
		//http://www.redblobgames.com/grids/hexagons/
		var oldcubex, oldcubey, oldcubez, newcubex, newcubey, newcubez;
		oldcubex = self.Pos.y;
		oldcubez = self.Pos.x - (self.Pos.y - (self.Pos.y&1)) / 2
		oldcubey = -oldcubex - oldcubez;

		newcubex = y;
		newcubez = x - (y - (y&1)) / 2
		newcubey = -newcubex - newcubez;

		var cubeDistance = Math.max(Math.abs(newcubex - oldcubex), Math.abs(newcubey - oldcubey), Math.abs(newcubez - oldcubez));
		var leftoverEnergy = self.bee()[0].maxEnergy() - cubeDistance;
		self.bee()[0].maxEnergy(leftoverEnergy)
		self.Pos.x = x;
		self.Pos.y = y;
	}
};

//apply the knockout observable properties to the controller, essential for dynamic DOM, etc.
ko.applyBindings(new controller);
	


