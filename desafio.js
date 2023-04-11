/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */


let userCards = [];
let machineCards = [];
const usuario = "Usuário";
const computador = "Computador";
let scoreUser = 0;
let scoreMachine = 0;
let winner = "";
let textUserCards = "";
let textMachineCards = "";
let buyCard;
let check = true;
 
function launchGame () {
   for (let index = 0; index < 2; index++) {
      userCards.push(comprarCarta());
      machineCards.push(comprarCarta());
   }
}    

function checkingAcart () {
   if (userCards[0].texto === "A" && userCards[1].texto === "A" || machineCards[0].texto === "A" && machineCards[1].texto === "A") {
   userCards = [];
   machineCards = [];
   launchGame();
  }
}

function calculateScores () {
   scoreUser = 0;
   scoreMachine = 0;
   for (let i = 0; i < userCards.length; i++) {
      scoreUser += userCards[i].valor;
   }

   for (let i = 0; i < machineCards.length; i++) {
      scoreMachine += machineCards[i].valor;
   }
}

function checkingWinner () {
   if (scoreMachine > 21 || (scoreUser > scoreMachine && scoreUser <= 21)) {
      winner = "O usuário ganhou!";
   }
   else if (scoreUser > 21 || (scoreMachine > scoreUser && scoreMachine <= 21)) {
      winner = "O computador ganhou!";
   }
   else if (scoreUser === scoreMachine) {
      winner = "Empate!"
   }
}

function printResults () {
   textUserCards = userCards.map(card => card.texto).join(" ");
   textMachineCards = machineCards.map(card => card.texto).join(" ");
  
   alert(
      `Usario - Cartas: ${textUserCards} - Pontuação: ${scoreUser}
Computador - Cartas: ${textMachineCards} - Pontuação: ${scoreMachine} 
${winner}`
   )
}

function showAndBuyCard () {
   buyCard = confirm(`Suas cartas são ${textUserCards}. A carta revelada do computador é ${machineCards[0].texto}.
Deseja comprar mais uma carta?`)

   if (buyCard) {
      userCards.push(comprarCarta());
      textUserCards = userCards.map(card => card.texto).join(" ");
      calculateScores()
   }
   else {
      while(scoreMachine < scoreUser) {
         machineCards.push(comprarCarta());
         textMachineCards = machineCards.map(card => card.texto).join(" ");
         calculateScores();
      }
      check = false;
   }       
} 

const startRound = confirm("Bem-vindo(a) ao jogo de blackjack!\nQuer iniciar uma nova rodada?");

if (startRound) {
   launchGame();
   checkingAcart();
   calculateScores();
   textUserCards = userCards.map(card => card.texto).join(" ");
   textMachineCards = machineCards.map(card => card.texto).join(" ");
   while (scoreUser < 21 && check === true) {
      showAndBuyCard()
  }
  checkingWinner();
  printResults();
}
else {
   alert("O jogo acabou.")
}
   