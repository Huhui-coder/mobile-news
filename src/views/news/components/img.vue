<template>
  <div class="wrap">
    <div class="content">
      <div v-for="item in imgData" :key="item.soureid" class="img-wrap">
        <div>
          <img :src="item.image" alt @error="error(item,$event)"/>
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
  name: "myimg",
  data: () => ({
    formData: {
      type: 3, //图片
      page: 1
    },
    page: 1, // 页码
    imgData: [],
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
          this.imgData = res.data.filter(item => item.type == "image");
        })
        .catch(err => {
          console.log(err);
        });
    },
     error (item, e) {  // 图片加载出错
        e.target.src = "https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=364878ec78899e5178db32127297f50b/0823dd54564e9258d2bb2dff9f82d158ccbf4e17.jpg"
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
  .content {
    .img-wrap {
      width: 100vw;
      height: 40vh;
      text-align: center;
      div{
        height: 30vh;
        overflow: hidden;
        img {
        width: 100vw;
      }
      }
      
    }
  }
}
</style>
