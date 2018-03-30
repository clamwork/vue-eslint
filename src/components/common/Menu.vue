<template>
  <el-row class="tac">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-menu-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location" />
          <span>首页</span>
        </template>
      </el-submenu>

    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      options: []
    }
  },
  create () {
    // 浏览器后退前进处理
    window.onpopstate = () => {
      let path = this.$route.path
      this.options.forEach((item) => {
        item.content.forEach((obj) => {
          obj.path === path && this.addTab(obj)
        })
      })
    }
    // 浏览器刷新事件导航条保留
    if (/\/home\//g.test(location.href)) {
      if (sessionStorage.tabArr) {
        this.tabArr = JSON.parse(sessionStorage.getItem('tabArr'))
        this.checkedIndex = sessionStorage.getItem('checkedIndex')
      }
    }
    this.$store.dispatch('getAllWarehouse')
  },
  methods: {
    logout () {
      this.$http.post('/innerUser/logout.do').then((res) => {
        if (res.data.success) {
          location.herf = res.data.data.url
          sessionStorage.clear()
        }
      })
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.title.indexOf(from.meta.title) !== -1 || from.meta.title.indexOf(to.meta.title) !== -1) {
        let obj = this.tabArr.find(item => item.title === this.checkedIndex)
        if (obj) {
          obj.path = to.path
          obj.name = to.name
          obj.query = to.query
          to.meta.isKeep !== false && !obj.history.includes(to.name) && obj.history.push(to.name)
        }
      }
    }
  }

}
</script>

<style lang="less">

</style>
