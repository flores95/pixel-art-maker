const createColorPalette = (baseColors, selected) => {
  const config = createElement('div', 'palette-config', 'palette-config')
  createPaletteConfig(config, baseColors, selected)
  config.style.display = 'none'

  return Tool.createTool('Color Palette', 'fa-palette', 'color-pallet-selector', config, selected)
}

const createPaletteConfig = (parent, colors, selected) => {
  const gradientsPalette = createElement('div', 'gradients-palette', 'gradients-palette')
  parent.appendChild(gradientsPalette)

  const palette = createElement('div', 'palette')
  colors.forEach((color) => {
    const baseColor = new Color(...color.rgb)
    let paletteColor = createElement('div', 'palette-color')
    paletteColor.style.backgroundColor = baseColor.css()

    const gradientPalette = createGradientPalette(gradientsPalette, baseColor.colorGradients(color.attrs, 16), selected)
    paletteColor.addEventListener('click', () => {
      if (selected.palette) { selected.palette.style.display = 'none'; }
      selected.color = baseColor.css()
      selected.palette = gradientPalette;
      gradientPalette.style.display = 'flex'
      document.getElementById('current-color').style.backgroundColor = selected.color
    })

    palette.appendChild(paletteColor)
  })

  const currentColor = createElement('div', 'current-color-info')
  currentColor.innerHTML = 'Current Color > <span id="current-color"></span>'
  palette.appendChild(currentColor)

  parent.appendChild(palette)
  return palette
}

const createGradientPalette = (parent, colors, selected) => {
  const gradientPalette = createElement('div', 'palette')
  gradientPalette.style.display = 'none'

  colors.forEach((color) => {
    let paletteColor = createElement('div', 'palette-color')
    paletteColor.style.backgroundColor = color.css()
    paletteColor.addEventListener('click', () => {
      selected.color = color.css()
      document.getElementById('current-color').style.backgroundColor = selected.color
    })
    gradientPalette.appendChild(paletteColor)
  })

  parent.appendChild(gradientPalette)
  return gradientPalette
}
