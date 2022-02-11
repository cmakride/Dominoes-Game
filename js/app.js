/*-------------------------------- Constants --------------------------------*/
//play 1 is the player
//comp 2 is the computer player on the right of the user
//comp 3 is the user's computer teammate, accross from the user
//comp 4 is the computer player on the left of the user
let player1 = []
let comp2 = []
let comp3 = []
let comp4 = []

let dominoes = []
let rightEnd = 0
let leftEnd = 0

let numberPasses = 0


/*-------------------------------- Variables --------------------------------*/
/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
/*-------------------------------- Functions --------------------------------*/
init()

function init(){

dominoes = [[6,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0],
            [5,5],[5,4],[5,3],[5,2],[5,1],[5,0],
            [4,4],[4,3],[4,2],[4,1],[4,0],
            [3,3],[3,2],[3,1],[3,0],
            [2,2],[2,1],[2,0],
            [1,1],[1,0],[0,0]]

shuffleDominoes()
console.log(player1)
linkDominoesToPlayers()
          
}

function shuffleDominoes(){
//choose a random index from dominoes
//iterating through each player and computer's decks of dominoes, total of 4 arrays
for (let i = 1 ; i < 8 ; i++){
  let randDominoeIndex = Math.floor(Math.random()*dominoes.length)
  let dominoePicked = dominoes.splice(randDominoeIndex,1)
  player1.push(dominoePicked)

  randDominoeIndex = Math.floor(Math.random()*dominoes.length)
  dominoePicked = dominoes.splice(randDominoeIndex,1)
  comp2.push(dominoePicked)

  randDominoeIndex = Math.floor(Math.random()*dominoes.length)
  dominoePicked = dominoes.splice(randDominoeIndex,1)
  comp3.push(dominoePicked)

  randDominoeIndex = Math.floor(Math.random()*dominoes.length)
  dominoePicked = dominoes.splice(randDominoeIndex,1)
  comp4.push(dominoePicked)

}
//splice that index from dominoes and store it in a variable. Take out of the dominoe "deck" and put that in each players deck. 
}


function linkDominoesToPlayers(){
  //need to link the divs in each players dominoes to the array of dominoes for each player
  //loop 
  for(i = 0 ; i < 7 ; i++ ){
    //cache the current dominoe to update what the div value is for each player
    //Linking Users Dominos to Users Div Dominoes
    const currentUserDom = document.querySelector(`#user-d-${i}`)
    let currentUserString = player1[i].toString()
    currentUserDom.textContent = currentUserString

    const currentComp2Dom = document.querySelector(`#comp2-d-${i}`)
    let currentComp2String = comp2[i].toString()
    currentComp2Dom.textContent = currentComp2String

    const currentComp3Dom = document.querySelector(`#comp3-d-${i}`)
    let currentComp3String = comp3[i].toString()
    currentComp3Dom.textContent = currentComp3String

    const currentComp4Dom = document.querySelector(`#comp4-d-${i}`)
    let currentComp4String = comp4[i].toString()
    currentComp4Dom.textContent = currentComp4String
  }
    // get the string value extracted 
    //apply that string value to the currentDom
    



  


  
}





//*todo 1. Define the required variables used to track the state of the game.

//*todo 1.1) an array for Each player's dominoes
// an array within an array, 7 dominoes per player and each dominoe has 2
// 1.2) an array representing the squares of the board
// 1.3) variable to track whos turn it is.
// 1.4) winner variable to track if there is a winner or if the    game is still in play
// 1.5) a variable for the direction of the two ends of the board
// 1.6) variables for the two ends of the board or current ends of the board
// 1.7 variable for number of passes



// 2. Store the cached element references on the page that will be accessed in code more than once

// 2.1) the 28 divs for the dominoes 
//2.2) the divs for the grid for the game board display
//2.3) the cached element for the buttons, easy, med, hard
//2.4) cached element for the display of the game status
//2.5) cached element for the play button







//3)Functions

//function for initialization of the state variables
// sets the board to null
// calls the shuffle function to shuffle the dominoes
// the elements will map to each square or grid on the board do not know the exact number because thinking the board will have to be big 28*28 possibly
// call function findDoubleSix, searches which player has the double 6 and plays it on the board in the center. since it is the first game whoever has the double 6 domino goes first and whoever has the domino, the player one person counterclockwise is set to play. So set currentplayer to the one with the double Six.
//call the display players dominoes function which will map each players dominoes to show them on the board, for the computer players this is just showing the amound of dominos they have but for the user will show the values of their dominoes on the screen
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


