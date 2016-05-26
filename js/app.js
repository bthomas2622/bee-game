//the beeTypes object contains the information for all of possible bee species that the 
//model can make observable and the controller and associated functions can manipulate 
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

//bee chosen for adventure, right now just chosen in code
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
		for (j=0; j<10; j++){
			createHive();
		}
	};

	var rdata = '%red%';
	var gdata = '%green%';
	var bdata = '%blue%';
	var formattedrgb; 

	function createHive() {
		var table = $('<table></table>').addClass('flowerfield');
		for(i=0; i<10; i++){
			var rgb = '<td style="background-color:rgb(%red%,%green%,%blue%);"></td>';
			var flowerRoller = Math.floor(100*Math.random()).toString();

			//this if loop determines the color of the hexagon, determining whether it has pollen or royal jelly
			if (flowerRoller >= 0 & flowerRoller < 20) {
				//pollen, should be yellow
				var r = Math.floor(25*Math.random() + 175).toString();
				var g = Math.floor(20*Math.random() + 180).toString();
				var b = Math.floor(25*Math.random() + 100).toString();
			}
			else if (flowerRoller >= 20 & flowerRoller < 25) {
				//royal jelly, shades of purple
				var r = Math.floor(55*Math.random() + 200).toString();
				var g = Math.floor(50*Math.random()).toString();
				var b = Math.floor(55*Math.random() + 200).toString();
			}
			else {
				var r = 61;
				var g = 143;
				var b = 61;
			}
			var formattedrgb = rgb.replace(rdata, r);
			var formattedrgb = formattedrgb.replace(gdata, g);  
			var formattedrgb = formattedrgb.replace(bdata, b);    
		    var row = $(formattedrgb).addClass('flower').text(i);
		    //var row = $('<td style="background-color:rgb('r','g','b');"></td>').addClass('flower').text(i);
		    console.log(r);
		    table.append(row);
		}
		$('#flowerfield').append(table);
	}
};

//apply the knockout observable properties to the controller, essential for dynamic DOM, etc.
ko.applyBindings(new controller);


