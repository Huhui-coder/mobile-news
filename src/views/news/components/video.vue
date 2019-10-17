<template>
  <div class="wrap">
    <div class="content">
      <div v-for="item in videoData" :key="item.soureid">
        <div class="video-wrap">
          <video src="item.video" controls="controls" style="width:100vw;"></video>
        </div>
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/article.js";
import { debounce } from "@/utils/common";
export default {
  name: "myvideo",
  data: () => ({
    formData: {
      type: 5, //视频
      page: 1
    },
    page: 1, // 页码
    videoData: []
  }),
  props: {},
  watch: {},
  mounted() {
    this.fetch();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  },
  computed: {},
  methods: {
    fetch() {
      let query = this.formData;
      fetchList(query)
        .then(res => {
          this.videoData = res.data.filter(item => item.type == "video");
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        this.formData.page = this.page++;
        let query = this.formData;
        debounce(
          fetchList(query)
            .then(res => {
              this.videoData = this.videoData.concat(
                res.data.filter(item => item.type == "video")
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
  margin: 0;
  padding: 0;
  touch-action: pan-y !important;
  text-align: center;
  .video {
    width: 100vw;
    height: 25vh;
  }
  .content {
  }
}
</style>
