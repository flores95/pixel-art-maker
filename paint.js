const createPaintTool = (selected) => {
  const config = createElement('div', 'paint-config', 'paint-config')
  config.innerHTML = 'cool stuff coming soon'
  config.style.display = 'none'

  return Tool.createTool('Paint Tools', 'fa-paint-brush', 'color-pallet-selector', config, selected)
}
