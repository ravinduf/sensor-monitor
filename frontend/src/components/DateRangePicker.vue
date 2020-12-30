<template>

  <date-range-picker
      ref="picker"
      :locale-data="locale"
      :maxDate="maxDate"
      v-model="dateRange"
      @update="update"
  >
    <div slot="input" slot-scope="picker">{{ dateRange.startDate | date }} - {{
        dateRange.endDate | date }}</div>
  </date-range-picker>

</template>


<script>
  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
  import moment from 'moment';

export default {
  components: { DateRangePicker },
  data() {
    return {
      maxDate: moment().format('YYYY-MM-DD'),
      dateRange: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      },
      locale: {
        direction: 'ltr',
        format: 'mm/dd/yyyy',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: 1,
      }
    }
  },
  filters: {
    date(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    }
  },
  methods: {
    update(data){
      const startDate = data.startDate;
      const endDate = data.endDate;

      this.$emit('setDate',{
        startDate: startDate,
        endDate: endDate
      });

      //console.log(startDate);
      //console.log(endDate);
    }
  }
}
</script>

<style scoped>

</style>