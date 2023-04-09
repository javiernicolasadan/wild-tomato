window.addEventListener('load', ()=>{
    //canvas target and context
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    //startButton target
    const startButton = document.querySelector('#start-button');
    canvas.style.display = 'none'

    //intro target
    const intro = document.querySelector('.game-intro')

    //images
    const backgroundImage = new Image()
    backgroundImage.src = './images/canvas-background.webp'

    const tomatoPlant = new Image()
    tomatoPlant.src = './images/buena-recortada.png'

    //tomato plant variables
    const tomWidth = 150
    const tomHeight = 200
    let tomX = 0
    let tomY = canvas.height / 2

    //movement variables
    let moveUp = false
    let moveDown = false

    //requestAnimationFrame
    let forLaterCancel = null


    //logic and functions
    function startGame () {
        canvas.style.display = 'block'
        intro.style.display = 'none'
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
        //to check canvas
        //canvas.style.backgroundColor = 'red'
        drawTomatoPlant()
        tomatoMove()
    }

    function drawTomatoPlant () {
        ctx.drawImage(tomatoPlant, tomX, tomY, tomWidth, tomHeight)
    }

    function tomatoMove () {
        if (moveUp && tomY > 0) {
            tomY -= 5;
        }
        if (moveDown && tomY < canvas.height - tomHeight ) {
            tomY += 5;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
        drawTomatoPlant()
        forLaterCancel = requestAnimationFrame(tomatoMove)

    }

    //event listeners
    startButton.addEventListener('click', () => {
        startGame()
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

    

})

