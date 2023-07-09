var score = 0;
var highscore;
var gameOver = false;

//board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

window.onload = function(){
    highscore = document.getElementById("Highscore");
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d"); //used to draw on board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/5); //run update function 10 times a second
}

function update(){

    if(gameOver){
        return;
    }

    //draw board
    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    //draw Food
    context.fillStyle="Red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //check if snake eats food
    if(snakeX  == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        score++;
        highscore.textContent=score;
        placeFood();
    }

    //draw snake tail
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    //draw Snake
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    //snake out of bounds
    if(snakeX < 0 || snakeX > columns * blockSize -1 || snakeY < 0 || snakeY > rows * blockSize -1){
        gameOver = true;
        alert("Game Over \n Score: " +score);
    }

    //snake eat tail
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over \n Score: " +score);
        }
    }
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft"&& velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight"&& velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    //random number for X&Y coordinates
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}