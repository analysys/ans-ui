## Tooltip

简单的文字提示工具，用于代替浏览器的 title 提示。

### Tooltip 指令修饰符

修饰符 | 说明
--- | ---
click | 点击触发提示
top / bottom / left / right | 提示优先方向，分别对应上/下/左/右
start / end | 提示位置，可与方向组合使用
light / dark | 主题，默认为 dark
fixed | 提示是否 fixed 定位
viewport | 提示是否基于 viewport 定位
large | 是否启用大号提示

### Tooltip 详细配置

属性 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | ---
text | 提示文本，支持标签 | String | — | —
placement | 提示优先出现方位 | 详见popper.js文档 | top
triggerEvent | 触发提示事件 | String | click / mouseenter / manual | mouseenter
theme | 主题 | String | light / dark | dark
maxWidth | 提示内容最大宽度，超过该宽度换行 | String | — | 200px
positionFixed | 同 fixed 修饰符 | Boolean | — | false
viewport | 同 viewport 修饰符 | Boolean | — | false
large | 同 large 修饰符 | Boolean | — | false
reveal | 当 triggerEvent 为 `manual` 的时候，控制 tooltip 是否显示 | Boolean | — | false

### Tooltip 方法

tooltip 对应的 dom 节点可以调用 destroy 方法销毁组件，hide 方法隐藏提示
