const createPaintTool = () => {
  const config = createElement('div', 'paint-config', 'paint-config')
  config.innerHTML = 'cool stuff coming soon'
  config.style.display = 'none'

  const selector = Tool.createSelector(config, 'Paint Tools', 'fa-paint-brush', 'color-pallet-selector')
  return new Tool(selector, config)
}
