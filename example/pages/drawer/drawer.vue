<template>
  <div>
    <section class="demo-section">
      <h4>基本用法</h4>
      <div>
        <x-button @click="$left">left</x-button>
        <x-button @click="$right">right</x-button>
        <x-button @click="$top">top</x-button>
        <x-button @click="$bottom">bottom</x-button>
      </div>
    </section>
  </div>
</template>

<script>
import Test from './test.vue'

export default {
  name: 'app',
  methods: {
    $left () {
      this.$drawer({
        direction: 'left',
        className: 'hhh',
        render (h) {
          return h(Test)
        }
      })
    },
    $right () {
      this.$drawer({
        className: 'hhh',
        render (h) {
          return h(Test)
        }
      })
    },
    $top () {
      this.$drawer({
        className: 'hhh',
        direction: 'top',
        render (h) {
          return h(Test)
        }
      })
    },
    $bottom () {
      this.$drawer({
        className: 'hhh',
        direction: 'bottom',
        render (h) {
          return h(Test)
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
