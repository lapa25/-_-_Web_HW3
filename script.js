const board = document.querySelector('.field');
const sizeInput = document.getElementById("size");
const updateButton = document.getElementById("update");
const cleanButton = document.getElementById("clean")
const nowText = document.getElementById("now");
const result = document.getElementById("result")
let now = 'X';
let cells;

let size = parseInt(sizeInput.value, 10);
let f = [];
function ArrayResult(){
  for (let i = 0; i < size; i++){
    f[i] = [];
    for (let j = 0; j < size; j++){
      f[i][j] = -1;
    }
  }
}

function changePlayer(i, j){
  if (now == 'X'){
    f[i][j] = 1;
    now = '0';
  }
  else{
    f[i][j] = 0;
    now = 'X';
  }
}

let first = document.getElementById('first');
let changedFirst = false
first.addEventListener('change', function(e){
  if (!changedFirst){
    now = e.target.value;
    nowText.textContent = now;
  }
   
   
})

function createField(size) {
  board.innerHTML = "";
  ArrayResult();
  result.textContent = '';
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      let cell = document.createElement('div');      
      cell.classList.add('fieldCell');
      cell.id = String(i) + String(j)
      board.append(cell);
      now = first.player.options[first.player.options.selectedIndex].textContent
      cell.addEventListener("click", () =>{
        if (!cell.classList.contains('fieldCellUsed')){
          if (!changedFirst){
            changedFirst = true          
          }        
          cell.textContent = now;
          cell.classList.add('fieldCellUsed')
          changePlayer(i, j);
          nowText.textContent = now;
          let res = checkResult(cell);
          if (res[0] == 'win'){
            changePlayer(i, j)
            result.textContent = `Победили ${now}!`;
            cells.forEach(element => {
              if (res[1].indexOf(element.getAttribute('id')) != -1){
                element.classList.add('fieldWin');
              }
              element.classList.add('fieldCellUsed');
            })
          }
          if (res[0] == 'draw'){
            result.textContent = `Ничья!`;
            cells.forEach(element => {
              element.classList.add('fieldCellUsed');
            })
          }
        }        
      })
    }
  }
  cells = document.querySelectorAll(".fieldCell");
  changedFirst = false;
  nowText.textContent = now;
}

createField(3)

updateButton.addEventListener("click", () => {
  size = parseInt(sizeInput.value, 10);
  if (size >= 3 && size <= 10) {
    createField(size);
  } else {
    alert("Введите размер от 3 до 10");
  }
});

cleanButton.addEventListener("click", () => {
  createField(size);
});


function checkResult(cell){
  const id =  cell.getAttribute('id');
  let i = parseInt(id[0], 10);
  let j = parseInt(id[1], 10);
  let count = 0;
  let arrWin = [String(i) + '0']
  for (let k = 0; k < size - 1; k++){
    if (f[i][k] == f[i][k + 1]){
      count++;
      arrWin[k + 1] = String(i) + String(k + 1)
    }
  }
  if (count == size - 1){
    return ['win', arrWin];
  }

  count = 0;
  arrWin = ['0' + String(j)]
  for (let k = 0; k < size - 1; k++){
    if (f[k][j] == f[k + 1][j]){
      count++;
      arrWin[k + 1] = String(k + 1) + String(j)
    }
  }
  if (count == size - 1){
    return ['win', arrWin];
  }
  if (i == j){
    count = 0;
    arrWin = ['00']
    for (let k = 0; k < size - 1; k++){
      if (f[k][k] == f[k + 1][k + 1]){
        count++;
        arrWin[k + 1] =String(k + 1) + String(k + 1)
      }
    }
    if (count == size - 1){
      return ['win', arrWin];
    }
  }
  if (i == size - j - 1){
    count = 0;
    arrWin = [`0${size - 1}`]
    for (let k = 0; k < size - 1; k++){
      if (f[k][size - k - 1] == f[k + 1][size - k - 2]){
        count++;
        arrWin[k + 1] = String(k + 1) + String(size - k - 2)
      }
    }
    if (count == size - 1){
      return ['win', arrWin];
    }
  }
  count = 0;
  for (let k = 0; k < size; k++){
    for (let m = 0; m < size; m++){
      if (f[k][m] != -1){
        count ++;
      }
    }
  }
  if (count == size*size){
    return ['draw', []]
  }
  return ['lose', []];
}

