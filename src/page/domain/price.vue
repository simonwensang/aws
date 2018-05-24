<style rel="stylesheet/scss" scoped>
</style>
<template>
  <div style="background: #fff;" class="p20">
    <div v-title>域名j价格</div>
    <Table :loading="loading" :no-data-text="noDataText" :columns="columns"
           :data="tableData" class="mt10"></Table>
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
        columns: [
          {
            title: '域名',
            key: 'name',
          },
          {
            title: '原价（元/年）',
            key: 'originPrice',
          },
          {
            title: '促销价（元/年）',
            key: 'price',
          },
          {
            title: '续费价（元/年）',
            key: 'recharge',
          }
        ],
        tableData: [],
        total: 0,
      }
    },
    created(){
      this.$emit('setNavInfo', '域名价格', 'domainPrice', 'domain');
      this.getInfo();
    },
    methods: {
      getInfo() {
        let t = this;
        let data = {'pageNo': 1, 'pageSize': 100};
        Api.domainQueryDomain(data).then(response => {
          if (response.code == 200) {
            let records = response.dataMap.records;
            if (!!records && records.length > 0) {
            } else {
              records = [];
              t.noDataText = '暂无数据';
            }
            t.tableData = records;
            t.loading = false;
          }
        });
      }
    }
  }
</script>
