<template>
  <div class="checkBox">
    <div class="checkBoxCover" v-if="coverIf"></div>
    <p class="NowLoading" v-if="coverIf">Loading...</p>
    <p class="checkBoxTitle">各都道府県の人口推移</p>
    <p class="checkBoxSubTitle">都道府県</p>
    <div class="checkBoxSection" v-for="pref in prefs" v-bind:key="pref">
      <input
        type="checkbox"
        v-model="displayPrefs"
        :value="pref.prefCode"
        class="checkInCheck"
      />
      <div class="prefNameInCheckbox">{{ pref.prefName }}</div>
    </div>
    <graph
      v-bind:prefs="displayPrefs"
      @changeCovering="shiftCover"
      ref="graph"
      class="graphInCheckBox"
    />
  </div>
</template>

<script>
import axios from "../axios-setting";
import Graph from "./Graph.vue";
export default {
  name: "Checkbox",
  data: () => ({
    prefs: [], //全体の都道府県データをAPIから取得
    displayPrefs: [], //県コードを格納
    coverIf: false
  }),
  components: {
    graph: Graph
  },
  methods: {
    shiftCover() {
      if (this.coverIf === true) {
        this.coverIf = false;
      } else {
        this.coverIf = true;
      }
    }
  },
  async mounted() {
    const prefsData = await axios.get("/prefectures"); //axiosSettingsでBaseUrlを設定済み。
    this.prefs = prefsData.data.result;
  }
};
</script>

<style scoped lang="scss">
.checkBox {
  max-width: 1024px;
  position: relative;
}
.checkBoxTitle {
  text-align: center;
}
.checkInCheck {
  float: left;
}
.checkBoxSection {
  float: left;
}
.graphInCheckBox {
  clear: both;
}
.checkBoxCover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 2;
  background-color: rgb(0, 0, 0);
  opacity: 0.5;
}
.NowLoading {
  text-align: center;
  z-index: 3;
  color: white;
  position: absolute;
  top: 45vh;
  padding-left: 30%;
}
@media screen and (min-width: 768px) {
  //タブレットより大きい＆スマートフォン横
  .checkBoxSection {
    width: 15%;
  }
}
@media screen and (max-width: 768px) and (min-width: 480px) {
  .checkBoxSection {
    width: 25%;
  }
}
@media screen and (max-width: 480px) {
  .checkBoxSection {
    width: 30%;
  }
}
</style>
