<p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/home.png" alt="Patient Management System"></a>
</p>

<h3 align="center">Patient Management System</h3>

---

## Description

The Patient Managment System (PMS) is a simple application to store the patient details, generate queue number and view doctor's log tagged to the respective patient. This project utilise MongoDB database and has 3 data models; users (doctors and nurses), patient and queue number. It also uses cookies session for authentication of users.

## Timeframe

5 days

## Deployment

The application is deployed on Cyclic. Click <a href="https://comfortable-kerchief-pig.cyclic.app">here</a> to access application. 

## Features
<li>CRUD model on patients, queue nubmer and user</li>
<li>Using RESTFul Routes</li>
<li>Error validation on both the client and the backend server</li>
<li>Adopt the MVC approach; Model, View and Controller</li>

## Technologies & Tools Used
<li>EJS</li>
<li>Javascript</li>
<li>CSS</li>
<li>Git commands</li>
<li>Jest for unit testing</li>
<li>MongoDB</li>
<li>NodeJS</li>
<br>

## NodeJS packages installed and used
```
npm install -g express-generator
npm install mongoose
npm install --save-dev jest 
npm install dotenv --save
npm install method-override
npm install bcrypt
npm install nodemailer
npm install validator
npm install connect-mongo
npm install supertest
npm install cookie-parser
```
## Configuring Jest in json
```.json
  scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www",
    "test": "jest --testTimeout=5000"
  },
```
## Application Structure</a>
Brainstorming what are the fields required for all data models and which referencing method would be relevant.

<strong><u>Application Setup:</u></strong>

<li>Identify the GET and POST routes.</li>
<li>Setting up MongoDB.</li>
<li>Validation in the data models.</li>
<li>Reading up on Mongoose documentation.</li>
<li>Enable logging in, logging out and reset password.</li>
<li>Creating the authentication.</li>
</li>
<br>

<strong><u>Login:</u></strong>
<li>Create and setting up the users model, controller and view.</li>
<li>Enable users to login, logout and reset password.</li>
<li>Enable to create new user.</li>
<li>Authenticating routes.</li>
<br>

<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/login.png" alt="Login"></a>
</p>
<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/forget.png" alt="Forget Password"></a>
</p>
<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/signup.png" alt="Create User"></a>
</p>
<br>

<strong><u>Patient:</u></strong>
<li>Enable to create, update, delete and view patient profile.</li>
<li>Identifying routes for each action is done; ie form clicked.</li>
<li>Using embedding method to create, update, delete and view patient's log.</li>

<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/retrieve.png" alt="Login"></a>
</p>
<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/amend.png" alt="Forget Password"></a>
</p>
<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/signup.png" alt="Create User"></a>
</p>
<br>

<strong><u>Queue Number:</u></strong>
<li>Enable to create, update, delete and view queue number.</li>
<li>Identifying routes for each action is done; ie form clicked.</li>
<br>
 <p align="center">
  <a href="" rel="noopener">
 <img width=800px height=600px src="/image/showqueue.png" alt="Create User"></a>
</p>
<br>

## Deliverables Timeline
<strong><u>Day 1:</u></strong>
<li>Drafting up the routes</li>
<li>Creating the data models</li>
<li>Brainstroming the syntax required for the game</li>
<li>Writing up the backbone of the game</li>
<li>Getting both the animations and sounds to work</li>
<br>
<strong><u>Day 2:</u></strong>
<li>Writing up the backbone of the game</li>
<li>Introduce both game and difficulty level</li>
<li>DOM manipulation and inserting click event listener</li>
<li>Implementing setTimeout</li>
<br>
<strong><u>Day 3:</u></strong>
<br>
<li>DOM manipulation and inserting click event listener</li>
<li>CSS structure</li>
<li>HTML structure</li>
<br>
<strong><u>Day 4:</u></strong>
<br>
<li>DOM manipulation and inserting click event listener</li>
<li>CSS structure</li>
<li>HTML structure</li>
<br>
<strong><u>Day 5:</u></strong>
<br>
<li>Wrap up</li>
<br>

## Key Takeaways
These are key takeaways when working on the project:
<li>Drafting up project requirements</li>
<li>Making it a habit to comment the codes for easy reference and readability</li>
<li>Writing mulitple console.log syntax to ensure that the function or codes are returning the correct values</li>
<li>Assign meaningful name to functions for easy readability</li>
<li>Create functions in order to reduce duplication codes</li>
<li>Returning multiple values from an function using an object like the one shown below</li>

```js
function difficultyLevel(selectDifficultyLevel){

	switch (selectDifficultyLevel) {

		case 'Easy':
			maxLevel = 20;
			numberOfLives = 0;  
			break;

		case 'Normal':
			maxLevel = 25;
			numberOfLives = 2;			
			break;

		case 'Difficult':
			maxLevel = 3;
			numberOfLives = 2;
			buttonColors.push('orange', 'purple');	
			$('#difficult-level').css('display', 'flex');		
			break;
		default:
			$('#enter').css('cursor', 'none');  
			break;
	}
	return{maxLevel, numberOfLives} ;
}

let difficulty = difficultyLevel(selectDifficultyLevel);
maxLevel = difficulty.maxLevel;
numberOfLives = difficulty.numberOfLives;

```
<li>Learning callbacks in class and applying it in practise</li>
<br>
<p>The difficultyLevel function is the callback function that is called by getDifficuiltyLevel to compute the values for the maximum level and number of lives.</p> 
<p>Which is later executed in response to a specific event such as the player clicking on a dropdown menu.</p>

```js
function difficultyLevel(selectDifficultyLevel){
	switch (selectDifficultyLevel) {
		case 'Easy':
			maxLevel = 20;
			numberOfLives = 0;  
			break;
		case 'Normal':
			maxLevel = 25;
			numberOfLives = 2;			
			break;

		case 'Difficult':
			maxLevel = 30;
			numberOfLives = 2;
			buttonColors.push('orange', 'purple');	
			$('#difficult-level').css('display', 'flex');		
			break;
		default:
			$('#enter').css('cursor', 'none');  
			break;
	}
	return{maxLevel, numberOfLives} ;
}

function getDifficuiltyLevel(difficultyLevel) {
	$('.dropdown-content a').click(function() {
		const clickDropDownContent = $(this);
		if (selectDifficultyLevel !== '' && clickDropDownContent.text() !== selectDifficultyLevel) {
			$('.dropdown-content a').removeClass('pressed');
		}
		clickDropDownContent.addClass('pressed');
		selectDifficultyLevel = clickDropDownContent.text();
		difficultyLevel(selectDifficultyLevel); 
	});
}
getDifficuiltyLevel(difficultyLevel);
```
<br>

getGameLevel function is used to extract the gameLevel from the generateColorCombination which will then be used to return the value of the gameLevel.

```js

function generateColorCombination(getGameLevel){
    userClickPattern = [];
    $('#level-title').text(`Level ${gameLevel}/Level ${maxLevel}`);
    $('.container').css('pointer-events', 'auto');
    gamePattern = [];
	
    for(let i = 0; i < gameLevel; i++){
		
		if (gameLevel > maxLevel) {
			checkWin();
			break;
		}
        const colorIndex = Math.floor(Math.random() * buttonColors.length);
        const color = buttonColors[colorIndex];
        gamePattern.push(color);
        gamePattern.forEach((color, index) => {
			setTimeout(() => {
				$('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
				playSound(color);
			}, index * 500);
		});
        console.log("gamePattern: " + gamePattern);
	}
	getGameLevel(gameLevel);
}

function getGameLevel(gameLevel){
	return gameLevel;
}
```

## Future Enhancements
<p>As this game is part of a project submission, there would not be an future amendments made to this.</p>However, if there were any future enhancements to be made, these would be the following changes:</p>
<li>Rewrite the code using the MVC approach</li>
<li>Insert a countdown timer for the Normal levels and above</li>
<li>Introduce different sounds/genre for the player to choose from</li>
<li>Allowing the game to be paused half-way which also reduce player's live</li>
<li>Include a mixtype to hype up the music</li>

<br>
## References
Various sources which I have seek guidance from:
</li>
<li><a href=https://stackoverflow.com/questions/9419263/how-to-play-audio>Adding audio using javascript</a>
</li>
<li><a href=https://codepen.io/BenLBlood/pen/LGLEoJ>Simon Game</a>
</li>
<li><a href=https://www.javascripttutorial.net/javascript-return-multiple-values>Returning Multiple Values from a Function</a>
</li>
<li><a href=https://www.geeksforgeeks.org/jquery-not-method-with-examples>How to use not method in jQuery</a>
</li>
<li><a href=https://archive.jestjs.io/docs/en/24.x/configuration>Configuring Jest</a>
</li>
<li><a href=https://stackoverflow.com/questions/44970683/how-to-test-if-function-was-called-with-defined-parameters-tohavebeencalledwit>How to test if function was called with defined parameters ( toHaveBeenCalledWith ) with Jest</a>
</li>
<li><a href=https://stackoverflow.com/questions/40992628/what-does-jest-fn-do-and-how-can-i-use-it>What does jest.fn() do and how can I use it?</a>
</li>
<li><a href=https://stackoverflow.com/questions/49096093/how-do-i-test-a-jest-console-log>How do I test a jest console.log</a>
</li>
<li><a href=https://stackoverflow.com/questions/33638385/simulate-keydown-on-document-for-jest-unit-testing>Simulate keydown on document for JEST unit testing</a>
</li>

<br>

## Game Asset Attribution
The game assets in this project does not belong to me. All rights belong to the original artists and owners. Below are the links to the game assets used in this project:
<li><a href=https://codepen.io/araltasher/pen/XBXKjb>Pixel Heart</a>
<li><a href=https://github.com/londonappbrewery/Simon-Game>App Brewery</a>
<li><a href=https://pixabay.com/sound-effects/tadaa-47995>Audio</a>

