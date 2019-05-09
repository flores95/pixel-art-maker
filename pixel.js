const selected = {palette: null, color: 'white'}

const createElement = (tag = 'div', className = '', id = '') => {
  const el = document.createElement(tag)
  el.className = className
  el.id = id
  return el
} 

const addRow = (parent, boxCount, rowNum) => {
  const row = createElement('div', 'row')

  ArrayUtil.range(boxCount).forEach(colNum => {
    let box = createElement('div', 'box', `r${rowNum}c${colNum}`)
    box.addEventListener('click', () => {
      box.style.backgroundColor = selected.color
      box.style.borderColor = selected.color
    })
    box.addEventListener('mouseenter', (event) => {
      if (event.buttons) {
        box.style.backgroundColor = selected.color
        box.style.borderColor = selected.color
      }
    })
    row.appendChild(box)
  })

  parent.appendChild(row)
  return row
}

const createPalette = (parent, colors) => {
  const gradientsPalette = createElement('div', 'gradients-palette', 'gradients-palette')
  parent.appendChild(gradientsPalette)

  const palette = createElement('div', 'palette')
  colors.forEach((color) => {
    const baseColor = new Color(...color.rgb)
    let paletteColor = createElement('div', 'palette-color')
    paletteColor.style.backgroundColor = baseColor.css()

    const gradientPalette = createGradientPalette(gradientsPalette, baseColor.colorGradients(color.attrs, 16))
    paletteColor.addEventListener('click', () => {
      if (selected.palette) { selected.palette.style.display = 'none'; }
      selected.color = baseColor.css()
      selected.palette = gradientPalette;
      gradientPalette.style.display = 'flex'
      document.getElementById('current-color').style.backgroundColor = selected.color
    })

    palette.appendChild(paletteColor)
  })

  const currentColor = createElement('div', 'current-color-info')
  currentColor.innerHTML = 'Current Color > <span id="current-color"></span>'
  palette.appendChild(currentColor)

  parent.appendChild(palette)
  return palette
}

const createGradientPalette = (parent, colors) => {
  const gradientPalette = createElement('div', 'palette')
  gradientPalette.style.display = 'none'

  colors.forEach((color) => {
    let paletteColor = createElement('div', 'palette-color')
    paletteColor.style.backgroundColor = color.css()
    paletteColor.addEventListener('click', () => {
      selected.color = color.css()
      document.getElementById('current-color').style.backgroundColor = selected.color
    })
    gradientPalette.appendChild(paletteColor)
  })

  parent.appendChild(gradientPalette)
  return gradientPalette
}

const createCanvas = (parent, rows, columns) => {
  const canvas = createElement('div', 'canvas')

  ArrayUtil.range(rows).forEach(rowNum => addRow(canvas, columns, rowNum))

  parent.appendChild(canvas)
  return canvas
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