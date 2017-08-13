window.addEventListener('load', () => {
  addRule();
  function ticTacToeGame(firstPlayer){
    let cellsState = [];
    let cells = [];
    // tic - крестик - 1, tac - нолик - 0
    for (let i = 0; i < 9; i++){
      cellsState.push('');
      cells.push(i+1);
    }
    let computer;
    let state;

    if(firstPlayer){
      user = 1;
      computer = 0;
    } else{
      user = 0;
      computer = 1;
    }

    return function(userProgress){
      if (!userProgress){
        let cell = Math.floor(Math.random() * (10 - 1)) + 1;
        cellsState[cell-1] = computer;
        cells.splice(cells.indexOf(cell), 1);
        return cell;
      } else {

        cellsState[userProgress - 1] = user;
        cells.splice(cells.indexOf(parseInt(userProgress)), 1);

              //find cell for computer
              let cell = computerBrain(cellsState, user, computer);

              //checking if user winner
              let winner;
              winner = checking(cellsState);
              if (winner === user){
                  return 'user is winner';
              };


                if (cell === 0 && cells.length !== 0){
                  let isFound = false;
                  while(!isFound){
                    cell = Math.floor(Math.random() * (10 - 1)) + 1;
                    if (cells.indexOf(cell) !== -1){
                      isFound = true;
                    }
                  }
                }
                cellsState[cell-1] = computer;
                cells.splice(cells.indexOf(cell), 1);
                // checking if computer is winner
                winner = checking(cellsState);
                if (winner === computer){
                    return {winner : 'computer is winner', last:cell};
                } else if (cells.length < 1){
                  if (cell!==0)
                  {
                    return {winner: 'dead heat', last:cell};
                  }else{
                    return 'dead heat';
                  }
                }

              return cell;
      }
    }
}

  function checking(array){
    for (let i = 0; i < 9; i+=3){
      if (array[i] === array[i+1] && array[i+1] === array[i+2]){
        return array[i];
      }
    }

    for (let k = 0; k < 3; k++){
      if (array[k] === array[k+3] && array[k+3] === array[k+6]){
        return array[k];
      }
    }

    if ((array[0] === array[4] &&  array[4]=== array[8]) ||
        (array[2] === array[4] &&  array[4]=== array[6])){
          return array[4];
    }

    return 'empty';
  }

  function computerBrain(cellsState, user, computer){
    let cell = 0;
    let state = computer;
    for (let i = 0; i< 2; i++){
      if(cellsState[3] === '' && (((cellsState[0] === state) && (cellsState[6] === state)) ||
        ((cellsState[4] === state) && (cellsState[5] === state)))){
           cell = 4; //3
        } else if (cellsState[4] === '' && (((cellsState[1] === state) && (cellsState[7] === state)) ||
        ((cellsState[3] === state) && (cellsState[5] === state)) ||
        ((cellsState[0] === state) && (cellsState[8] === state)) ||
        ((cellsState[6] === state) && (cellsState[2] === state)))){
          cell = 5; //4
        } else if(cellsState[5] === '' && (((cellsState[2] === state) && (cellsState[8] === state)) ||
         ((cellsState[3] === state) && (cellsState[4] === state)))){
          cell = 6; //5
        } else if (cellsState[7] === '' && (((cellsState[1] === state) && (cellsState[4] === state)) ||
         ((cellsState[6] === state) && (cellsState[8] === state)))){
          cell = 8; //7
        } else if (cellsState[1] === '' && (((cellsState[4] === state) && (cellsState[7] === state)) ||
         ((cellsState[0] === state) && (cellsState[2] === state)))){
          cell = 2; //1
        } else if (cellsState[2] === '' && (((cellsState[5] === state) && (cellsState[8] === state)) ||
         ((cellsState[0] === state) && (cellsState[1] === state)) ||
         ((cellsState[6] === state) && (cellsState[4] === state)))){
          cell = 3; //2
        }else if (cellsState[0] === '' && (((cellsState[3] === state) && (cellsState[6] === state)) ||
         ((cellsState[1] === state) && (cellsState[2] === state)) ||
         ((cellsState[4] === state) && (cellsState[8] === state)))){
          cell = 1; //0
        }else if (cellsState[8] === '' && (((cellsState[2] === state) && (cellsState[5] === state))  ||
         ((cellsState[6] === state) && (cellsState[7] === state)) ||
         ((cellsState[0] === state) && (cellsState[4] === state)))){
          cell = 9; //8
        }else if (cellsState[6] === '' && (((cellsState[0] === state) && (cellsState[3] === state)) ||
        ((cellsState[7] === state) && (cellsState[8] === state)) ||
        ((cellsState[2] === state) && (cellsState[4] === state)))){
          cell = 7; //6
        }

        if (cell === 0){
          state = user;
        } else{
          return cell;
        }
    
    }
    
    return cell;
  }


  let startGameButton = document.getElementById('startGame');
  startGameButton.addEventListener('click', () => {
    removeLastSpan();
    let cellArray = document.getElementsByClassName('tic-tac-toe-cell');
    let whoGoFirst = document.getElementById('whoGoFirst').checked;
    let playGame = ticTacToeGame(whoGoFirst);
    let userClass;
    let computerClass;
    if (!whoGoFirst){
      computerClass = ' background-cell-tic';
      userClass = ' background-cell-tac';
      document.getElementById(playGame('')).className += computerClass;
    } else {
      computerClass = ' background-cell-tac';
      userClass = ' background-cell-tic';
    }

    for (let i = 0; i < cellArray.length; i++){
      cellArray[i].addEventListener('click', () => {
        cellArray[i].className += userClass;
        let result = playGame(cellArray[i].id);

        switch (typeof result) {
          case 'number':{
            document.getElementById(result).className +=  computerClass;
          }
            break;
          case 'string': {
            let span = document.createElement('span');
            span.innerHTML = result;
            document.getElementsByClassName('tic-tac-toe')[0].appendChild(span);
          }
          break;
          default:{
            if (result.last !== 0)  document.getElementById(result.last).className +=  computerClass;
            let span = document.createElement('span');
            span.innerHTML = result.winner;
            document.getElementsByClassName('tic-tac-toe')[0].appendChild(span);
          }

        }

      });
    }
  });

document.getElementById('clear').addEventListener('click', ()=>{
  let divCellArray = document.getElementsByClassName('tic-tac-toe-cell');
  for(let i = 0; i < divCellArray.length; i++){
    divCellArray[i].className = 'tic-tac-toe-cell';
  }
 addRule();
 location.reload();
});


function addRule(){
  let span = document.createElement('span');
  span.innerHTML = `Check 'I want to go first' to go first (if you want) and press 'Start the game' button to start a new game`;
  document.getElementsByClassName('tic-tac-toe')[0].appendChild(span);
}

function removeLastSpan(){
  document.getElementsByClassName('tic-tac-toe')[0].removeChild(document.getElementsByClassName('tic-tac-toe')[0].lastChild);

}

});
