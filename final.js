// This project utilizes the https://swapi.py4e.com/ API and http://textillate.js.org/ and https://www.cdnfonts.com/death-star.font libraries

var currentMode = "people";
var number = 1;
var max = 83;

// Load and return the name from a SWAPI
function loadName(name_api) {
	var name = "";
	try{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				name = data.name;
				console.log(name);
			}
		};
		xhttp.open("GET", name_api, true);
		xhttp.send();
	} 
	catch (error) {
		console.log(error);
	}
	console.log(name);
	return name;
}

function incNum(event) {
	
	if (number < 87 && currentMode == "people") {
		number = number + 1;
	}
	else if (number < 61 && currentMode == "planets") {
		number = number + 1;
	}
	else if (number < 7 && currentMode == "films") {
		number = number + 1;
	}
	else if (number < 37 && currentMode == "species") {
		number = number + 1;
	}
	else if (number < 39 && currentMode == "vehicles") {
		number = number + 1;
	}
	else if (number < 37 && currentMode == "starfighters") {
		number = number + 1;
	}
	buildPage();
}

function decNum(event) {
	if (number > 1) {
		number = number - 1;
	}
	buildPage()
}

function buildPage() {
	var api = "https://swapi.py4e.com/api/"+currentMode+"/"+number+"/?format=json"
	if (currentMode == "people"){
		max = 87;
		buildPerson(api);
	}
	else if (currentMode == "planets"){
		max = 61;
		buildPlanet(api);
	}
	else if (currentMode == "films"){
		max = 7;
		buildFilm(api);
	}
	else if (currentMode == "species"){
		max = 37;
		buildSpecies(api);
	}
	else if (currentMode == "vehicles"){
		max = 39;
		buildVehicles(api);
	}
	else if (currentMode == "starfighters"){
		max = 37;
		buildStarfighter(api);
	}
}

const select = document.getElementById('selection');

select.addEventListener('change', function handleChange(event) {
	currentMode = event.target.value;
	number = 1;
	buildPage();
	// body = "<div data-preset='stripe' class='ldBar' data-value='"+number+"' data-max='"+max+"'></div>"
	// document.getElementById("loading").innerHTML = body;
});

function buildPerson(api) {
	try{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);

				name = data.name;
				body = "<h1>"+name+"</h1>"

				height = data.height;
				body += "<h2>Height</h2><p>"+height+"</p>"

				mass = data.mass;
				body += "<h2>Mass</h2><p>"+mass+"</p>"

				hair_color = data.hair_color;
				body += "<h2>Hair Color</h2><p>"+hair_color+"</p>"

				skin_color = data.skin_color;
				body += "<h2>Skin Color</h2><p>"+skin_color+"</p>"

				eye_color = data.eye_color;
				body += "<h2>Eye Color</h2><p>"+eye_color+"</p>"

				birth_year = data.birth_year;
				body += "<h2>Birth Year</h2><p>"+birth_year+"</p>"

				gender = data.gender;
				body += "<h2>Gender</h2><p>"+gender+"</p>"

				homeworld = data.homeworld + "?format=json"
				body += "<h2>Homeworld</h2><p id='homeworld'>"+homeworld+"</p>"

				films = "";
				body += "<h2>Films</h2><p><ul id='films'>"
				for (var film of data.films) {
					// film += "/?format=json"
					//films += "<li>"+loadName(film)+"</li>";
					body += "+" + film + "?format=json";
				}
				body += "</ul></p>"

				
				species = "";
				body += "<h2>Species</h2><p><ul id='species'>";
				for (var race of data.species) {
					// race += "/?format=json"
					// species += "<li>"+loadName(race)+"</li>";
					body += "+" + race + "?format=json";
				}
				body += "</ul></p>"

				
				vehicles = "";
				body += "<h2>Vehicles</h2><p><ul id='vehicles'>";
				
				for (const vehicle of data.vehicles) {
					// v = loadName(vehicle);
					// console.log("Next")
					// console.log(loadName(vehicle))
					// vehicles += "<li>"+v+"</li>";
					body += "+" + vehicle + "?format=json";
				}
				body += "</p></ul>";

				
				starships = "";
				body += "<h2>Starships</h2><p><ul>"
				for (const ship of data.starships) {
					// starships += "<li>"+loadName(ship)+"</li>";
					body += "+" + ship + "?format=json";
				}
				body += "</p></ul>";

				document.getElementById("info").innerHTML = body;
				
			}
		};
		xhttp.open("GET", api, true);
		xhttp.send();
	} 
	catch (error) {
		console.log(error);
	}
	fixPerson()
}

function fixPerson() {
	let homeworld = document.querySelectorAll('homeworld').innerHTML;
	console.log("homeworld")
	console.log(homeworld)
	let home = loadName(homeworld)
	console.log(home)
}

function buildPlanet(api) {
	body = "<h2>Coming Soon!!!!</h2><b>This functionality is in the works and will come with time. For now stick to the Starwars characters!</b>"
	document.getElementById("info").innerHTML = body;
}

function buildFilm(api) {
	body = "<h2>Coming Soon!!!!</h2><b>This functionality is in the works and will come with time. For now stick to the Starwars characters!</b>"
	document.getElementById("info").innerHTML = body;
}

function buildSpecies(api) {
	body = "<h2>Coming Soon!!!!</h2><b>This functionality is in the works and will come with time. For now stick to the Starwars characters!</b>"
	document.getElementById("info").innerHTML = body;
}

function buildVehicles(api) {
	body = "<h2>Coming Soon!!!!</h2><b>This functionality is in the works and will come with time. For now stick to the Starwars characters!</b>"
	document.getElementById("info").innerHTML = body;
}

function buildStarfighter(api) {
	body = "<h2>Coming Soon!!!!</h2><b>This functionality is in the works and will come with time. For now stick to the Starwars characters!</b>"
	document.getElementById("info").innerHTML = body;
}
