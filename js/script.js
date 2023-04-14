window.addEventListener('load', ()=>{

    //canvas target and context
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    //start and restart Buttons target
    const startButton = document.querySelector('#start-button');
    const restartButton = document.querySelector('#restart-button')

    //start without canvas
    canvas.style.display = 'none'

    //intro target
    const intro = document.querySelector('.game-intro')

    //game over target
    const gameOverSplash = document.querySelector('#game-over')
    gameOverSplash.style.display = 'none'

    //score
    let score = 0

    //music
    const gameMusic = new Audio("./music/game-music.mp3")
    const gameOverSound = new Audio("./music/game-over-sound.mp3")
    const collisonSound = new Audio("./music/collision-sound.mp3")


    //images
    const backgroundImage = new Image()
    backgroundImage.src = './images/canvas-background-good.png'

    const tomatoPlant = new Image()
    tomatoPlant.src = './images/tomato-cutted-js.png'

    const scissor1 = new Image()
    scissor1.src = './images/scissor-recortada2.png'

    //tomato plant variables
    const tomWidth = 100
    const tomHeight = 150
    let tomX = 0
    let tomY = canvas.height / 2

    //movement variables
    let moveUp = false
    let moveDown = false

    //requestAnimationFrame
    let forLaterCancel = null

    //game over 
    let isGameOver = false 

    let speed = 10 

    //class Scissors
    class Scissors {
        constructor(x, y, speed) {
            this.width = 150
            this.height = 120
            this.x = x
            this.y = y
            this.speed = speed
            this.image = scissor1
        }

        drawScissors() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }

        move() {
            this.x -= this.speed
            if (this.x < -200 ) {
                this.x = 2800;
                this.y = Math.random()*(canvas.height)
            } 
        }
        
        checkCollision(tomX, tomY, tomWidth, tomHeight) {
            if (tomY < this.y + this.height && 
                tomHeight + tomY > this.y &&
                tomX < this.x + this.width &&
                tomWidth + tomX > this.x) 
            {isGameOver = true;
            collisonSound.play()}
        }
    }

    const scissors1 = new Scissors(
        2800,
        130,
        speed + 4,
    );
    const scissors2 = new Scissors(
        2800,
        300,
        speed + 6,
    );
    const scissors3 = new Scissors(
        2800,
        500,
        speed - 6,
    );
    const scissors4 = new Scissors(
        2800,
        700,
        speed - 4,
    );
        
    let scissorsArr = [scissors1, scissors2, scissors3, scissors4]
      
    //logic and functions
    function startGame () {
        canvas.style.display = 'block'
        intro.style.display = 'none'
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        score = 0
        scoreCount()
        setInterval(() => {
            scissorsArr.forEach(scissors => {
                scissors.speed += 1
            })
        } ,5000)
        anime();
    }

    function anime () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
        drawTomatoPlant()
        scissorsArr.forEach(scissors => {
            scissors.drawScissors()
            console.log(scissors)
            scissors.move()
            scissors.checkCollision(tomX, tomY, tomWidth, tomHeight)
        });

        drawScore()
        tomatoMove()
            if (isGameOver) {
                cancelAnimationFrame(forLaterCancel)
                gameOver()
            } else {
                forLaterCancel = requestAnimationFrame(anime)
        }
    }
    
    //all draws
     function drawTomatoPlant () {
        ctx.drawImage(tomatoPlant, tomX, tomY, tomWidth, tomHeight)
    }
    
    function drawScore () {
        ctx.beginPath()
        ctx.fillStyle ="black"
        ctx.fillText(`SCORE: ${score}`, canvas.width/2, 80)
        ctx.font = "bold 80px serif"
        ctx.closePath()
    }
  
    function tomatoMove () {
        if (moveUp && tomY > 0) {
            tomY -= 5;
        }
        if (moveDown && tomY < canvas.height - tomHeight) {
            tomY += 5;
        }
    }
   
    function scoreCount  () {
    setInterval(() => {
        score++
    } ,1000)
    }

    //event listeners
    startButton.addEventListener('click', () => {
        startGame()
        gameMusic.loop = true
        gameMusic.play()
    })

    restartButton.addEventListener('click', () => {
        isGameOver = false
        scissorsArr.forEach(scissors => {
            scissors.x = 2700
        })
        gameOverSplash.style.display = 'none'
        startGame()
        gameMusic.play()
    })

    document.addEventListener('keydown', (event) => {
        if (event.key === 'w'||event.key === 'W'||event.key === 'ArrowUp') {
            moveUp = true 
        }
        if (event.key === 's'||event.key === 'S'||event.key === 'ArrowDown') {
            moveDown = true 
        }
      })
    
    document.addEventListener('keyup', (event) => {
        if (event.key === 'w'||event.key === 'W'||event.key === 'ArrowUp') {
            moveUp= false 
        }
        if (event.key === 's'||event.key === 'S'||event.key === 'ArrowDown') {
            moveDown = false 
        }
      })


    //game over
    function gameOver () {
        canvas.style.display = 'none'
        gameOverSplash.style.display = 'flex'
        document.querySelector('#your-score').innerText = `YOUR SCORE: ${score}`
        setInterval(() => {
            scissorsArr.forEach(scissors => {
                scissors.speed = speed
            })
        } ,5000)
        gameOverSound.play()
    }  
})
        
     

