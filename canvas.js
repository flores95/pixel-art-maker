class Pixel {
  constructor(color = 'white', element = null) {
    this.color = color,
    this.element = element
  }

  setColor(color) {
    this.color = color
    this.element.style.backgroundColor = color
    this.element.style.borderColor = color
  }
}
class Canvas {
  constructor(rows, columns, element) {
    this.rows = rows
    this.columns = columns
    this.element = element
    this.pixels = Array(rows).fill(Array(columns).fill(new Pixel()))
  }

  static createCanvas = (parent, rows, columns, selected) => {
    const canvas = new Canvas(rows, columns, createElement('div', 'canvas'))

    ArrayUtil.range(rows).forEach(rowNum => Canvas.addRow(canvas, columns, rowNum, selected))

    parent.appendChild(canvas.element)
    return canvas
  }

  static addRow = (canvas, columns, rowNum, selected) => {
    const row = createElement('div', 'row')

    ArrayUtil.range(columns).forEach(colNum => {
      let pixel = new Pixel('white', createElement('div', 'box', `r${rowNum}c${colNum}`))
      pixel.element.addEventListener('click', () => {
        pixel.setColor(selected.color)
      })
      pixel.element.addEventListener('mouseenter', (event) => {
        if (event.buttons) {
          pixel.setColor(selected.color)
        }
      })
      canvas.pixels[rowNum][colNum] = pixel
      row.appendChild(pixel.element)
    })

    canvas.element.appendChild(row)
  }
}
