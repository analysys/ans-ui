<template>
  <div class="select-demo-wrapper">
    <section class="demo-section">
      <h4>键盘导航</h4>
      <div>
        <x-select
          multiple
          filterable
          height="150"
          highlight-matched-text
          ignore-case
          :filter-props="['label', 'value']"
        >
          <x-option
            v-for="city in cities"
            :key="city.value"
            :value="city"
            :label="city.label"
          >
          </x-option>
        </x-select>
      </div>
    </section>
  </div>
</template>

<script>
import { xSelect, xOption } from '../src'

export default {
  name: 'app',
  components: { xSelect, xOption },
  data () {
    return {
      cities: [],
      amount: 300
    }
  },
  beforeMount () {
    const cities = []
    for (let i = 0; i < this.amount; i++) {
      cities.push({
        id: i + 1,
        value: 'city' + i,
        label: '城市' + i
      })
    }
    this.cities = cities
  }
}
</script>

<style lang="scss">
.demo-wrapper {
  .cate {
    height: 40px;
    margin-left: 20px;
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
  }
  .row {
    display: flex;
    margin: 20px 0;
    padding: 0 50px;
    & > div {
      margin-right: 50px;
    }
  }
  .custom {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    &:hover {
      background: #8492a6;
      .left,
      .right {
        color: #fff;
      }
    }
    .left {
      font-size: 12px;
    }
    .right {
      color: #8492a6;
      font-size: 12px;
      transform: scale(0.8);
    }
  }
  .selected .custom {
    color: #598cd4;
    background: #dfd8e4;
  }
  .custom-group {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #303030;
    font-weight: bolder;
    background: #b7d1f0;
    i {
      margin: 0 10px;
    }
  }
}
</style>
