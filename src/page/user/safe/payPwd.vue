<style rel="stylesheet/scss" scoped>

</style>
<template>
  <div style="background: #fff;" class="pl20 pr20">
    <h4 class="mb20" style="padding-top: 50px;">我们不会泄漏您的支付密码</h4>
    <Form ref="validateForm" :model="formData" :label-width="100" style="padding-top: 30px;padding-bottom: 60px;">
      <FormItem label="手机号码：" prop="userPhone"
                :rules="{required: true, message: '请输入手机号', trigger: 'blur'}">
        <Input v-model="formData.userPhone" style="width:300px;" :maxlength="50"></Input>
      </FormItem>
      <FormItem label="校验码：" prop="checkCode"
                :rules="{required: true, message: '请输入校验码', trigger: 'blur'}">
        <Input v-model="formData.checkCode" style="width:200px;" :maxlength="6"></Input>
        <span v-if="flag" class="ml20">剩余{{codeSecond}}秒</span>
        <a v-else @click="getCheckCode" href="javascript:;" class="ml20">获取校验码</a>
      </FormItem>
      <FormItem label="支付密码：" prop="payPwd"
                :rules="{required: true, message: '请输入支付密码', trigger: 'blur'}">
        <Input v-model="formData.payPwd" style="width:300px;" :maxlength="6"></Input>
      </FormItem>
      <FormItem class="pt10">
        <Button type="primary" @click="submitForm('validateForm')" style="width: 150px;height: 40px;" :loading="loading">确定</Button>
        <router-link :to="'/user/safe'" class="ml20">返回安全设置</router-link>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
  export default {
    data() {
      return {
        loading: false,
        codeSecond: 60,
        flag: false,
        inter: null,
        formData: {
          checkCode: '',
          userPhone: '',
          payPwd: '',
        }
      }
    },
    created(){
      this.$emit('setNavInfo', '设置手机号', 'userSafe', 'user');
    },
    methods: {
      getCheckCode() {
        let t = this;
        Api.getPhoneCheckCode().then(response => {
          if (response.code == 200) {
            this.flag = true;
            this.inter = setInterval(t.setCodeSecond,1000);
          }
        });
      },
      setCodeSecond() {
        if (this.codeSecond <= 1) {
          this.flag = false;
          this.codeSecond = 61;
          window.clearInterval(this.inter);
        }
        this.codeSecond = this.codeSecond - 1;
      },
      submitForm(formName) {
        let t = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            t.loading = true;
              // 新增
              Api.userUpdatePayPwd(t.formData).then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '设置成功!');
                  this.$router.push({name: 'userSafe'});
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
