<style rel="stylesheet/scss" scoped>

</style>
<template>
  <div style="background: #fff;" class="pl20 pr20">
    <h4 class="mb20" style="padding-top: 50px;">安全保护问题将作为重要的身份验证方式，请认真设置！</h4>
    <Form ref="validateForm" :model="formData" :label-width="100" style="padding-top: 30px;padding-bottom: 60px;">
      <FormItem label="问题一" :prop="'pushList.0.problemId'"
                :rules="{required: true, message: '请选择问题', trigger: 'change'}">
        <Select v-model="formData.pushList[0].problemId" style="width:300px;">
          <Option value="" key="">全部</Option>
          <Option v-for="item in problemList" :value="item.id + ''" :key="item.id">{{item.problem}}</Option>
        </Select>
      </FormItem>
      <FormItem label="答案" :prop="'pushList.0.answer'" :rules="{required: true, message: '请填写答案', trigger: 'blur'}">
        <Input v-model="formData.pushList[0].answer" style="width:300px;" :maxlength="50"></Input>
      </FormItem>
      <FormItem label="问题二" :prop="'pushList.1.problemId'"
                :rules="{required: true, message: '请选择问题', trigger: 'change'}">
        <Select v-model="formData.pushList[1].problemId" style="width:300px;">
          <Option value="" key="">全部</Option>
          <Option v-for="item in problemList" :value="item.id + ''" :key="item.id">{{item.problem}}</Option>
        </Select>
      </FormItem>
      <FormItem label="答案" :prop="'pushList.1.answer'" :rules="{required: true, message: '请填写答案', trigger: 'blur'}">
        <Input v-model="formData.pushList[1].answer" style="width:300px;" :maxlength="50"></Input>
      </FormItem>
      <FormItem label="问题三" :prop="'pushList.2.problemId'"
                :rules="{required: true, message: '请选择问题', trigger: 'change'}">
        <Select v-model="formData.pushList[2].problemId" style="width:300px;">
          <Option value="" key="">全部</Option>
          <Option v-for="item in problemList" :value="item.id + ''" :key="item.id">{{item.problem}}</Option>
        </Select>
      </FormItem>
      <FormItem label="答案" :prop="'pushList.2.answer'" :rules="{required: true, message: '请填写答案', trigger: 'blur'}">
        <Input v-model="formData.pushList[2].answer" style="width:300px;" :maxlength="50"></Input>
      </FormItem>


      <FormItem class="pt10">
        <Button type="primary" @click="submitForm('validateForm')" style="width: 150px;height: 40px;"
                :loading="loading">确定
        </Button>
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
        safetyProblemFlag: false,
        problemList: [],
        formData: {
          pushList: [
            {problemId: '', answer: ''},
            {problemId: '', answer: ''},
            {problemId: '', answer: ''}
          ]
        }
      }
    },
    created(){
      this.$emit('setNavInfo', '设置安全问题', 'userSafe', 'user');
      this.getInfo();
    },
    methods: {
      getInfo() {
        let t = this;
        Api.getSafetyProblemList().then(response => {
          if (response.code == 200) {
            t.problemList = response.dataMap;
          }
        });

        t.safetyProblemFlag = window.JSON.parse(sessionStorage.getItem("auto-wine_cloud_user")).safetyProblemFlag;
        if (t.safetyProblemFlag) {
          // 修改
          Api.getUserSafetyProblemList().then(response => {
            if (response.code == 200) {
              t.formData.pushList = [];
              for (let i = 0; i < response.dataMap.length; i++) {
                t.formData.pushList.push({
                  id: response.dataMap[i].id,
                  problemId: response.dataMap[i].problemId + '',
                  answer: response.dataMap[i].answer
                });
              }
            }
          });
        }
      },
      submitForm(formName) {
        let t = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            t.loading = true;
            if (t.safetyProblemFlag) {
              // 修改
              Api.updateUserSafetyProblems(t.formData.pushList).then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '修改成功!');
                  this.$router.push({name: 'userSafe'});
                  t.loading = false;
                } else {
                  t.loading = false;
                }
              });
            } else {
              // 新增
              Api.createUserSafetyProblems(t.formData.pushList).then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '设置成功!');
                  this.$router.push({name: 'userSafe'});
                } else {
                  t.loading = false;
                }
              });
            }
          } else {
            Util.showNotificationBox('error', '表单验证失败!');
          }
        });
      }
    }
  }
</script>
