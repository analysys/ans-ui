<template>
  <div :class="wrapperClass" @click="jump" :style="wrapperStyles">
    <transition :name="transitionName">
      <div
        ref="bar"
        v-show="active"
        class="scrollbar-thumb"
        :class="{'scroll-transition':!dragging}"
        :style="{
          height: height ? height + 'px' : 0,
          transform: 'translateY(' + top + 'px)'
        }"
        @mousedown="startDrag"
        @touchstart="startDrag"></div>
    </transition>
  </div>
</template>

<script>
import { LIB_NAME, ANIMATION_PREFIX } from '../../../../src/util'

export default {
  name: 'xVerticalScrollbar',

  props: {
    viewHeight: Number,
    offsetTop: Number,
    offsetBottom: Number,
    contentHeight: Number,
    dragging: Boolean,
    disabled: Boolean,
    active: Boolean
  },

  data () {
    return {
      wrapperClass: `${LIB_NAME}-v-scrollbar`,
      transitionName: `${ANIMATION_PREFIX}fade`,
      top: 0,
      barDragging: false,
      startClientY: null,
      startTop: null
    }
  },

  computed: {
    wrapperStyles () {
      const styles = {}
      if (this.offsetTop) {
        styles.top = this.offsetTop + 'px'
      }
      if (this.offsetTop || this.offsetBottom) {
        styles.height = this.wrapperHeight + 'px'
      }
      return styles
    },

    wrapperHeight () {
      return this.viewHeight - this.offsetTop - this.offsetBottom
    },

    height () {
      return Math.max(40, this.viewHeight * this.wrapperHeight / this.contentHeight)
    },

    maxTop () {
      return this.wrapperHeight - this.height
    }
  },

  methods: {
    _getValidTop (top) {
      return Math.min(this.maxTop, Math.max(top, 0))
    },

    setTop (percentage) {
      if (this.contentHeight) {
        this.top = this._getValidTop(percentage * this.maxTop)
      }
    },

    startDrag (event) {
      if (this.disabled) return

      this.barDragging = true
      document.onselectstart = () => false
      document.ondragstart = () => false

      event = event.changedTouches ? event.changedTouches[0] : event

      this.startTop = this.top
      this.startClientY = event.clientY
      this.$emit('on-start-drag', true)
    },

    onDrag (event) {
      if (this.disabled) return

      if (this.barDragging) {
        event = event.changedTouches ? event.changedTouches[0] : event

        const delta = event.clientY - this.startClientY
        const top = this.startTop + delta
        this.top = this._getValidTop(top)
        this.$emit('on-vertical-drag', top / this.maxTop)
      }
    },

    endDrag (event) {
      if (this.barDragging) {
        this.barDragging = false
        document.onselectstart = null
        document.ondragstart = null
        this.$emit('on-end-drag', true)
      }
    },

    jump (event) {
      if (this.disabled) return

      const valid = event.target === this.$el

      if (valid) {
        const delta = event.clientY - this.$refs.bar.getBoundingClientRect().top - this.height * 0.5
        let top = this.top + delta
        top = Math.min(this.maxTop, Math.max(top, 0))
        this.top = top
        this.$emit('on-vertical-drag', top / this.maxTop)
      }
    }
  },

  mounted () {
    document.addEventListener('mousemove', this.onDrag)
    document.addEventListener('touchmove', this.onDrag)
    document.addEventListener('mouseup', this.endDrag)
    document.addEventListener('touchend', this.endDrag)
  },

  beforeDestroy () {
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('touchmove', this.onDrag)
    document.removeEventListener('mouseup', this.endDrag)
    document.removeEventListener('touchend', this.endDrag)
  }
}
</script>
