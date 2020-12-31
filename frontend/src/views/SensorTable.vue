<template>

  <div class="tableContainer" id="app">

    <div class="tableHeader">Past Alerts of a Sensor</div>
    <div class="tContainer">
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">Temperature</option>
        <option value="2">Pressure</option>

      </select>

      <table class="tValues">
        <thead>
        <tr>

          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Value</th>
          <th scope="col">Alert</th>

        </tr>
        </thead>
        <tbody >
        <tr v-for="data in resData">
          <td>{{new Date(data.date).getFullYear()}}-{{new Date(data.date).getMonth() + 1}}-{{new Date(data.date).getDate()}}</td>
          <td>{{new Date(data.date).getHours()}}:{{new Date(data.date).getMinutes()}}-{{new Date(data.date).getSeconds()}}</td>

          <td>{{data.data_value}}</td>
          <td>{{data.alert.alertText}}</td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import axios from "axios";

  export default {
    name: "SensorTable",
    data(){
      return{
        resData: []
      }
    },
    mounted() {
      axios.get('http://localhost:5000/data/alerts?reading_type=temperature')
          .then(response => {
            // handle success
            this.resData = response.data;
            console.log(response);
          })
          .catch(error =>  {
            // handle error
            console.log(error);
          });
    }
  }
</script>

<style scoped>
  *{
    background-color: #e3e1ff;
  }
  .tableHeader{
    position: absolute;
    left: 35%;
    top: 5%;
    background-color: rgb(255, 255, 255);
    font-family: sans-serif;
    font-size: large;
  }
  .tableContainer{
    width: 65%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    position: absolute;
    left: 20%;
    top: 12%;
    border-radius: 30px;
  }

  .tValues{
    position: absolute;
    top: 22%;
    left: 5%;
    width: 90%;
  }

  .form-select{
    position: absolute;
    top: 12%;
    width: 10%;
  }

</style>