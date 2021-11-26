const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let player = { start: true, speed: 7, score: 0 };
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;

}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;

}

function movelines() {
    let lines = document.querySelectorAll(".line")
    lines.forEach(function(item) {
        if (item.y > 900) {
            item.y -= 900;
        }
        item.y += player.speed
        item.style.top = item.y + "px"
    })
}

function collide(a, b) {
    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}

function endgame() {
    player.start = false;
    score.innerHTML = "Your Score is</br> " + player.score
    startScreen.classList.remove("hide")



}

function moveEnemey(car) {
    let lines = document.querySelectorAll(".enemy")

    lines.forEach(function(item) {
        if (collide(car, item)) {
            endgame()
        }

        if (item.y > 1500) {
            item.y -= 2400;
            item.style.left = Math.floor(Math.random() * 150 + "px")
        }
        item.y += player.speed
        item.style.top = item.y + "px"
    })


}

function playGame() {
    let car = document.querySelector(".car");
    movelines();
    moveEnemey(car);
    if (player.start) {
        if ((keys.ArrowUp || keys.w) && player.y > -800) { player.y -= player.speed; }
        if ((keys.ArrowDown || keys.s) && player.y < 1000) { player.y += player.speed; }
        if ((keys.ArrowLeft || keys.a) && player.x > 5) { player.x -= player.speed; }
        if ((keys.ArrowRight || keys.d) && player.x < 190) { player.x += player.speed; }
        car.style.left = player.x + 'px'
        car.style.top = player.y + 'px'
        window.requestAnimationFrame(playGame)
        player.score++;

        score.innerText = "Score " + player.score;
    }

}



function start() {
    startScreen.classList.add("hide")
    player.start = true;
    gameArea.innerHTML = ""

    player.score = 0;

    for (let x = 0; x < 6; x++) {
        let div = document.createElement("div")
        div.classList.add("line")
        div.y = 150 * x;
        div.style.left = "30px"
        div.style.top = (x * 150) + "px"
        gameArea.appendChild(div)
    }
    let car = document.createElement("div");
    car.innerText = "Car"
    car.setAttribute("class", "car")

    gameArea.appendChild(car);
    player.x = car.offsetLeft
    player.y = car.offsetTop

    for (let x = 0; x < 3; x++) {

        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = ((x + 1) * 500) * -1;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = Math.floor(Math.random() * 200) + "px";
        enemy.style.backgroundColor = "red";
        gameArea.appendChild(enemy);

    }

    window.requestAnimationFrame(playGame);

}