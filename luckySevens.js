function clearErrors() {
    for (var loopCounter = 0;
        loopCounter < document.forms["numberFun"].elements.length;
        loopCounter++) {
        if (document.forms["numberFun"].elements[loopCounter]
           .parentElement.className.indexOf("has-") != -1) {

            document.forms["numberFun"].elements[loopCounter]
               .parentElement.className = "form-group";
        }
    }
}

function resetForm() {
    clearErrors();
    document.forms["numberFun"]["bet"].value = "";
    document.getElementById("results").style.display = "none";
    document.getElementById('submitButton').innerText = "Submit";
    document.forms["numberFun"]["bet"].focus();
}

function validateItems() {
    clearErrors();
    var bet = document.forms["numberFun"]["bet"].value;
    if (bet == "" || isNaN(bet)) {
        alert("Starting Bet must be filled in with a number.");
        document.forms["numberFun"]["bet"]
           .parentElement.className = "form-group has-error";
        document.forms["numberFun"]["bet"].focus();
        return false;
    }

    if (bet <= 0) {
        alert("Starting Bet must be positive.");
        document.forms["numberFun"]["bet"]
           .parentElement.className = "form-group has-error";
        document.forms["numberFun"]["bet"].focus();
        return false;
    }

    /*Will playGame() here and return an array of the needed values. This array consists of the total number of rolls before going broke, the most money the play has at any point, and at which dice roll they had that money.*/
    var resultsArray = playGame(bet);
    var rolls = resultsArray[0];
    var maxMoney = resultsArray[1];
    var rollAtMaxMoney = resultsArray[2];

   document.getElementById("results").style.display = "block";
   document.getElementById("submitButton").innerText = "Play Again";
   document.getElementById("startingBet").innerText =  "$" + bet;
   document.getElementById("totalRolls").innerText = rolls;
   document.getElementById("maxGameMoney").innerText = "$" + maxMoney;
   document.getElementById("rollAtMaxGameMoney").innerText = rollAtMaxMoney;
   // We are returning false so that the form doesn't submit
   // and so that we can see the results
   return false;
}


function playGame(bet) {
  var gameMoney = parseInt(bet);
  var rolls= 0;
  var maxMoney = parseInt(bet);
  var rollsAtMaxMoney = 0;

  while (gameMoney>0){
      //tracks times we roll dice
      rolls++;
      /*increases game money by 4 if we roll a seven and decreases it by 1 otherwise.*/
      if (rollDice()===7){
          gameMoney += 4;
      }else{
          gameMoney -=1;
      }
      /*Checks if we have a soon biggest amount won, and reassigns maxWon and rollsAtMaxWon if yes.*/
      if (gameMoney > maxMoney){
          maxMoney = gameMoney;
          rollsAtMaxMoney = rolls;
      }
  }
   /*This is the results array corresponding to the total rolls before going broke, the most money the player has at any point, and which roll they were on when they had the highest amount.) */
  var resultsArray = [rolls, maxMoney, rollsAtMaxMoney];
  return resultsArray;
}

//Virtually rolls two dice and returns their sum.
function rollDice() {
    var die1 = Math.floor(Math.random()*6)+1;
    var die2 = Math.floor(Math.random()*6)+1;
    var sum = die1 + die2;
    return sum;
}
