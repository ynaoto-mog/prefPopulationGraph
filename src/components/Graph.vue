<template>
  <div class="graph">
    <div id="graphItself"></div>
  </div>
</template>

<script>
import axios from "../axios-setting";
import Highchart from "highcharts";
export default {
  name: "Graph",
  props: {
    prefs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data: () => ({
    series: []
  }),
  methods: {
    //一つの都道府県のグラフに必要なデータを作成するメソッド
    async makeGraphData(prefCode) {
      const graphData = await axios.get(
        "/population/composition/perYear?cityCode=-&prefCode=" +
          prefCode.toString()
      );
      const prefData = await axios.get("/prefectures");
      const prefName = prefData.data.result[prefCode - 1].prefName; //県名を定義
      const prefDatas = graphData.data.result.data[0].data; //{year:--,value:--}が並ぶ
      const popList = [];
      //1980年から2020年の人口推移を10年ごとに取得
      prefDatas.forEach(element => {
        if (
          element.year <= 2020 &&
          element.year >= 1980 &&
          element.year % 10 === 0
        ) {
          popList.push(element.value);
        }
      });
      //人数のリストをpopListに格納
      popList.push(prefDatas.value);
      //もしseries内に同じデータがなければ、県名、タイプ、データを格納
      if (
        this.series.indexOf({
          name: prefName,
          type: "line",
          data: popList
        }) === -1
      ) {
        this.series.push({
          name: prefName,
          type: "line",
          data: popList
        });
      }
    }
  },
  watch: {
    prefs: async function(newPrefs) {
      const prefsLength = newPrefs.length;
      this.series = [];
      //選択した都道府県の数だけmakeGraphDataを実行。newPrefsはprefCodeが入ったリスト。
      for (let step = 0; step < prefsLength; step++) {
        await this.makeGraphData(newPrefs[step]);
      }
      //作成したデータをグラフとして表示。
      Highchart.chart({
        chart: {
          renderTo: "graphItself"
        },
        title: "Population transition",
        xAxis: { categories: [1980, 1990, 2000, 2010, 2020] },
        yAxis: "population",
        series: this.series
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
