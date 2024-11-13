const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

const ballRadius = 8;
let x = canvas.width / 2;
let y = canvas.height - 30;
let speed;
let dx, dy;

let brickRowCount;
let brickColumnCount;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 35;

let bricks = [];
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let rightPressed = false;
let leftPressed = false;
let gameOver = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Background music setup
const backgroundMusic = new Audio('assets/Moving In The Shadows - The Soundlings.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
backgroundMusic.playbackRate = 1;
backgroundMusic.play().catch(() => {
    document.body.addEventListener('click', () => backgroundMusic.play(), { once: true });
});

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function startGame() {
    brickRowCount = parseInt(document.getElementById('brickRows').value);
    brickColumnCount = parseInt(document.getElementById('brickCols').value);
    speed = parseFloat(document.getElementById('ballSpeed').value);

    const randomAngle = (Math.random() * (Math.PI / 3)) + (Math.PI / 6);
    dx = Math.random() < 0.5 ? speed * Math.cos(randomAngle) : -speed * Math.cos(randomAngle);
    dy = -speed * Math.sin(randomAngle);

    createBricks();
    document.getElementById('configForm').style.display = 'none';
    canvas.style.display = 'block';
    draw();
}

function createBricks() {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#f00';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = '#f00';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#00f';
                ctx.shadowColor = '#fff';
                ctx.shadowBlur = 5;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brick = bricks[c][r];
            if (brick.status === 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    if (score > highScore) {
                        highScore = score;
                        localStorage.setItem('highScore', highScore);
                    }
                    if (backgroundMusic.playbackRate < 1.5) {
                        backgroundMusic.playbackRate += 0.02;
                    }
                    if (score === brickRowCount * brickColumnCount) {
                        displayEndMessage('YOU WIN, CONGRATULATIONS!');
                        backgroundMusic.pause();
                        return;
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Score: ' + score, canvas.width - 100, 20);
    ctx.fillText('High Score: ' + highScore, canvas.width - 250, 20);
}

function displayEndMessage(message) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '40px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    createRestartButton();
    gameOver = true;
}

function createRestartButton() {
    const button = document.createElement('button');
    button.innerText = 'Restart Game';
    button.style.position = 'absolute';
    button.style.top = '70%';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    button.onclick = () => document.location.reload();
    document.body.appendChild(button);
}

function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - paddleHeight - 10) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            let paddleCenter = paddleX + paddleWidth / 2;
            let hitPosition = (x - paddleCenter) / (paddleWidth / 2);
            dx = hitPosition * speed;
            dy = -Math.sqrt(speed ** 2 - dx ** 2);
        } else {
            displayEndMessage('GAME OVER');
            backgroundMusic.pause();
            return;
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
