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
    graphOption: [],
    options: {
      chart: {
        type: "line"
      },
      title: {
        text: "Population transition"
      },
      xAxis: {
        categories: [1980, 1990, 2000, 2010, 2020]
      },
      yAxis: {
        title: {
          text: "population"
        }
      },
      series: []
    }
  }),
  methods: {
    async makeGraphData(prefCode) {
      const graphData = await axios.get(
        "/population/composition/perYear?cityCode=-&prefCode=" +
          prefCode.toString()
      );
      const prefData = await axios.get("/prefectures");
      const prefName = prefData.data.result[prefCode - 1].prefName;
      const prefDatas = graphData.data.result.data[0].data; //{year populations}
      const popList = []; //from 1960 to 2045
      console.log(prefDatas);
      prefDatas.forEach(element => {
        if (
          element.year <= 2020 &&
          element.year >= 1980 &&
          element.year % 10 === 0
        ) {
          popList.push(element.value);
        }
      });
      popList.push(prefDatas.value);
      if (
        this.graphOption.indexOf({ prefName: prefName, popList: popList }) ===
        -1
      ) {
        this.graphOption.push({
          prefName: prefName,
          popList: popList
        });
      }
      if (
        this.options.series.indexOf({
          name: prefName,
          type: "line",
          data: popList
        }) === -1
      ) {
        this.options.series.push({
          name: prefName,
          type: "line",
          data: popList
        });
      }
    }
  },
  watch: {
    prefs: async function(newPrefs) {
      console.log(newPrefs);
      const prefsLength = newPrefs.length;
      this.graphOption = [];
      this.options.series = [];
      for (let step = 0; step < prefsLength; step++) {
        await this.makeGraphData(newPrefs[step]);
      }
      console.log(this.options.title);
      console.log(this.options.xAxis.categories);
      console.log(this.options.yAxis.title.text);
      console.log(this.options.series);
      Highchart.chart({
        chart: {
          renderTo: "graphItself"
        },
        title: this.options.title,
        xAxis: { categories: [1980, 1990, 2000, 2010, 2020] },
        yAxis: [{ title: this.options.yAxis.title.text }],
        series: this.options.series
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
