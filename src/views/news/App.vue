<template>
  <div>
    <mu-tabs :value.sync="active" color="red" indicator-color="white" full-width>
      <mu-tab @click.native="getList(index)" v-for="(item,index) in tab" :key="index">{{item}}</mu-tab>
    </mu-tabs>
    <slide @change="slidechange">
      <div slot="content">
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
      </div>
    </slide>
  </div>
</template>
<script>
import { fetchList } from "@/api/article.js";
import { debounce } from "@/utils/common";
import mygif from "./components/gif";
import myimg from "./components/img";
import mytext from "./components/text";
import myvideo from "./components/video";
import slide from "@/components/slide";
export default {
  name: "news",
  data: () => ({
    active: 0,
    currentTabComponent: "video", //初始化动态展示的组件
    tab: ["视频", "文字", "动图", "图片"]
  }),
  props: {},
  watch: {},
  components: {
    mygif,
    myimg,
    mytext,
    myvideo,
    slide
  },
  computed: {
    currentComponent() {
      return "my" + this.currentTabComponent;
    }
  },
  methods: {
    getList(type) {
      this.active = type;

      switch (type) {
        case 0:
          this.currentTabComponent = "video";

          break;
        case 1:
          this.currentTabComponent = "text";

          break;
        case 2:
          this.currentTabComponent = "gif";

          break;
        case 3:
          this.currentTabComponent = "img";

          break;

        default:
          break;
      }
    },
    slidechange(dir) {
      //找到当前选中的tab在tab数组中的位置，如果是左边就+1，是右边就-1；
      if (this.active <= 0) {
        this.active = 0;
      }
      if (this.active >= 3) {
        this.active = 3;
      }
      if (dir == "left") {
        this.active++;
        this.getList(this.active);
      } else {
        this.active--;
        this.getList(this.active);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  margin: 5px 0;
  touch-action: pan-y !important;
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
