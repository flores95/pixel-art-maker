const ArrayUtil = {}
ArrayUtil.range = (range) => [...Array(range).keys()]

class Color {
  constructor(red = 255, green = 255, blue = 255, alpha = 1) {
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
    
    this.colorAttributes = ['red', 'green', 'blue']
  }

  css() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }

  colorGradients(variableAttributes, variationCount) {
    const stepSize = Math.floor(255 / variationCount)

    const isWhite = (this.red === 255 && this.green === 255 && this.blue === 255)
    const iterations = (isWhite) ? variationCount : Math.floor(variationCount) / 2
    return ArrayUtil.range(iterations)
      .reduce((acc, cnt) => {
        const step = (cnt + 1) * stepSize

        const darker = new Color(this.red, this.green, this.blue, this.alpha)
        variableAttributes.forEach(attr => darker[attr] -= step)
        acc.push(darker)

        if (!isWhite) {
          const lighter = new Color(this.red, this.green, this.blue, this.alpha)
          this.colorAttributes
            .filter(attr => !variableAttributes.includes(attr))
            .forEach(filtered => lighter[filtered] += step)
          acc.push(lighter)
        }

        return acc
      }, [])
      .sort((a, b) => a[variableAttributes[0]] - b[variableAttributes[0]])
  }
}

// const red = {rgb: [255, 0, 0, 1], attrs: ['red']}
// const green = {rgb: [0, 255, 0, 1], attrs: ['green']}
// const blue = {rgb: [0, 0, 255, 1], attrs: ['blue']}
// const yellow = {rgb: [255, 255, 0, 1], attrs: ['red', 'green']}
// const pink = {rgb: [255, 0, 255, 1], attrs: ['red', 'blue']}
// const cyan = {rgb: [0, 255, 255, 1], attrs: ['green', 'blue']}
// const white = {rgb: [255, 255, 255, 1], attrs: ['red', 'green', 'blue']}

// const color = white
// const grads = (new Color(...color.rgb)).colorGradients(color.attrs, 10)
// colors = grads.map(grad => grad.css())
// console.log(colors)