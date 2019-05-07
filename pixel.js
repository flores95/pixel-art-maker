let selectedColor = 'white'

const divMainContainer = document.querySelector('.main-container')

const addRow = (boxCount) => {
    const rowDiv = document.createElement('div')
    rowDiv.className = 'row'

    for(let i = 0; i < boxCount; i++) {
        let boxDiv = document.createElement('div')
        boxDiv.className = 'box'
        boxDiv.addEventListener('click', () => {
            boxDiv.style.backgroundColor = "rgba(255, 0, 0, 1)"
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
        })
        paletteDiv.appendChild(paletteColor)
    })

    return paletteDiv
}

const createCanvas= (rows, columns) => {
    const canvasDiv = document.createElement('div')
    canvasDiv.className = 'canvas'

    for (let i = 0; i < rows; i++) {
        canvasDiv.appendChild(addRow(columns))
    }

    return canvasDiv
}


divMainContainer.appendChild(createCanvas(10,10))
divMainContainer.appendChild(createPalette(['red', 'blue']))