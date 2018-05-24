<style rel="stylesheet/scss" scoped>
  .detail-title{
    border-left: solid 4px #108CEE;
    font-size: 16px;
    height: auto;
    line-height: inherit;
    color: #333333;
    padding: 0;
    display: inline-block;
    zoom: 1;
    border-bottom: none;
    margin: 0;
  }
  .detail-title:before{
    content: '';
    display: inline-block;
    zoom: 1;
    vertical-align: middle;
    width: 4px;
    height: 16px;
    margin-right: 10px;
  }
  .detail-info label{
    width: auto;
    display: inline-block;
    color: #999;
  }
  .price {
    color: #EB5252;
    font-weight: bold;
  }


</style>
<template>
  <div style="background: #fff;" class="p20">
    <h2 class="detail-title">订单信息</h2>
    <Row class="pt20 detail-info">
      <label>订单号：</label><span>{{orderNo}}</span>
    </Row>
    <Row class="pt20 detail-info">
      <label>产品名称：</label><span>{{product}}</span>
    </Row>
    <Row class="pt20 detail-info">
      <label>订单状态：</label><span>{{orderStatusDesc}}</span>
    </Row>
    <Row class="pt20 detail-info">
      <label>订单类型：</label><span>{{transactionTypeDesc}}</span>
    </Row>
    <Row class="pt20 detail-info">
      <label>	订单创建时间：</label><span>{{createTime}}</span>
    </Row>
    <Row class="pt20 detail-info">
      <label>	支付时间：</label><span>{{payTime}}</span>
    </Row>
    <Row class="pt20 detail-info">
      <label>订单金额：</label><span>{{amount}}</span>
    </Row>
    <Row class="pt20 detail-info">
      <label>	现金支付：</label><span class="price">￥{{cashPayment}}</span>
    </Row>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from "../../util/util";
  export default {
    data() {
      return {
        orderNo: '',
        amount:'',
        cashPayment:'',
        createTime:'',
        orderStatusDesc:'',
        payTime:'',
        product:'',
        transactionTypeDesc:'',
      }
    },
    created(){
      this.$emit('setNavInfo', '概览', 'financeOrder', 'finance');
      this.getInfo();
    },
    methods: {
      getInfo() {
        let orderNo = this.$route.params.orderNo;
        if (orderNo == undefined || orderNo == null || orderNo == '') {
          this.$router.push({name: 'financeOrder'});
        }
        this.orderNo = orderNo;
        Api.getOrderDetail(orderNo).then(response => {
          if (response.code == 200) {
            // this.accountBalance = response.dataMap.accountBalance;
            this.amount = response.dataMap.amount;
            this.cashPayment = response.dataMap.cashPayment;
            this.createTime = Util.transformTime(response.dataMap.createTime);
            this.orderStatusDesc = response.dataMap.orderStatusDesc;
            this.payTime = Util.transformTime(response.dataMap.payTime);
            this.product = response.dataMap.product;
            this.transactionTypeDesc = response.dataMap.transactionTypeDesc;
          } else if (response.code == 10004) {
            this.$router.push({name: 'financeOrder'});
          }
        });
      }
    }
  }
</script>
