<template>
  <div style="margin-bottom: 20px;">
    <section class="demo-section">
      <h4>基本用法</h4>
      <div style="display:flex;justify-content:center;margin-bottom:50px;">
        <x-scroller
          ref="scroller"
          max-width="500"
          max-height="400"
          show-scrollbar="active"
          check-on-mounted
          style="border:1px solid #ddd;"
          :bar-offset-right="100"
          :bar-offset-top="50"
          :bar-offset-bottom="100"
          :bar-offset-left="50"
        >
          <div v-for="i in 10" :key="i" style="width:3400px;">
            <div
              v-for="j in 10" :key="j"
              style="display:inline-block;width:300px;height:100px;background:rgb(158, 150, 219);margin:20px;"></div>
          </div>
        </x-scroller>
      </div>
    </section>
  </div>
</template>

<script>
import { xScroller } from '../src'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: { xScroller },
  mounted () {
    setTimeout(() => {
      this.$refs.scroller.stickToBoundary(false, false)
    }, 1000)
  }
}
</script>
