<template>
  <Card>
    <PageTitle icon="ios-browsers" title="格式报表"/>

    <div style="padding-bottom: 15px;">
      <Row style="margin-bottom: 15px;">
        <Col span="4">
          开始时间
        </Col>
        <Col span="8">
          <DatePicker v-model="start" type="datetime" placeholder="Select date" placement="bottom" style="width: 200px"></DatePicker>
        </Col>
        <Col span="4">
          截至时间
        </Col>
        <Col span="8">
          <DatePicker v-model="end" type="datetime" placeholder="Select date" placement="bottom" style="width: 200px"></DatePicker>
        </Col>
      </Row>
      <Row style="margin-bottom: 15px;">
        <Col span="12" style="text-align:center;">
          <Button @click="reset" type="primary">重置条件</Button>
        </Col>
        <Col span="12" style="text-align:center;">
          <Button @click="submitSearch" type="primary">确定查询</Button>
        </Col>
      </Row>
      <Divider class="page-title-divider" />
    </div>

    <ChartPie v-if="reportData.length" style="height: 300px;" :value="reportData" text="格式使用情况"/>
  </Card>
</template>

<script>
  import PageTitle from '_c/page-title/page-title.vue';
  import { ChartPie } from '_c/charts'

  export default {
    name: 'formatReport',

    components: {
      PageTitle,
      ChartPie
    },

    data () {
      return {
        start: '',
        end: '',

        reportData: []
      }
    },

    methods: {
      reset () {
        this.start = this.end = '';
      },

      submitSearch () {
        this.reportData = [];
        this.$http.get(`getFormatReport?start=${this.start}&end=${this.end}`).then(({data}) => {
          if (data.status === 200) {
            this.reportData = data.data;
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>