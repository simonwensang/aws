<style rel="stylesheet/scss" scoped>
  .account_sum {
    margin-right: 20px;
    font-size: 16px;
    color: #333;
  }

  .section-header {
    padding: 15px 0 0 30px;
    font-weight: 400;
    border-top: 1px solid #E5E5E5;
  }

  .item {
    box-sizing: border-box;
    position: relative;
    float: left;
    min-width: 200px;
    min-height: 100px;
    padding: 20px;
    margin-right: 10px;
    background: #f6f7fb;
  }

  .item .bg {
    float: left;
    width: 48px;
    height: 48px;
    margin: 10px 20px 0 5px;
    background: url(../../assets/index-icons.png) 48px 48px no-repeat;
  }

  .item .bg.day {
    background-position: 0 0;
  }

  .item .bg.month {
    background-position: -58px 0;
  }

  .item .bg.order {
    background-position: 0 -58px;
  }

  .item .bg.invoice {
    background-position: -116px -58px;
  }

  .item .info {
    float: left;
    margin-top: 5px;
  }

  .item p, .item a {
    display: block;
    font-size: 22px;
  }
</style>
<template>
  <div style="background: #fff;border: 1px solid #E5E5E5;border-top: 0;">
    <h2 class="section-header">账户信息</h2>
    <Row class="p20">
      <Col>
      账户余额：<i class="account_sum" id="account_sum">￥{{accountBalance}}</i>
      <router-link :to="'/finance/pay'">充值</router-link>
      </Col>
    </Row>
    <h2 class="section-header">消费信息</h2>
    <Row class="p20">
      <div class="item">
        <div class="bg day"></div>
        <div class="info">
          <p class="day-consumption">￥<span id="today_spending_amount">{{todaySpendingAmount}}</span></p>
          <span>今日消费金额</span>
        </div>
      </div>
      <div class="item">
        <div class="bg month"></div>
        <div class="info">
          <p class="day-consumption">￥<span id="consumption_this_month">{{consumptionThisMonth}}</span></p>
          <span>本月消费金额</span>
        </div>
      </div>
    </Row>
    <h2 class="section-header">代办事项</h2>
    <Row class="p20">
      <div class="item">
        <div class="bg order"></div>
        <div class="info">
          <router-link :to="''">0</router-link>
          <span>待支付订单</span>
        </div>
      </div>
      <div class="item">
        <div class="bg invoice"></div>
        <div class="info">
          <p class="day-consumption">￥0.00</p>
          <span>待开票金额</span>
        </div>
      </div>
    </Row>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import CountUp from 'countup';
  export default {
    data() {
      return {
        accountBalance: '',
        todaySpendingAmount: '',
        consumptionThisMonth: '',
        numAnim: null,
        todaySpendingNumAnim: null,
        consumptionThisMonthNumAnim: null,
      }
    },
    mounted(){
      this.$emit('setNavInfo', '概览', 'financeIndex', 'finance');
      this.getInfo();
    },
    methods: {
      getInfo() {
        Api.getUserFinanceIndex(null).then(response => {
          if (response.code == 200) {
            this.accountBalance = response.dataMap.accountBalance == 0 ? '0.00' : response.dataMap.accountBalance;
            this.numAnim = new CountUp('account_sum', 0, this.accountBalance);
            this.numAnim.start();
            this.todaySpendingAmount = response.dataMap.todaySpendingAmount == 0 ? '0.00' : response.dataMap.todaySpendingAmount;
            this.todaySpendingNumAnim = new CountUp('today_spending_amount', 0, this.todaySpendingAmount);
            this.todaySpendingNumAnim.start();
            this.consumptionThisMonth = response.dataMap.consumptionThisMonth == 0 ? '0.00' : response.dataMap.consumptionThisMonth;
            this.consumptionThisMonthNumAnim = new CountUp('consumption_this_month', 0, this.consumptionThisMonth);
            this.consumptionThisMonthNumAnim.start();
          }
        });
      },
      pay() {
        this.$router.push({name: 'financePay'});
      }
    }
  }
</script>
