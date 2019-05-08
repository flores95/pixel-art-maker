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
  const gradientsDiv = document.createElement('div')
  gradientsDiv.className = 'gradients-palette'
  gradientsDiv.id = 'gradients-palette'
  gradientsDiv.style.display = 'none'
  paletteDiv.appendChild(gradientsDiv)

  colors.forEach((color) => {
    const baseColor = new Color(...color.rgb)
    let paletteColor = document.createElement('div')
    paletteColor.className = 'palette-color'
    paletteColor.style.backgroundColor = baseColor.css()
    const gradientPalette = createGradientPalette(baseColor.colorGradients(color.attrs, 12))
    gradientsDiv.appendChild(gradientPalette)
    paletteColor.addEventListener('click', () => {
      selectedColor = baseColor.css()
      const ccDiv = document.getElementById('current-color')
      ccDiv.style.backgroundColor = selectedColor
      gradientsDiv.style.display = 'block'
      gradientPalette.style.display = 'block'
    })
    paletteDiv.appendChild(paletteColor)
  })

  const currentColorDiv = document.createElement('div')
  currentColorDiv.className = 'current-color-info'
  currentColorDiv.innerHTML = 'Current Color > <span id="current-color"></span>'
  paletteDiv.appendChild(currentColorDiv)

  return paletteDiv
}

const createGradientPalette = (colors) => {
  const gradientPaletteDiv = document.createElement('div')
  gradientPaletteDiv.className = 'palette'
  gradientPaletteDiv.style.display = 'none'

  colors.forEach((color) => {
    let paletteColor = document.createElement('div')
    paletteColor.className = 'palette-color'
    paletteColor.style.backgroundColor = color.css()
    paletteColor.addEventListener('click', () => {
      selectedColor = color.css()
      const ccDiv = document.getElementById('current-color')
      ccDiv.style.backgroundColor = selectedColor
      const gradientsPaletteDiv = document.getElementById('gradients-palette')
      gradientsPaletteDiv.style.display = 'none'
      gradientPaletteDiv.style.display = 'none'
      console.log(gradientPaletteDiv)
    })
    gradientPaletteDiv.appendChild(paletteColor)
  })

  return gradientPaletteDiv
}

const createCanvas = (rows, columns) => {
  const canvasDiv = document.createElement('div')
  canvasDiv.className = 'canvas'

  for (let i = 0; i < rows; i++) {
    canvasDiv.appendChild(addRow(columns))
  }

  return canvasDiv
}

let baseColors = [
  {rgb: [255, 0, 0, 1], attrs: ['red']},
  {rgb: [0, 255, 0, 1], attrs: ['green']},
  {rgb: [0, 0, 255, 1], attrs: ['blue']},
  {rgb: [255, 255, 0, 1], attrs: ['red', 'green']},
  {rgb: [255, 0, 255, 1], attrs: ['red', 'blue']},
  {rgb: [0, 255, 255, 1], attrs: ['green', 'blue']},
  {rgb: [255, 255, 255, 1], attrs: ['red', 'green', 'blue']}
]

const divMainContainer = document.querySelector('.main-container')
divMainContainer.appendChild(createCanvas(40, 60))
divMainContainer.appendChild(createPalette(baseColors))