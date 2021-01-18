<template>
  <checkbox />
</template>

<script>
import Checkbox from "./components/Checkbox.vue"; //Checkbox.vue内でGraph.vueを呼び出し
export default {
  name: "App",
  components: {
    checkbox: Checkbox
  }
};
</script>

<style lang="scss"></style>
