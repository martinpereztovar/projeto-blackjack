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
   for (let i = 0; i < userCards.length; i++) {
      scoreUser += userCards[i].valor;
   }

   for (let i = 0; i < machineCards.length; i++) {
      scoreMachine += machineCards[i].valor;
   }
}

function checkingWinner () {
   if (scoreUser === 21 || scoreUser < 21 && scoreUser > scoreMachine) {
      winner = "O usuário ganhou!";
   }
   else if (scoreMachine === 21 || scoreMachine < 21 && scoreMachine > scoreUser) {
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
   buyCard = confirm(`Suas cartas são ${userCards[0].texto} ${userCards[1].texto}. A carta revelada do computador é ${machineCards[0].texto}.
Deseja comprar mais uma carta?`)

   if (buyCard) {
      userCards.push(comprarCarta());
      textUserCards = userCards.map(card => card.texto).join(" ");
      calculateScores()
   } else {}
      buyCard = confirm(`Suas cartas são ${textUserCards}. A carta revelada do computador é ${machineCards[0].texto}.
Deseja comprar mais uma carta?`)
   
   if (buyCard === false && scoreUser <= 21) {
      do {
         machineCards.push(comprarCarta());
         checkingWinner();
      }
      while(scoreMachine <= scoreUser)
   }
   else {
      checkingWinner();
      printResults();
   }
} 

const startRound = confirm("Bem-vindo(a) ao jogo de blackjack!\nQuer iniciar uma nova rodada?");

if (startRound === true) {
   launchGame();
   checkingAcart();
   calculateScores();
   showAndBuyCard();
}
else {
   alert("O jogo acabou.")
}
   