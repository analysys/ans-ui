import Vue from 'vue'
import Tooltip from './Tooltip.vue'

// 组件构造器
const TooltipConstructor = Vue.extend(Tooltip)

export default (options = {}) => {
  const {
    text = '',
    placement,
    theme,
    maxWidth,
    el,
    positionFixed,
    viewport,
    large
  } = options
  const instance = new TooltipConstructor({
    propsData: {
      content: text,
      placement,
      theme,
      maxWidth,
      reference: el,
      positionFixed: positionFixed,
      viewport: viewport,
      large
    }
  }).$mount()
  document.body.appendChild(instance.$el)
  instance.$el.destroy = () => {
    instance.$destroy()
  }
  instance.$el.hide = () => {
    instance.hide()
  }
  return instance
}
