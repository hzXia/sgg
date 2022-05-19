<template>
  <div>
    <Header />
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在login、register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
