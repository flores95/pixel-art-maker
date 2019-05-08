const ArrayRange = (range) => [...Array(range).keys()]

class color {
  constructor(red = 255, green = 255, blue = 255, alpha = 1) {
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  css() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }

  colorGradients(variableAttribute, variationCount) {
    const stepSize = Math.floor(255 / variationCount)
    return ArrayRange(Math.floor(variationCount / 2)).reduce((acc, cnt) => {
      const step = (cnt + 1) * stepSize
      switch (variableAttribute.toUpperCase()) {
        case 'RED':
          acc.push(new color(this.red - step, this.green, this.blue, this.alpha))
          acc.push(new color(this.red, this.green + step, this.blue + step, this.alpha))
          break;
        case 'GREEN':
          acc.push(new color(this.red, this.green - step, this.blue, this.alpha))
          acc.push(new color(this.red + step, this.green, this.blue + step, this.alpha))
          break;
        case 'BLUE':
          acc.push(new color(this.red, this.green, this.blue - step, this.alpha))
          acc.push(new color(this.red + step, this.green + step, this.blue, this.alpha))
          break;
      }
      return acc
    }, []).sort((a, b) => a[variableAttribute] - b[variableAttribute])
  }
}

const gradients = (new color(255, 0, 0, 1)).colorGradients('red', 10)
const colors = gradients.map(color => color.css())
console.log(colors)

module.exports = color