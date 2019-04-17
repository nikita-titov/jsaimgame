// Узлы и переменные
var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')
var score = 0
var isGameStarted = false

// События
$start.addEventListener('click', startGame)
$game.addEventListener('click', handelBoxClick)
$gameTime.addEventListener('input', setGameTime)

// Показывать елементы
function show($el) {
    $el.classList.remove('hide')
}

// Скрывать елементы
function hide($el) {
    $el.classList.add('hide')
}

// Фун-я начала игры
function startGame() {
    isGameStarted = true
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    hide($start)
    $game.style.backgroundColor = '#fff'

    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

// Фун-я для работы со ввременем
function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

// Фун-я для окончания игры
function endGame() {
    isGameStarted = false
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
    $result.innerHTML = score
}

// Фун-я случайного цвета
function boxColor() {
    var colorArray = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
    'silver', 'teal', 'yellow']
    var rand = Math.floor(Math.random() * colorArray.length)
    return colorArray[rand]
}

// Фун-я для действий при клике
function handelBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if(event.target.dataset.box) {
        score++
        renderBox()
    }
}

// Фун-я для работы с квадратом.
function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = boxColor()
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px' 
    box.setAttribute('data-box', 'true')
    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}