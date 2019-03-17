var questions = [

	{
		question: "What popular soda beverage was originally developed as a mixer for whiskey?",
		options: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
		answer: 0,
	},
	{
		question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?",
		options: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
		answer: 1,
	},
	{
		question: "Kopi luwak is a very expensive type of what?",
		options: ["Spice", "Caviar", "Coffee", "Rice variety"],
		answer: 2,
		
	},
	{
		question: "Which is not an ingredient in a Harvey Wallbanger cocktail?",
		options: ["Orange Juice", "Vodka", "Sour Mix", "Galliano"],
		answer: 2,
	},
	{
		question: "How many items are there in a Bakers' Dozen?",
		options: ["12", "6", "24", "13"],
		answer: 3,
	},
	{
		question: "What is the most widely eaten fish in the world?",
		options: ["Tilapia", "Herring", "Sardine", "Tuna"],
		answer: 1,
	},
	{
		question: "Which fruit does not ripen once it has been picked?",
		options: ["Banana", "Lemon", "Mango", "Apple"],
		answer: 1,
	},
	{
		question: "Which fruit contains the most protein per 100 calories?",
		options: ["Guava", "Avocado", "Banana", "Blackberries"],
		answer: 0,
	},
		{
			question: "Which fruit contains the most protein per 100 calories?",
			options: ["Guava", "Avocado", "Banana", "Blackberries"],
			answer: 0,
	}]; 

// correct and incorrect answer begins at 0;
var incorrectAnswers = 0;
var correctAnswers = 0;

$(document).ready(function () {
	document.getElementById('game').style.display = "none";
	document.getElementById('results').style.display = "none";
	document.getElementById('welcome').style.display = "block";
});
// when you click the "start" button:
$("#beginBtn").on("click", function () {

	document.getElementById('welcome').style.display = "none";
	document.getElementById('results').style.display = "none";
	document.getElementById('game').style.display = "block";

	// timer function
	var time = 90;
	var timerDiv = document.getElementById('timer');
	var timerInt = setInterval(countdown, 1000);

	function countdown() {
		//if time runs out end game, otherwise keep counting down
		if (time == 0) {
			clearTimeout(timerInt);
			endGame();
		} else {
			timerDiv.innerHTML = (time + " SECONDS REMAINING");
			time--;
		}
	};
	//end game function
	function endGame() {
		gameResults();
	}
	// questions appear
	function triviaQuestions() {
		for (var i = 0; i < questions.length; i++) {
			//create variables for the new divs that are added to #qNa div
			var qDiv = $("<div>");
			var aDiv = $("<form action='#'></form>");
			//append question to div
			qDiv.append(questions[i].question);
			//append answer options to div with radio buttons
			for (var a = 0; a < questions[i].options.length; a++) {
				//create variables for the answer input options and labels
				var p = $("<p>");
				var label = $("<label>");
				var input = $("<input type='radio' name='answer" + i + "' id='" + questions[i].options[a] + "'class='with-gap' color='black' />");
				var span = $("<span>" + questions[i].options[a] + "</span>");

				//now trigger the appending
				aDiv.append(p);
				p.append(label);
				label.append(input);
				label.append(span);
			}
			//append the question and answer to #qNa div
			$("#qNa").append(qDiv);
			$("#qNa").append(aDiv);
		};
	}

	//submit button ends game
	$("#submitBtn").on("click", function () {
		endGame();
		gameResults();

		console.log("Correct answers: " + correctAnswers);
		console.log("incorrect answers: " + incorrectAnswers);



	})
	//retrieve answer values and store score in correct/incorrect answer var
	function getScore() {
		for (var i = 0; i < questions.length; i++) {
			var value = $("input[name='answer" + i + "']:checked")[0];
			//if value is undefined it will count as wrong, 
			//if value does not match correct answer it will count as wrong,
			//if value matches correct answer it will count as right
			if ((typeof value) != 'undefined') {
				value = value.id;
				if (value == questions[i].answer) {
					correctAnswers++;
				} else {
					incorrectAnswers++;
				}
			} else { incorrectAnswers++; }
		}
	}
	//show score
	function gameResults() {
		//call function to retrieve answer values
		getScore();
		//hide the trivia game and show results div
		document.getElementById('game').style.display = "none";
		document.getElementById('results').style.display = "block";
		//append score to correct/incorrect div
		$("#correct").append(correctAnswers);
		$("#incorrect").append(incorrectAnswers);

	}

	//start game
	triviaQuestions();
	countdown();


});