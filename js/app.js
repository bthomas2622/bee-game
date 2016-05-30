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

	//the listClick function is how I get from the flower field to the statistics
	self.listClick = function(clickedFlower) {
		var ageHolder = self.bee()[0].age();
		var ageHolder = ageHolder + 1;
		self.bee()[0].age(ageHolder); 
		createHexHive();
	};

	//variables holding temporary strings to be replaced in rgb formatting
	var rdata = '%red%';
	var gdata = '%green%';
	var bdata = '%blue%';
	var xdata = '%xdata%';
	var ydata = '%ydata%';
	flowerRGBarray = [];

	//function to create the flowerfield that player bee with traverse
	function createHexHive() {
		var i, j, r, g, b, rgb, flowerRoller, RGBobject, flower, formattedrgb, flowerRow = [];
		flowerRGBarray = [];
		//code to remove previous field if exists to regenerate
		$("div").remove(".hexagon");
		//for loop where a single flower (hexagon) is created each loop
		for(i=0; i<20; i++){
			//flowerRow is an array that holds the rgb values of each flower in a single row, has to be initialized in each row loop
			flowerRow = [];
			for(j=0; j<13; j++){
				rgb = '<div style="background-color:rgb(%red%,%green%,%blue%);"><div class="flowerdata"></div></div>';
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
				var RGBobject = {red:r, green:g, blue:b};
				flowerRow.push(RGBobject); 
				var formattedrgb = rgb.replace(rdata, r);
				var formattedrgb = formattedrgb.replace(gdata, g);  
				var formattedrgb = formattedrgb.replace(bdata, b);    
			    var flower = $(formattedrgb).addClass('hexagon');
			    //pushing flower to the html
			    $('#flowerfield').append(flower);
			}
			flowerRGBarray.push(flowerRow);
		}
		console.log(flowergoodies[0][0])
		console.log(flowergoodies[1][0])
	}
};

//apply the knockout observable properties to the controller, essential for dynamic DOM, etc.
ko.applyBindings(new controller);


