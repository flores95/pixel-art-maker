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

  const horizontalStripeSelector = createElement('div', 'selector fas fa-grip-lines', 'pen-selector')
  horizontalStripeSelector.title = 'Horizontal Stripes'
  const horizontalStripe = new Brush('Horizontal Stripe', horizontalStripeSelector, (pixel, sel) => {
    sel.canvas.pixels
      .filter((row, rowIdx) => rowIdx % 2 === pixel.row % 2)
      .forEach(filteredRow => filteredRow.forEach(col => col.setColor(sel.color)))
  })
  horizontalStripeSelector.addEventListener('click', () => selected.brush = horizontalStripe)
  config.appendChild(horizontalStripeSelector)

  const verticalStripeSelector = createElement('div', 'selector fas fa-grip-lines-vertical', 'pen-selector')
  verticalStripeSelector.title = 'Horizontal Stripes'
  const verticalStripe = new Brush('Horizontal Stripe', verticalStripeSelector, (pixel, sel) => {
    sel.canvas.pixels
      .forEach(row => {
        row
          .filter((col, colIdx) => colIdx % 2 === pixel.column % 2)
          .forEach(fCol => fCol.setColor(sel.color))
      })
  })
  verticalStripeSelector.addEventListener('click', () => selected.brush = verticalStripe)
  config.appendChild(verticalStripeSelector)

  selected.brush = bucket

  config.style.display = 'none'

  return Tool.createTool('Brush Tools', 'fa-paint-brush', 'brush-selector', config, selected)
}
