<template>
  <div class="wrap">
    <div class="content" v-for="(item,index) in imgData" :key="index">
      <div class="avater">
        <img :src="item.header" alt />
      </div>
      <div class="gif">
        <p class="userName">{{item.username}}</p>
        <div class="img-wrap">
          <img
            :src="item.image"
            alt
            @error="error(item,$event)"
            @click="open(index)"
            v-lazy="item.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/article.js";
import { debounce } from "@/utils/common";
import { ImagePreview } from "vant";

export default {
  name: "myimg",
  data: () => ({
    formData: {
      type: 3, //图片
      page: 1
    },
    page: 1, // 页码
    imgData: [],
    imgList: []
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
    open(index) {
      ImagePreview({
        images: this.imgList,
        startPosition: index,
        onClose() {}
      });
    },
    fetch() {
      let query = this.formData;
      fetchList(query)
        .then(res => {
          this.imgData = res.data.filter(item => item.type == "image");
          this.imgData.map(item => {
            this.imgList.push(item.image);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    error(item, e) {
      // 图片加载出错
      e.target.src =
        "https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=364878ec78899e5178db32127297f50b/0823dd54564e9258d2bb2dff9f82d158ccbf4e17.jpg";
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
              this.imgData = this.imgData.concat(
                res.data.filter(item => item.type == "image")
              );
              this.imgList = [];
              this.imgData.map(item => {
                this.imgList.push(item.image);
              });
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
  .content {
    padding: 15px;
    display: flex;
    flex-direction: row;
    .avater {
      img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
    }
    .gif {
      margin-left: 10px;
      width: 100%;
      .img-wrap {
        height: 35vh;
        overflow: hidden;
        img {
          width: 90%;
        }
      }
    }
  }
}
</style>
