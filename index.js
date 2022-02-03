const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let keys = {ArrowUp : false, ArrowDown: false, ArrowLeft : false, ArrowRight: false};

let player = { speed: 4, score: 0 };

// console.log(player);

// Generating random color for Enemy car
const randomColor = ()=> {
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0" + String(hex)).substr(-2); // if by chance i get number in single digit from 'hex' so thats why i am adding 0 in front.
    }
    return "#" + c() + c() +c()
}

// function -> if my car ---COLLIDE--- with enemy car then game over. 
// so finding my car coordinates/position by getBoundingClientRect().

const  isCollide = (myCar, enemyCar) => {
    myCarRect = myCar.getBoundingClientRect();
    enemyCarRect = enemyCar.getBoundingClientRect();

    return !((myCarRect.top > enemyCarRect.bottom) || (myCarRect.bottom < enemyCarRect.top)
            || (myCarRect.right < enemyCarRect.left) || (myCarRect.left > enemyCarRect.right));
}

const endGame = () => {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `Game Over <br> Your final score is ${player.score} <br>Press here to restart the Game`;
}

// move enemy Cars on road
const moveEnemyCars = (car) => {
    let enemyCar = document.querySelectorAll('.enemyCar');
    enemyCar.forEach( (curEnemyCar)=> {

        if(isCollide(car, curEnemyCar)){
            console.log("BOOM! game over");
            endGame();
        }

        if(curEnemyCar.y >= 750){
            curEnemyCar.y = -300;
            curEnemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        }
        // console.log(curEnemyCar.y);

        curEnemyCar.y += player.speed;
        curEnemyCar.style.top = curEnemyCar.y + "px";
    } )
}
// move lines on road
const moveLines = () => {
    let lines = document.querySelectorAll('.lines');
    lines.forEach( (curItem)=> {

        if(curItem.y >= 700){
            curItem.y -= 750;
        }

        curItem.y += player.speed;
        curItem.style.top = curItem.y + "px";


    } )
}

const gamePlay = () => {
    // console.log("I M clicked");
    let car = document.querySelector('.car');

    // finding my road coordinates/position by getBoundingClientRect()
    let road = gameArea.getBoundingClientRect();
    // console.log(road);

    if(player.start){

        // function to move lines on road
        moveLines();
        // function to move Enemy cars on road
        moveEnemyCars(car);
        
        if(keys.ArrowUp && player.y > road.top + 85){
            player.y -=  player.speed;
            // console.log(player);
            // console.log("player up");
        }
        if(keys.ArrowDown && player.y < road.bottom - 85){player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
        if(keys.ArrowRight && player.x < road.width - 50){player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);
        player.score++;
        let ps =  player.score -1;
        score.innerText = "Score: " + ps;
    }
    
}


const start = () => {
    player.start = true;
    player.score = 0;
    // console.log(player);
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    gameArea.innerHTML = "";
    

    window.requestAnimationFrame(gamePlay);

    // creating road

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerHTML = "Bro! I am Here."
    gameArea.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log(player);

    // creating road line

    // let roadLine = document.createElement('div');
    // roadLine.setAttribute('class', 'lines');
    // gameArea.appendChild(roadLine);

    for(i = 0; i < 7; i++){
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'lines');

    roadLine.y = i*150;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
    }

    // generating Enemy car photo

    for(i = 0; i < 3; i++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemyCar');
        // console.log(enemyCar);
    
        enemyCar.y = ((i+1)*350) * -1 ;
        // console.log(enemyCar.y);
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();// for random color in enemy car
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);

        
        
    }
}

startScreen.addEventListener('click', start);





// when i pressed and released key


const keyDown = (e) => {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}

const keyUp = (e) => {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
    // console.log(e.key);
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
