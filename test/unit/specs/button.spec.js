import { createVue, destroyVM } from '../util'
import { expect } from 'chai'

describe('Button', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('should render as <button>', done => {
    vm = createVue(`
      <x-button>test</x-button>
    `)
    expect(vm.$el.tagName).to.equal('BUTTON')
    done()
  })

  it('test `loading` prop', done => {
    vm = createVue(`
      <x-button loading>test</x-button>
    `)
    expect(Array.from(vm.$el.classList)).to.include('ans-btn-loading')
    done()
  })
})
