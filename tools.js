class Tool {
  constructor(selector, config) {
    this.selector = selector
    this.config = config
    this.selected = false
  }

  toggle() {
    this.selected = !this.selected
    this.config.style.display = (this.selected) ? 'block' : 'none'
    this.selector.style.backgroundColor = (this.selected) ? "rgba(255,255,255,.3)" : "rgba(0,0,0,0)"
  }
  
  static createTool(name, icon, id, config, selected) {
    const selector = createElement('div', '', id)
    selector.className += ` fas ${icon}`
    selector.name = name
    const tool = new Tool(selector, config)

    selector.addEventListener('click', () => {
      if (selected.tool) {
        selected.tool.toggle()
      }
      selected.tool = tool
      selected.tool.toggle()
    })
    return tool
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