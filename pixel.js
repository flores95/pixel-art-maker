const selected = {palette: null, color: 'white'}

const createElement = (tag = 'div', className = '', id = '') => {
  const el = document.createElement(tag)
  el.className = className
  el.id = id
  return el
} 

const addRow = (parent, boxCount, rowNum) => {
  const rowDiv = createElement('div', 'row')

  ArrayUtil.range(boxCount).forEach(colNum => {
    let boxDiv = createElement('div', 'box', `r${rowNum}c${colNum}`)
    boxDiv.addEventListener('click', () => {
      boxDiv.style.backgroundColor = selected.color
      boxDiv.style.borderColor = selected.color
    })
    boxDiv.addEventListener('mouseenter', (event) => {
      if (event.buttons) {
        boxDiv.style.backgroundColor = selected.color
        boxDiv.style.borderColor = selected.color
      }
    })
    rowDiv.appendChild(boxDiv)
  })

  parent.appendChild(rowDiv)
  return rowDiv
}

const createPalette = (parent, colors) => {
  const gradientsDiv = createElement('div', 'gradients-palette', 'gradients-palette')
  parent.appendChild(gradientsDiv)

  const paletteDiv = createElement('div', 'palette')
  colors.forEach((color) => {
    const baseColor = new Color(...color.rgb)
    let paletteColor = createElement('div', 'palette-color')
    paletteColor.style.backgroundColor = baseColor.css()

    const gradientPalette = createGradientPalette(gradientsDiv, baseColor.colorGradients(color.attrs, 16))
    paletteColor.addEventListener('click', () => {
      if (selected.palette) { selected.palette.style.display = 'none'; }
      selected.color = baseColor.css()
      selected.palette = gradientPalette;
      gradientPalette.style.display = 'flex'
      document.getElementById('current-color').style.backgroundColor = selected.color
    })

    paletteDiv.appendChild(paletteColor)
  })

  const currentColorDiv = createElement('div', 'current-color-info')
  currentColorDiv.innerHTML = 'Current Color > <span id="current-color"></span>'
  paletteDiv.appendChild(currentColorDiv)

  parent.appendChild(paletteDiv)
  return paletteDiv
}

const createGradientPalette = (parent, colors) => {
  const gradientPaletteDiv = createElement('div', 'palette')
  gradientPaletteDiv.style.display = 'none'

  colors.forEach((color) => {
    let paletteColor = createElement('div', 'palette-color')
    paletteColor.style.backgroundColor = color.css()
    paletteColor.addEventListener('click', () => {
      selected.color = color.css()
      document.getElementById('current-color').style.backgroundColor = selected.color
    })
    gradientPaletteDiv.appendChild(paletteColor)
  })

  parent.appendChild(gradientPaletteDiv)
  return gradientPaletteDiv
}

const createCanvas = (parent, rows, columns) => {
  const canvasDiv = createElement('div', 'canvas')

  ArrayUtil.range(rows).forEach(rowNum => addRow(canvasDiv, columns, rowNum))

  parent.appendChild(canvasDiv)
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
createCanvas(divMainContainer, 40, 60)
createPalette(divMainContainer, baseColors)