<style rel="stylesheet/scss" scoped>
  .domain-detailed-list {
    border: 1px solid #ddd;
    width: 300px;
    border-radius: 5px;
  }

  .domain-detailed-list .domain-list-title {
    line-height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
  }

  .domain-detailed-list .domain-list-title h4 {
    line-height: 60px;
    font-size: 16px;
    font-weight: normal;
  }

  .domain-detailed-list .domain-detailed-item {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }

  .domain-detailed-list .domain-detailed-item-info {
    font-size: 14px;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    color: #2d8cf0;
    width: 170px;
    overflow: auto;
  }

  .domain-detailed-list .domain-detailed-foot {
    border-top: 1px solid #ddd;
    height: 70px;
    padding: 0 20px;
  }

  .domain-detailed-list .domain-detailed-foot .btn {
    margin-top: 17px;
  }
</style>
<template>
  <div style="background: #fff;position: relative;">
    <Row>
      <Steps :current="1" class="fr" style="margin: 20px 20px 0;top: 20px;width: 700px;">
        <Step title="添加订单"></Step>
        <Step title="提交资料"></Step>
        <Step title="确认订单"></Step>
        <Step title="在线支付"></Step>
        <Step title="支付成功"></Step>
      </Steps>
    </Row>
    <Row class="mt20 pt20 pb20" style="border-top: 1px solid #ddd;">
      <div class="ml20 mt10 fl" style="width: calc(100% - 360px);">
        <Table highlight-row :loading="loading" :no-data-text="noDataText" :columns="columns"
               :data="tableData" class="mt10" @on-current-change="currentChange"></Table>
      </div>
      <div class="fr domain-detailed-list mr20 mt20">
        <div class="domain-list-title">
          <h4 class="fl">所选配置</h4>
        </div>
        <div class="domain-detailed-body pt10 pb10">
          <div class="domain-detailed-item ">
            <div class="domain-detailed-item-name fl">
              <span class="detailed-item-name">域名所有者：</span>
            </div>
            <div class="domain-detailed-item-info fl">{{info.ownerName}}</div>
          </div>
          <div class="domain-detailed-item ">
            <div class="domain-detailed-item-name fl">
              <span class="detailed-item-name">联系人：</span>
            </div>
            <div class="domain-detailed-item-info fl">{{info.manageName}}</div>
          </div>
          <div class="domain-detailed-item ">
            <div class="domain-detailed-item-name fl">
              <span class="detailed-item-name">邮箱：</span>
            </div>
            <div class="domain-detailed-item-info fl">{{info.mail}}</div>
          </div>
          <div class="domain-detailed-item ">
            <div class="domain-detailed-item-name fl">
              <span class="detailed-item-name">购买量：</span>
            </div>
            <div class="domain-detailed-item-info fl">{{domainNameList.length}}个域名</div>
          </div>
          <div class="domain-detailed-item ">
            <div class="domain-detailed-item-name fl">
              <span class="detailed-item-name">总价：</span>
            </div>
            <div class="domain-detailed-item-info fl red">￥{{info.price}}</div>
          </div>
        </div>
        <div class="domain-detailed-foot">
          <Button type="primary" :disabled="disabledFlag" @click="confirm" class="fl btn">立即支付</Button>
          <Button @click="back" class="fr btn">返回修改</Button>
        </div>
      </div>
    </Row>

  </div>
</template>
<script>
  import Api from "../../store/Api";

  export default {
    data() {
      return {
        info: {
          id: null,
          ownerName: '未填写',
          manageName: '未填写',
          mail: '未填写',
          price: 0,
        },
        loading: true,
        disabledFlag: true,
        noDataText: '数据加载中',
        domainNameList: [],
        tableData: [],
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
          }
        ],
      }
    },
    created() {
      this.$emit('setNavInfo', '域名注册', 'domainList', 'domain');
      this.getInfo();
    },
    methods: {
      getInfo() {
        let t = this;

        let domainNameList = t.$route.params.domainNameList;
        if (domainNameList == undefined || domainNameList == null || domainNameList.length == 0) {
          t.$router.push({name: 'domainSearch'});
        }
        for (let i = 0; i < domainNameList.length; i++) {
          t.info.price += Number(domainNameList[i].price) * Number(domainNameList[i].year);
        }
        t.domainNameList = domainNameList;


        let data = {'pageNo': 1, 'pageSize': 1000};
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
            t.tableData = records;
            t.loading = false;
          }
        });
      },
      currentChange(currentRow, oldCurrentRow) {
        this.info.id = currentRow.id;
        this.info.ownerName = currentRow.ownerName;
        this.info.manageName = currentRow.manageName;
        this.info.mail = currentRow.mail;
        this.disabledFlag = false;
      },
      confirm() {
        this.$router.push({name: 'domainSubmitConfirm', params: { 'domainNameList': this.domainNameList, info: this.info }});
      },
      back() {
        this.$router.push({name: 'domainSearch'});
      }
    }
  }
</script>
