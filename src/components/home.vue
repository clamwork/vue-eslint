<template>
  <el-container>
    <el-aside width="200px">
      <menu/>
    </el-aside>
    <el-main>
      Main
    </el-main>
  </el-container>
</template>

<script>
import menu from './common/Menu'

export default {
  data () {
    return {
      viewShow: true
    }
  },
  components: {
    menu
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less">
  .box {
    height: 100%;
  }

  .router-content {
    margin: 0 20px;
    border-top: 0;
    min-height: calc(~"100vh - 254px");
    position: relative;
  }

  .footer {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #929292;
  }

  .view-fade-enter {
    opacity: 0;
  }

  .view-fade-enter-active {
    transition: opacity .3s;
  }
</style>
