import 'babel-polyfill'
import Vue from 'vue'
import Table from './components/Table.vue'
// import store from './store'

const App = new Vue({
  el: '#app',
  components: { Table },
  template: '<sort-table></sort-table>',
  render: h => h(Table)
})

App.$mount('#app')
