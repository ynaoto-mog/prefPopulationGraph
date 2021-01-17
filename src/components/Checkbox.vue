<template>
  <div class="checkBox">
    <div class="checkBoxSection" v-for="pref in prefs" v-bind:key="pref">
      <input
        type="checkbox"
        v-model="displayPrefs[pref.prefCode - 1]"
        :value="pref.prefCode"
        v-on:input="checkPref(pref.prefCode)"
      />
      {{ pref.prefName }}
    </div>
    <graph v-bind:prefs="displayPrefs" />
  </div>
</template>

<script lang="js">
import axios from "../axios-setting";
import Graph from "./Graph.vue";

export default({
  name: "Checkbox",
  data: () => ({
    prefs: [],
    displayPrefs: []
  }),
  components: {
    graph: Graph
  },
  methods: {
    checkPref(){
      console.log(this.displayPrefs);
    }
  },
  async mounted() {
    const prefsData = await axios.get("/prefectures"); //axiosSettingsでBaseUrlを設定。
    this.prefs = prefsData.data.result; //都道府県のデータを取得。
  }
});
</script>

<style scoped lang="scss"></style>
