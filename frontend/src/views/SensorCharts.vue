<template>
  <div id="app" class="container">

    <div class="row mt-5" v-if="sensorData.length > 0" >
      <div class="col">

        <h2>{{ chatTitle }}</h2>

        <select v-model="sensorId">
            <option  v-for="sensor in sensorIdList" :value="sensor">{{ sensor }}</option>
        </select>

        <br/>
        <DateRangePicker @setDate="changeDate"/>

        <div v-if="changeGraphDataAccordingSelect.length">
          <line-chart v-if="renderChart" :chartData="changeGraphDataAccordingSelect" :options="chartOptions" :label="chatTitle"></line-chart>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import LineChart from '../components/LineChart'

  import DateRangePicker from "@/components/DateRangePicker";

export default {
  name: 'SensorCharts',
  components: {
    LineChart,
    DateRangePicker
  },
  data(){
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      sensorData: [],
      chatTitle: '',
      sensorId: '',
      sensorIdList: [],
      renderChart: true
    };
  },
  methods: {
    async changeDate(dates){
      this.renderChart = false;

      const startDate = dates.startDate.toLocaleString();
      const endDate = dates.endDate.toLocaleString();

      const startDatePart = startDate.split(',')[0].split('/');
      const endDatePart = endDate.split(',')[0].split('/');

      const url = `http://localhost:5000/data?startDate=%3C${startDatePart[2]}-${startDatePart[0]}-${startDatePart[1]}%3E&endDate=%3C${endDatePart[2]}-${endDatePart[0]}-${endDatePart[1]}%3E`;

      const response = await axios.get(url);
      const resData = response.data;

      this.sensorData = [];

      resData.forEach(singleData => {
        const date = moment(singleData.date,"YYYYMMDD").format("MM/DD");
        const value = singleData.data_value;
        const sensorId = singleData.sensor_id;

        this.sensorData.push({
          date: date,
          value: value,
          sensorId: sensorId
        });

      });
      this.renderChart = true;

      if(this.sensorData.length === 0){
        this.$swal('fuck off');
      }

    }
  },
  computed: {
    changeGraphDataAccordingSelect(){

      if(this.sensorId === 'all'){
        return this.sensorData;
      }else{
        return this.sensorData.filter(data => data.sensorId === this.sensorId);
      }

    }
  },
  created()  {
    axios.get(`http://localhost:5000/data`).then(response => {
      const data = response.data;

      this.chatTitle = data[0].reading_type.toUpperCase();

      this.sensorIdList.push('all');

      data.forEach(singleData => {
        const date = moment(singleData.date,"YYYYMMDD").format("MM/DD");
        const value = singleData.data_value;
        const sensorId = singleData.sensor_id;

        if(!this.sensorIdList.includes(singleData.sensor_id)){
          this.sensorIdList.push(singleData.sensor_id);
        }

        this.sensorData.push({
          date: date,
          value: value,
          sensorId: sensorId
        });

      });
      this.sensorId = this.sensorIdList[0];
    });
  }
}
</script>

<style>
  input , select{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  option {
    color: #ff3f80;
  }
</style>
