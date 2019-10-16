<template>
  <div style="margin-bottom: 40px;" id="scroll">
    <mu-tabs
      :value.sync="active"
      color="red"
      indicator-color="white"
      full-width
      class="tab fixed mb"
    >
      <mu-tab @click.native="getList(5)">视频</mu-tab>
      <mu-tab @click.native="getList(2)">文字</mu-tab>
      <mu-tab @click.native="getList(4)">动图</mu-tab>
      <mu-tab @click.native="getList(3)">图片</mu-tab>
    </mu-tabs>
    <div class="wrap" v-if="active === 0">
      <div class="video">
        <video
          controls="controls"
          autoplay="autoplay"
          src="http://wvideo.spriteapp.cn/video/2017/1129/9526e2c4d4b111e79aa2842b2b4c75ab_wpd.mp4"
        ></video>
      </div>
    </div>
    <div class="wrap" v-if="active === 1">
      <div class="content">
        <p v-for="item in TextData" :key="item.passtime">{{item.text}}</p>
      </div>
    </div>
    <div class="wrap" v-if="active === 2">动图</div>
    <div class="wrap" v-if="active === 3">图片</div>
  </div>
</template>
<script>
import { fetchList } from "../api/article.js";
import { debounce } from "../utils/common";
export default {
  name: "news",
  data: () => ({
    active: 0,
    formData: {
      type: 1,
      page: 1
    },
    type: 1, // 资源类型
    page: 1, // 页码
    VideoData: [],
    TextData: [],
    GifData: [],
    ImgData: [],
    ImgData: [],
    GifData: []
  }),
  props: {},
  watch: {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  },
  computed: {},
  methods: {
    getList(type) {
      this.type = type;
      this.formData.type = type;
      let query = this.formData;
      fetchList(query)
        .then(res => {
          this.VideoData = res.data.filter(item => item.type == "video");
          this.TextData = res.data.filter(item => item.type == "text");
          this.ImgData = res.data.filter(item => item.type == "image");
          this.GifData = res.data.filter(item => item.type == "gif");
        })
        .catch(err => {
          console.log(err);
        });
    },
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        controls: true,
        autoplay: "muted",
        preload: "auto",
        width: "200px",
        height: "100px"
      });
    },
    openVideo() {},
    handleScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        this.formData.type = this.type;
        this.formData.page = this.page++;
        let query = this.formData;
        debounce(
          fetchList(query)
            .then(res => {
              this.TextData = this.TextData.concat(
                res.data.filter(item => item.type == "text")
              );
            })
            .catch(err => {
              console.log(err);
            }),
          2000
        );
      }
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
