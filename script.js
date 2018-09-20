console.log("script.js page loaded...\n");

//variables - element objects
var newColorBtn = document.getElementById("newColorsBtn");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");
var pickResult = document.getElementById("pickResult");

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

function mouseoutEvent(){
	console.log("mouseout event called...\n");
	this.style.backgroundColor = "white";
}


//===== square button event callback ======
function squareEvent(){
		if(this.style.background == RGB_GOAL){
			//success, turn every color into this color, game over.
			console.log("correct");
			pickResult.textContent = "You got it!";
			for(var i = 0; i < myBtns.length; i++){
				myBtns[i].style.background = RGB_GOAL;
				myBtns[i].removeEventListener("click", squareEvent);
			}	

			RGB_GOAL = undefined;
		}
		else{
			pickResult.textContent = "Try Again";
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
	pickResult.textContent = "";
	if(IS_HARD){
		hardGame();
		for(var i = 0; i < HARD_MAX; i++){
			myBtns[i].addEventListener("click", squareEvent);
		}
	}
	else{
		easyGame();
		for(var i = 0; i < EASY_MAX; i++){
			myBtns[i].addEventListener("click", squareEvent);
		}
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
	document.getElementById("hardBtn").style.background = "rgb(156, 169, 227";
	document.getElementById("easyBtn").style.background = "white";
});


// Script to load when the page loads.
IS_HARD = true;
document.getElementById("hardBtn").style.background = "rgb(156, 169, 227";
hardGame();
var squareNum = pickRGBIndex();
RGB_GOAL = document.getElementById("color" + squareNum).style.background;
document.getElementById("rgbColor").textContent = RGB_GOAL;
console.log("RGBGoal is: " + RGB_GOAL);

//Adding event listener to buttons
for(var i = 0; i < HARD_MAX; i++){
	myBtns[i].addEventListener("click", squareEvent);
}

var settingBtns = document.getElementsByClassName("settings");
console.log(settingBtns);
for(var i = 1; i < settingBtns.length; i++){
	settingBtns[i].addEventListener("mouseover", function() {
		console.log("onmouseover event called...\n");

		console.log(this.style.backgroundColor);

		if(this.style.backgroundColor == "rgb(156, 169, 227)"){
			console.log("this is a active element");
		}
    	else{this.style.backgroundColor !== "rgb(156, 169, 227"
    		this.style.backgroundColor = "#ABCDEF";
			this.addEventListener("mouseout", mouseoutEvent);
    	}
	});

}

for(var i = 1; i < settingBtns.length; i++){
	settingBtns[i].addEventListener("click", function() {
		console.log("click event called...\n");
    	this.style.backgroundColor = "#9ca9e3";
    	this.removeEventListener("mouseout", mouseoutEvent)
	});
}

