<template>
  <div class="graph">
    {{ graphOption }}
  </div>
</template>

<script>
import axios from "../axios-setting";
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
      selies: []
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
        this.options.selies.indexOf({
          name: prefName,
          type: "line",
          data: popList
        }) === -1
      ) {
        this.options.selies.push({
          name: prefName,
          type: "line",
          data: popList
        });
      }
      console.log(this.options.selies);
    }
  },
  watch: {
    prefs: function(newPrefs) {
      console.log(newPrefs);
      const prefsLength = newPrefs.length;
      this.graphOption = [];
      this.options.selies = [];
      for (let step = 0; step < prefsLength; step++) {
        this.makeGraphData(newPrefs[step]);
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
