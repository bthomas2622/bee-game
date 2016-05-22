//the beeTypes object contains the information for all of possible bee species that the 
//model can make observable and the controller and associated functions can manipulate 
var beeTypes = [
  {
	species : 'Honey Bee',
	maxEnergy : 20,
	age : 0,
	speed :  5,
	stingStrength : 2,
	armor : 3
  },
  {
	species : 'Carpenter Bee',
	maxEnergy : 25,
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

//foodplacemodel is the knockout observable model object that will dynamically drive my in game statistics
var beeModel = function(data){
	this.species = ko.observable(data.species);
	this.maxEnergy = ko.observable(data.maxEnergy);
	this.age = ko.observable(data.age);
	this.speed = ko.observable(data.speed);
	this.stingStrength = ko.observable(data.stingStrength);
	this.armor = ko.observable(data.armor);
};

//Viewmodel/controller where data gets accessed from DOM and search
var ViewModel = function () {
	//putting this into self where self is viewmodel avoids confusion
	var self = this;
	self.bee = ko.observableArray([]);
	self.bee.push(new beeModel(chosenBee));
};

//apply the knockout observable properties to the ViewModel, essential for dynamic DOM, etc.
ko.applyBindings(new ViewModel);



