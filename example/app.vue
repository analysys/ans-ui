<template>
  <div class="wrapper">
    <h2 class="h2">Hello analysys</h2>
    <div class="compo-list">
      <ul class="compo-ul">
        <li><router-link to="/icon">Icon</router-link></li>
        <li><router-link to="/spin">spin</router-link></li>
        <li><router-link to="/switch">switch</router-link></li>
        <li><router-link to="/tooltip">tooltip</router-link></li>
        <li><router-link to="/button">button</router-link></li>
        <li><router-link to="/radio">radio</router-link></li>
        <li><router-link to="/input">input</router-link></li>
        <li><router-link to="/checkbox">checkbox</router-link></li>
        <li><router-link to="/pagination">pagination</router-link></li>
        <li><router-link to="/select">select</router-link></li>
        <li><router-link to="/box">box</router-link></li>
        <li><router-link to="/datepicker">datepicker</router-link></li>
        <li><router-link to="/timepicker">timepicker</router-link></li>
        <li><router-link to="/poptip">poptip</router-link></li>
        <li><router-link to="/progress">progress</router-link></li>
        <li><router-link to="/cascader">cascader</router-link></li>
        <li><router-link to="/drawer">drawer</router-link></li>
        <li><router-link to="/table">table</router-link></li>
        <li><router-link to="/form">form</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
