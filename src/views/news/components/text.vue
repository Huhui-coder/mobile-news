<template>
  <div class="wrap">
    <div class="content" v-for="(item,index) in TextData" :key="index">
      <div class="avater">
        <img :src="item.header" alt />
      </div>
      <div class="text">
        <p class="userName">{{item.username}}</p>
        <p>{{item.text}}</p>
      </div>
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
          1000
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
    .text {
      margin-left: 10px;
    }
  }
}
</style>
