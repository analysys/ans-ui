## Changelog

### 1.1.7

*2019-12-20*

- Add some icons

### 1.1.6

*2019-12-19*

- Add some icons

### 1.1.5

*2019-12-17*

- Add some icons

### 1.1.4

*2019-11-28*

- Cascader
  - Add only-show-last prop
- Page
  - Add on-size-change event

### 1.1.3

*2019-11-25*

- Datepicker
  - Fix the selected date not highlighted

### 1.1.0

*2019-11-22*

#### New features

- Select
  - Add ignore-case prop
- Table
  - Add hide-expand-icon prop
  - TableColumn add min-width prop
- Tooltip
  - Add new option manual for triggerEvent
  - Add reveal prop
- Timepicker
  - Add step prop
  - Add input-props prop
- Datepicker
  - Add input-props prop
- Form
  - Add vertical prop
- Input
  - Add validator-icon prop

#### Bug fixes

- Table
  - Fix index error that occurred when both data cutting and multilevel headers were used
  - Fix dispaly error that table header was not displayed when there was no data
  - Fix abnormal display after vertical scrolling in some cases
- Datepicker
  - Fix week i18n
- Timepicker
  - Fix on-change event

#### Optimization

- Tooltip
  - Change maxWidth default value to 370px
- Scroller
  - Change left/top to translate
- Table
  - Optimize sort click experience
