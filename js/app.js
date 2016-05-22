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

//
function createHive(map, foodplaces) {
	
}

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
	};
};

//apply the knockout observable properties to the controller, essential for dynamic DOM, etc.
ko.applyBindings(new controller);


