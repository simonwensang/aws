<style rel="stylesheet/scss" scoped>
</style>
<template>
  <div style="background: #fff;" class="p20">
    <div v-title>域名信息管理</div>
    <Row>
      <Button type="primary" icon="plus-round" @click="showAddClick">添加信息模板</Button>
    </Row>
    <Table :loading="loading" :no-data-text="noDataText" :columns="columns"
           :data="tableData" class="mt10"></Table>
    <Page @on-change="pageNoChange" style="margin:30px 0;" :total="total" :current="pageNo" :page-size="pageSize"
          placement="top"></Page>

    <Modal width="540" :closable="false" v-model="showAdd" title="添加信息模板" :mask-closable="false">
      <info-add ref="infoAdd" v-on:listenAddEvent="listenAddEvent"></info-add>
      <div slot="footer"></div>
    </Modal>
    <Modal width="540" :closable="false" v-model="showEdit" title=" 修改信息模板" :mask-closable="false">
      <info-edit ref="showEdit" v-on:listenAddEvent="listenAddEvent"></info-edit>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from "../../util/util";
  import infoAdd from "../../page/domain/infoAdd.vue";
  import infoEdit from "../../page/domain/infoEdit.vue";
  export default {
    components: {
      infoAdd,
      infoEdit
    },
    data() {
      return {
        tableData: [],
        total: 0,
        pageNo: 1,
        pageSize: 20,
        showAdd: false,
        showEdit: false,
        loading: true,
        noDataText: '数据加载中',
        columns: [
          {
            title: '域名所有者',
            key: 'ownerName',
          },
          {
            title: '所有者类型',
            key: 'typeName',
          },
          {
            title: '管理联系人',
            key: 'manageName',
          },
          {
            title: '联系邮箱',
            key: 'mail',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.$refs.showEdit.getDomainInfo(this.tableData[params.index].id, false);
                      this.showEdit = true;
                    }
                  }
                }, '编辑'),
                h('a', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '删除联系人',
                        content: '<p>确定删除该联系人?</p>',
                        onOk: () => {
                          let t = this;
                          Api.deleteDomainUserInfo(t.tableData[params.index].id).then(response => {
                            if (response.code == 200) {
                              Util.showNotificationBox('success', '删除成功!');
                              t.getInfo();
                            }
                          });
                        }
                      });
                    }
                  }
                }, '删除'),
                h('a', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$refs.showEdit.getDomainInfo(this.tableData[params.index].id, true);
                      this.showEdit = true;
                    }
                  }
                }, '复制')
              ]);
            }
          }
        ],
      }
    },
    created(){
      this.$emit('setNavInfo', '信息模板列表', 'domainInfo', 'domain');
      this.getInfo();
    },
    methods: {
      getInfo() {
        let t = this;
        let data = {'pageNo': t.pageNo, 'pageSize': t.pageSize};
        Api.queryDomainUserInfo(data).then(response => {
          if (response.code == 200) {
            let records = response.dataMap.records;
            if (!!records && records.length > 0) {
              for (let i = 0; i < records.length; i++) {
                records[i].typeName = records[i].type == 1 ? '个人' : '企业';
              }
            } else {
              records = [];
              t.noDataText = '暂无数据';
            }
            t.total = response.dataMap.totalRecords;
            t.pageNo = response.dataMap.pageNo;
            t.pageSize = response.dataMap.pageSize;
            t.tableData = records;
            t.loading = false;
          }
        });
      },
      listenAddEvent(flag) {
        if (flag) {
          this.getInfo();
        }
        this.showAdd = false;
        this.showEdit = false;
      },
      showAddClick() {
        this.$refs.infoAdd.getInfo();
        this.showAdd = true;
      },
      pageNoChange(pageNo) {
        this.pageNo = pageNo;
        this.getInfo();
      }
    }
  }
</script>
