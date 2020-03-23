<template>
  <div id="app">
    <input type="text" v-model="searchWord" placeholder="キーワード検索">
    <table>
      <thead>
      <tr>
      <!-- value と key に
      columns = {
        id: 'ID',
        subject: '件名',
        category: 'カテゴリ',
        date: '日付'
      }
      のvalue と key が入る。 -->
          <th v-for="(value, key) in columns" v-bind:key="key" v-on:click="sortBy(key)">
              {{ value }}
          </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, key) in filteredTasks" :key="key">
          <td v-for="(value, key) in columns" :key="key">
              {{ task[key] }}
          </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: function () {
    const columns = {
      id: 'ID',
      subject: '件名',
      category: 'カテゴリ',
      date: '日付'
    }
    // 各項目のソート方向
    let sortOrders = {}
    Object.keys(columns).forEach(function (key) {
      // 初期値：sortOrders[key]が正の数
      sortOrders[key] = 1
    })
    return {
      columns: columns,
      tasks: [
        {
          id: 1,
          subject: 'abc',
          category: 1,
          date: '2016-12-01'
        },
        {
          id: 2,
          subject: 'def',
          category: 2,
          date: '2020-12-01'
        }
      ],
      // 現在のソートしているキー
      sortKey: '',
      sortOrders: sortOrders,
      // 文字列検索
      searchWord: '',
      selectCategory: '',
      categories: {
        1: 'カテゴリー1',
        2: 'カテゴリー2',
        3: 'カテゴリー3'
      }
    }
  },
  computed: {
    filteredTasks: function () {
      let data = this.tasks
      const sortKey = this.sortKey
      let order = this.sortOrders[sortKey] || 1
      // もし項目をクリックされたら、sortKeyには値が入るので、true
      // sort する処理を行う。
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          // 三項演算子を使うと、return (a === b ? 0 : a > b ? 1 : -1) * order;
          if (a === b) {
            return 0
          } else if (a - b > 0) {
            return 1 * order
          } else {
            return -1 * order
          }
        })
      }
      // 絞り込み機能
      // searchWord 入力時、小文字に変換
      const filterWord = this.searchWord && this.searchWord.toLowerCase()
      if (filterWord) {
        // data.filter(filteringObject) の中で、dataの配列の要素が引数rowとなる。
        const filteringObject = (row) => Object.keys(row).some((key) => {
          if (String(row[key]).toLowerCase().indexOf(filterWord) > -1) {
            return true
          }
        })
        data = data.filter(filteringObject)
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      // console.log(this.sortOrders[key])
      // クリックするたびに、マイナスをかけると、降順、昇順が入れ替わる
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>

<style scoped>
body {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #444;
  }
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}
th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
td {
  background-color: #f9f9f9;
}
th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
th.active {
  color: #fff;
}
th.active .arrow {
  opacity: 1;
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}
.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}
.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
