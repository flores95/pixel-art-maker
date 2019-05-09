const createCanvas = (parent, rows, columns) => {
  const canvas = createElement('div', 'canvas')

  ArrayUtil.range(rows).forEach(rowNum => addRow(canvas, columns, rowNum))

  parent.appendChild(canvas)
  return canvas
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
