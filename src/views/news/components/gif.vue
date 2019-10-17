<template>
  <div class="wrap">
    <div class="content">
      <div v-for="item in gifData" :key="item.soureid" class="img-wrap">
        <img :src="item.gif" alt />
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/article.js";
import { debounce } from "@/utils/common";
export default {
  name: "mygif",
  data: () => ({
    formData: {
      type: 4, //动图
      page: 1
    },
    page: 1, // 页码
    gifData: []
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
          this.gifData = res.data.filter(item => item.type == "gif");
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
              this.gifData = this.gifData.concat(
                res.data.filter(item => item.type == "gif")
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
  .content {
    .img-wrap {
      width: 100vw;
      img {
        width: 100vw;
      }
    }
  }
}
</style>
