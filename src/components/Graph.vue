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
      }
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
      const popList = graphData.data.result.data[0].data;
      if (
        this.graphOption.indexOf({ prefName: prefName, popList: popList }) ===
        -1
      ) {
        this.graphOption.push({
          prefName: prefName,
          popList: popList
        });
      }
      console.log(this.graphOption);
    }
  },
  watch: {
    prefs: function(newPrefs) {
      console.log(newPrefs);
      const prefsLength = newPrefs.length;
      this.graphOption = [];
      for (let step = 0; step < prefsLength; step++) {
        this.makeGraphData(newPrefs[step]);
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
