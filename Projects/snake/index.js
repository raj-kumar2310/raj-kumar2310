const playBoard =  document.querySelector(".play-board");
const scoreElement =  document.querySelector(".score");
const HighscoreElement =  document.querySelector(".Highscore");
const controls = document.querySelectorAll(".controls i");


let foodX,foodY;
let snakeX=5,snakeY=10;
let snakeBody=[];
let velocityX=0,velocityY=0;
let gameover=false;
let setIntervalId;
let score =0;
let highScore = localStorage.getItem("Highscore") || 0;
HighscoreElement.innerHTML = `High-Score: ${highScore}`;

const handleGameover = () =>
{
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = (e) =>
{
if(e.key === "ArrowUp" && velocityY != 1){
    velocityX=0;
    velocityY=-1;
}
else if(e.key === "ArrowDown" && velocityY != -1)
{
    velocityX=0;
    velocityY=1;
}
else if(e.key === "ArrowLeft" && velocityX != 1)
{
    velocityX=-1;
    velocityY=0;
}
else if(e.key === "ArrowRight" && velocityX != -1)
{
    velocityX=1;
    velocityY=0;
}};






const changeFoodposition = () =>{
    foodX=Math.floor(Math.random() * 30 + 1);
    foodY=Math.floor(Math.random() * 30 + 1);
}


const initGame = () => {
    if(gameover) return handleGameover();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
    if(snakeX === foodX && snakeY === foodY)
        {
            changeFoodposition();
            snakeBody.push([foodX,foodY]);
            score++;
            highScore = score >= highScore ? score : highScore;
            localStorage.setItem("Highscore", highScore);
            
            scoreElement.innerHTML = `Score: ${score}`;
            HighscoreElement.innerHTML = `High-Score: ${highScore}`;
        }
        
        for (let i = snakeBody.length -1; i > 0; i--) {
            snakeBody[i] = snakeBody[i-1];
            
        }
        snakeBody[0] = [snakeX,snakeY];
        
        snakeX += velocityX;
        snakeY += velocityY; 
        if(snakeX > 30 || snakeX < 1 || snakeY < 1 || snakeY > 30)
            {
                gameover=true;
            }
            for (let i = 0; i < snakeBody.length; i++) {
                
                htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;
                if( i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
                    gameover = true;
                }
            }
            
            
            
            playBoard.innerHTML=htmlMarkup;
        }
        
        changeFoodposition();
        setIntervalId= setInterval(initGame,125);
        document.addEventListener("keydown",changeDirection);
        controls.forEach(key => {
            key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
        });