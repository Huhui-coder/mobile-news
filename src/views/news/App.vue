<template>
  <div>
    <mu-tabs :value.sync="active" color="red" indicator-color="white" full-width>
      <mu-tab @click.native="getList('video')">视频</mu-tab>
      <mu-tab @click.native="getList('text')">文字</mu-tab>
      <mu-tab @click.native="getList('gif')">动图</mu-tab>
      <mu-tab @click.native="getList('img')">图片</mu-tab>
    </mu-tabs>
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>
<script>
import { fetchList } from "@/api/article.js";
import { debounce } from "@/utils/common";
import mygif from "./components/gif";
import myimg from "./components/img";
import mytext from "./components/text";
import myvideo from "./components/video";
export default {
  name: "news",
  data: () => ({
    active: 0,
    currentTabComponent: "video" //动态展示的组件
  }),
  props: {},
  watch: {},
  components: {
    mygif,
    myimg,
    mytext,
    myvideo
  },
  computed: {
    currentComponent() {
      return "my" + this.currentTabComponent;
    }
  },
  methods: {
    getList(type) {
      this.currentTabComponent = type;
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  margin: 5px 0;
  .video {
    width: 100vw;
    height: 25vh;
  }
  .content {
    text-indent: 2em;
    margin-top: 72px;
  }
}
.tab {
  transition: all 0.3s;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}
.notfixed {
  position: fixed;
  top: -100%;
  left: 0;
}
.mb {
  margin-bottom: 72px;
}
</style>
