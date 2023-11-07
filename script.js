//STEP 1: Defining the secret word:
const technics = [`typescript`, `scrum`, `kanban`, `node`, `react`, ];
const secretWord = technics[Math.floor(Math.random()*technics.length)];


//Storing the typed letter:
const wrongLetters = [];
const correctLetters = [];
let gameEnded = false;


//STEP 2: Identify the key on keyboard,
//Condition if letter is repeted correct or wrong.
document.addEventListener(`keydown`, (event) => {
    const code = event.keyCode; // "A" start in code 65 and  "Z" end in code 90.
    if(isLetter(code)) //Validate if the code is part of the interval (65-90).
    {
        const letter = event.key; //Recognize the letter pressed.

        //Validations to se if the letter is part of the word or not and store this.
        //Create arrays wrongLetters[] and correctLetters[] to store this.
        if(wrongLetters.includes(letter)) {
            showWarningScreen(); //Screen to say that the letter is repeated. 
        } else {
            if(secretWord.includes(letter)) {
                correctLetters.push(letter);
            } else {
                wrongLetters.push(letter);
            }
        }
        //STEP 3 Uppdate game to render item on the screen.
        updateGame();
    }   
})

//STEP 3.1 Update game following the sequence. 
function updateGame() {
    showWrongLetters(); 
    showCorrectLetters();
    drawHangman();
    checkGame();
}

//STEP 3.1.1 Show wrong letters on screen.
function showWrongLetters() {
    const div = document.querySelector(`.wrong-letters-container`);
    div.innerHTML = `<h3>Wrong letters:</h3>`; //clear element - no repeat letter.

    wrongLetters.forEach(letter => {
        div.innerHTML += `<span>${letter}</span>`; /*Span is a setting made i css so that the letter is positioned correctly on the screen.*/
    });
}

//STEP 3.1.2
function showCorrectLetters() {
    const container = document.querySelector(`.secret-word-container`);
    container.innerHTML = "";

    //If the word is not revealed it has to show a "_", otherwise shows letter.
    /*Split with empty string. If word is java => ["j", "a", "v", "a"].forEach() <= correctLetters. */
    secretWord.split("").forEach(letter => {
        if(correctLetters.includes(letter)) {
            container.innerHTML += `<span>${letter}</span>`;
        } else {
            container.innerHTML += `<span> _ </span>`
        }
    }) 
}

// STEP 3.1.4
function checkGame() {
    let message = "";
    const container = document.querySelector(`.secret-word-container`);
    const bodyParts = document.querySelectorAll(`.body-part`);

    if(wrongLetters.length === bodyParts.length) {
        message = "Game over. You lose. ";
        gameEnded = true;
    }

    if(secretWord === container.innerText) {
        message = "Congratulations. You won!";
    }

    if (gameEnded) {
        document.querySelector("#message").innerHTML = message;
        document.querySelector(".popup-container").style.display = "flex";
        document.querySelector("#secret-word").innerHTML = `The secret word was: ${secretWord}`;
    }

    if(message) {
        document.querySelector("#message").innerHTML = message;
        document.querySelector(".popup-container").style.display = `flex`;
    }
}

//STEP 3.1.3
function drawHangman() {
    const bodyParts = document.querySelectorAll(".body-part");
    for (let i = 0; i < wrongLetters.length; i++) {
        bodyParts[i].style.display = "block";
    }
}

//STEP 2.2 
function showWarningScreen() {
    const warning = document.querySelector(`.warning-repeated-word`);
    warning.classList.add(`show`); /*class created to do the element appear or disappear*/
    setTimeout(() => { //After a second the warning will disappear.
        warning.classList.remove(`show`);
    }, 1000);
}

//STEP 2.1
function isLetter(code) {
    return code >= 65 && code <=90;
}

//STEP 4
function restartGame() {
    window.location.reload();
}


