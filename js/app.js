/*-------------------------------- Constants --------------------------------*/
//play 1 is the player
//comp 2 is the computer player on the right of the user
//comp 3 is the user's computer teammate, accross from the user
//comp 4 is the computer player on the left of the user


let player1 = []
let player2 = []
let player3 = []
let player4 = []

let dominoes = []
// this works showing that if a value of 6 is here 0 horizontal
let board = new Array(140).fill([null, null])


let rightEnd = 0
let leftEnd = 0

let currentTurn = 0

let numberPasses

let isWinner


/*-------------------------------- Variables --------------------------------*/
/*------------------------ Cached Element References ------------------------*/
const gameBoard = document.querySelector(".gameBoard")
const messageEL = document.querySelector("#play-status")
const player1Dominoes = document.querySelector("#player-01")
const player2Dominoes = document.querySelector("#player-02")
const player3Dominoes = document.querySelector("#player-03")
const player4Dominoes = document.querySelector("#player-04")

console.log(gameBoard)
/*----------------------------- Event Listeners -----------------------------*/
/*-------------------------------- Functions --------------------------------*/
init()

function init() {

  isWinner = null
  numberPasses = 0

  dominoes = [[6,6], [6,5], [6,4], [6,3], [6,2], [6,1], [6,0],
  [5,5], [5,4], [5,3], [5,2], [5,1], [5,0],
  [4,4], [4,3], [4,2], [4,1], [4,0],
  [3,3], [3,2], [3,1], [3,0],
  [2,2], [2,1], [2,0],
  [1,1], [1,0], [0,0]]

  shuffleDominoes()
  linkDominoesToPlayers()

  currentTurn = findDoubleSix()
  console.log(currentTurn)

  render()


}

function render(){
//refresh the player's dominoes
linkDominoesToPlayers()
//Link the gameboard array to the grid in the html
linkGridToBoard()

//displaying the message of which player's turn it is
if(currentTurn === 5){
  currentTurn = 1
}

isWinner()
if(isWinner === null){
  messageEL.textContent = `Game still in Progress it is Player ${currentTurn}'s Turn`
}

if(isWinner === 1 || isWinner === 2 || isWinner === 3 || isWinner === 4){
  messageEL.textContent = `${isWinner} is the Winner!`
}

if(isWinner === 0){
  messageEL.textContent = `IT IS A TIE!`
}

}

function isWinner(){
  if(player1.length === 0){
    isWinner = 1
  }
  if(player2.length === 0){
    isWinner = 2
  }
  if(player3.length === 0){
    isWinner = 3
  }
  if(player4.length === 0){
    isWinner = 4
  }
  if(numberPasses === 0){
    isWinner = 0
  }

}

function shuffleDominoes() {
  //choose a random index from dominoes
  //iterating through each player and computer's decks of dominoes, total of 4 arrays
  for (let i = 1; i < 8; i++) {
    let randDominoeIndex = Math.floor(Math.random() * dominoes.length)
    let dominoePicked = dominoes.splice(randDominoeIndex, 1)
    player1.push(dominoePicked)

    randDominoeIndex = Math.floor(Math.random() * dominoes.length)
    dominoePicked = dominoes.splice(randDominoeIndex, 1)
    player2.push(dominoePicked)

    randDominoeIndex = Math.floor(Math.random() * dominoes.length)
    dominoePicked = dominoes.splice(randDominoeIndex, 1)
    player3.push(dominoePicked)

    randDominoeIndex = Math.floor(Math.random() * dominoes.length)
    dominoePicked = dominoes.splice(randDominoeIndex, 1)
    player4.push(dominoePicked)

  }
  //splice that index from dominoes and store it in a variable. Take out of the dominoe "deck" and put that in each players deck. 
}


function linkDominoesToPlayers() {
  //need to link the divs in each players dominoes to the array of dominoes for each player
  //loop 
  //First Clear and delete each div element from each player and recreate based on their corresponding
    //arrays
  while(player1Dominoes.firstChild){
    player1Dominoes.removeChild(player1Dominoes.firstChild)
  }
  while(player2Dominoes.firstChild){
    player2Dominoes.removeChild(player2Dominoes.firstChild)
  }
  while(player3Dominoes.firstChild){
    player3Dominoes.removeChild(player3Dominoes.firstChild)
  }
  while(player4Dominoes.firstChild){
    player4Dominoes.removeChild(player4Dominoes.firstChild)
  }

  for (i = 0; i < player1.length; i++) {
    //cache the current dominoe to update what the div value is for each player
    //Linking Users Dominos to Users Div Dominoes
    let newDiv = document.createElement('div')
    newDiv.id = `p1-d-${i}`
    player1Dominoes.appendChild(newDiv)
    const currentUserDom = document.querySelector(`#p1-d-${i}`)
    let currentUserString = player1[i].toString()
    currentUserDom.textContent = currentUserString
  }
  

  for (i = 0; i < player2.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = `p2-d-${i}`
    player2Dominoes.appendChild(newDiv)
    const currentComp2Dom = document.querySelector(`#p2-d-${i}`)
    let currentComp2String = player2[i].toString()
    currentComp2Dom.textContent = currentComp2String
  }

  for (i = 0; i < player3.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = `p3-d-${i}`
    player3Dominoes.appendChild(newDiv)
    const currentComp3Dom = document.querySelector(`#p3-d-${i}`)
    let currentComp3String = player3[i].toString()
    currentComp3Dom.textContent = currentComp3String
  }

  for (i = 0; i < player4.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = `p4-d-${i}`
    player4Dominoes.appendChild(newDiv)
    const currentComp4Dom = document.querySelector(`#p4-d-${i}`)
    let currentComp4String = player4[i].toString()
    currentComp4Dom.textContent = currentComp4String
  }
  // get the string value extracted 
  //apply that string value to the currentDominoe
}

function linkGridToBoard(){ 
for (let i = 0; i < board.length; i++) {
  if (board[i] === null) {
    gameBoard.children[i].textContent = ""
  } else {
    //number of dominoe and 0 for horizontal and 1 for vertical
    gameBoard.children[i].style.backgroundImage = `url('./images/Dominoes_${board[i][0]}_${board[i][1]}.png')`
  }
}
  //need to make each dominoe have a third element for vertical or horizontal, remember each element in the board array represents one number so have to make a function that will put a dominoe and place a number in each cell so each element in the board array has two values one for the number and one for the position
}

function findDoubleSix() {
  let winner = 0

  player1.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 1
      deleteDominoe(6,6,player1)
    }
    
  })
  player2.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 2
      deleteDominoe(6,6,player2)
    }
    
  })
  player3.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 3
      deleteDominoe(6,6,player3)
    }
    
  })
  player4.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 4
      deleteDominoe(6,6,player4)
    }
    
  })
  //need to subtract from that players dominoes
  //need to place the 6,6 on the board.
  board[76] = [6,0]
  board[77] = [6,0]
  leftEnd = 6
  rightEnd = 6
  
  return (winner+1)
}
//when get back add an if else for the turn in render which will be called right after find dominoes
//make a function to delete dominoe [num,num,arrayToBeModified] 

function deleteDominoe(num1,num2,array){
  array.forEach((dom,idx) => {
    if (dom.join("") === `${num1},${num2}`) {
      array.splice(idx,1)
      //just have to run link to dominoes again and it should appear on the screen
    }
  })
  console.log(array)
}

// console.log(player1)
// console.log(player2)
// console.log(player3)
// console.log(player4)





//? todo 1. Define the required variables used to track the state of the game.

//? todo 1.1) an array for Each player's dominoes
//? an array within an array, 7 dominoes per player and each dominoe has 2
//? 1.2) an array representing the squares of the board
//? 1.3) variable to track whos turn it is.
//? 1.4) winner variable to track if there is a winner or if the    game is still in play
//? 1.5) a variable for the direction of the two ends of the board
//? 1.6) variables for the two ends of the board or current ends of the board
//? 1.7 variable for number of passes



// 2. Store the cached element references on the page that will be accessed in code more than once

//? 2.1) the 28 divs for the dominoes 
//? 2.2) the divs for the grid for the game board display
//2.3) the cached element for the buttons, easy, med, hard
//2.4) cached element for the display of the game status
//2.5) cached element for the play button







//3)Functions

//function for initialization of the state variables
// sets the board to null
//? calls the shuffle function to shuffle the dominoes
// the elements will map to each square or grid on the board do not know the exact number because thinking the board will have to be big 28*28 possibly
// call function findDoubleSix, searches which player has the double 6 and plays it on the board in the center. since it is the first game whoever has the double 6 domino goes first and whoever has the domino, the player one person counterclockwise is set to play. So set currentplayer to the one with the double Six.
//?call the display players dominoes function which will map each players dominoes to show them on the board, for the computer players this is just showing the amound of dominos they have but for the user will show the values of their dominoes on the screen
//initialize winner value to null
//calls the render function


// render function(),
// defines the current ends of the board. in this case would be 6 and 6. 
//use index of iteration to loop over the grid array with the div elements in html linking the divs to the array representing the board. 
// if that grid value has any numbers in it indicating a domino then that square should display the two numbers will eventually map to a picture or png file of that dominoe
//if  number of passes equals 4 the game is tied.Meaning4 people passed and the game cannot go on
//if number of dominoes equals 0 then that player is the winner
//call function for next player

//ShowDominoes()
//will display all of the dominos of the user and the number of dominos for each computer player


//playerTurn(), changes message, checks if there is options available, if there are no options then that player has to pass. A button will appear to pass. 

//shuffleDominoes() places randomly the 28 dominoes and gives seven to each player.

//check direction() is a function that should check if the domino is on the edge of the board or if the domino is going right and left or up and down. so the domino can be placed accordingly.
//if the direction is up and down the domino will be placed on top or on the bottom of the current domino. Once pictures are introduced will have to have 7 pictures for each number going horizontal and 7 pictures going vertical. Each square in the grid represents one Number. So will also have to place the dominoe properly. Add a thicker border to indicate the middle of the domino. 

//PlaceDomino() this is the function that places the domino on the board depending on the direction. If the direction is horizontal places the dominoe or the two numbers horizontally so one number will be placed and the next number after. One number in each cell next to each other in the grid. 

//checkPick() this is the function when the user clicks on a dominoe to pick to play. Has to make sure it is a viable click
// there also has to be a message to specify which side the user wants to place the domino


//computer pick domino() depending on which computer player it is. access that players remaining dominoes and play the dominoe that can fit. Has to scan the dominoes to see which one is a match if they have a match they have to play it on one of the sides of the baord depeneding on which number matches the board number. 




//CSS going to have the body as one big container, 

// for the players dominoes have a flex box on the top set as horizontal, then a flex box set vertical on the left and right sides of the page. Then one final flex box on the bottom set horizontal to hold the user's dominoes

//for the domino board, will have a grid in the middle of the 4 surrounding flexboxes

//how will be setup will be a grid of divs, each div represents a dominoe and each dominoe will be a flex box. Each dominoe will create 2 children one for each number and map the correct picture for the number on the screen. Will have to know the direction and alignment of the end pieces so this one can match. 


