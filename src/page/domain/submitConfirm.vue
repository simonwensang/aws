<style rel="stylesheet/scss" scoped>
  .pay-info {
    width: 100%;
    border: 1px solid #E1E6EB;
    border-top: 0;
    height: 50px;
    line-height: 50px;
    text-align: right;
    overflow: hidden;
    font-size: 14px;
    padding-right: 20px;
  }
</style>
<template>
  <div style="background: #fff;position: relative;">
    <Row>
      <Steps :current="2" class="fr" style="margin: 20px 20px 0;top: 20px;width: 700px;">
        <Step title="添加订单"></Step>
        <Step title="提交资料"></Step>
        <Step title="确认订单"></Step>
        <Step title="在线支付"></Step>
        <Step title="支付成功"></Step>
      </Steps>
    </Row>
    <Row style="border-top: 1px solid #ddd;" class="mt20">
      <Card :bordered="false" style="background:#eee;" class="mt20">
        <p style="line-height: 28px;">温馨提示：<br>1. 域名属即时产品，先注先得，以付款成功为准，请您尽快完成支付。<br>2.域名一经售出，所有权即刻属于购买者，无法通过退款放弃该域名，因此域名产品一经售出，概不退款。
        </p>
      </Card>
    </Row>
    <Row class="mt20 pt20">
      <Table :columns="columns" :data="domainNameList" class="mt10"></Table>
    </Row>
    <div class="pay-info">
      产品金额：<span class="red pl10">￥{{info.price}}</span>
    </div>
    <div class="pay-info">
      代金券：<span class="red pl10">-￥0</span>
    </div>
    <div class="pay-info">
      实际支付金额：<span class="red pl10">￥{{info.price}}</span>
    </div>
    <Row class="mt20 pb20" style="text-align: right">
      <a v-on:click="back">返回修改</a>
      <Button type="primary" @click="confirm" class="ml10 mr10">立即支付</Button>
    </Row>

  </div>
</template>
<script>
  import Api from "../../store/Api";

  export default {
    data() {
      return {
        info: null,
        domainNameList: [],
        columns: [
          {
            title: '产品名称',
            key: 'productName',
          },
          {
            title: '具体配置',
            key: 'specificConf',
          },
          {
            title: '数量',
            key: 'count',
          },
          {
            title: '时长',
            key: 'year',
          },
          {
            title: '单价',
            key: 'price',
          },
          {
            title: '计费方式',
            key: 'jtype',
          },
          {
            title: '订单金额',
            key: 'orderPrice',
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
        let info = t.$route.params.info;
        if (info == undefined || info == null) {
          this.$router.push({name: 'domainSubmitInfo', params: {'domainNameList': domainNameList}});
        }
        for (let i = 0; i < domainNameList.length; i++) {
          domainNameList[i].jtype = '包年包月';
          domainNameList[i].productName = '域名服务';
          domainNameList[i].specificConf = '域名：' + domainNameList[i].name;
          domainNameList[i].orderPrice = domainNameList[i].price;
          domainNameList[i].count = 1;
        }
        t.domainNameList = domainNameList;
        t.info = info;


      },
      confirm() {
        this.$router.push({name: 'domainPay', params: { 'domainNameList': this.domainNameList, info: this.info }});
      },
      back() {
        this.$router.push({name: 'domainSubmitInfo', params: {'domainNameList': this.domainNameList}});
      }
    }
  }
</script>
