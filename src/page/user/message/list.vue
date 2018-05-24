<style rel="stylesheet/scss">
  .table-info-row {
    color: #999999;
  }

  tr.ivu-table-row td:visited, tr.ivu-table-row td:active {
    color: #999999;
  }

</style>
<template>
  <div style="background: #fff;" class="p20">
    <Row style="margin-top: 10px;">
      <Select @on-change="getInfo" v-model="search.messageTypeId" style="width:100px;" placeholder="全部类型" class="fl">
        <Option value="" key="">全部类型</Option>
        <Option v-for="item in messageTypeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
      </Select>
      <Input v-model="search.titleLike" style="width: 300px;top: 0;" class="fl" placeholder="请输入搜索的标题">
      <Button slot="append" icon="ios-search" @click="getInfo"></Button>
      </Input>
    </Row>
    <Table ref="selection" @on-select="selectData" @on-select-cancel="selectCancelData"
           :show-header="false" :loading="loading" style="margin-top: 30px;" :no-data-text="noDataText"
           :columns="columns" :data="tableData"></Table>

    <Row class="mt20">
      <div class="fl">
        <Checkbox class="ml20" v-model="selectAllBox" @on-change="selectAll"></Checkbox>
        <Button @click="deleteMessage" :disabled="disabled">批量删除</Button>
        <Button @click="readMessage" :disabled="disabled">批量已读</Button>
      </div>
      <Page class="fr" @on-change="pageNoChange" @on-page-size-change="pageSizeChange" :total="total" show-sizer
            :current="search.pageNo" :page-size="search.pageSize" :page-size-opts="[20, 30, 50, 100]"
            placement="top"></Page>
    </Row>
  </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from "../../../util/util";
  import expandRow from './table-expand.vue';
  export default {
    components: {expandRow},
    data() {
      return {
        selectAllBox: null,
        disabled: true,
        loading: true,
        noDataText: '数据加载中',
        time: null,
        messageTypeList: [],
        search: {
          titleLike: null,
          messageTypeId: null,
          pageNo: 1,
          pageSize: 20,
        },
        columns: [
          {
            type: 'selection',
            width: 30,
          },
          {
            title: '是否已读',
            key: 'isRead',
            width: 30,
            render: (h, params) => {
              if (!params.row.isRead) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'information',
                      color: '#f90',
                    }
                  })
                ]);
              }
            }
          },
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              params.row.isRead = true;
              return h(expandRow, {
                props: {
                  row: params.row
                }
              });
            }
          },
          {
            title: '标题',
            key: 'title',
            render: (h, params) => {
              if (params.row.isRead) {
                return h('div', [
                  h('span', {
                    class: 'table-info-row',
                  }, params.row.title)
                ]);
              } else {
                return h('div', [
                  h('span', {}, params.row.title)
                ]);
              }
            }
          },
          {
            title: '时间',
            key: 'createTime',
            width: 200
          }
        ],
        tableData: [],
        selectDataList: [],
        total: 0,
      }
    },
    created(){
      this.$emit('setNavInfo', '概览', 'userMessage', 'user');
      this.getMessageTypeList();
    },
    methods: {
      getMessageTypeList() {
        let t = this;
        Api.getMessageTypeList().then(response => {
          if (response.code == 200) {
            t.messageTypeList = response.dataMap;
            t.getInfo();
          }
        });
      },
      getInfo() {
        let t = this;
        Api.queryUserMessage(t.search).then(response => {
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
      },
      selectAll() {
        this.$refs.selection.selectAll(this.selectAllBox);
        this.selectDataList = this.tableData;
        if (this.selectAllBox) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      selectData(selection, row) {
        this.selectDataList.push(row);
        this.disabled = false;
      },
      selectCancelData(selection, row) {
        this.selectDataList.splice(row, 1);
        if (selection.length === 0) {
          this.disabled = true;
        }
      },
      deleteMessage() {
        let t = this;
        if (t.selectDataList && t.selectDataList.length > 0) {
          t.$Modal.confirm({
            title: '确认',
            content: '<p>确定要删除已选中的消息吗？</p>',
            onOk: () => {
              let idList = [];
              for (let i = 0; i < t.selectDataList.length; i++) {
                idList.push(t.selectDataList[i].id);
              }
              Api.userMessageDeleteUserMessage(idList).then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '批量删除成功!');
                  t.disabled = true;
                  t.selectAllBox = false;
                  t.getInfo();
                }
              });
            }
          });
        }
      },
      readMessage() {
        let t = this;
        if (t.selectDataList && t.selectDataList.length > 0) {
          t.$Modal.confirm({
            title: '确认',
            content: '<p>确定要对选中消息设置已读吗？</p>',
            onOk: () => {
              let idList = [];
              for (let i = 0; i < t.selectDataList.length; i++) {
                idList.push(t.selectDataList[i].id);
              }
              Api.userMessageRead(idList).then(response => {
                if (response.code == 200) {
                  t.disabled = true;
                  t.selectAllBox = false;
                  Util.showNotificationBox('success', '批量已读成功!');
                  t.getInfo();
                }
              });
            }
          });
        }
      }
    }
  }
</script>
