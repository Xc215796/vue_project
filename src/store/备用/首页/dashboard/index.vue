<template>
  <div class="charts" id="myChart" >
    <div><x-chart ></x-chart></div>
    <div><x-chart01 ></x-chart01></div>
    <div><x-chart02 ></x-chart02></div>
    <div><x-chart03 ></x-chart03></div>
    

  </div>
</template>
<script>
// 导入chart.vue子组件
import XChart from './chart.vue'
import XChart01 from './chart01.vue'
import XChart02 from './chart02.vue'
import XChart03 from './chart03.vue'
export default {
 components: {
  XChart,
  XChart01,
  XChart02,
  XChart03,
 }
}
</script>
<style scoped lang='stylus'>
</style>