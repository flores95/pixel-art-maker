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
  const toolConfig = createElement('div', 'tool-config', 'tool-config')
  const toolSelector = createElement('div', 'tool-selector', 'tool-selector')

  tools.forEach(tool => {
    toolConfig.appendChild(tool.config)
    toolSelector.appendChild(tool.selector)
  })

  toolbox.appendChild(toolConfig)
  toolbox.appendChild(toolSelector)

  parent.appendChild(toolbox)
}