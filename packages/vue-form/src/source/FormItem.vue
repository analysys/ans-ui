<template>
  <div :class="wrapClasses">
    <label :class="labelClasses" :for="labelFor" :style="labelStyles" v-if="label || $slots.label">
      <slot name="label">{{label}}</slot>
    </label>
    <div :class="contentClasses">
      <slot name="input"></slot>
      <slot name="select"></slot>
      <slot></slot>
      <transition name="fade">
        <div :class="errorClasses" v-if="validateState === 'error'">{{validateMessage}}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import { LIB_NAME, emitter } from '../../../../src/util'
import AsyncValidator from 'async-validator'

const prefixCls = `${LIB_NAME}-form-item`

// 根据 path 获取数据
function getPropByPath (obj, path) {
  let tempObj = obj

  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0

  for (let len = keyArr.length; i < len - 1; ++i) {
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      throw new Error('请转换一个有效的prop')
    }
  }

  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  }
}

export default {
  name: 'xFormItem',
  mixins: [emitter],
  props: {
    prop: {
      type: String
    },
    rules: {
      type: [Object, Array]
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: [Number, String]
    },
    labelHeight: {
      type: [Number, String]
    },
    labelFor: {
      type: String
    }
  },
  inject: ['form'],
  data () {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false
    }
  },
  computed: {
    // 包裹样式类
    wrapClasses () {
      return [
        `${prefixCls}`
      ]
    },
    // label样式
    labelClasses () {
      const classes = [
        `${prefixCls}-label`
      ]
      if (this.validateState === 'error') {
        classes.push('form-item-error')
      }
      return classes
    },
    // content样式
    contentClasses () {
      return [
        `${prefixCls}-content`
      ]
    },
    // error样式
    errorClasses () {
      return [
        `${prefixCls}-error-tip`
      ]
    },
    // 获取label的样式
    labelStyles () {
      const style = {}
      const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth
      const labelHeight = this.labelHeight === 0 || this.labelHeight ? this.labelHeight : this.form.labelHeight

      if (labelWidth || labelWidth === 0) {
        style.width = `${labelWidth}px`
      }
      if (labelHeight || labelHeight === 0) {
        style.height = `${labelHeight}px`
        style.lineHeight = `${labelHeight}px`
      }
      return style
    },
    // 实时获取表单元素的值
    fieldValue () {
      const model = this.form.model

      if (!model || !this.prop) {
        return
      }

      let path = this.prop

      if (~path.indexOf(':')) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path)['v']
    }
  },
  methods: {
    // 获取校验规则
    getRules () {
      let formRules = this.form.rules
      const selfRules = this.rules

      formRules = formRules ? formRules[this.prop] : []

      return [].concat(selfRules || formRules || [])
    },
    // 获取过滤后的校验规则
    getFilteredRule (trigger) {
      const rules = this.getRules()

      return rules.filter(rule => !rule.trigger || ~rule.trigger.indexOf(trigger))
    },
    validate (trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger)

      if (!rules || !rules.length) {
        if (!this.required) {
          callback()
          return true
        } else {
          rules = [{ required: true }]
        }
      }

      this.validateState = 'validating'

      const descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, error => {
        this.validateState = !error ? 'success' : 'error'
        this.validateMessage = error ? error[0].message : ''

        callback(this.validateMessage)
      })

      this.validateDisabled = false
    },
    onFieldBlur (input) {
      this.validate('blur', input.handleValidate)
    },
    onFieldChange () {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''

      const model = this.form.model
      const value = this.fieldValue
      let path = this.prop

      if (~path.indexOf(':')) {
        path = path.replace(/:/, '.')
      }

      const prop = getPropByPath(model, path)
      this.validateDisabled = true

      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        prop.o[prop.k] = this.initialValue
      }
    }
  },
  mounted () {
    // 保存初始值
    if (this.prop) {
      this.dispatch('xForm', 'on-form-item-add', this)

      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }

      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })

      const rules = this.getRules()

      if (rules.length || this.required !== undefined) {
        // 监听 vue 组件的 blur & change 事件
        this.$on('on-form-blur', this.onFieldBlur)
        this.$on('on-form-change', this.onFieldChange)

        // 对于非 vue 组件的事件监听
        this.$slots.input && this.$slots.input[0].elm.addEventListener('blur', this.onFieldBlur)
        this.$slots.select && this.$slots.select[0].elm.addEventListener('blur', this.onFieldBlur)
        this.$slots.select && this.$slots.select[0].elm.addEventListener('change', this.onFieldChange)
      }
    }
  },
  beforeDestroy () {
    this.dispatch('xForm', 'on-form-item-remove', this)
  }
}
</script>
