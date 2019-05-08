const ArrayRange = (range) => [...Array(range).keys()]

let selectedColor = 'white'

const addRow = (boxCount) => {
  const rowDiv = document.createElement('div')
  rowDiv.className = 'row'

  for (let i = 0; i < boxCount; i++) {
    let boxDiv = document.createElement('div')
    boxDiv.className = 'box'
    boxDiv.addEventListener('click', () => {
      boxDiv.style.backgroundColor = selectedColor
      boxDiv.style.borderColor = selectedColor
    })
    boxDiv.addEventListener('mouseenter', (event) => {
      if (event.buttons) {
        boxDiv.style.backgroundColor = selectedColor
        boxDiv.style.borderColor = selectedColor
      }
    })
    rowDiv.appendChild(boxDiv)
  }

  return rowDiv
}

const createPalette = (colors) => {
  const paletteDiv = document.createElement('div')
  paletteDiv.className = 'palette'

  colors.forEach((color) => {
    let paletteColor = document.createElement('div')
    paletteColor.className = 'palette-color'
    paletteColor.style.backgroundColor = color
    paletteColor.addEventListener('click', () => {
      selectedColor = color
      const ccDiv = document.getElementById('current-color')
      ccDiv.style.backgroundColor = selectedColor
    })
    paletteDiv.appendChild(paletteColor)
  })

  const currentColorDiv = document.createElement('div')
  currentColorDiv.className = 'current-color-info'
  currentColorDiv.innerHTML = 'Current Color > <span id="current-color"></span>'
  paletteDiv.appendChild(currentColorDiv)

  return paletteDiv
}

const createCanvas = (rows, columns) => {
  const canvasDiv = document.createElement('div')
  canvasDiv.className = 'canvas'

  for (let i = 0; i < rows; i++) {
    canvasDiv.appendChild(addRow(columns))
  }

  return canvasDiv
}

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'brown',
  'gray',
  'black',
  'white'
]

const divMainContainer = document.querySelector('.main-container')
divMainContainer.appendChild(createCanvas(40, 60))
divMainContainer.appendChild(createPalette(colors))