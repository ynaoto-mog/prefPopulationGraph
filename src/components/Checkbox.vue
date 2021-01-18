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
    prefs: [], //全体の都道府県データをAPIから取得
    displayPrefs: [] //県コードを格納
  }),
  components: {
    graph: Graph
  },
  async mounted() {
    const prefsData = await axios.get("/prefectures"); //axiosSettingsでBaseUrlを設定済み。
    this.prefs = prefsData.data.result;
  }
};
</script>

<style scoped lang="scss">
.prefNameInCheckbox {
  float: left;
}
</style>
