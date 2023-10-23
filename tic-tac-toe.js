let playerText= document.getElementById('status')
let restartBtn= document.getElementsByClassName('btn')
let restartbtn= document.getElementById('btn1')
let boxes= Array.from(document.getElementsByClassName('square'))
let winnerIndicator= getComputedStyle(document.body).getPropertyValue('--green')

let squares = document.querySelectorAll('.square');
// console.log(boxes);

squares.forEach(function(elem, index) {
  elem.addEventListener('mouseover', function(e) {
    e.target.classList.add('hover');
  });
  
  elem.addEventListener('mouseout', function(e) {
    e.target.classList.remove('hover');
  });
});

console.log(boxes)

const O_Text="O"
const X_Text="X"
let currentPlayer= X_Text
let spaces =Array(9).fill(null)


const startGame = () =>{
    boxes.forEach(square => square.addEventListener('click',boxclicked))
}
function boxclicked(e){
    const id=e.target.id

    if(!spaces[id]){
        spaces[id]=currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon()!==false){
            playerText.innerHTML=`Congratulations! ${currentPlayer} is the Winner!`;
            playerText.style.color="--green";
            playerText.style.fontWeight="bold";
            playerText.style.border-top;"4px solid var(--green)";
            let winning_blocks= playerHasWon()
            console.log(winning_blocks)
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer=currentPlayer ==X_Text ? O_Text :X_Text
    }
}

const winningcombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningcombos){
        let[a,b,c]= condition

        if(spaces[a] && (spaces[a]==spaces[b] && spaces[a]==spaces[c])){
            return[a,b,c]
        }
    }
    return false

}
window.addEventListener("DOMContentLoaded",(event)=>{
    if(restartbtn){       
         restartbtn.addEventListener('click',restart);
    }
});

function restart() {
    spaces.fill(null)
    boxes.forEach( square => {
        square.innerText=''
        square.style.backgroundColor=''
    })   
    playerText.innerHTML = 'Move your mouse over a square and click to play an X or an O.'
    currentPlayer = X_Text
}

startGame()