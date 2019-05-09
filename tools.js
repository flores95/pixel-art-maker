class Tool {
  constructor(selector, config) {
    this.selector = selector
    this.config = config
  }
  
  static createSelector(config, name, icon, id) {
    const selector = createElement('div', 'tool-selector', id)
    selector.className += ` fas ${icon}`
    selector.name = name
    selector.addEventListener('click', () => {
      config.style.display = 'block'
    })
    return selector
  }
}

let createToolbox = (parent, ...tools) => {
  const toolbox = createElement('div', 'toolbox', 'toolbox')
  const toolSelector = createElement('div', 'tool-selector', 'tool-selector')
  const toolConfig = createElement('div', 'tool-config', 'tool-config')

  tools.forEach(tool => {
    toolSelector.appendChild(tool.selector)
    toolConfig.appendChild(tool.config)
  })

  toolbox.appendChild(toolSelector)
  toolbox.appendChild(toolConfig)

  parent.appendChild(toolbox)
}