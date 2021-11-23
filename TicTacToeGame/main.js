const area = document.getElementById('area');
let move = 0;
let result = '';

area.addEventListener('click', a => {
  if(a.target.className = 'box') {
    console.log(a.target);
    move % 2 === 0 ? a.target.innerHTML = 'X' : a.target.innerHTML = 'O';
    move++;
    check();
  }
})

const check = () => {
  const boxes = document.getElementsByClassName('box');
  console.log(boxes);
  const arr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for(i=0; i<arr.length; i++) {
    if(
      boxes[arr[i][0]].innerHTML == 'X' && boxes[arr[i][1]].innerHTML == 'X' && boxes[arr[i][2]].innerHTML == 'X'
    ) {
      result = 'X-es Won!';
      prepareResult(result);
    } else if (
      boxes[arr[i][0]].innerHTML == 'O' && boxes[arr[i][1]].innerHTML == 'O' && boxes[arr[i][2]].innerHTML == 'O'
    ) {
      result = 'Zeros Won!';
      prepareResult(result);
    }
  }
}

const prepareResult = winner => {
  console.log(winner);
}
