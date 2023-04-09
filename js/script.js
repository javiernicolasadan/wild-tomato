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
    }

    function drawTomatoPlant () {
        ctx.drawImage(tomatoPlant, tomX, tomY, tomWidth, tomHeight)
    
    }

    //event listeners
    startButton.addEventListener('click', () => {
        startGame()
    })

    

})
