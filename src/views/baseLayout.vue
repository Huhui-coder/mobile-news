<template>
  <div>
    <router-view />
    <div class="footer-wrap">
      <div class="footer">
        <router-link to="/news">
          <svg-icon :icon-class="'msg'"></svg-icon>资讯
        </router-link>
        <router-link to="/joke">
          <svg-icon :icon-class="'smail'"></svg-icon>笑话
        </router-link>
        <router-link to="/collect">
          <svg-icon :icon-class="'collect'"></svg-icon>收藏
        </router-link>
        <router-link to="/personal">
          <svg-icon :icon-class="'love'"></svg-icon>个人中心
        </router-link>
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
  background-color: #f7f4ee;
  position: fixed;
  right: 0;
  bottom: 0;
  height: 7vh;
  width: 100%;
  text-align: center;
  .footer {
    display: flex;
    height: 7vh;
    a {
      flex: 1;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    .router-link-active {
      transform: scale(1.3);
    }
  }
}
</style>
