<style rel="stylesheet/scss" scoped>

  .x-block-icon {
    background-color: #0089f0;
    width: 56px;
    height: 56px;
    border-radius: 30px;
    text-align: center;
    line-height: 68px;
    margin-right: 20px;
  }

  .x-block-right {
    font-size: 12px;
    padding-top: 5px;
    line-height: 24px;
  }

  .x-block-icon .icon-overview {
    color: #fff;
    font-size: 24px;
    top: 2px;
  }

  .console_sum_box td strong {
    color: #0088f0;
    font-size: 14px;
  }

  .account_sum {
    margin-right: 35px;
    font-size: 36px;
    font-family: Arial;
    font-weight: 700;
    color: #333;
    vertical-align: middle;
  }

  .recharge {
    border: 1px solid #0088f0;
    color: #0088f0;
    border-radius: 0;
    padding: 2px 5px;
    font-size: 12px;
    margin-left: 10px;
  }

  .recommended-product {
    margin: 5px;
    height: 80px;
    background-color: #f6f7fb;
  }

  .recommended-product-icon {
    background-color: #eceff9;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .recommended-product-icon i {
    vertical-align: middle;
    color: #0088f0;
  }

  .recommended-product-text {
    width: calc(100% - 100px);
    line-height: 80px;
    text-align: center;
  }

  .recommended-product-text a {
    color: #333;
  }

  .recommended-product-text a:hover {
    color: #108cee;
  }
</style>
<template>
  <div>
    <div v-title>管理控制台</div>
    <Row :gutter="16" class="mt15">
      <Col :xs="24" :sm="12" :md="12" :lg="6">
      <Card class="mt5 mb5">
        <table>
          <tr>
            <td width="76px">
              <div class="x-block-icon">
                <Icon class="icon-overview" type="social-yen"></Icon>
              </div>
            </td>
            <td class="x-block-right">余额：
              <a href="/#/finance/index">￥<span id="account_sum">{{accountBalance}}</span></a>
              <a class="ml20 recharge" v-on:click="pay" type="primary">充值</a></td>
          </tr>
        </table>
      </Card>
      </Col>
      <Col :xs="24" :sm="12" :md="12" :lg="6">
      <Card class="mt5 mb5">
        <table>
          <tr>
            <td width="76px">
              <div class="x-block-icon">
                <Icon class="icon-overview" type="social-usd"></Icon>
              </div>
            </td>
            <td>可开票金额：<br/>￥0</td>
          </tr>
        </table>
      </Card>
      </Col>
      <Col :xs="24" :sm="12" :md="12" :lg="6">
      <Card class="mt5 mb5">
        <table>
          <tr>
            <td width="76px">
              <div class="x-block-icon">
                <Icon class="icon-overview" type="android-textsms"></Icon>
              </div>
            </td>
            <td>短信剩余条数：<br/>{{smsCount}}</td>
          </tr>
        </table>
      </Card>
      </Col>
      <Col :xs="24" :sm="12" :md="12" :lg="6">
      <Card class="mt5 mb5">
        <table>
          <tr>
            <td width="76px">
              <div class="x-block-icon">
                <Icon class="icon-overview" type="ios-email-outline"></Icon>
              </div>
            </td>
            <td>我的工单：<strong>0</strong><br/>站内信：<strong>0</strong></td>
          </tr>
        </table>
      </Card>
      </Col>
    </Row>


    <Row class="mt20 pb20" style="background-color: #fff;">
      <h4 class="mt20 ml20">推荐服务</h4>
      <Row class="mt20">

        <div class="ml10 mr10">
          <Row>
            <Col :xs="24" :sm="12" :md="6">
            <div class="recommended-product">
              <div class="fl recommended-product-icon">
                <Icon type="ios-close" size="32"></Icon>
              </div>
              <div class="fl recommended-product-text">
                <router-link :to="'/domain/list'" style="display: block;">域名服务</router-link>
              </div>
            </div>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <div class="recommended-product">
              <div class="fl recommended-product-icon">
                <Icon type="ios-close" size="32"></Icon>
              </div>
              <div class="fl recommended-product-text">
                <router-link :to="'/user/safe'" style="display: block;">用户管理</router-link>
              </div>
            </div>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <div class="recommended-product">
              <div class="fl recommended-product-icon">
                <Icon type="ios-close" size="32"></Icon>
              </div>
              <div class="fl recommended-product-text">
                <router-link :to="'/finance/index'" style="display: block;">财务中心</router-link>
              </div>
            </div>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <div class="recommended-product">
              <div class="fl recommended-product-icon">
                <Icon type="ios-close" size="32"></Icon>
              </div>
              <div class="fl recommended-product-text">
                <router-link :to="''" style="display: block;">域名服务</router-link>
              </div>
            </div>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <div class="recommended-product">
              <div class="fl recommended-product-icon">
                <Icon type="ios-close" size="32"></Icon>
              </div>
              <div class="fl recommended-product-text">
                <router-link :to="''" style="display: block;">域名服务</router-link>
              </div>
            </div>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <div class="recommended-product">
              <div class="fl recommended-product-icon">
                <Icon type="ios-close" size="32"></Icon>
              </div>
              <div class="fl recommended-product-text">
                <router-link :to="''" style="display: block;">域名服务</router-link>
              </div>
            </div>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <div class="recommended-product">
              <div class="fl recommended-product-icon">
                <Icon type="ios-close" size="32"></Icon>
              </div>
              <div class="fl recommended-product-text">
                <router-link :to="''" style="display: block;">域名服务</router-link>
              </div>
            </div>
            </Col>

          </Row>
        </div>
      </Row>
    </Row>
  </div>
</template>
<script>
  import CountUp from 'countup';
  import Api from "../../store/Api";

  export default {
    data() {
      return {
        accountBalance: 0,
        smsCount: 0,
        numAnim: null,
      }
    },
    mounted(){
      this.$emit('setNavInfo', '管理控制台', 'console', 'console');
      this.getInfo();
    },
    methods: {
      getInfo() {
        Api.getUserInfo().then(response => {
          if (response.code == 200) {
            this.accountBalance = response.dataMap.accountBalance == 0 ? '0.00' : response.dataMap.accountBalance;
            this.smsCount = response.dataMap.smsCount;
            this.numAnim = new CountUp('account_sum', 0, this.accountBalance)
            this.numAnim.start();
          }
        });

      },
      pay() {
        this.$router.push({name: 'financePay'});
      }
    }
  }
</script>
