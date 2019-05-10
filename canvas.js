class Pixel {
  constructor(row, column, color = 'white', element = null) {
    this.row = row
    this.column = column
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
    this.pixels = Array.from(Array(rows), () => new Array(columns))
  }

  static createCanvas = (parent, rows, columns, selected) => {
    const canvas = new Canvas(rows, columns, createElement('div', 'canvas'))

    ArrayUtil.range(rows).forEach(rowNum => {
      const rowElement = createElement('div', 'row')
      ArrayUtil.range(columns).forEach(colNum => {
        canvas.addPixel(rowElement, rowNum, colNum, selected)
      })
      canvas.element.appendChild(rowElement)
    })

    parent.appendChild(canvas.element)
    return canvas
  }

  addPixel = (rowElement, row, col, selected) => {
    const pixel = new Pixel(row, col, 'white', createElement('div', 'box', `r${row}c${col}`))
    pixel.element.addEventListener('click', () => {
      selected.brush.paint(pixel, selected)
    })
    pixel.element.addEventListener('mouseenter', (event) => {
      if (event.buttons) {
        selected.brush.paint(pixel, selected)
      }
    })
    this.pixels[row][col] = pixel
    rowElement.appendChild(pixel.element)
  }
}
