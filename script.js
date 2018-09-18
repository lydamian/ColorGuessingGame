console.log("script.js page loaded...\n");

//variables - element objects
var newColorBtn = document.getElementById("newColorsBtn");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");

//States
var IS_HARD = true;
var HARD_MAX = 6;
var EASY_MAX = 3;
var colorBtns = [];
var RGB_GOAL = "rgb(0, 0, 0)";
var myBtns = document.querySelectorAll(".colorBtn");

function pickColors(numColors){
	
} 

function RGBGenerator(){
	return 'rgb(' + (Math.floor(Math.random() * 256)) + ', '
	 + (Math.floor(Math.random() * 256)) + ', ' + (Math.floor(Math.random() * 256)) 
	 + ')';
}

function easyGame(){
	for(var i = 0; i < EASY_MAX; i++){
		var temp = RGBGenerator();

		//check that new color has not previously been used.
		while(colorBtns.indexOf(temp) != -1){
			console.log("color has previously used...\n");
			temp = RGBGenerator();
		}
		colorBtns[i] = temp;
		document.getElementById("color" + (i+1)).style.background = temp;
		console.log("new color is: " + temp);
	}
	for(var i = 4; i <= HARD_MAX; i++){
		document.getElementById("color" + i).style.background = "black";
	}
}

function hardGame(){
	for(var i = 0; i < HARD_MAX; i++){
		var temp = RGBGenerator();

		//check that new color has not previously been used.
		while(colorBtns.indexOf(temp) != -1){
			console.log("color has previously used...\n");
			temp = RGBGenerator();
		}
		colorBtns[i] = temp;
		document.getElementById("color" + (i+1)).style.background = temp;
		console.log("new color is: " + temp);
	}
}


//===== square button event callback ======
function squareEvent(){
		if(this.style.background == RGB_GOAL){
			//success, turn every color into this color, game over.
			console.log("correct");
			for(var i = 0; i < myBtns.length; i++){
				myBtns[i].style.background = RGB_GOAL;
			}	

			RGB_GOAL = undefined;
		}
		else{
			//incorrect, erase square
			console.log("incorrect");
			this.style.background = "black";

		}
}

function pickRGBIndex(){
	if(IS_HARD){
		RGB_GOAL = (Math.floor((Math.random()*10)))%6;
		return Number(RGB_GOAL) + 1;	
	}
	else{
		RGB_GOAL = (Math.floor((Math.random()*10)))%3;
		return Number(RGB_GOAL) + 1;	
	}

}

//functions


//event listeners
newColorBtn.addEventListener("click", function(){
	console.log("newColorsBtn clicked...\n");
	if(IS_HARD){
		hardGame();
	}
	else{
		easyGame();
	}
	//selecting the RGB Goal and setting the header
	var squareNum = pickRGBIndex();
	RGB_GOAL = document.getElementById("color" + squareNum).style.background;
	document.getElementById("rgbColor").textContent = RGB_GOAL;
	console.log("RGBGoal is: " + RGB_GOAL);
});

easyBtn.addEventListener("click", function(){
	console.log("easyBtn clicked...\n");
	IS_HARD = false;
	document.getElementById("easyBtn").style.background = "#9ca9e3";
	document.getElementById("hardBtn").style.background = "white";
});

hardBtn.addEventListener("click", function(){
	console.log("hardBtn clicked...\n");
	IS_HARD = true;
	document.getElementById("hardBtn").style.background = "#9ca9e3";
	document.getElementById("easyBtn").style.background = "white";
});


// Script to load when the page loads.
IS_HARD = true;
document.getElementById("hardBtn").style.background = "#9ca9e3";
hardGame();
var squareNum = pickRGBIndex();
RGB_GOAL = document.getElementById("color" + squareNum).style.background;
document.getElementById("rgbColor").textContent = RGB_GOAL;
console.log("RGBGoal is: " + RGB_GOAL);

//Adding event listener to buttons
for(var i = 0; i < HARD_MAX; i++){
	myBtns[i].addEventListener("click", squareEvent);
}

