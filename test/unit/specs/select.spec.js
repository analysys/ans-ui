import { createTest, createVue, triggerEvent, destroyVM } from '../util'
import { xSelect } from '../../../packages/vue-select/src'
import { expect } from 'chai'

describe('Select', () => {
  const getSelectVm = (configs = {}, options) => {
    ['multiple', 'clearable', 'filterable'].forEach(config => {
      configs[config] = configs[config] || false
    })
    if (!options) {
      options = [{
        value: '选项1',
        label: '黄金糕',
        disabled: false
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: false
      }, {
        value: '选项3',
        label: '蚵仔煎',
        disabled: false
      }, {
        value: '选项4',
        label: '龙须面',
        disabled: false
      }, {
        value: '选项5',
        label: '北京烤鸭',
        disabled: false
      }]
    }

    const vm = createVue({
      template: `
        <div>
          <x-select
            ref="select"
            v-model="value"
            :multiple="multiple"
            :dropdown-class="dropdownClass"
            :clearable="clearable"
            :filterable="filterable"
          >
            <x-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :disabled="item.disabled"
              :value="item.value">
            </x-option>
          </x-select>
        </div>
      `,

      data () {
        return {
          options,
          multiple: configs.multiple,
          clearable: configs.clearable,
          filterable: configs.filterable,
          dropdownClass: configs.dropdownClass,
          value: configs.multiple ? [] : ''
        }
      }
    }, true)
    return vm
  }

  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(xSelect, true)
    expect(vm.$el.className).to.equal('ans-select')
    expect(vm.$el.querySelector('.input-element').placeholder).to.equal('请选择')
    vm.focus()
    // eslint-disable-next-line no-unused-expressions
    expect(vm.visible).is.true
  })

  it('options rendered correctly', () => {
    vm = getSelectVm()
    const options = vm.$el.querySelectorAll('.ans-option')
    const result = Array.prototype.every.call(options, (option, index) => {
      const text = option.querySelector('span').textContent
      return text === vm.options[index].label
    })
    // eslint-disable-next-line no-unused-expressions
    expect(result).is.true
  })

  it('custom dropdown class', () => {
    vm = getSelectVm({ dropdownClass: 'custom-dropdown' })
    const dropdown = vm.$el.querySelector('.ans-select-dropdown')
    // eslint-disable-next-line no-unused-expressions
    expect(dropdown.classList.contains('custom-dropdown')).is.true
  })

  it('default value', done => {
    vm = createVue({
      template: `
        <div>
          <x-select v-model="value">
            <x-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :value="item.value">
            </x-option>
          </x-select>
        </div>
      `,

      data () {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
          value: '选项2'
        }
      }
    }, true)
    setTimeout(() => {
      expect(vm.$el.querySelector('.input-element').value).to.equal('双皮奶')
      done()
    }, 100)
  })

  it('single select', done => {
    vm = createVue({
      template: `
        <div>
          <x-select v-model="value" @on-change="handleChange">
            <x-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :value="item.value">
              <p>{{item.label}} {{item.value}}</p>
            </x-option>
          </x-select>
        </div>
      `,

      data () {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '',
          count: 0
        }
      },

      methods: {
        handleChange () {
          this.count++
        }
      }
    }, true)
    const options = vm.$el.querySelectorAll('.ans-option')
    expect(vm.value).to.equal('')
    triggerEvent(options[2], 'mouseenter')
    options[2].click()
    setTimeout(() => {
      expect(vm.value).to.equal('选项3')
      expect(vm.count).to.equal(1)
      triggerEvent(options[2], 'mouseenter')
      options[4].click()
      setTimeout(() => {
        expect(vm.value).to.equal('选项5')
        expect(vm.count).to.equal(2)
        done()
      }, 100)
    }, 100)
  })

  it('disabled option', done => {
    vm = getSelectVm()
    vm.options[1].disabled = true
    setTimeout(() => {
      const options = vm.$el.querySelectorAll('.ans-option')
      // eslint-disable-next-line no-unused-expressions
      expect(options[1].classList.contains('disabled')).is.true
      options[1].click()
      setTimeout(() => {
        expect(vm.value).to.equal('')
        done()
      }, 100)
    }, 100)
  })

  it('disabled select', () => {
    vm = createTest(xSelect, { disabled: true })
    // eslint-disable-next-line no-unused-expressions
    expect(vm.$el.querySelector('.input-element').classList.contains('disabled')).is.true
  })

  it('object typed value', done => {
    vm = createVue({
      template: `
        <div>
          <x-select v-model="value" value-key="id">
            <x-option
              v-for="item in options"
              :label="item.label"
              :key="item.id"
              :value="item">
            </x-option>
          </x-select>
        </div>
      `,

      data () {
        return {
          options: [{
            id: 1,
            label: 'label1'
          }, {
            id: 2,
            label: 'label2'
          }],
          value: {
            id: 1,
            label: 'label1'
          }
        }
      }
    }, true)
    setTimeout(() => {
      console.log(vm.$el.querySelector('.input-element').value)
      expect(vm.$el.querySelector('.input-element').value).to.equal('label1')
      expect(vm.$el.querySelector('.ans-option').classList.contains('selected'))
      done()
    }, 100)
  })

  it('custom el-option template', () => {
    vm = createVue({
      template: `
        <div>
          <x-select v-model="value">
            <x-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :value="item.value">
              <p>{{item.label}} {{item.value}}</p>
            </x-option>
          </x-select>
        </div>
      `,

      data () {
        return {
          options: [{
            value: 'value',
            label: 'label'
          }],
          value: ''
        }
      }
    }, true)
    expect(vm.$el.querySelector('.ans-option p').textContent).to.equal('label value')
  })

  it('option group', () => {
    vm = createVue({
      template: `
        <div>
          <x-select v-model="value">
            <x-option-group
              v-for="group in options"
              :key="group.label"
              :disabled="group.disabled"
              :label="group.label">
              <x-option
                v-for="item in group.options"
                :label="item.label"
                :key="item.value"
                :value="item.value">
              </x-option>
            </x-option-group>
          </x-select>
        </div>
      `,

      data () {
        return {
          options: [{
            label: '热门城市',
            options: [{
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }]
          }, {
            label: '城市名',
            disabled: true,
            options: [{
              value: 'Chengdu',
              label: '成都'
            }, {
              value: 'Shenzhen',
              label: '深圳'
            }, {
              value: 'Guangzhou',
              label: '广州'
            }, {
              value: 'Dalian',
              label: '大连'
            }]
          }],
          value: ''
        }
      }
    }, true)
    const groups = vm.$el.querySelectorAll('.ans-option-group')
    const options = groups[1].querySelectorAll('.ans-option')
    expect(groups.length).to.equal(2)
    expect(options.length).to.equal(4)
    expect(options[0].querySelector('span').textContent).to.equal('成都')
  })

  it('filterable', done => {
    vm = getSelectVm({ filterable: true })
    const select = vm.$children[0]
    setTimeout(() => {
      select.visible = true
      select.search('面')
      setTimeout(() => {
        expect(select.visibleOptions.length).to.equal(1)
        done()
      }, 10)
    }, 10)
  })

  it('multiple select', done => {
    vm = getSelectVm({ multiple: true })
    const options = vm.$el.querySelectorAll('.ans-option')
    vm.value = ['选项1']
    setTimeout(() => {
      options[1].click()
      setTimeout(() => {
        options[3].click()
        setTimeout(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(vm.value.indexOf('选项2') > -1 && vm.value.indexOf('选项4') > -1).to.true
          const tagCloseIcons = vm.$el.querySelectorAll('.remove-tag')
          tagCloseIcons[0].click()
          setTimeout(() => {
            expect(vm.value.indexOf('选项1')).to.equal(-1)
            done()
          }, 100)
        }, 100)
      }, 100)
    }, 100)
  })
})
