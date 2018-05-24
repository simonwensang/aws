<style rel="stylesheet/scss" scoped>
</style>
<template>
  <div style="background: #fff;" class="p20">
    <Col style="margin-top: 10px;">
    <DatePicker @on-change="timeChange" type="daterange" :value="time" :options="options" style="width: 200px"
                :clearable="false"></DatePicker>
    <Select @on-change="getInfo" v-model="search.transactionType" style="width:100px;margin-left: 10px;"
            placeholder="交易类型">
      <Option value="" key="">全部</Option>
      <Option v-for="item in transactionTypeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
    </Select>
    <Select @on-change="getInfo" v-model="search.channelId" style="width:100px;margin-left: 10px;" placeholder="渠道类型">
      <Option value="" key="">全部</Option>
      <Option v-for="item in channelTypeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
    </Select>
    </Col>
    <Table :loading="loading" style="margin-top: 30px;" :no-data-text="noDataText" :columns="columns"
           :data="tableData"></Table>
    <br>
    <Page @on-change="pageNoChange" @on-page-size-change="pageSizeChange" style="margin:30px 0;" :total="total"
          show-sizer :current="search.pageNo" :page-size="search.pageSize" :page-size-opts="[20, 30, 50, 100]"
          placement="top"></Page>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from "../../util/util";

  export default {
    data() {
      return {
        loading: true,
        noDataText: '数据加载中',
        time: null,
        search: {
          transactionType: null,
          channelId: null,
          createTimeFrom: null,
          createTimeTo: null,
          pageNo: 1,
          pageSize: 20,
        },
        transactionTypeList: [],
        channelTypeList: [],
        options: {
          shortcuts: [
            {
              text: '昨天',
              value() {
                const start = new Date();
                start.setTime(start.getTime() - 24 * 3600 * 1000);
                return [start, start];
              }
            },
            {
              text: '最近7天',
              value() {
                return Util.getAllDay(7);
              }
            },
            {
              text: '最近30天',
              value() {
                return Util.getAllDay(30);
              }
            },
            {
              text: '最近90天',
              value() {
                return Util.getAllDay(90);
              }
            }
          ]
        },
        columns: [
          {
            title: '编号',
            key: 'numberCode',
          },
          {
            title: '时间',
            key: 'createTime',
          },
          {
            title: '产品',
            key: 'product',
          },
          {
            title: '交易类型',
            key: 'transactionTypeDesc',
          },
          {
            title: '金额',
            key: 'account',
          },
          {
            title: '渠道类型',
            key: 'channelDesc',
          }
        ],
        tableData: [],
        total: 0,
      }
    },
    created() {
      this.$emit('setNavInfo', '概览', 'financeAccountDetail', 'finance');
      this.getTransactionTypeList();
    },
    methods: {
      getTransactionTypeList() {
        let t = this;
        Api.getTransactionTypeList().then(response => {
          if (response.code == 200) {
            t.transactionTypeList = response.dataMap;
            t.getChannelTypeList();
          }
        });
      },
      getChannelTypeList() {
        let t = this;
        Api.getChannelTypeList().then(response => {
          if (response.code == 200) {
            t.channelTypeList = response.dataMap;
            t.getAllDay();
          }
        });
      },
      getAllDay() {
        this.time = Util.getAllDay(7);
        this.search.createTimeFrom = this.time[0].getTime();
        this.search.createTimeTo = this.time[1].getTime();
        this.getInfo();
      },
      timeChange(time) {
        this.search.createTimeFrom = new Date(time[0]).getTime();
        this.search.createTimeTo = new Date(time[1]).getTime();
        this.getInfo();
      },
      getInfo() {
        let t = this;
        Api.getAccountDetail(t.search).then(response => {
          if (response.code == 200) {
            let records = response.dataMap.records;
            if (!!records && records.length > 0) {
              for (let i = 0; i < records.length; i++) {
                records[i].createTime = Util.transformTime(records[i].createTime);
              }
            } else {
              records = [];
              t.noDataText = '暂无数据';
            }
            t.total = response.dataMap.totalRecords;
            t.search.pageNo = response.dataMap.pageNo;
            t.search.pageSize = response.dataMap.pageSize;
            t.tableData = records;
            t.loading = false;
          }
        });
      },
      pageNoChange(pageNo) {
        this.search.pageNo = pageNo;
        this.getInfo();
      },
      pageSizeChange(pageSize) {
        this.search.pageSize = pageSize;
        this.getInfo();
      }
    }
  }
</script>
