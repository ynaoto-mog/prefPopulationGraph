<template>
  <div class="checkBox">
    <div class="checkBoxSection" v-for="pref in prefs" v-bind:key="pref">
      <input type="checkbox" v-model="displayPrefs" :value="pref.prefCode" />
      <div class="prefNameInCheckbox">{{ pref.prefName }}</div>
    </div>
    <graph v-bind:prefs="displayPrefs" ref="graph" />
  </div>
</template>

<script>
import axios from "../axios-setting";
import Graph from "./Graph.vue";

export default {
  name: "Checkbox",
  data: () => ({
    prefs: [],
    displayPrefs: []
  }),
  components: {
    graph: Graph
  },
  async mounted() {
    const prefsData = await axios.get("/prefectures"); //axiosSettingsでBaseUrlを設定。
    this.prefs = prefsData.data.result; //都道府県のデータを取得。
  }
};
</script>

<style scoped lang="scss">
.prefNameInCheckbox {
  float: left;
}
</style>
