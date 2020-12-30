<script>
import {Line} from "vue-chartjs";

export default {
  extends: Line,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  mounted() {

    const dates = this.chartData.map(singleData => singleData.date);
    const totals = this.chartData.map(singleData => {

      const tempInFloat = singleData.value.toString();
      return parseFloat(tempInFloat.substring(0,tempInFloat.length - 1));

    });

    this.renderChart({
          labels: dates,
          datasets: [{
            label: this.label,
            data: totals,
            backgroundColor: '#f87979',
          }],
        },
        this.options
    );
  }


};
</script>
