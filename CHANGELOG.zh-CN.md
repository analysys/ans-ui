## 更新日志


### 1.1.7

*2019-12-20*

- 新增若干图标

### 1.1.6

*2019-12-19*

- 新增若干图标

### 1.1.5

*2019-12-17*

- 新增若干图标

### 1.1.4

*2019-11-28*

- Cascader
  - 新增 only-show-last 属性
- Page
  - 新增 on-size-change 事件
  
### 1.1.3

*2019-11-25*

- Datepicker
  - 修复选中日期未高亮的 bug

### 1.1.0

*2019-11-22*

#### 新特性

- Select
  - 新增 ignore-case 属性
- Table
  - 新增 hide-expand-icon 属性
  - TableColumn 新增 min-width 属性
- Tooltip
  - triggerEvent 新增可选值 manual
  - 新增 reveal 属性
- Timepicker
  - 新增 step 属性
  - 新增 input-props 属性
- Datepicker
  - 新增 input-props 属性
- Form
  - 新增 vertical 属性
- Input
  - 新增 validator-icon 属性

#### Bug 修复

- Table
  - 修复多级表头时数据切割索引不对的 bug
  - 修复无数据时不能显示表头的 bug
  - 修复某些情况下垂直滚动之后显示异常的 bug
- Datepicker
  - 修复星期显示国际化失效的 bug
- Timepicker
  - 修复 on-change 事件无效的 bug

#### 优化

- Tooltip
  - maxWidth 的默认值改为 370px
- Scroller
  - 将 left/top 替换为 translate 变换
- Table
  - 优化排序点击体验
