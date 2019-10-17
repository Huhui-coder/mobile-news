<template>
  <div class="wrap">
    <div class="content">
      <p v-for="item in TextData" :key="item.username">{{item.text}}</p>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/article.js";
import { debounce } from "@/utils/common";
export default {
  name: "mytext",
  data: () => ({
    formData: {
      type: 2,
      page: 1
    },
    page: 1, // 页码
    TextData: []
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
          this.TextData = res.data.filter(item => item.type == "text");
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
  touch-action: pan-y !important;
  .video {
    width: 100vw;
    height: 25vh;
  }
  .content {
    text-indent: 2em;
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
