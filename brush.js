class Brush {
  constructor(type, element, painter) {
    this.type = type
    this.element = element
    this.paint = painter
  }
}

const createBrushTool = (selected) => {
  const config = createElement('div', 'brush-config tool-selector', 'paint-config')

  const penSelector = createElement('div', 'selector fas fa-pen', 'pen-selector')
  penSelector.title = 'Pixel Pen'
  const pen = new Brush('bucket', penSelector, (pixel, sel) => {
    pixel.setColor(sel.color)
  })
  penSelector.addEventListener('click', () => selected.brush = pen)
  config.appendChild(penSelector)

  const bucketSelector = createElement('div', 'selector fas fa-fill', 'pen-selector')
  bucketSelector.title = 'Paint Bucket'
  const bucket = new Brush('bucket', bucketSelector, (pixel, sel) => {
    sel.canvas.pixels.forEach(row => {
      row.forEach(col => col.setColor(sel.color))
    })
  })
  bucketSelector.addEventListener('click', () => selected.brush = bucket)
  config.appendChild(bucketSelector)

  selected.brush = bucket

  config.style.display = 'none'

  return Tool.createTool('Brush Tools', 'fa-paint-brush', 'brush-selector', config, selected)
}
