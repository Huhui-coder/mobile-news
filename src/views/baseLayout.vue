<template>
  <div>
    <router-view />
    <div class="footer-wrap">
      <div class="footer">
        <router-link to="/news">新闻</router-link>
        <router-link to="/joke">笑话</router-link>
        <router-link to="/collect">收藏</router-link>
        <router-link to="/personal">个人中心</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
<style lang="less" scoped>
.footer-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  height: 20px;
  width: 100%;
  text-align: center;
  .footer {
    display: flex;
    a {
      flex: 1;
    }
    .router-link-active {
      background-color: red;
    }
  }
}
</style>
