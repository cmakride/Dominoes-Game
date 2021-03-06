/*-------------------------------- Constants --------------------------------*/
//play 1 is the player
//comp 2 is the computer player on the right of the user
//comp 3 is the user's computer teammate, accross from the user
//comp 4 is the computer player on the left of the user


let player1 = []
let player2 = []
let player3 = []
let player4 = []

let crossArray = []

let dominoes = []
// this works showing that if a value of 6 is here 0 horizontal
let board = new Array(140).fill([null, null])
//setting top row to 7,0
for (let i = 0; i < 14; i++) {
  board[i] = [7, 0]
}
//setting bottom row to 7,0
for (let i = 126; i < 140; i++) {
  board[i] = [7, 0]
}
//setting left column to 7,0
for (let i = 14; i <= 112; i += 14) {
  board[i] = [7, 0]
}
//setting right column to 7,0
for (let i = 27; i <= 125; i += 14) {
  board[i] = [7, 0]
}


let rightEnd = null
let leftEnd = null
let rightIdx = null
let leftIdx = null

let playerRight = null
let playerLeft = null
let playerTop = null
let playerBottom = null

let currentTurn = 0

let numberPasses

let isWinner

let axis = -1


/*-------------------------------- Variables --------------------------------*/
/*------------------------ Cached Element References ------------------------*/
const gameBoard = document.querySelector(".gameBoard")

const player1Dominoes = document.querySelector("#player-01")
const player2Dominoes = document.querySelector("#player-02")
const player3Dominoes = document.querySelector("#player-03")
const player4Dominoes = document.querySelector("#player-04")


const crossHairSq0 = document.querySelector("#ch0")
const crossHairSq1 = document.querySelector("#ch1")
const crossHairSq2 = document.querySelector("#ch2")

const crossHairButton = document.querySelector("#rotate")

//messages
const messageEL = document.querySelector("#play-status")
const updateMessage = document.querySelector('#update-message')
const rightLeftM = document.querySelector("#right-left")



const favicon = document.querySelector("#favicon")
favicon.setAttribute("href", "/images/dominoes_game_favicon.png")

const resetButton = document.querySelector("#reset")

const passButton = document.querySelector("#pass")


/*----------------------------- Event Listeners -----------------------------*/
resetButton.addEventListener("click", () => {
  updateMessage.textContent = ""
  init()
})

//event listener for crosshair, if click a dominoe in the user's dominoes, that dominoe will appear on the crosshair and the left and right or top and bottom values will be changed if the button is pressed
player1Dominoes.addEventListener("click", (evt) => {
  //need to reset everything
  if(currentTurn === 1){
  playerRight = null
  playerLeft = null
  playerTop = null
  playerBottom = null
  axis = -1

  //reason doing this is so if click on the space inbetween the pictures so just click on the dominoes
  if (evt.target.id !== "player-01") {
    //index 5 of the id string will give the value of the dominoe picked and to be put in the crosshair
    let tempString = evt.target.id
    console.log(tempString)
    let tempNum = parseInt(tempString[5])
    let tempArray = player1[tempNum]
    playerLeft = tempArray[0][0]
    playerRight = tempArray[0][1]
    // console.log('left end: ',playerLeft)
    // console.log('right end: ',playerRight)
    renderCrossHair()
  }
}
})

passButton.addEventListener("click", () => {
  if (currentTurn === 1) {
    console.log(currentTurn)
    updateMessage.textContent = "Player One Passed"
    currentTurn++
    setTimeout(() => {
      updateMessage.textContent = ""
    }, 4000)
    render()
    play()
  } else {
    updateMessage.textContent = "It is not your turn"
    setTimeout(() => {
      updateMessage.textContent = ""
    }, 4000)
  }


})

crossHairButton.addEventListener("click", (evt) => {
  //if horizontal change to vertical
  if(currentTurn === 1){
    
    if (axis === -1) {
    playerTop = playerLeft
    playerBottom = playerRight
    playerLeft = null
    playerRight = null
  }
  //if vertical change to horizontal and rotate
  if (axis === 1) {
    playerLeft = playerBottom
    playerRight = playerTop
    playerTop = null
    playerBottom = null
  }
  axis *= -1
  renderCrossHair()
}
})



gameBoard.addEventListener('click', (evt) => {
  if (currentTurn === 1 && isWinner === null) {
    //console.log(evt.target.id)
    let numArray = []
    let tempString = evt.target.id
    let array = tempString.split('')
    numArray.push(parseInt(array[2]), parseInt(array[3]))
    //console.log(numArray)
    let idx = parseInt(numArray.join(''))


    
    if (playerRight !== null) {
      //this square is to the right horizontally for right side
      if (board[idx][0] === null && rightIdx === idx - 1 && board[idx + 1][0] === null && playerLeft === rightEnd) {
        //console.log("TO THE RIGHT PLACING HORIZONTAL")
        board[idx] = [playerLeft, 0]
        board[idx + 1] = [playerRight, 0]
        rightEnd = playerRight
        rightIdx = idx + 1
        //console.log(`NEW RIGHT END = ${rightEnd} WITH RIGHT INDEX = ${rightIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerRight},${playerLeft}`
        currentTurn++
        deleteDominoe(playerRight, playerLeft, player1)
        render()
        play()
      }

      //? need right side going to the left
      if (board[idx][0] === null && rightIdx === idx + 1 && board[idx - 1][0] === null && playerRight === rightEnd) {
        //console.log("TO THE LEFT PLACING HORIZONTAL")
        board[idx] = [playerRight, 0]
        board[idx - 1] = [playerLeft, 0]
        rightEnd = playerLeft
        rightIdx = idx - 1
        //console.log(`NEW RIGHT END = ${rightEnd} WITH RIGHT INDEX = ${rightIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerRight},${playerLeft}`
        currentTurn++
        deleteDominoe(playerRight, playerLeft, player1)
        render()
        play()
      }

      
      if (board[idx][0] === null && leftIdx === idx - 1 && board[idx + 1][0] === null && playerLeft === leftEnd) {
        //console.log("TO THE RIGHT PLACING HORIZONTAL")
        board[idx] = [playerLeft, 0]
        board[idx + 1] = [playerRight, 0]
        leftEnd = playerRight
        leftIdx = idx + 1
        //console.log(`NEW LEFT END = ${leftEnd} WITH LEFT INDEX = ${leftIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerRight},${playerLeft}`
        currentTurn++
        deleteDominoe(playerRight, playerLeft, player1)
        render()
        play()
      }


      //this square is to the left horizontally for left side
      if (board[idx][0] === null && leftIdx === idx + 1 && board[idx - 1][0] === null && playerRight === leftEnd) {
        //console.log("TO THE LEFT PLACING HORIZONTAL")
        board[idx] = [playerRight, 0]
        board[idx - 1] = [playerLeft, 0]
        leftEnd = playerLeft
        leftIdx = idx - 1
        //console.log(`NEW LEFT END = ${leftEnd} WITH LEFT INDEX = ${leftIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerRight},${playerLeft}`
        currentTurn++
        deleteDominoe(playerRight, playerLeft, player1)
        render()
        play()
      }
      else{
        if(currentTurn === 1){
        updateMessage.textContent = "Domino not positioned correctly. Click on a domino and use rotate button"
        }
      }
    }
    

    if (playerTop !== null) {
      //?going vertical Up, dominoe is directly up
      if (board[idx][0] === null && rightIdx === idx + 14 && board[idx - 14][0] === null && playerBottom === rightEnd) {
        //console.log("PLACING DOMINOE DIRECTLY ABOVE RIGHT END")
        board[idx] = [playerBottom, 1]
        board[idx - 14] = [playerTop, 1]
        rightEnd = playerTop
        rightIdx = idx - 14
        //console.log(`NEW RIGHT END = ${rightEnd} WITH RIGHT INDEX = ${rightIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()
      }

      //? going vertical up for leftside 
      if (board[idx][0] === null && leftIdx === idx + 14 && board[idx - 14][0] === null && playerBottom === leftEnd) {
        //console.log("PLACING DOMINOE DIRECTLY ABOVE LEFT END")
        board[idx] = [playerBottom, 1]
        board[idx - 14] = [playerTop, 1]
        leftEnd = playerTop
        leftIdx = idx - 14
        //console.log(`NEW LEFT END = ${leftEnd} WITH LEFT INDEX = ${leftIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()
      }

      //? going vertical for rightside down
      if (board[idx][0] === null && rightIdx === idx - 14 && board[idx + 14][0] === null && playerTop === rightEnd) {
        //console.log("PLACING DOMINOE DIRECTLY BELOW RIGHT END")
        board[idx] = [playerTop, 1]
        board[idx + 14] = [playerBottom, 1]
        rightEnd = playerBottom
        rightIdx = idx + 14
        //console.log(`NEW RIGHT END = ${rightEnd} WITH RIGHT INDEX = ${rightIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()
      }

      //?going vertical for leftside down
      if (board[idx][0] === null && leftIdx === idx - 14 && board[idx + 14][0] === null && playerTop === leftEnd) {
        //console.log("PLACING DOMINOE DIRECTLY BELOW LEFT END")
        board[idx] = [playerTop, 1]
        board[idx + 14] = [playerBottom, 1]
        leftEnd = playerBottom
        leftIdx = idx + 14
        //console.log(`NEW LEFT END = ${leftEnd} WITH LEFT INDEX = ${leftIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()
      }


      //putting the dominoe vertically to the right and down
      if (board[idx][0] === null && rightIdx === idx - 1 && board[idx + 14][0] === null && playerTop === rightEnd) {
        //place dominoe on the right side vertical down
        //console.log("TO THE RIGHT PLACING VERTICAL DOWN")
        board[idx] = [playerTop, 1]
        board[idx + 14] = [playerBottom, 1]
        rightEnd = playerBottom
        rightIdx = idx + 14
        //console.log(`NEW RIGHT END = ${rightEnd} WITH RIGHT INDEX = ${rightIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()

      }
      //putting the dominoe vertically to the right and up
      else if (board[idx][0] === null && rightIdx === idx - 1 && board[idx - 14][0] === null && playerBottom === rightEnd) {
        //console.log("TO THE RIGHT PLACING VERTICAL UP")
        board[idx] = [playerBottom, 1]
        board[idx - 14] = [playerTop, 1]
        rightEnd = playerTop
        rightIdx = idx - 14
        //console.log(`NEW RIGHT END = ${rightEnd} WITH RIGHT INDEX = ${rightIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()

      }
      //placing left side and up
      if (board[idx][0] === null && leftIdx === idx + 1 && board[idx - 14][0] === null && playerBottom === leftEnd) {
        //console.log("TO THE LEFT PLACING VERTICAL UP")
        board[idx] = [playerBottom, 1]
        board[idx - 14] = [playerTop, 1]
        leftEnd = playerTop
        leftIdx = idx - 14
        //console.log(`NEW LEFT END = ${leftEnd} WITH LEFT INDEX = ${leftIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()
      }
      else if (board[idx][0] === null && leftIdx === idx + 1 && board[idx + 14][0] === null && playerTop === leftEnd) {
        //console.log("TO THE LEFT PLACING VERTICAL DOWN")
        board[idx] = [playerTop, 1]
        board[idx + 14] = [playerBottom, 1]
        leftEnd = playerBottom
        leftIdx = idx + 14
        //console.log(`NEW LEFT END = ${leftEnd} WITH LEFT INDEX = ${leftIdx}`)
        updateMessage.textContent = `Player 1 Picked: ${playerTop},${playerBottom}`
        currentTurn++
        deleteDominoe(playerTop, playerBottom, player1)
        render()
        play()
      }
      else{
        if(currentTurn === 1){
          updateMessage.textContent = "Domino not positioned correctly. Click on a domino and use rotate button"
          }
      }
    }
    
  }
})

/*-------------------------------- Functions --------------------------------*/
init()

function renderCrossHair() {

  // console.log('Left end: ', playerLeft)
  // console.log('Right end: ', playerRight)
  // console.log('Top end: ', playerTop)
  // console.log('Bottom end: ', playerBottom)

  //horizontal axis
  if (axis === -1) {
    crossHairSq0.style.backgroundImage = `url('./images/Dominoes_${playerLeft}_0.png')`
    crossHairSq1.style.backgroundImage = `url('./images/Dominoes_${playerRight}_0.png')`
    crossHairSq2.style.backgroundImage = `url('./images/Dominoes_null_null.png')`

    crossHairSq0.style.backgroundColor = "#f5f1dc"
    crossHairSq0.style.boxShadow = "0px 5px 15px -5px #000000"

    crossHairSq1.style.backgroundColor = "#f5f1dc"
    crossHairSq1.style.boxShadow = "0px 5px 15px -5px #000000"
    crossHairSq2.style.backgroundColor = "rgb(128,128,128)"
    crossHairSq2.style.boxShadow = "0px 0px 0px 0px #000000"
  }
  //vertical
  if (axis === 1) {
    crossHairSq0.style.backgroundImage = `url('./images/Dominoes_${playerTop}_1.png')`
    crossHairSq2.style.backgroundImage = `url('./images/Dominoes_${playerBottom}_1.png')`
    crossHairSq1.style.backgroundImage = `url('./images/Dominoes_null_null.png')`

    crossHairSq0.style.backgroundColor = "#f5f1dc"
    crossHairSq0.style.boxShadow = "0px 5px 15px -5px #000000"
    crossHairSq2.style.backgroundColor = "#f5f1dc"
    crossHairSq2.style.boxShadow = "0px 5px 15px -5px #000000"
    crossHairSq1.style.backgroundColor = "rgb(128,128,128)"
    crossHairSq1.style.boxShadow = "0px 0px 0px 0px #000000"
  }
}

function init() {
  //reset all the values
  rightEnd = null
  leftEnd = null
  rightIdx = null
  leftIdx = null

  playerRight = null
  playerLeft = null
  playerTop = null
  playerBottom = null

  isWinner = null
  numberPasses = 0

  player1 = []
  player2 = []
  player3 = []
  player4 = []
  crossArray = []
  dominoes = []

  board.fill([null, null])
  //setting top row to 7,0
  for (let i = 0; i < 14; i++) {
    board[i] = [7, 0]
  }
  //setting bottom row to 7,0
  for (let i = 126; i < 140; i++) {
    board[i] = [7, 0]
  }
  //setting left column to 7,0
  for (let i = 14; i <= 112; i += 14) {
    board[i] = [7, 0]
  }
  //setting right column to 7,0
  for (let i = 27; i <= 125; i += 14) {
    board[i] = [7, 0]
  }

  dominoes = [[6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
  [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [5, 0],
  [4, 4], [4, 3], [4, 2], [4, 1], [4, 0],
  [3, 3], [3, 2], [3, 1], [3, 0],
  [2, 2], [2, 1], [2, 0],
  [1, 1], [1, 0], [0, 0]]

  shuffleDominoes()
  linkDominoesToPlayers()

  render()
  updateMessage.textContent = `A new game has started. Finding player with double six.`

  setTimeout(() => {
    currentTurn = findDoubleSix()
    render()
    play()
  }, 8000)
  
}

//play() will be invoked after each time the user picks a dominoe. 
function play() {

  if (isWinner === null && currentTurn !== 1) {
    
    if (currentTurn === 2) {
      // updateMessage.textContent = `Player 2 is picking...`
      setTimeout(() => {
        computer2Pick()
        setTimeout(() => {
          computer3Pick()
          setTimeout(() => {
            computer4Pick()
            // updateMessage.textContent = `Player 4 is picking...`
          }, 6000)
        }, 6000)
      }, 6000)
      
    }
    else if (currentTurn === 3) {
      setTimeout(() => {
        computer3Pick()
        setTimeout(() => {
          computer4Pick()
        }, 6000)
      }, 6000)
      
    }
    else if (currentTurn === 4) {
      setTimeout(() => {
        computer4Pick()
      }, 6000)
      
    }
  }
}

function resetCrossHair() {
  playerRight = null
  playerLeft = null
  playerTop = null
  playerBottom = null

  crossHairSq0.style.backgroundImage = `url('./images/Dominoes_null_null.png')`
  crossHairSq2.style.backgroundImage = `url('./images/Dominoes_null_null.png')`
  crossHairSq1.style.backgroundImage = `url('./images/Dominoes_null_null.png')`

  crossHairSq0.style.backgroundColor = "rgb(128,128,128)"
  crossHairSq0.style.boxShadow = "0px 0px 0px 0px #000000"

  crossHairSq1.style.backgroundColor = "rgb(128,128,128)"
  crossHairSq1.style.boxShadow = "0px 0px 0px 0px #000000"

  crossHairSq2.style.backgroundColor = "rgb(128,128,128)"
  crossHairSq2.style.boxShadow = "0px 0px 0px 0px #000000"

}

function render() {
  //?if Need to check the system's performance
  // console.log("RENDER RIGHT END: ", rightEnd)
  // console.log("RENDER RIGHT IDX: ", rightIdx)
  // console.log("RENDER LEFT END: ", leftEnd)
  // console.log("RENDER LEFT IDX: ", leftIdx)

  //refresh the player's dominoes
  linkDominoesToPlayers()
  //Link the gameboard array to the grid in the html
  linkGridToBoard()
  //Reset the crosshair grid
  resetCrossHair()

  //displaying the message of which player's turn it is
  if (currentTurn === 5) {
    currentTurn = 1
  }
  //check if there is a winner
  checkWinner()
  if (isWinner === null) {
    messageEL.textContent = `Game in Progress. It is Player ${currentTurn}'s Turn`
  }
  if (isWinner === 1 || isWinner === 2 || isWinner === 3 || isWinner === 4) {
    messageEL.textContent = `${isWinner} is the Winner!`
    updateMessage.textContent = `Game has ended.`
  }
  if (isWinner === 0) {
    messageEL.textContent = `IT IS A TIE!`
    updateMessage.textContent = `Game has ended.`
  }
  //Display Right and Left ends
  rightLeftM.textContent = `Left End: ${leftEnd} | Right End: ${rightEnd}`
  
}

// console.log(rightEnd, leftEnd)

function computer2Pick() {
  //get an array of all of the options if options.length = 0
  //if a dominoe has one number that matches right or left end add that dominoe to the options array
  let options = []
  player2.forEach((dominoe) => {
    if (dominoe[0][0] === leftEnd || dominoe[0][0] === rightEnd || dominoe[0][1] === leftEnd || dominoe[0][1] === rightEnd) {
      options.push(dominoe[0])
    }
  })
  //console.log("Computer 2 Picking. OPTIONS: ", options)
  //first picks a random dominoe
  if (options.length !== 0) {
    let num = Math.floor(Math.random() * options.length)
    updateMessage.textContent = `Player 2 Picked:  ${options[num]}`
    console.log("Computer 2 Picked: ", options[num])
    placeDominoe((options[num]))
    deleteDominoe(options[num][0], options[num][1], player2)
    linkDominoesToPlayers()
    numberPasses = 0
  }
  else {
    updateMessage.textContent= "Player 2 has passed"
    numberPasses++
  
  }
  
  currentTurn++
  render()
}

function computer3Pick() {
  let options = []
  player3.forEach((dominoe) => {
    if (dominoe[0][0] === leftEnd || dominoe[0][0] === rightEnd || dominoe[0][1] === leftEnd || dominoe[0][1] === rightEnd) {
      options.push(dominoe[0])
    }
  })
  //console.log("Computer 3 Picking. OPTIONS: ", options)
  if (options.length !== 0) {
    let num = Math.floor(Math.random() * options.length)
    console.log("Computer 3 Picked: ", options[num])
    updateMessage.textContent = `Player 3 Picked:  ${options[num]}`//sends the picked dominoe to the board
    placeDominoe((options[num]))
    deleteDominoe(options[num][0], options[num][1], player3)
    linkDominoesToPlayers()
    numberPasses = 0
  }
  else {
    updateMessage.textContent = "Player 3 has passed"
    numberPasses++
  }
  currentTurn++
  render()
}

function computer4Pick() {
  let options = []
  player4.forEach((dominoe) => {
    if (dominoe[0][0] === leftEnd || dominoe[0][0] === rightEnd || dominoe[0][1] === leftEnd || dominoe[0][1] === rightEnd) {
      options.push(dominoe[0])
    }
  })

  //console.log("Computer 4 Picking. OPTIONS: ", options)
  if (options.length !== 0) {
    let num = Math.floor(Math.random() * options.length)
    console.log("Computer 4 Picked: ", options[num])
    updateMessage.textContent = `Player 4 Picked:  ${options[num]}`
    setTimeout(() => {
      updateMessage.textContent = "It is your turn Player1. Please select a domino"
    }, 6000)
    placeDominoe((options[num]))
    //delete that dominoe from the players hand because it is now on the board
    deleteDominoe(options[num][0], options[num][1], player4)
    //reload the player's hands
    linkDominoesToPlayers()
    numberPasses = 0

  }
  else {
    updateMessage.textContent = "Player 4 has passed"
    setTimeout(() => {
      updateMessage.textContent = "It is your turn Player1. Please select a domino"
    }, 6000)
    numberPasses++
  }
  currentTurn = 1
  render()
}




function placeDominoe(dominoe) {
  let domL = dominoe[0]
  let domR = dominoe[1]

  //doing the left side first, going to check multiple instances, Left end Horizontal
  if (leftEnd === domL && board[leftIdx - 1][0] === null && board[leftIdx - 2][0] === null) {
    //place the dominoe!
    board[leftIdx - 1] = [domL, 0]
    board[leftIdx - 2] = [domR, 0]
    leftEnd = domR
    leftIdx = leftIdx - 2
  }
  else if (leftEnd === domR && board[leftIdx - 1][0] === null && board[leftIdx - 2][0] === null) {
    board[leftIdx - 1] = [domR, 0]
    board[leftIdx - 2] = [domL, 0]
    leftEnd = domL
    leftIdx = leftIdx - 2
  }
  // Left side wanting to go right horizontal,when crosshair is [domR,domL]
  else if (leftEnd === domR && board[leftIdx + 1][0] === null && board[leftIdx + 2][0] === null) {
    board[leftIdx + 1] = [domR, 0]
    board[leftIdx + 2] = [domL, 0]
    leftEnd = domL
    leftIdx = leftIdx + 2
  }
  // Left side wanting to go right horizontal,when crosshair is [domL,domR]
  else if (leftEnd === domL && board[leftIdx + 1][0] === null && board[leftIdx + 2][0] === null) {
    board[leftIdx + 1] = [domL, 0]
    board[leftIdx + 2] = [domR, 0]
    leftEnd = domR
    leftIdx = leftIdx + 2
    //test
  }
  
  //now for right end Horizontal
  else if (rightEnd === domL && board[rightIdx + 1][0] === null && board[rightIdx + 2][0] === null) {
    board[rightIdx + 1] = [domL, 0]
    board[rightIdx + 2] = [domR, 0]
    rightEnd = domR
    rightIdx = rightIdx + 2
  }
  else if (rightEnd === domR && board[rightIdx + 1][0] === null && board[rightIdx + 2][0] === null) {
    board[rightIdx + 1] = [domR, 0]
    board[rightIdx + 2] = [domL, 0]
    rightEnd = domL
    rightIdx = rightIdx + 2
  }
  //right side wanting to go left horizontal, when crosshair is [domL,domR]
  else if (rightEnd === domL && board[rightIdx - 1][0] === null && board[rightIdx - 2][0] === null) {
    board[rightIdx - 1] = [domL, 0]
    board[rightIdx - 2] = [domR, 0]
    rightEnd = domR
    rightIdx = rightIdx - 2
  }
  //right side wanting to go left horizontal, when crosshair is [domR,domL]
  else if (rightEnd === domR && board[rightIdx - 1][0] === null && board[rightIdx - 2][0] === null) {
    board[rightIdx - 1] = [domR, 0]
    board[rightIdx - 2] = [domL, 0]
    rightEnd = domL
    rightIdx = rightIdx - 2
  }
  //end of Horizontal

  //start of vertical left end 1.1 next two are directly vertical left side going up
  else if (leftEnd === domR && board[leftIdx - 14][0] === null && board[leftIdx - 28][0] === null) {
    board[leftIdx - 14] = [domR, 1]
    board[leftIdx - 28] = [domL, 1]
    leftEnd = domL
    leftIdx = leftIdx - 28
  }
  //left 1.2 end going vertical up swapping dominoe numbers
  else if (leftEnd === domL && board[leftIdx - 14][0] === null && board[leftIdx - 28][0] === null) {
    board[leftIdx - 14] = [domL, 1]
    board[leftIdx - 28] = [domR, 1]
    leftEnd = domR
    leftIdx = leftIdx - 28
  }
  //1.3 vertical down on left side for left dominoe
  else if (leftEnd === domL && board[leftIdx + 14][0] === null && board[leftIdx + 28][0] === null) {
    board[leftIdx + 14] = [domL, 1]
    board[leftIdx + 28] = [domR, 1]
    leftEnd = domR
    leftIdx = leftIdx + 28
  }
  //1.4 vertical up, left side for right dominoe
  else if (leftEnd === domR && board[leftIdx + 14][0] === null && board[leftIdx + 28][0] === null) {
    board[leftIdx + 14] = [domR, 1]
    board[leftIdx + 28] = [domL, 1]
    leftEnd = domL
    leftIdx = leftIdx + 28
  }

  //vertical Up 2.1 for right side on right dominoe 
  else if (rightEnd === domR && board[rightIdx - 14][0] === null && board[rightIdx - 28][0] === null) {
    board[rightIdx - 14] = [domR, 1]
    board[rightIdx - 28] = [domL, 1]
    rightEnd = domL
    rightIdx = rightIdx - 28
  }
  //2.2 vertical up for right side for left dominoe
  else if (rightEnd === domL && board[rightIdx - 14][0] === null && board[rightIdx - 28][0] === null) {
    board[rightIdx - 14] = [domL, 1]
    board[rightIdx - 28] = [domR, 1]
    rightEnd = domR
    rightIdx = rightIdx - 28
  }
  //2.3 vertical down Right side for left dominoe
  else if (rightEnd === domL && board[rightIdx + 14][0] === null && board[rightIdx + 28][0] === null) {
    board[rightIdx + 14] = [domL, 1]
    board[rightIdx + 28] = [domR, 1]
    rightEnd = domR
    rightIdx = rightIdx + 28
  }
  //2.4 vertical down right side for right dominoe
  else if (rightEnd === domR && board[rightIdx + 14][0] === null && board[rightIdx + 28][0] === null) {
    board[rightIdx + 14] = [domR, 1]
    board[rightIdx + 28] = [domL, 1]
    rightEnd = domL
    rightIdx = rightIdx + 28
  }


  else if (leftEnd === domL && board[leftIdx - 1][0] === null && board[leftIdx - 15][0] === null) {
    board[leftIdx - 1] = [domL, 1]
    board[leftIdx - 15] = [domR, 1]
    leftEnd = domR
    leftIdx = leftIdx - 15
  }
  //left side vertical up, right side dominoe matches left side
  else if (leftEnd === domR && board[leftIdx - 1][0] === null && board[leftIdx - 15][0] === null) {
    board[leftIdx - 1] = [domR, 1]
    board[leftIdx - 15] = [domL, 1]
    leftEnd = domL
    leftIdx = leftIdx - 15
  }
  //left side vertical down Left side matches
  else if (leftEnd === domL && board[leftIdx - 1][0] === null && board[leftIdx + 13][0] === null) {
    board[leftIdx - 1] = [domL, 1]
    board[leftIdx + 13] = [domR, 1]
    leftEnd = domR
    leftIdx = leftIdx + 13
  }
  else if (leftEnd === domR && board[leftIdx - 1][0] === null && board[leftIdx + 13][0] === null) {
    board[leftIdx - 1] = [domR, 1]
    board[leftIdx + 13] = [domL, 1]
    leftEnd = domL
    leftIdx = leftIdx + 13
  }
  //?Right side vertical up
  else if (rightEnd === domL && board[rightIdx + 1][0] === null && board[rightIdx - 13][0] === null) {
    board[rightIdx + 1] = [domL, 1]
    board[rightIdx - 13] = [domR, 1]
    rightEnd = domR
    rightIdx = rightIdx - 13
  }
  //right side vertical up, right side dominoe matches right side
  else if (rightEnd === domR && board[rightIdx + 1][0] === null && board[rightIdx - 13][0] === null) {
    board[rightIdx + 1] = [domR, 1]
    board[rightIdx - 13] = [domL, 1]
    rightEnd = domL
    rightIdx = rightIdx - 13
  }
  //right side vertical down Left side matches rightend
  else if (rightEnd === domL && board[rightIdx + 1][0] === null && board[rightIdx + 15][0] === null) {
    board[rightIdx + 1] = [domL, 1]
    board[rightIdx + 15] = [domR, 1]
    rightEnd = domR
    rightIdx = rightIdx + 15
  }
  //right side vertical down right side dominoe matches rightend
  else if (rightEnd === domR && board[rightIdx + 1][0] === null && board[rightIdx + 15][0] === null) {
    board[rightIdx + 1] = [domR, 1]
    board[rightIdx + 15] = [domL, 1]
    rightEnd = domL
    rightIdx = rightIdx + 15
  }
}






function checkWinner() {
  if (player1.length === 0) {
    isWinner = 1
  }
  if (player2.length === 0) {
    isWinner = 2
  }
  if (player3.length === 0) {
    isWinner = 3
  }
  if (player4.length === 0) {
    isWinner = 4
  }
  if (numberPasses === 4) {
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
  while (player1Dominoes.firstChild) {
    player1Dominoes.removeChild(player1Dominoes.firstChild)
  }
  while (player2Dominoes.firstChild) {
    player2Dominoes.removeChild(player2Dominoes.firstChild)
  }
  while (player3Dominoes.firstChild) {
    player3Dominoes.removeChild(player3Dominoes.firstChild)
  }
  while (player4Dominoes.firstChild) {
    player4Dominoes.removeChild(player4Dominoes.firstChild)
  }

  for (i = 0; i < player1.length; i++) {
    //cache the current dominoe to update what the div value is for each player
    //Linking Users Dominos to Users Div Dominoes
    let newDiv = document.createElement('div')
    newDiv.id = `p1-d-${i}`
    newDiv.style.backgroundImage = `url('./images/Dominoe_full_${player1[i][0][0]}_${player1[i][0][1]}.png')`
    newDiv.style.backgroundSize = "85%"
    newDiv.style.backgroundRepeat = 'no-repeat'
    newDiv.style.backgroundPosition = 'center'
    newDiv.style.backgroundColor = "#f5f1dc"
    player1Dominoes.appendChild(newDiv)
    //if need to add in text to see on display the array being added to each Domino
    // const currentUserDom = document.querySelector(`#p1-d-${i}`)
    // let currentUserString = player1[i].toString()
    // currentUserDom.textContent = currentUserString
    
  }


  for (i = 0; i < player2.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = `p2-d-${i}`
    player2Dominoes.appendChild(newDiv)
    const currentComp2Dom = document.querySelector(`#p2-d-${i}`)
    let currentComp2String = player2[i].toString()
    // currentComp2Dom.textContent = currentComp2String
    currentComp2Dom.style.backgroundColor = "#f5f1dc"
    currentComp2Dom.style.color = "#f5f1dc"
    currentComp2Dom.style.boxShadow = "0px 5px 15px -5px #000000"
  }

  for (i = 0; i < player3.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = `p3-d-${i}`
    player3Dominoes.appendChild(newDiv)
    const currentComp3Dom = document.querySelector(`#p3-d-${i}`)
    let currentComp3String = player3[i].toString()
    // currentComp3Dom.textContent = currentComp3String
    currentComp3Dom.style.backgroundColor = "#f5f1dc"
    currentComp3Dom.style.color = "#f5f1dc"
    currentComp3Dom.style.boxShadow = "0px 5px 15px -5px #000000"
  }

  for (i = 0; i < player4.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = `p4-d-${i}`
    player4Dominoes.appendChild(newDiv)
    const currentComp4Dom = document.querySelector(`#p4-d-${i}`)
    let currentComp4String = player4[i].toString()
    // currentComp4Dom.textContent = currentComp4String
    currentComp4Dom.style.backgroundColor = "#f5f1dc"
    currentComp4Dom.style.color = "#f5f1dc"
    currentComp4Dom.style.boxShadow = "0px 5px 15px -5px #000000"
  }
  // get the string value extracted 
  //apply that string value to the currentDominoe
}

function linkGridToBoard() {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === null) {
      gameBoard.children[i].style.backgroundImage = `url('./images/Dominoes_${board[i][0]}_${board[i][1]}.png')`
      gameBoard.children[i].textContent = ""
      gameBoard.children[i].style.backgroundColor = "rgb(165, 164, 164)"
      gameBoard.children[i].style.boxShadow = "0px 0px 0px 0px #000000"
      gameBoard.children[i].style.backgroundSize = "85%"
      
    } 
    else {
      //number of dominoe and 0 for horizontal and 1 for vertical
      gameBoard.children[i].style.backgroundImage = `url('./images/Dominoes_${board[i][0]}_${board[i][1]}.png')`

      if(i === 6){
        gameBoard.children[i].style.backgroundImage = `url('./images/player_03.png')`
      }
      if(i === 56){
        gameBoard.children[i].style.backgroundImage = `url('./images/player_04.png')`
      }
      if(i === 69){
        gameBoard.children[i].style.backgroundImage = `url('./images/player_02.png')`
      }
      if(i === 132){
        gameBoard.children[i].style.backgroundImage = `url('./images/player_01.png')`
      }

      if (board[i][0] !== null && board[i][0] !== 7) {
        gameBoard.children[i].style.backgroundColor = "#f5f1dc"
        gameBoard.children[i].style.boxShadow = "0px 5px 15px -5px #000000"
        gameBoard.children[i].style.backgroundSize = "85%"
        
      }
    }
  }
  //need to make each dominoe have a third element for vertical or horizontal, remember each element in the board array represents one number so have to make a function that will put a dominoe and place a number in each cell so each element in the board array has two values one for the number and one for the position
}

function findDoubleSix() {
  let winner = 0

  player1.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 1
      deleteDominoe(6, 6, player1)
    }

  })
  player2.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 2
      deleteDominoe(6, 6, player2)
    }

  })
  player3.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 3
      deleteDominoe(6, 6, player3)
    }

  })
  player4.forEach((array) => {
    if (array.join("") === "6,6") {
      winner = 4
      deleteDominoe(6, 6, player4)
    }

  })
  updateMessage.textContent = `Player ${winner} has placed the double six.`
  setTimeout(() => {
    updateMessage.textContent = ""
    if(winner === 1){
      updateMessage.textContent = "It is your turn Player1. Please select a domino"
    }
  }, 12000)
  //need to subtract from that players dominoes
  //need to place the 6,6 on the board.
  board[76] = [6, 0]
  board[77] = [6, 0]

  leftEnd = 6
  rightEnd = 6
  leftIdx = 76
  rightIdx = 77

  return (winner + 1)
}


function deleteDominoe(num1, num2, array) {
  array.forEach((dom, idx) => {
    if (dom.join("") === `${num1},${num2}`) {
      array.splice(idx, 1)
      //just have to run link to dominoes again and it should appear on the screen
    }
    //doing it again just reverse direction depending on the CrossHair
    else if (dom.join("") === `${num2},${num1}`) {
      array.splice(idx, 1)
    }
  })

}
