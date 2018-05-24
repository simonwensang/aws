<style rel="stylesheet/scss" scoped>
</style>
<template>
  <div style="background: #fff;" class="p20">
    <div v-title>域名列表</div>
    <Row>
      <Button type="primary" icon="plus-round" @click="reg">注册新域名</Button>
    </Row>
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
            title: '域名状态',
            key: 'commonStatus',
          },
          {
            title: '注册日期',
            key: 'createTime',
          },
          {
            title: '到期日期',
            key: 'expirationTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'domainDetail', params: { 'id': this.tableData[params.index].id }});
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
      }
    },
    mounted(){
      this.$emit('setNavInfo', '域名列表', 'domainList', 'domain');
      this.getInfo();
    },
    methods: {
      reg() {
        this.$router.push({ name: 'domainSearch'});
      },
      getInfo() {
        let t = this;
        let data = {'pageNo': 1, 'pageSize': 100};
        Api.queryUserDomain(data).then(response => {
          if (response.code == 200) {
            let records = response.dataMap.records;
            if (!!records && records.length > 0) {
              for (let i = 0; i < records.length; i++) {
                records[i].createTime = Util.transformTime(records[i].createTime);
                records[i].expirationTime = Util.transformTime(records[i].expirationTime);
              }
            } else {
              records = [];
              t.noDataText = '暂无数据';
            }
            t.tableData = records;
            t.loading = false;
          }
        });
      },
    }
  }
</script>
