<style rel="stylesheet/scss" scoped>
  .sum_box{
    padding: 30px 0px 0px 20px;
  }
  .account_sum{
    margin-right: 35px;
    font-size: 20px;
    font-family: Arial;
    font-weight: 700;
    color: #333;
    vertical-align: middle;
    color: red;
  }
  .sum_record{
    font-weight: normal;
    margin-left: 10px;
  }
</style>
<template>
  <div style="padding: 50px 0;background: #fff;">
    <Form :rules="ruleCustom" :model="validateForm" ref="validateForm" :label-width="100">
      <Form-item label="充值金额" prop="amount">
        <Input :maxlength="10" style="width: 300px;" v-model="validateForm.amount" placeholder="金额"></Input>
      </Form-item>
      <Form-item label="密钥" prop="sign">
        <Input :maxlength="40" style="width: 300px;" v-model="validateForm.sign"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="submitForm('validateForm')" :loading="loading">确认充值</Button>
        <Tooltip style="margin-left: 138px;" placement="top-start">
          <Button>密钥提示</Button>
          <div slot="content">
            <p>密钥</p>
            <p>md5(充值金额+{{sign}})</p>
          </div>
        </Tooltip>
      </Form-item>
    </Form>
  </div>
</template>
<script>
  import Util from '../../util/util';
  import Api from '../../store/Api';
  export default {
    data() {
      const validateAmount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入充值金额'));
        }
        if (isNaN(value)) {
          callback(new Error('请输入正确的金额'));
        }
        if (value < 0) {
          callback(new Error('请输入正确的金额'));
        }
        if (value > 10000000) {
          callback(new Error('充值金额不能超过10000000'));
        }
        callback();
      };
      const validateSign = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密钥'));
        }
        callback();
      };
      return {
        loading: false,
        sign: 'MDIE#*%D123',
        validateForm: {
          amount: '',
          sign: '',
        },
        ruleCustom: {
          amount: [
            {validator: validateAmount, trigger: 'blur'}
          ],
          sign: [
            {validator: validateSign, trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      this.$emit('setNavInfo','充值', 'financeIndex', 'finance');
    },
    methods: {
      submitForm(formName) {
        let t = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            t.loading = true;
            // var data = {'accountBalance': t.validateForm.amount, 'sign': Util.md5String(t.validateForm.amount + t.sign)};
            var data = {'accountBalance': t.validateForm.amount, 'sign': t.validateForm.sign};
            Api.userPay(data).then(response => {
              if (response.code == 200) {
                Util.showNotificationBox('success', '充值成功!');
                t.loading = false;
              } else {
                t.loading = false;
              }
            });
          } else {
            Util.showNotificationBox('error', '表单验证失败!');
          }
        });
      }
    }
  }
</script>
