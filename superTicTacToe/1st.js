function showWinnerPopup(winner) {
  const winnerDeclaration = document.getElementById('winnerDeclaration');
  winnerDeclaration.textContent = winner + ' won!';
  const winnerPopup = document.getElementById('winnerPopup');
  winnerPopup.style.display = 'block';
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    table.classList.add('blurred');
  });
}
function showDrawPopup(){
  const winnerDeclaration = document.getElementById('winnerDeclaration');
  winnerDeclaration.textContent = 'It\'s a draw!';
  const winnerPopup = document.getElementById('winnerPopup');
  winnerPopup.style.display = 'block';
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    table.classList.add('blurred');
  });
}
function removeBlur() {
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    table.classList.remove('blurred');
  });
}
function isGameDone() {
  let board = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(played[i * 3 + j]);
    }
    board.push(row);
  }
  for(let i = 0;i<3;i++)
  {
    if(board[i][0]!="none" && board[i][0]!="draw" && board[i][0]===board[i][1] && board[i][1]===board[i][2])
      return board[i][0];
    if(board[0][i]!="none" && board[0][i]!="draw" && board[0][i]===board[1][i] && board[1][i]===board[2][i])
      return board[0][i];
  }
  if(board[0][0]!="none" && board[0][0]!="draw" && board[0][0]===board[1][1] && board[1][1]===board[2][2])
    return board[1][1];
  if(board[0][2]!="none" && board[0][2]!="draw" && board[0][2]===board[1][1] && board[1][1]===board[2][0])
    return board[1][1];
  if (played.filter(x=>x === "draw").length>6)
    return 'draw';
  else
    return 'none';
}
function isTableDone(table) {
  let board = [];
  const cells = table.querySelectorAll("td");
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(cells[i * 3 + j].textContent.trim());
    }
    board.push(row);
  }
  for(let i = 0;i<3;i++)
  {
    if(board[i][0]!="" && board[i][0]===board[i][1] && board[i][1]===board[i][2])
      return board[i][0];
    if(board[0][i]!="" && board[0][i]===board[1][i] && board[1][i]===board[2][i])
      return board[0][i];
  }
  if(board[0][0]!="" && board[0][0]===board[1][1] && board[1][1]===board[2][2])
    return board[1][1];
  if(board[0][2]!="" && board[0][2]===board[1][1] && board[1][1]===board[2][0])
    return board[1][1];
  if (!"" in cells)
    return 'draw';
  else
    return 'none'
}
function cellClickHandler(cell, tableNumber, cellIndex, table) {
  if (cell.innerHTML == "" && isTrue[tableNumber - 1] && played[tableNumber-1]=="none") {
    isTrue.fill(false);
    cell.innerHTML = x++ % 2 == 0 ? "X" : "O";
    played[tableNumber-1]=isTableDone(table,0);
    if(played[cellIndex]!="none"){
      isTrue.fill(true)
      isTrue[cellIndex]=false;
    }
    else
      isTrue[cellIndex] = true;
    console.log(played);
    let z=isGameDone();
    if (z !== 'none') {
      if (z === 'draw') {
        showDrawPopup();
      } else {
        showWinnerPopup(z);
      }
      removeBlur();
    }
    const tables = document.querySelectorAll("table");
    tables.forEach((table,index)=>{
      if(!isTrue[index] || played[index]!=="none"){
        table.classList.add("blurred");
      }
      else{
        table.classList.remove("blurred");
      }
    })
  } else {
    alert("you cannot play there plz play by game rule");
  }
}
var x = 0;
const isTrue = new Array(9).fill(true);
const played = new Array(9).fill("none");
document.addEventListener("DOMContentLoaded", function () {
  const tables = document.querySelectorAll("table");
  tables.forEach((table, index) => {
    const cells = table.querySelectorAll("td");
    cells.forEach((cell, cellIndex) => {
      cell.addEventListener("click", () => {
        const rowIndex = cell.parentNode.rowIndex;
        cellClickHandler(cell, index + 1, cellIndex, table);
      });
    });
  });
  const refreshButton = document.getElementById('refreshButton');
  refreshButton.addEventListener('click', function() {
    window.location.reload();
  });
});
