<template>
  <div class="wrap">
    <div class="content" v-for="(item,index) in gifData" :key="index">
      <div class="avater">
        <img :src="item.header" alt />
      </div>
      <div class="gif">
        <p class="userName">{{item.username}}</p>
        <img :src="item.gif" alt @click="open(index)" v-lazy="item.gif" />
      </div>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/article.js";
import { debounce } from "@/utils/common";
import { ImagePreview } from "vant";

export default {
  name: "mygif",
  data: () => ({
    formData: {
      type: 4, //动图
      page: 1
    },
    page: 1, // 页码
    gifData: [],
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
          this.gifData = res.data.filter(item => item.type == "gif");
          this.gifData.map(item => {
            this.imgList.push(item.gif);
          });
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
              this.imgList = [];
              this.gifData.map(item => {
                this.imgList.push(item.gif);
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
      img {
        width: 90%;
      }
    }
  }
}
</style>
