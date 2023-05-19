 // Hämtar "fname" från parameter från URL 
 
 
 const urlParams = new URLSearchParams(window.location.search);
 const name = urlParams.get('fname');

 // Displayar namnet på sidan
 const nameContainer = document.getElementById('nameContainer');
 nameContainer.innerHTML = `Hello , ${name}! choose one of the followings`

 // skulle du spela spelet utan något namn kommer du få namnet "Unknown user"
 if(name == '') {
    nameContainer.innerHTML = `Hello , Unknown User choose one of the followings`

 }
 let buttons = document.querySelectorAll('button');


const array = ["Sten", "Sax", "Påse"];
let randomWord = 'tbd';
let humanScore = 0;
let botScore = 0;
// Här deklarerar jag alla variabler på ett ställe, vanligtvis högst upp för att organisera koden 
let computerScore = document.getElementById('computerScore')
let playerScore = document.getElementById('playerScore')
let humanP = document.getElementById('humanP');
let computerP = document.getElementById("computerP");
let result = document.getElementById("result")


// I denna funktion deklareras en knapp ifall datorn eller spelaren skulle uppnå 3 poäng. Funktonen anropas vid rad 73 och 76.
function replayGame() {
   let replayButton = document.createElement('button');
   replayButton.textContent = "Play again";   
   document.body.appendChild(replayButton);
      
   replayButton.addEventListener('click', ()=>{
      humanScore = 0;
      botScore = 0;
      computerScore.innerText = "computer Score: " + botScore;
      playerScore.innerText = "Player Score: " + humanScore;
      humanP.innerText =  'Du valde: '
      computerP.textContent = 'The computers choice is: ';
      result.innerText = "Result:";
      document.body.removeChild(replayButton)
   })
}

// foreach för att få fram värdet för varje knapp alltså, "sten, sax, påse " där knapparna har klick eventet. 
// Dessutom deklareras score för datorn och spelaren som med hjälp av switch casen adderar med ett för varje gång en av oss vinner. om det är lika får ingen poäng. 
// efter en av oss har fått 3 poäng kommer som sagt "replayGame" funktionen fram med en knapp för att spela igen
buttons.forEach(button =>{
   button.addEventListener('click', (event) =>{
      console.log(button.value)
      if(humanScore === 3 || botScore === 3) {
         return;
      }
      
      humanP.innerText =  'Du valde: ' + button.value;
      let botChoice = computerChoice();   
      let score = outcome(button.value, botChoice);
      console.log(score)
      if(humanScore < 3 && botScore < 3) {
      switch(score) {
         case -1: botScore++; computerScore.innerText = "computer Score: " + botScore;
         break;
         case 1: humanScore++; playerScore.innerText = "Player Score: " + humanScore;
         break;
         case 0: 
         break;
         default:
         break;
      }
   } if(humanScore === 3){
      replayGame();
   } if(botScore === 3) {
      
      replayGame()
   } 
})
})


 


// DATORN!!
// med denna funktion väljer datorn ett slumpmässigt val mellan sten sax och påse vilket utförs efter varje gång spelaren har klickat på sitt val.
function computerChoice() {
   const randomIndex = Math.floor(Math.random() * array.length);

   randomWord = array[randomIndex];
   
   computerP.textContent = 'The computers choice is: ' + randomWord;
   return randomWord;

}

const winningChoices = {
   Sten: "Sax",
   Sax: "Påse",
   Påse: "Sten"
}


// Denna funktion tar emot två parametrar vilket är till för att ge oss resultatet. Om datorn och användaren skulle få samma resultat returneras en 0 vilket är draw.
// om vi skulle vinna returneras en etta och om datorn vinner returneras -1 vilket är en förlust för oss. 
function outcome(humanChoice, botChoice) {
   if(botChoice === humanChoice) {
      
      
      result.innerText = "Result: Its a draw"
      return 0;

      // när vi gör ett val så indexar vi ut vilket val motståndaren ska ha valt för att vi ska vinna.
   } else if(winningChoices[humanChoice] === botChoice) {

      
      result.innerText = "Result: you won";
      return 1;

   } else {
      
      result.innerText = "Result: Computer wins" 
      return -1;
   }
}





