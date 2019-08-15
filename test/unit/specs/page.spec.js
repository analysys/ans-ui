import { createTest, destroyVM } from '../util'
import { xPage } from '../../../packages/vue-pagination/src'
import { expect } from 'chai'

describe('Page', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(xPage)
    const elm = vm.$el
    // prev
    expect(elm.querySelector('.ans-page-prev')).to.be.an.instanceof(Element)
    // next
    expect(elm.querySelector('.ans-page-next')).to.be.an.instanceof(Element)
    // jumper
    expect(elm.querySelector('.number')).to.be.an.instanceof(Element)
  })

  it('pageSize', () => {
    vm = createTest(xPage, {
      pageSize: 25,
      total: 100
    })

    expect(vm.$el.querySelectorAll('li.number').length).to.eq(4)
  })

  it('pageCount', () => {
    const vm = createTest(xPage, {
      total: 200,
      pageSize: 25,
      pagerCount: 5
    })

    expect(vm.$el.querySelectorAll('li.number')).to.length(6)
  })

  it('currentPage', () => {
    vm = createTest(xPage, {
      pageSize: 20,
      total: 200,
      current: 3
    })

    expect(vm.$el.querySelector('li.number.active')).to.have.property('textContent').to.equal('3')
  })
})
