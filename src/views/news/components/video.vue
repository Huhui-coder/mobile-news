<template>
  <div class="wrap">
    <div class="content" v-for="(item,index) in videoData" :key="index">
      <div class="avater">
        <img :src="item.header" alt v-lazy="item.header" />
      </div>
      <div class="gif">
        <p class="userName">{{item.username}}</p>
        <div class="img-wrap">
          <video :src="item.video" controls></video>
        </div>
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
      if (scrollTop + windowHeight >= scrollHeight) {
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
  margin: 6vw 0;
  .content {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    margin: 1.2vw 0;
    padding: 2vw;
    .avater {
      img {
        border-radius: 50%;
        width: 8vw;
        height: 8vw;
      }
    }
    .gif {
      margin-left: 10px;
      width: 100%;
      .userName{
        margin-top: 4px;
      }
      .img-wrap {
        video {
          width: 90%;
        }
      }
    }
  }
}
</style>
