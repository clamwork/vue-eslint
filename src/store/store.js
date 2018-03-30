import Vue from 'vue'
import Vuex from 'vuex'
// import axios from '../util/axiosApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageSize: 10,
    pageSizeArr: [10, 20, 50, 100],
    lazyPageSize: 5,
    keepComponents: []
  },
  mutations: {
    // /**
    //  * 更新仓库列表
    //  */
    // upWarehouse (state, data) {
    //   if (!data) return
    //   state.warehouse = []
    //   for (let item of data) {
    //     state.warehouse.push({
    //       id: item.id,
    //       name: item.name,
    //       code: item.warehouseId,
    //       type: item.type
    //     })
    //   }
    // }
  },
  actions: {
    // getMenu ({commit}) {
    //   axios.post('menu/tree.do').then((res) => {
    //     res.data.success && commit('upWarehouse', res.data.data)
    //   })
    // }

  }
})
