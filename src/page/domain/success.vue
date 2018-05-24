<style rel="stylesheet/scss" scoped>
  .info {
    width: 100%;
    line-height: 30px;
    font-size: 14px;
  }
</style>
<template>
  <div style="background: #fff;position: relative;">
    <Row>
      <Steps :current="4" class="fr" style="margin: 20px 20px 0;top: 20px;width: 700px;">
        <Step title="添加订单"></Step>
        <Step title="提交资料"></Step>
        <Step title="确认订单"></Step>
        <Step title="在线支付"></Step>
        <Step title="支付成功"></Step>
      </Steps>
    </Row>
    <Row class="mt20 pt20 pb20 ml20 mr20" style="border-top: 1px solid #ddd;">
      <h3>订单号：{{info.orderNo}}</h3>
      <h3 class="mt20 pt20" style="border-top: 1px solid #ddd;">域名信息：</h3>
      <div v-for="(item, index) in info.domainList" class="info ml20">
        域名：{{item.name}}<br>
        开通时间：{{item.createTime}}<br>
        到期时间：{{item.expirationTime}}
      </div>
    </Row>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from "../../util/util";

  export default {
    data() {
      return {
        info: null,
      }
    },
    created() {
      this.$emit('setNavInfo', '域名注册', 'domainList', 'domain');
      this.getInfo();
    },
    methods: {
      getInfo() {
        let t = this;

        let info = t.$route.params.info;
        if (info == undefined || info == null) {
          t.$router.push({name: 'domainSearch'});
        }
        for (let i = 0; i < info.domainList.length; i++) {
          info.domainList[i].createTime = Util.transformTime(info.domainList[i].createTime);
          info.domainList[i].expirationTime = Util.transformTime(info.domainList[i].expirationTime);
        }
        t.info = info;
      }
    }
  }
</script>
