// const divRow = document.querySelector('.row')
// divRow.addEventListener('click', (event) => console.log(event))

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

divMainContainer.appendChild(addRow(2))
divMainContainer.appendChild(addRow(2))