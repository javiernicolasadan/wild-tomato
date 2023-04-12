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

    //images
    const backgroundImage = new Image()
    backgroundImage.src = './images/canvas-background-good.png'

    const tomatoPlant = new Image()
    tomatoPlant.src = './images/tomato-cutted-js.png'

    const scissor1 = new Image()
    scissor1.src = './images/scissor-recortada2.png'

    const scissor2 = new Image()
    scissor2.src = './images/scissor-recortada2.png'

    const scissor3 = new Image()
    scissor3.src = './images/scissor-recortada2.png'

    const scissor4 = new Image()
    scissor4.src = './images/scissor-recortada2.png'


    //tomato plant variables
    const tomWidth = 100
    const tomHeight = 150
    let tomX = 0
    let tomY = canvas.height / 2

    //scissor 1 variables
    const scissor1Width = 100
    const scissor1Height = 150
    let scissor1X = 2800
    let scissor1Y = 130
    let scissor1Speed = 15

    //scissor 2 variables
    const scissor2Width = 100
    const scissor2Height = 150
    let scissor2X = 2800
    let scissor2Y = 300
    let scissor2Speed = 16

    //scissor 3 variables
    const scissor3Width = 100
    const scissor3Height = 150
    let scissor3X = 2800
    let scissor3Y = 500
    let scissor3Speed = 13

    //scissor 4 variables
    const scissor4Width = 100
    const scissor4Height = 150
    let scissor4X = 2800
    let scissor4Y = 700
    let scissor4Speed = 12


    //movement variables
    let moveUp = false
    let moveDown = false

    //requestAnimationFrame
    let forLaterCancel = null

   

    //game over 
    let isGameOver = false 

    //scissors array
    /* let scissorsArr = []

    function createScissors() {
        const newScissors = new scissorsObs(this.width, this.height, this.x, this.y)
        scissorsArr.push(newScissors)
    }

    function an

    //class Scissors
    class scissorsObs {
        constructor(width, height, x, y) {
            this.width = 150
            this.height = 120
            this.x = 1200 - this.width
            this.y = Math.random()*(canvas.height-this.height)
            
        }

        drawScissors() {
            ctx.drawImage(scissors, this.x, this.y, this.width, this.height)
        }

        move() {
            this.x -= 15
        }
        
        checkCollision() {
            if (tomY < this.y + this.height && tomHeight + tomY > this.y 
                && tomX < this.x + this.width && tomWidth + tomX > this.x) 
            {gameOver = true}
        }
    }
 */
   
    //check collision
    function checkCollision () {
        if ((scissor1Y < tomY + tomHeight && scissor1Y + scissor1Height > tomY && 
            scissor1X < tomX + tomWidth && scissor1X + scissor1Width > tomX) ||
           (scissor2Y < tomY + tomHeight && scissor2Y + scissor2Height > tomY && 
            scissor2X < tomX + tomWidth && scissor2X + scissor2Width > tomX) ||
           (scissor3Y < tomY + tomHeight && scissor3Y + scissor3Height > tomY && 
            scissor3X < tomX + tomWidth && scissor3X + scissor3Width > tomX) ||
           (scissor4Y < tomY + tomHeight && scissor4Y + scissor4Height > tomY && 
            scissor4X < tomX + tomWidth && scissor4X + scissor4Width > tomX)) {
            isGameOver = true
            console.log("collision")
         }
    }  

    //logic and functions
    function startGame () {
        canvas.style.display = 'block'
        intro.style.display = 'none'
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        score = 0
        scoreCount()
        moreSpeed()
        anime();
    }

    function anime () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
        drawTomatoPlant()
        drawScissor1()
        scissor1Move()
        drawScissor2()
        scissor2Move()
        drawScissor3()
        scissor3Move()
        drawScissor4()
        scissor4Move()
        checkCollision()
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
    function drawScissor1 () {
        ctx.drawImage(scissor1, scissor1X, scissor1Y, scissor1Width, scissor1Height)
    }
    function drawScissor2 () {
        ctx.drawImage(scissor2, scissor2X, scissor2Y, scissor2Width, scissor2Height)
    }
    function drawScissor3 () {
        ctx.drawImage(scissor3, scissor3X, scissor3Y, scissor3Width, scissor3Height)
    }
    function drawScissor4 () {
        ctx.drawImage(scissor4, scissor4X, scissor4Y, scissor4Width, scissor4Height)
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
    function scissor1Move () {
        if (scissor1X > 0) {
            scissor1X -= scissor1Speed;
        } else {scissor1X = 2400 }
    }
    function scissor2Move () {
        if (scissor2X > 0) {
            scissor2X -= scissor2Speed;
        } else {scissor2X = 2400 }
    }
    function scissor3Move () {
        if (scissor3X > 0) {
            scissor3X -= scissor3Speed;
        } else {scissor3X = 2400 }
    }
    function scissor4Move () {
        if (scissor4X > 0) {
            scissor4X -= scissor4Speed;
        } else {scissor4X = 2400 }
    }

    function scoreCount  () {
    setInterval(() => {
        score++
    } ,1000)
    }

    function moreSpeed () {
    setInterval(() => {
        scissor1Speed += 1
        scissor2Speed += 1
        scissor3Speed += 1
        scissor4Speed += 1
    } ,5000)
    }

    //event listeners
    startButton.addEventListener('click', () => {
        startGame()
    })

    restartButton.addEventListener('click', () => {
        isGameOver = false
        scissor1X = 2800
        scissor2X = 2800
        scissor3X = 2800
        scissor4X = 2800
        gameOverSplash.style.display = 'none'
        startGame()
        console.log("hola")
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
        document.querySelector('#your-score').innerText = `Your score: ${score}`
      
    }  
})
        
     

