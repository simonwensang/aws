<style rel="stylesheet/scss" scoped>
  .pay-title {
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    margin: 20px 0 0;
    padding: 10px;
    width: 100%;
    font-style: inherit;
    font-family: inherit;
    font-size: 100%;
  }

  .pay-info {
    text-align: left;
    height: 50px;
    line-height: 50px;
    border: 1px solid #E1E6EB;
    padding-right: 0;
    overflow: hidden;
    font-size: 14px;
  }

  .pay-real .red {
    font-size: 18px;
  }
</style>
<template>
  <div style="background: #fff;position: relative;">
    <Row>
      <Steps :current="3" class="fr" style="margin: 20px 20px 0;top: 20px;width: 700px;">
        <Step title="添加订单"></Step>
        <Step title="提交资料"></Step>
        <Step title="确认订单"></Step>
        <Step title="在线支付"></Step>
        <Step title="支付成功"></Step>
      </Steps>
    </Row>
    <div class="pay-title">
      <div>产品信息：域名服务</div>
      <div class="mt10">订单金额：<span class="red">￥{{info.price}}</span></div>
    </div>
    <div class="pay-info mt20 pl10">
      <div class="pay-text"><label>账户余额：<span class="red">￥{{accountBalance}}</span></label></div>
    </div>
    <div class="mt20 pay-real pl10">应付金额：<span class="red">￥{{info.price}}</span></div>
    <!--<div class="mt20 pay-real pl10">支付密码：<Input v-model="payPwd" style="width:150px;"
                                                :maxlength="6"></Input></div>-->
    <Row class="mt20 pb20">
      <Button type="primary" :disabled="disabled" @click="confirm" class="ml10 mr10" :loading="loading">立即支付</Button>
    </Row>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from "../../util/util";

  export default {
    data() {
      return {
        payPwd: '',
        disabled: true,
        accountBalance: null,
        info: null,
        domainNameList: [],
        loading: false,
      }
    },
    created() {
      this.$emit('setNavInfo', '域名注册', 'domainList', 'domain');
      // this.getInfo();
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

        Api.getUserInfo().then(response => {
          if (response.code == 200) {
            t.accountBalance = response.dataMap.accountBalance;
            if (t.accountBalance >= t.info.price) {
              t.disabled = false;
            }
          }
        });


      },
      confirm() {
        let t = this;
        /*if (t.payPwd === '') {
          Util.showNotificationBox('error', '请输入支付密码!');
          return;
        }*/
        t.loading = true;
        let data = {domainInfoId: this.info.id, userDomainList: this.domainNameList};
        Api.domainPay(data).then(response => {
          if (response.code == 200) {
            Util.showNotificationBox('success', '支付成功!');
            this.$router.push({name: 'domainSuccess', params: {'info': response.dataMap}});
          } else {
            t.loading = false;
          }
        });
      },
    }
  }
</script>
