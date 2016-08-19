//reference to Firebase database
var rootRef = new Firebase('https://bee-game.firebaseio.com/');

var leaderRef = rootRef.child("leaderboard");
var queenRef = rootRef.child("totalqueencount");

//test code to debug firebase
leaderRef.once("value", function(snapshot){
	console.log(snapshot.child("one").child("name").val())
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});

queenRef.once("value", function(snapshot){
	console.log(snapshot.child("total").val());
}, function (errorObject) {
	console.log("The total queen update failed: " + errorObject.code);
});

// leaderRef.child("one").update({
// 	"name": "Benjammin",
// 	"score": 3
// }, function (errorObject) {
// 	if (errorObject){
// 		console.log("The leaderboard update failed: " + errorObject)
// 	}
// 	else {
// 		console.log("The leaderboard updated successfully");
// 	}
// });

/*the beeTypes object contains the information for all of possible bee species that the 
model can make observable and the controller and associated functions can manipulate */
var beeTypes = [
	{
	species : 'Honey Bee',
	maxEnergy : 25,
	maxEnergyCapacity : 25,
	pollenCount : 0,
	royalPollenCount: 0,
	honeyCount: 10,
	queenCount: 0,
	royalJellyCount: 0,
	age : 0,
	},
	{
	species : 'Bumble Bee',
	maxEnergy : 25,
	maxEnergyCapacity : 25,
	pollenCount : 0,
	royalPollenCount: 0,
	honeyCount: 10,
	queenCount: 0,
	royalJellyCount: 0,
	age : 0,
	},
	{
	species : 'Mining Bee',
	maxEnergy : 25,
	maxEnergyCapacity : 25,
	pollenCount : 0,
	royalPollenCount: 0,
	honeyCount: 10,
	queenCount: 0,
	royalJellyCount: 0,
	age : 0,
	},
	{
	species : 'Leafcutting Bee',
	maxEnergy : 25,
	maxEnergyCapacity : 25,
	pollenCount : 0,
	royalPollenCount: 0,
	honeyCount: 10,
	queenCount: 0,
	royalJellyCount: 0,
	age : 0,
	},
	{
	species : 'Carpenter Bee',
	maxEnergy : 25,
	maxEnergyCapacity : 25,
	pollenCount : 0,
	royalPollenCount: 0,
	honeyCount: 10,
	queenCount: 0,
	royalJellyCount: 0,
	age : 0,
	}
];

//object that holds all possible bad guys and what could happen to you
var colonyThreats = [
	{
	name: 'pesticide',
	text: 'Neonicotinoid Pesticide present',
	definition: 'We run this planet dust. Fight for the pollen but risk energy.',	
	posEffect: '%data% pollen obtained',
	negEffect: 'Overwhelmed, %data% energy has been sapped'
	},
	{
	name: 'varroaMite',
	text: 'Varroa Mite attacks!',
	definition: 'External parasitic nightmare. Fight to increase endurance but risk viral infection.',
	viruses: [{
			name: 'deformedWingVirus', 
			negEffect: 'Deformed wing virus has damaged your appendages and reduced energy capacity by %data%', 
			posEffect: 'Victory increases max energy by %data%'
		},
		{
			name: 'blackQueenCellVirus', 
			negEffect: 'Black queen cell virus has killed a queen larva', 
			posEffect: 'Victory increases max energy by %data%'
		},
		{
			name: 'israeliAcuteParalysisVirus',
			negEffect: 'Israeli acute paralysis virus has depleted your energy by %data%',
			posEffect: 'Victory increases max energy by %data%'	
		}] 		
	},
	{	
	name: 'smallHiveBeetle',
	text: 'Small Hive Beetle attacks!',
	definition: 'Vile beetle that infests hive, damaging honeycomb, laying larvae that defecate in honey... discoloring with feces. The bee equivalent of a frat party. Risk honey levels.',
	negEffect: 'Small Hive Beetle has ransacked the hive and %data% honey has been lost',
	posEffect: 'Beetle conquered, honey increased by %data%'
	},
	{
	name: 'parasiticPhoridFly',
	text: 'Parasitic Phorid Fly attacks!',
	definition: '"Zombie Flies" that lay eggs in your abdomen that slowly grow as you go mad. The larvae emerges from your lifeless carcass through your neck. Fight to increase your endurance.',
	negEffect: 'The Parasitic Phorid Fly has successfully implanted egg in your abdomen, max energy will decrease 1 per day. Very Tragic.',
	posEffect: 'Victory increases max energy by %data%'	
	},
	{
	name: 'climateChange',
	text: 'Humans scoff at clean energy, the subsequent warming kills off some potential future plant life.',
	definition: 'Climate Change',	
	},
	{
	name: 'rain',
	text: 'Storms a brewin',
	definition: 'Moisture condensed from the atmosphere that falls visibly in separate drops. Risk the water washing all your collected pollen.',
	negEffect: 'An afternoon shower washes away fresh paint, hopscotch, and all your pollen',
	posEffect: '%data% pollen obtained'	
	},
	{
	name: 'human',
	text: 'Frenzied child with tennis racket attacks!',
	definition: 'You are lucky they arent trying to set you on fire. Risk it all for glory on the battlefield.',
	negEffect: 'Your jacked bee body is no match for human recreational activities. Your journey ends here.',
	posEffect: 'You sting the child in face, take joy in having inflicted lifelong trauma'	
	},
	{
	name: 'lostGeneticDiversity',
	text: 'You encounter an industrial bee complex. Mating is not recommended due to lack of genetic variation',
	definition: 'Insect Insest',
	negEffect: 'Queen larva produced eats all your royal jelly and dies.',
	posEffect: 'Way to procreate, queen larva increased by 1'	
	},
	{
	name: 'malnutrition',	
	text: 'You encounter a field of almonds, be careful not to gorge yourself.',
	definition: 'A wide variety of pollen leads to stronger bees. Variety is the spice of life. Risk short term pollen boost.',
	negEffect: 'A monoculture diet has resulted in 50% less pollen collected',
	posEffect: '%data% pollen obtained'
	}
];

var caliFlowers = ["Calamintha nepetoides", "Linaria purpurea", "Ceanothus - Ray Hartman", "Erigeron karvinskianus", "Grindelia stricta", "Erigeron glaucus - Wayne Roderick", "Lavandula stoechas", "Nepeta faasennii", "Vitex agnus-castus", "Salvia mellifera", "Solidago californica", "Layia platyglossa", "Eriogonum grande rubescens", "Eschscholzia californica", "Salvia - Indigo Spires", "Cosmos sulphureus", "Caryoteris incana - Bluebeard", "Penstemon heterophyllus", "Lavandula intermedia - Provence", "Salvia microphylla - Hot Lips", "Gilia capitata", "Rudbeckia hirta", "Bidens ferulifolia", "Echium candicans", "Helianthus annuus - Sunflower", "Cosmos bipinnatus", "Salvia uliginosa", "Gaillardia grandiflora - Oranges and Lemons", "Phacelia tanancetifolia"];

//bee chosen for adventure, right now just manually chosen in code
var chosenBee = beeTypes[Math.floor(Math.random()*beeTypes.length)];

//global variables
var climateChangeIndex = 22;
var data = '%data%';
var phoridIndex = 0;
var totalHoney = 0;
var totalJelly = 0; 
var leaderOne = 0, leaderTwo, leaderThree, leaderFour, leaderFive;
var leaderOneName, leaderTwoName, leaderThreeName, leaderFourName, leaderFiveName;
var playerName;

//beemodel is the knockout observable model object that will dynamically drive my in game statistics
var beeModel = function(data){
	this.species = ko.observable(data.species);
	this.maxEnergy = ko.observable(data.maxEnergy);
	this.maxEnergyCapacity = ko.observable(data.maxEnergyCapacity);
	this.pollenCount = ko.observable(data.pollenCount);
	this.royalPollenCount = ko.observable(data.royalPollenCount);
	this.honeyCount = ko.observable(data.honeyCount);
	this.queenCount = ko.observable(data.queenCount);
	this.royalJellyCount = ko.observable(data.royalJellyCount);
	this.age = ko.observable(data.age);
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
	self.listClick = function() {
		self.createHexHive();
		return true;
	};

	//variables holding temporary strings to be replaced in rgb formatting
	var rdata = '%red%';
	var gdata = '%green%';
	var bdata = '%blue%';
	var flowerRGBarray = [];

	//function to create the flowerfield that player bee with traverse
	self.createHexHive = function() {
		var i, j, r, g, b, rgb, flowerRoller, RGBobject, flower, formattedrgb, flowerRow = [], pollenLevel, jellyLevel, flowerType, brownRGB, oldMaxEnergy;
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
					if (flowerRoller >= 0 && flowerRoller < climateChangeIndex) {
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
			    flower.on("click", function(){self.updatePos($(this).data("flowerData").x, $(this).data("flowerData").y, $(this).data("flowerData").p, $(this).data("flowerData").j);});
			    flower.on("click", function(){$('#lastflower').replaceWith('<span id="lastflower">'.concat($(this).data("flowerData").f + '</span>'));});
			    if (hiveX == i && hiveY == j){
			    	flower.on("click", function(){self.createHexHive();});
			    }
			    else {
			    	flower.on("click", function(){
			    		$(this).addClass("usedFlower");
			    		$("div").removeClass("currentFlower");
			    		$(this).addClass("currentFlower");
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
		if (ageHolder > 120){
			self.endScreen("age");
		}
		self.bee()[0].age(ageHolder); 
		self.bee()[0].pollenCount(0);
		self.bee()[0].royalPollenCount(0);
		self.Backpack.pollenCollected = 0;
		self.Backpack.jellyCollected = 0;
	};

	self.updatePos = function(x, y, pollen, jelly){
		//converting offset coordinates to cube coordinates in order to do distance calculation
		//http://www.redblobgames.com/grids/hexagons/
		var oldcubex, oldcubey, oldcubez, newcubex, newcubey, newcubez, oldPollen, oldJelly, oldHoney, oldRoyalJelly, oldQueens, cubeDistance, leftoverEnergy, eventProb, eventDice, fateDice, fate;
		var dialogueText1, dialogueText2, riskButton, runButton, eventText, spoils, virusType, oldMaxEnergy;
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

		if (leftoverEnergy < 0) {
			self.endScreen("energy");
		}
		if (x == hiveX && y == hiveY) {
			oldMaxEnergy = self.bee()[0].maxEnergyCapacity() - phoridIndex;
			self.bee()[0].maxEnergyCapacity(oldMaxEnergy);
			self.bee()[0].maxEnergy(self.bee()[0].maxEnergyCapacity());
			oldHoney = self.bee()[0].honeyCount();
			totalHoney = totalHoney + self.Backpack.pollenCollected;
			self.bee()[0].honeyCount(oldHoney + self.Backpack.pollenCollected - 5);
			oldRoyalJelly = self.bee()[0].royalJellyCount();
			totalJelly = totalJelly + self.Backpack.jellyCollected;
			self.bee()[0].royalJellyCount(oldRoyalJelly + self.Backpack.jellyCollected);
			if (self.bee()[0].royalJellyCount() >= 10) {
				oldRoyalJelly = self.bee()[0].royalJellyCount();
				self.bee()[0].royalJellyCount(oldRoyalJelly - 10);
				oldQueens = self.bee()[0].queenCount();
				self.bee()[0].queenCount(oldQueens + 1);
			}
			if (self.bee()[0].honeyCount() < 0){
				self.endScreen("honey");
			}
		}
		else {
			//RANDOM EVENT CODE
			if (cubeDistance > 5) {
				eventProb = 0.3; 
			}
			else {
				eventProb = (cubeDistance + 20) / 100;
			}
			eventDice = Math.random();
			//clear out any prompts from previous dialogues
			$('#dialogueWindow').replaceWith("<div id='dialogueWindow'></div>");
			if (eventProb > eventDice){
				//pause flowerfield traversal while an event requires attention
				$("#flowerfield").hide();
				fate = colonyThreats[Math.floor(Math.random()*colonyThreats.length)];
				fateDice = Math.random();
				switch(fate.name){
					case "pesticide":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/pesticide400.png' alt='pesticide'></div>").show();
						break;
					case "varroaMite":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/varroamite400.png' alt='varroa mite'></div>").show();
						break;
					case "smallHiveBeetle":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/beetle400.png' alt='small hive beetle'></div>").show();
						break;
					case "parasiticPhoridFly":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/phorid400.png' alt='parasitic phorid fly'></div>").show();
						break;
					case "climateChange":
						eventText = '<div>' + fate.text + '</div>'
						if (climateChangeIndex > 0){
							climateChangeIndex = climateChangeIndex - 1;
						}
						oldJelly = self.Backpack.jellyCollected;
						self.Backpack.jellyCollected = oldJelly + jelly;
						oldPollen = self.Backpack.pollenCollected;
						self.Backpack.pollenCollected = oldPollen + pollen; 
						self.bee()[0].pollenCount(self.Backpack.pollenCollected);
						self.bee()[0].royalPollenCount(self.Backpack.jellyCollected);
						$("#flowerfield").show();
						break;
					case "rain":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/rain400.png' alt='rain'></div>").show();
						break;
					case "human":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/human400.png' alt='human'></div>").show();
						break;
					case "lostGeneticDiversity":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/diversity400.png' alt='lost genetic diversity'></div>").show();
						break;
					case "malnutrition":
						eventText = '<div>' + fate.text + '</div>'
						$('#eventPic').replaceWith("<div class='col-md-12' id='eventPic'><img class='img-responsive img-rounded' src='art/malnutrition400.png' alt='malnutrition'></div>").show();
						break;						
					default:
						$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Success is the best revenge</div>");
				}

				dialogueText1 = "<button type='button' class='btn btn-danger active' id='decision'>Risk</button>";
				dialogueText2 = "<button type='button' class='btn btn-danger active' id='decision'>Run</button>";
				dialogueText3 = "<button type='button' class='btn btn-secondary active' id='definition'>Info</button>";
				
				spoils = Math.floor(10*Math.random() + 1);
				riskButton = $(dialogueText1).on("click", function(){
					$("#flowerfield").show();
					switch(fate.name){
						case "pesticide":
							if (fateDice > 0.5){
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.posEffect.replace(data, spoils) + "</div>");
								oldPollen = self.Backpack.pollenCollected;
								self.Backpack.pollenCollected = oldPollen + spoils; 
								self.bee()[0].pollenCount(self.Backpack.pollenCollected);
							}
							else {
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.negEffect.replace(data, spoils) + "</div>");
								leftoverEnergy = self.bee()[0].maxEnergy() - spoils;
								self.bee()[0].maxEnergy(leftoverEnergy);
							}
							break;
						case "varroaMite":
							virusType = Math.floor(3*Math.random())
							if (fateDice > 0.5){
								switch (fate.viruses[virusType].name) {
									case "deformedWingVirus":
										$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.viruses[virusType].posEffect.replace(data, spoils) + "</div>");
										oldMaxEnergy = self.bee()[0].maxEnergyCapacity() + spoils;
										self.bee()[0].maxEnergyCapacity(oldMaxEnergy);
										break;
									case "blackQueenCellVirus":
										$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.viruses[virusType].posEffect.replace(data, spoils) + "</div>");
										oldMaxEnergy = self.bee()[0].maxEnergyCapacity() + spoils;
										self.bee()[0].maxEnergyCapacity(oldMaxEnergy);
										break;
									case "israeliAcuteParalysisVirus":
										$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.viruses[virusType].posEffect.replace(data, spoils) + "</div>");
										oldMaxEnergy = self.bee()[0].maxEnergyCapacity() + spoils;
										self.bee()[0].maxEnergyCapacity(oldMaxEnergy);
										break;
									default:
										$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Success is the best revenge</div>");
								}
							}
							else {
								switch (fate.viruses[virusType].name) {
									case "deformedWingVirus":
										$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.viruses[virusType].negEffect.replace(data, spoils) + "</div>");
										oldMaxEnergy = self.bee()[0].maxEnergyCapacity() - spoils;
										self.bee()[0].maxEnergyCapacity(oldMaxEnergy);
										break;
									case "blackQueenCellVirus":
										oldQueens = self.bee()[0].queenCount();
										if (oldQueens > 0){
											self.bee()[0].queenCount(oldQueens - 1);
											$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.viruses[virusType].negEffect.replace(data, spoils) + "</div>");
										}
										else {
											$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + "There are no queen larva for black queen cell virus to kill" + "</div>");
										}
										break;
									case "israeliAcuteParalysisVirus":
										$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.viruses[virusType].negEffect.replace(data, spoils) + "</div>");
										leftoverEnergy = self.bee()[0].maxEnergy() - spoils;
										self.bee()[0].maxEnergy(leftoverEnergy);
										break;
									default:
										$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Success is the best revenge</div>");
								}
							}
							break;
						case "smallHiveBeetle":
							if (fateDice > 0.5){
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.posEffect.replace(data, spoils) + "</div>");
								oldHoney = self.bee()[0].honeyCount();
								self.bee()[0].honeyCount(oldHoney + spoils);
							}
							else {
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.negEffect.replace(data, spoils) + "</div>");
								oldHoney = self.bee()[0].honeyCount();
								self.bee()[0].honeyCount(oldHoney - spoils);
							}
							break;
						case "parasiticPhoridFly":
							if (fateDice > 0.5){
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.posEffect.replace(data, spoils) + "</div>");
								oldMaxEnergy = self.bee()[0].maxEnergyCapacity() + spoils;
								self.bee()[0].maxEnergyCapacity(oldMaxEnergy);
							}
							else {
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.negEffect.replace(data, spoils) + "</div>");
								phoridIndex = phoridIndex + 1;
								oldMaxEnergy = self.bee()[0].maxEnergyCapacity() - phoridIndex;
								self.bee()[0].maxEnergyCapacity(oldMaxEnergy);
							}
							break;
						case "rain":
							if (fateDice > 0.5){
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.posEffect.replace(data, spoils) + "</div>");
								oldPollen = self.Backpack.pollenCollected;
								self.Backpack.pollenCollected = oldPollen + spoils; 
								self.bee()[0].pollenCount(self.Backpack.pollenCollected);
							}
							else {
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.negEffect.replace(data, spoils) + "</div>"); 
								self.bee()[0].pollenCount(0);
							}
							break;
						case "human":
							if (fateDice > 0.5){
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.posEffect.replace(data, spoils) + "</div>");
							}
							else {
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.negEffect.replace(data, spoils) + "</div>"); 
								self.endScreen("human");
							}
							break;
						case "lostGeneticDiversity":
							if (fateDice > 0.5){
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.posEffect.replace(data, spoils) + "</div>");
								oldQueens = self.bee()[0].queenCount();
								self.bee()[0].queenCount(oldQueens + 1);
							}
							else {
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.negEffect.replace(data, spoils) + "</div>"); 
								self.bee()[0].royalJellyCount(0);
							}
							break;
						case "malnutrition":
							if (fateDice > 0.5){
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.posEffect.replace(data, spoils) + "</div>");
								oldPollen = self.Backpack.pollenCollected;
								self.Backpack.pollenCollected = oldPollen + spoils; 
								self.bee()[0].pollenCount(self.Backpack.pollenCollected);
							}
							else {
								$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>" + fate.negEffect.replace(data, spoils) + "</div>"); 
								oldPollen = Math.floor(self.Backpack.pollenCollected*0.5);
								self.bee()[0].pollenCount(oldPollen);
							}
							break;						
						default:
							$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Success is the best revenge</div>");
					}
					if (fateDice > 0.5){
						oldJelly = self.Backpack.jellyCollected;
						self.Backpack.jellyCollected = oldJelly + jelly;
						oldPollen = self.Backpack.pollenCollected;
						self.Backpack.pollenCollected = oldPollen + pollen; 
						self.bee()[0].pollenCount(self.Backpack.pollenCollected);
						self.bee()[0].royalPollenCount(self.Backpack.jellyCollected);
					}
					$("#eventPic").hide();
		    	});

		    	runButton = $(dialogueText2).on("click", function(){
					$('#dialogueWindow').replaceWith("<div id='dialogueWindow'>Safe but hungry</div>");
					$("#flowerfield").show();
					$("#eventPic").hide();
		    	});

		    	infoButton = $(dialogueText3).on("click", function(){
					$('#dialogueWindow').append("<p id='definitionText'>" + fate.definition + "</p>");
					$('#definition').hide();

		    	});

		    	$('#dialogueWindow').append(eventText);
		    	if (fate.name != "climateChange"){
		    		$('#dialogueWindow').append(riskButton);
					$('#dialogueWindow').append(runButton);
		    	}
		    	$('#dialogueWindow').append(infoButton);
			}
			//else statement represents normal pollen harvesting with no interference
			else {
				oldJelly = self.Backpack.jellyCollected;
				self.Backpack.jellyCollected = oldJelly + jelly;
				oldPollen = self.Backpack.pollenCollected;
				self.Backpack.pollenCollected = oldPollen + pollen; 
				self.bee()[0].pollenCount(self.Backpack.pollenCollected);
				self.bee()[0].royalPollenCount(self.Backpack.jellyCollected);
			}
		}
	};

	self.endScreen = function(cause){
		var results = '<h1>GAME OVER</h1><h3>%reasondeath%</h3><ul><li>Days Lasted: %ddata%</li><li>Total Honey Produced: %hdata%</li><li>Total Royal Jelly Produced: %rdata%</li><li id="finalQueenCount">Queens Produced: %qdata%</li></ul><h3>Thanks for playing!<h3>'; 
		results = results.replace('%ddata%', self.bee()[0].age());
		results = results.replace('%hdata%', totalHoney);
		results = results.replace('%rdata%', totalJelly);
		results = results.replace('%qdata%', self.bee()[0].queenCount());
		queenRef.once("value", function(snapshot){
			var queenCountToUpdate = snapshot.child("total").val();
			queenRef.update({
				"total": (queenCountToUpdate + self.bee()[0].queenCount())
			});
		}, function (errorObject) {
			console.log("The total queen update failed: " + errorObject.code);
		});
		switch(cause){
			case "honey":
				results = results.replace('%reasondeath%', "Without honey, you cannot produce energy to continue")
				break;
			case "human":
				results = results.replace('%reasondeath%', "Your jacked bee body is no match for human recreational activities. Your journey ends here.")
				break;
			case "energy":
				results = results.replace('%reasondeath%', "You have run out of energy. Destined to become one with the flower field.")
				break;
			case "age":
				results = results.replace('%reasondeath%', "Congratulations! You have lasted the full arbitrary lifespan of a bee!")
				break;
			default:
		}
		$('#flowerfield').hide();
		$('.statRow').hide();
		$('.gameData').hide();
		$('#eventPicRow').hide();
		$('.container').append('<div class="row"><div class="col-md-12" id="end">' + results + '</div></div>');
		var replay = "<button type='button' class='btn btn-danger active'>Play Again</button>";
		replay = $(replay).on("click", function(){
			location.reload();
		})
		$('#end').append(replay);

		//getting the info for leaderboard
		leaderRef.once("value", function(snapshot){
			leaderOne = snapshot.child("one").child("score").val()
			leaderOneName = snapshot.child("one").child("name").val();
			leaderTwo = snapshot.child("two").child("score").val();
			leaderTwoName = snapshot.child("two").child("name").val();
			leaderThree = snapshot.child("three").child("score").val();
			leaderThreeName = snapshot.child("three").child("name").val();
			leaderFour = snapshot.child("four").child("score").val();
			leaderFourName = snapshot.child("four").child("name").val();
			leaderFive = snapshot.child("five").child("score").val();
			leaderFiveName = snapshot.child("five").child("name").val();
			if (self.bee()[0].queenCount() > leaderFive) {
				playerName = prompt("Congratulations!! Your 'Queens Produced' score is in top 5 of all CCD scores! Please enter your name for the leaderboard");
				if (playerName != null) {
					if (self.bee()[0].queenCount() <= leaderFour) {
						leaderRef.child("five").update({
							"name": playerName,
							"score": self.bee()[0].queenCount()
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderFiveName = playerName;
						leaderFive = self.bee()[0].queenCount();
					}
					else if (self.bee()[0].queenCount() <= leaderThree) {
						leaderRef.child("five").update({
							"name": leaderFourName,
							"score": leaderFour
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("four").update({
							"name": playerName,
							"score": self.bee()[0].queenCount()
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderFiveName = leaderFourName;
						leaderFive = leaderFour;
						leaderFourName = playerName;
						leaderFour = self.bee()[0].queenCount();
					}
					else if (self.bee()[0].queenCount() <= leaderTwo) {
						leaderRef.child("five").update({
							"name": leaderFourName,
							"score": leaderFour
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("four").update({
							"name": leaderThreeName,
							"score": leaderThree
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("three").update({
							"name": playerName,
							"score": self.bee()[0].queenCount()
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderFiveName = leaderFourName;
						leaderFive = leaderFour;
						leaderFourName = leaderThreeName;
						leaderFour = leaderThree;
						leaderThreeName = playerName;
						leaderThree = self.bee()[0].queenCount();
					}
					else if (self.bee()[0].queenCount() <= leaderOne) {
						leaderRef.child("five").update({
							"name": leaderFourName,
							"score": leaderFour
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("four").update({
							"name": leaderThreeName,
							"score": leaderThree
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("three").update({
							"name": leaderTwoName,
							"score": leaderTwo
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("two").update({
							"name": playerName,
							"score": self.bee()[0].queenCount()
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderFiveName = leaderFourName;
						leaderFive = leaderFour;
						leaderFourName = leaderThreeName;
						leaderFour = leaderThree;
						leaderThreeName = leaderTwoName;
						leaderThree = leaderTwo;
						leaderTwoName = playerName;
						leaderTwo = self.bee()[0].queenCount();
					}
					else {
						leaderRef.child("five").update({
							"name": leaderFourName,
							"score": leaderFour
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("four").update({
							"name": leaderThreeName,
							"score": leaderThree
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("three").update({
							"name": leaderTwoName,
							"score": leaderTwo
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("two").update({
							"name": leaderOneName,
							"score": leaderOne
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderRef.child("one").update({
							"name": playerName,
							"score": self.bee()[0].queenCount()
						}, function (errorObject) {
							if (errorObject){
								console.log("The leaderboard update failed: " + errorObject)
							}
							else {
								console.log("The leaderboard updated successfully");
							}
						});
						leaderFiveName = leaderFourName;
						leaderFive = leaderFour;
						leaderFourName = leaderThreeName;
						leaderFour = leaderThree;
						leaderThreeName = leaderTwoName;
						leaderThree = leaderTwo;
						leaderTwoName = leaderOneName;
						leaderTwo = leaderOne;
						leaderOneName = playerName;
						leaderOne = self.bee()[0].queenCount();
					}
				}
				var leaderboard = "<h1>QUEEN LEADERBOARD</h1><ol><li>" + leaderOneName + " - " + leaderOne + "</li><li>" + leaderTwoName + " - " + leaderTwo + "</li><li>" + leaderThreeName + " - " + leaderThree + "</li><li>" + leaderFourName + " - " + leaderFour + "</li><li>" + leaderFiveName + " - " + leaderFive + "</li></ol>";
				$('#end').append(leaderboard);
			}
			else {
				var leaderboard = "<h1>QUEEN LEADERBOARD</h1><ol><li>" + leaderOneName + " - " + leaderOne + "</li><li>" + leaderTwoName + " - " + leaderTwo + "</li><li>" + leaderThreeName + " - " + leaderThree + "</li><li>" + leaderFourName + " - " + leaderFour + "</li><li>" + leaderFiveName + " - " + leaderFive + "</li></ol>";
				$('#end').append(leaderboard);	
			}
		}, function (errorObject) {
			console.log("Could not fetch leaderboard: " + errorObject.code);
		});
	}
};

//apply the knockout observable properties to the controller, essential for dynamic DOM, etc.
ko.applyBindings(new controller());
	


