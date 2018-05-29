<style rel="stylesheet/scss" scoped>
  .login-bg{
    background-image: url('../../assets/login.jpg');
    background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ivu-card-change{
    height: 260px;
    width: 600px;
  }
  .btn-change{
    width: 100px;
    border-radius: 5px;
  }
  .form-login-chenge{
    margin-left: 100px;
  }
</style>

<template>
  <div class="login-bg">
    <div v-title>登录</div>
    <Card class="ivu-card-change">
    <Form :rules="ruleCustom" :model="validateForm" ref="validateForm" :label-width="150" style="padding-top: 30px;">
      <Form-item label="用户名" prop="account">
        <Input v-model="validateForm.account" placeholder="用户名" style="width:300px;" :maxlength="20"></Input>
      </Form-item>
      <Form-item label="密码" prop="password">
        <Input type="password" v-model="validateForm.password" placeholder="密码" style="width:300px;" :maxlength="20"></Input>
      </Form-item>
      <Form-item class="form-login-chenge">
        <Button type="primary" @click="submitForm('validateForm')" :loading="loading" class="btn-change">登录</Button>
        <!-- <router-link :to="'/reg'" class="ml20">注册</router-link> -->
      </Form-item>
    </Form>
    </Card>
  </div>
</template>
<script>
  import Util from '../../util/util';
  import Api from '../../store/Api';
  export default {
    data() {
      const validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        if (value.length > 32) {
          callback(new Error('用户名长度不能超过32位'));
        }
        callback();
      };
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        if (value.length > 32) {
          callback(new Error('密码长度不能超过32位'));
        }
        callback();
      };
      return {
        loading: false,
        validateForm: {
          account: '',
          password: '',
        },
        ruleCustom: {
          account: [
            {validator: validateAccount, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let t = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            t.loading = true;

            Api.login(t.validateForm).then(response => {
              if (response.code == 200) {
                Util.showNotificationBox('success', '登录成功!');
                Util.setUser(response.dataMap);
                this.$router.push({name: 'console'});
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
<style>

</style>
