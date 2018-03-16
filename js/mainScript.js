window.addEventListener('DOMContentLoaded', function () {
  initWelcomeScreen()
  initDrawer()
})

initWelcomeScreen = () => {
  const welcomeScreen = document.getElementsByClassName('welcome-screen')[0]
  const startButton = document.getElementsByClassName('welcome-screen__info-button')[0]
  
  startButton.addEventListener('click', function (e) {
    welcomeScreen.style.display = 'none'
  })
}

function initDrawer () {
  const canvas = document.getElementById('draw')
  const context = canvas.getContext('2d')
  const sequenceLength = 200;

  let isDrawing = false
  let lastX = 0
  let lastY = 0
  let hue = Math.random() * 360
  let sequence = []
  let rainbow = []

  for (var i = 0; i < sequenceLength; i++) {
    rainbow.push(i * 360 / sequenceLength)
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context.fillStyle = `hsl(${hue}, 90%,50%)`

  function draw (e) {
    if (!isDrawing) return

    hue = Math.random() * 360
    
    if (sequence.length >= sequenceLength) {
      sequence.shift()
    }
    sequence.push({x: lastX, y: lastY, r: Math.random() * 15 + 25})
    
    clearScene();
    sequence.forEach((item, index) => {
      context.fillStyle = `hsl(${rainbow[index]}, 90%,50%)`
      context.beginPath()
      context.lineTo(item.x, item.y)
      context.arc(item.x, item.y, item.r, 0, Math.PI * 2)
      context.closePath()
      context.fill()
    })
    
    lastX = e.clientX
    lastY = e.clientY

    console.log(hue)
  }

  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mousedown', (e) => {
    lastX = e.clientX
    lastY = e.clientY
    isDrawing = true
  })
  canvas.addEventListener('mouseup', () => isDrawing = false)

  function clearScene () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
}