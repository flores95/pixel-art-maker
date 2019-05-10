const ArrayUtil = {}
ArrayUtil.range = (range) => [...Array(range).keys()]

const createElement = (tag = 'div', className = '', id = '') => {
  const el = document.createElement(tag)
  el.className = className
  el.id = id
  return el
} 

const baseColors = [
  {rgb: [255, 0, 0, 1], attrs: ['red']},
  {rgb: [0, 255, 0, 1], attrs: ['green']},
  {rgb: [0, 0, 255, 1], attrs: ['blue']},
  {rgb: [255, 255, 0, 1], attrs: ['red', 'green']},
  {rgb: [255, 0, 255, 1], attrs: ['red', 'blue']},
  {rgb: [0, 255, 255, 1], attrs: ['green', 'blue']},
  {rgb: [255, 255, 255, 1], attrs: ['red', 'green', 'blue']}
]

const selected = {
  palette: null,
  color: 'white',
  tool: null,
  brush: null,
  canvas: null
}

const divMainContainer = document.querySelector('.main-container')
const canvas = Canvas.createCanvas(divMainContainer, 40, 60, selected)
selected.canvas = canvas

createToolbox(
  divMainContainer,
  createBrushTool(selected),
  createColorPalette(baseColors, selected)
)
