const grid=document.querySelector(".grid");
const startButton=document.getElementById("start");
const score=document.getElementById("score"); 
let squares=[];
let currentSnake=[2,1,0]
let direction = 1;
const width=10;
let appleIndex;
let scorePlayer =0;
let IntervalTime=1000;
let speed = 2;
let timeRepeat=0;

function creatGrid(){
      //creat element
      //creat 100 element
    for(let i=0 ; i<100 ; i++ ){
        const square=document.createElement("div");
            console.log(square);
        square.classList.add("square");
        grid.appendChild(square);
        squares.push(square);
        console.log(squares);
    }
 }


creatGrid();

function startGame(){
    //remove the snake
    currentSnake.forEach(index=> squares[index].classList.remove("snake"));
    //remove the apple 
    squares[appleIndex].classList.remove("apple");
    //restarte the variables
    clearInterval(timeRepeat);
     scorePlayer=0;
     currentSnake=[2,1,0];
     direction=1 ;
     IntervalTime=1000 ;
     generateApples();
     timeRepeat=setInterval(move,IntervalTime);
}
currentSnake.forEach(indexe => squares[indexe].classList.add("snake"))
function move(){
    if(
        //if snak his hit bottom 
        (currentSnake[0] + width >=width*width && direction === width)||
        (currentSnake[0] % width === width-1  && direction === 1) ||
        (currentSnake[0] % width ===  0  && direction === -1) || 
        (currentSnake[0] - width < 0  && direction === -width ) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timeRepeat);

    //remove last element in cuurently squares array
    const tail =currentSnake.pop();
    //remove stying
    squares[tail].classList.remove("snake");
    //move snake to new position 
    currentSnake.unshift(currentSnake[0] +  direction);
    //deal with sanke head getting the apple
    if(squares[currentSnake[0]].classList.contains("apple")){
        //remove the class of apple 
        squares[currentSnake[0]].classList.remove("apple");
        //grow oour snake by adding clas of snake to it
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        //grow our snake array
        generateApples();
        //add one of the score
        scorePlayer++;
        score.textContent=` ${scorePlayer}`
        //speedup our snake 
        clearInterval(timeRepeat);
        IntervalTime +=speed;
        timeRepeat=setInterval(move,IntervalTime);

    }
    //add styling so we ca, see it
    squares[currentSnake[0]].classList.add("snake");
}
move();


function generateApples(){
    do{
        //generate Random index apple 
        appleIndex =Math.floor(Math.random()*squares.length);
    }while(squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");

}
generateApples();  
function control(e){
    if(e.keyCode === 39){
        console.log("right pressed");
        direction=1;
    }
    else if(e.keyCode=== 38) {
        console.log('up pressed');
        direction=-width;
    }
    else if ( e.keyCode===37 ) {
        console.log ('left pressed');
        direction=-1;
    }
    else if(e.keyCode=== 40){
        console.log("down pressed");
        direction= +width;
    }
    
}
document.addEventListener('keyup',control);
startButton.addEventListener('click' , startGame);