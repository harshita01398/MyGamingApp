
var numOfSq = 6;
var colors;
var cor_col;

var h1 = document.querySelector("h1");
var sqlst = document.querySelectorAll(".square");
var resetBut = document.querySelector("#reset");
var modlst = document.querySelectorAll(".mode");

init();

function init()
{		
	for(var j = 0;j<modlst.length;j++)
	{
		modlst[j].addEventListener("click",function(){
		
			this.textContent === "Easy"? numOfSq=3: numOfSq=6;
			modlst[0].classList.remove("selected");
			modlst[1].classList.remove("selected");
			this.classList.add("selected");
			reset();
		})
	}

	for(var i =0;i<sqlst.length; i++)
	{

		sqlst[i].addEventListener("click",function()
		{
			if(this.style.background===cor_col)
			{
				
				msg.textContent = "Correct";
				change_colors(cor_col);
				h1.style.background = cor_col;
				resetBut.textContent = "Play Again?";
			}
			else
			{
				this.style.background = "white";
				this.style.opacity = 0; 
				msg.textContent = "Try Again";
			}
		})
	}

	reset();
}


resetBut.addEventListener("click",reset);

function reset()
{
	colors = generateSqColors(numOfSq);
	cor_col = pickColor();
	setColor();
	colorh1.textContent = cor_col;
	h1.style.background = "linear-gradient(160deg, #02ccba, #aa7ecd )";
	resetBut.textContent = "Change Color";
	msg.textContent = "";
}


function setColor()
{
	for(var i =0;i<sqlst.length;i++)
	{
		if(colors[i])
		{
			sqlst[i].style.display = "block";
			sqlst[i].style.background = colors[i];
		
		}
		else
			sqlst[i].style.display = "none";
	}
}


function change_colors(color){
	for(var i =0;i<sqlst.length;i++)
		{
			sqlst[i].style.background = color;
			sqlst[i].style.opacity = 1;
		}
}


function pickColor(){
	var rand = Math.floor(Math.random()*colors.length);
	return colors[rand];
}


function generateSqColors(numc){
	var arr = [];
	for(var i =0;i<numc;i++)
	{
		arr.push(randomColor());
	}
	return arr;
}


function randomColor()
{
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	var col = "rgb("+r+", "+g+", "+b+")";
	return col;
}
