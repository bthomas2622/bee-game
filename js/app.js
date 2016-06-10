/*the beeTypes object contains the information for all of possible bee species that the 
model can make observable and the controller and associated functions can manipulate */
var beeTypes = [
	{
	species : 'Honey Bee',
	maxEnergy : 20,
	pollenCount : 0,
	honeyCount: 10,
	queenCount: 0,
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
	honeyCount: 10,
	queenCount: 0,
	royalJellyCount: 0,
	age : 0,
	speed :  4,
	stingStrength : 4,
	armor : 4
	},
];

//object that holds all possible bad guys and what could happen to you
var colonyThreats = [
	{
	name: 'pesticide',
	text: 'Neonicotinoid Pesticide present',
	definition: 'We run this planet dust',	
	impact: 'honey',
	effect: '%data% of honey has been lost'
	},
	{
	name: 'varroaMite',
	text: 'Varroa Mite attacks!',
	definition: 'External parasitic nightmare',
	viruses: [{
			name: 'Deformed wing virus', 
			effect: 'Deformed wing virus has damaged your appendages and reduced energy capacity', 
			impact: 'maxEnergy'
		},
		{
			name: 'Black queen cell virus', 
			effect: 'Black queen cell virus has killed queen larva', 
			impact: 'queenCount'
		},
		{
			name: 'Israeli acute paralysis virus',
			effect: 'Israeli acute paralysis virus has depleted your energy',
			impact: 'energy'	
		}] 		
	},
	{	
	name: 'smallHiveBeetle',
	text: 'Small Hive Beetle attacks!',
	definition: 'Vile beetle that infests hive, damaging honeycomb, laying larvae that defecate in honey... discoloring with feces. The bee equivalent of a frat party.',
	effect: 'Small Hive Beetle has ransacked the hive and %data% of honey has been lost',
	impact: 'honey'
	},
	{
	name: 'parasiticPhoridFly',
	text: 'Parasitic Phorid Fly attacks!',
	definition: '"Zombie Flies" that lay eggs in your abdomen that slowly grow as you go mad. The larvae emerges from your lifeless carcass through your neck',
	effect: 'The Parasitic Phorid Fly has successfully implanted egg in your abdomen, max energy will decrease 1 per day. Very Tragic.',
	impact: 'maxEnergy'	
	},
	{
	name: 'climateChange',
	text: '1437 pickup trucks pass by, the subsequent warming kills off some plant life.',
	definition: 'Climate Change, you know that thing that makes people disagree with scientists',
	impact: 'climate'	
	},
	{
	name: 'rain',
	text: 'Storms a brewin',
	definition: 'Moisture condensed from the atmosphere that falls visibly in separate drops',
	effect: 'An afternoon shower washes away fresh paint, hopscotch, and pollen',
	impact: 'pollen'	
	},
	{
	name: 'human',
	text: 'Frenzied child with tennis racket attacks!',
	definition: 'It must be summer',
	effect: 'Your jacked bee body is no match for human recreational activities. Your journey ends here.',
	impact: 'death'	
	},
	{
	name: 'lostGeneticDiversity',
	text: 'You encounter an industrial bee complex. Mating is not recommended due to lack of genetic variation',
	definition: 'Insect Insest',
	effect: 'Queen larva produced eats all your royal jelly and dies.',
	impact: 'royalJelly'	
	},
	{
	name: 'malnutrition',	
	text: 'You encounter a field of almonds, be careful not to gorge yourself.',
	definition: 'A wide variety of pollen leads to stronger bees. Variety is the spice of life.',
	effect: 'A monoculture diet has resulted in 50% less pollen collected',
	impact: 'pollen'
	}
];

var caliFlowers = ["Calamintha nepetoides", "Linaria purpurea", "Ceanothus - Ray Hartman", "Erigeron karvinskianus", "Grindelia stricta", "Erigeron glaucus - Wayne Roderick", "Lavandula stoechas", "Nepeta faasennii", "Vitex agnus-castus", "Salvia mellifera", "Solidago californica", "Layia platyglossa", "Eriogonum grande rubescens", "Eschscholzia californica", "Salvia - Indigo Spires", "Cosmos sulphureus", "Caryoteris incana - Bluebeard", "Penstemon heterophyllus", "Lavandula intermedia - Provence", "Salvia microphylla - Hot Lips", "Gilia capitata", "Rudbeckia hirta", "Bidens ferulifolia", "Echium candicans", "Helianthus annuus - Sunflower", "Cosmos bipinnatus", "Salvia uliginosa", "Gaillardia grandiflora - Oranges and Lemons", "Phacelia tanancetifolia"];

//bee chosen for adventure, right now just manually chosen in code
var chosenBee = beeTypes[1];

//beemodel is the knockout observable model object that will dynamically drive my in game statistics
var beeModel = function(data){
	this.species = ko.observable(data.species);
	this.maxEnergy = ko.observable(data.maxEnergy);
	this.pollenCount = ko.observable(data.pollenCount);
	this.honeyCount = ko.observable(data.honeyCount);
	this.queenCount = ko.observable(data.queenCount);
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
	self.Backpack = {pollenCollected:0,jellyCollected:0};

	//the listClick function is how I get from the flower field to the statistics
	self.listClick = function(clickedFlower) {
		self.createHexHive();
	};

	//variables holding temporary strings to be replaced in rgb formatting
	var rdata = '%red%';
	var gdata = '%green%';
	var bdata = '%blue%';
	var flowerRGBarray = [];

	//function to create the flowerfield that player bee with traverse
	self.createHexHive = function() {
		var i, j, r, g, b, rgb, flowerRoller, RGBobject, flower, formattedrgb, flowerRow = [], pollenLevel, jellyLevel, flowerType, brownRGB;
		flowerRGBarray = [];
		//code to remove previous field if exists to regenerate
		$("div").remove(".hexagon");
		//for loop where a single flower (hexagon) is created each loop
		for(i=0; i<13; i++){
			//flowerRow is an array that holds the rgb values of each flower in a single row, has to be initialized in each row loop
			flowerRow = [];
			for(j=0; j<20; j++){
				rgb = '<div style="background-color:rgb(%red%,%green%,%blue%);"></div>';
				if (hiveX == i && hiveY == j){
					rgb = '<div style="background-color:rgb(%red%,%green%,%blue%);"></div>';
					r = 255;
					g = 255;
					b = 255;
				}
				else {
					flowerRoller = Math.floor(100*Math.random()).toString();
					//random number flowerRoller is the logic determines the color of the hexagon, determining whether it has pollen, royal jelly, or grass
					if (flowerRoller >= 0 && flowerRoller < 22) {
						//pollen, should be yellow hue
						r = Math.floor(45*Math.random() + 175).toString();
						g = Math.floor(20*Math.random() + 180).toString();
						b = Math.floor(45*Math.random() + 100).toString();
						pollenLevel = 1;
						jellyLevel = 0;
						flowerType = caliFlowers[Math.floor(Math.random()*caliFlowers.length)];
					}
					else if (flowerRoller >= 23 && flowerRoller < 25) {
						//royal jelly, shades of purple
						r = Math.floor(80*Math.random() + 150).toString();
						g = Math.floor(50*Math.random()).toString();
						b = Math.floor(80*Math.random() + 150).toString();
						pollenLevel = 0;
						jellyLevel = 1;
						flowerType = caliFlowers[Math.floor(Math.random()*caliFlowers.length)];
					}
					else {
						//green grass
						r = Math.floor(30*Math.random() + 50).toString();
						g = Math.floor(30*Math.random() + 120).toString();
						b = Math.floor(30*Math.random() + 50).toString();
						pollenLevel = 0;
						jellyLevel = 0;
						flowerType = "";
					}
				}
				RGBobject = {red:r, green:g, blue:b};
				flowerRow.push(RGBobject); 
				formattedrgb = rgb.replace(rdata, r);
				formattedrgb = formattedrgb.replace(gdata, g);  
				formattedrgb = formattedrgb.replace(bdata, b);    
			    flower = $(formattedrgb).addClass('hexagon').data("flowerData", {x:i, y:j, p: pollenLevel, j: jellyLevel, f: flowerType});
			    flower.bind("click", function(){self.updatePos($(this).data("flowerData").x, $(this).data("flowerData").y, $(this).data("flowerData").p, $(this).data("flowerData").j);});
			    flower.bind("click", function(){$('#lastflower').replaceWith('<span id="lastflower">'.concat($(this).data("flowerData").f + '</span>'));});
			    if (hiveX == i && hiveY == j){
			    	flower.bind("click", function(){self.createHexHive();});
			    }
			    else {
			    	flower.bind("click", function(){
			    		$(this).addClass("usedFlower");
			    		$(this).data("flowerData").p = 0;
			    		$(this).data("flowerData").j = 0;
			    	});
			    }
			    //pushing flower to the html
			    $('#flowerfield').append(flower);
			}
			flowerRGBarray.push(flowerRow);
		}
		var ageHolder = self.bee()[0].age();
		ageHolder = ageHolder + 1;
		self.bee()[0].age(ageHolder); 
		self.bee()[0].pollenCount(0);
		self.Backpack.pollenCollected = 0;
		self.Backpack.jellyCollected = 0;
	};

	self.updatePos = function(x, y, pollen, jelly){
		//converting offset coordinates to cube coordinates in order to do distance calculation
		//http://www.redblobgames.com/grids/hexagons/
		var oldcubex, oldcubey, oldcubez, newcubex, newcubey, newcubez, oldPollen, oldJelly, oldHoney, oldRoyalJelly, oldQueens, cubeDistance, leftoverEnergy, eventProb, eventDice, fateDice, fate;
		var dialogueText1, dialogueText2, riskButton, runButton, eventText;
		oldcubex = self.Pos.y;
		oldcubez = self.Pos.x - (self.Pos.y - (self.Pos.y&1)) / 2;
		oldcubey = -oldcubex - oldcubez;

		newcubex = y;
		newcubez = x - (y - (y&1)) / 2;
		newcubey = -newcubex - newcubez;

		cubeDistance = Math.max(Math.abs(newcubex - oldcubex), Math.abs(newcubey - oldcubey), Math.abs(newcubez - oldcubez));
		leftoverEnergy = self.bee()[0].maxEnergy() - cubeDistance;
		self.bee()[0].maxEnergy(leftoverEnergy);
		self.Pos.x = x;
		self.Pos.y = y;

		if (leftoverEnergy <= 0) {
			document.location.href = "endScreen.html";
		}
		if (x == hiveX && y == hiveY) {
			self.bee()[0].maxEnergy(chosenBee.maxEnergy);
			oldHoney = self.bee()[0].honeyCount();
			self.bee()[0].honeyCount(oldHoney + self.Backpack.pollenCollected);
			oldRoyalJelly = self.bee()[0].royalJellyCount();
			self.bee()[0].royalJellyCount(oldRoyalJelly + self.Backpack.jellyCollected);
			if (self.bee()[0].royalJellyCount() >= 20) {
				oldRoyalJelly = self.bee()[0].royalJellyCount();
				self.bee()[0].royalJellyCount(oldRoyalJelly - 20);
				oldQueens = self.bee()[0].queenCount();
				self.bee()[0].queenCount(oldQueens + 1);
			}
		}
		else {
			//RANDOM EVENT CODE
			if (cubeDistance > 5) {
				eventProb = 0.30; 
			}
			else {
				eventProb = (cubeDistance + 25) / 100;
				console.log(eventProb);
			}
			eventDice = Math.random();
			//clear out any prompts from previous dialogues
			$('#dialogueWindow').replaceWith("<div id='dialogueWindow'></div>");
			if (eventProb > eventDice){
				fate = colonyThreats[Math.floor(Math.random()*colonyThreats.length)];
				switch(fate.name){
					case "pesticide":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "varroaMite":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "smallHiveBeetle":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "parasiticPhoridFly":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "climateChange":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "rain":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "human":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "lostGeneticDiversity":
						eventText = '<div>' + fate.text + '</div>'
						break;
					case "malnutrition":
						eventText = '<div>' + fate.text + '</div>'
						break;						
					default:
						$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Success is the best revenge</div>");
				}

				dialogueText1 = "<button type='button' class='btn btn-danger active'>Risk</button>";
				dialogueText2 = "<button type='button' class='btn btn-danger active'>Run</button>";
				riskButton = $(dialogueText1).bind("click", function(){
					$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Effect TBD</div>");
		    	});
		    	runButton = $(dialogueText2).bind("click", function(){
					$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Safe but hungry</div>");
		    	});
		    	$('#dialogueWindow').append(eventText);
				$('#dialogueWindow').append(riskButton);
				$('#dialogueWindow').append(runButton);
			}
			//else statement represents normal pollen harvesting with no interference
			else {
				oldJelly = self.Backpack.jellyCollected;
				self.Backpack.jellyCollected = oldJelly + jelly;
				oldPollen = self.Backpack.pollenCollected;
				self.Backpack.pollenCollected = oldPollen + pollen; 
				self.bee()[0].pollenCount(self.Backpack.pollenCollected);
			}
		}
	};
};

//apply the knockout observable properties to the controller, essential for dynamic DOM, etc.
ko.applyBindings(new controller());
	


