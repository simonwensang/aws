<style rel="stylesheet/scss" scoped>

</style>
<template>
  <div style="background: #fff;" class="pl20 pr20">
    <h4 class="mb20" style="padding-top: 50px;">我们不会泄漏您的邮箱</h4>
    <Form ref="validateForm" :model="formData" :label-width="100" style="padding-top: 30px;padding-bottom: 60px;">
      <FormItem label="邮箱：" prop="userMail"
                :rules="{required: true, message: '请输入邮箱', trigger: 'blur'}">
        <Input v-model="formData.userMail" style="width:300px;" :maxlength="50"></Input>
      </FormItem>
      <FormItem label="校验码：" prop="checkCode"
                :rules="{required: true, message: '请输入校验码', trigger: 'blur'}">
        <Input v-model="formData.checkCode" style="width:200px;" :maxlength="6"></Input>
        <span v-if="flag" class="ml20">剩余{{codeSecond}}秒</span>
        <a v-else @click="getCheckCode" href="javascript:;" class="ml20">获取校验码</a>
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
          userMail: '',
        }
      }
    },
    created(){
      this.$emit('setNavInfo', '设置邮箱', 'userSafe', 'user');
    },
    methods: {
      getCheckCode() {
        let t = this;
        Api.getMailCheckCode().then(response => {
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
              Api.userUpdateMail(t.formData).then(response => {
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
