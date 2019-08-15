import { createVue, destroyVM } from '../util'
import { expect } from 'chai'

describe('Input', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('should render as <div>', done => {
    vm = createVue(`
      <x-input />
    `)
    expect(vm.$el.tagName).to.equal('DIV')
    done()
  })

  it('test `clear` method', done => {
    vm = createVue({
      template: `
        <x-input ref="input" v-model="value" />
      `,
      data () {
        return { value: 'test' }
      }
    })
    expect(vm.$refs.input.value).to.eq('test')
    vm.$refs.input.clear()
    vm.$nextTick(() => {
      expect(vm.$refs.input.value).to.eq('')
      done()
    })
  })
})
