<template>
    <div>
        <Button type="primary" @click="creatUser">新增用户</Button>
        <Modal
            v-model="modal1"
            title="请填写用户信息"
            @on-ok="ok('validateForm')"
            @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem label="昵称：" prop="name">
                    <Input v-model="formData.name" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="用户名：" prop="account">
                    <Input v-model="formData.account" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input v-model="formData.password" type="password" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="确认密码：" prop="checkPwd">
                    <Input v-model="formData.checkPwd" type="password" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Table border :columns="columns7" :data="data6"></Table>
    </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
    export default {
        data () {
            const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入昵称！'));
        } else {
          if (value.length > 16) {
            callback(new Error('昵称不能大于16个字符！'));
          }
          callback();
        }
      };
      const validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名！'));
        } else {
          if (value.length < 6) {
            callback(new Error('用户名不能少于6位！'));
          }
          if (value.length > 16) {
            callback(new Error('用户名不能大于16位！'));
          }
          callback();
        }
      };
      const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码！'));
        } else {
          if (value.length < 6) {
            callback(new Error('密码不能少于6位！'));
          }
          if (value.length > 16) {
            callback(new Error('密码不能大于6位！'));
          }
          callback();
        }
      };
      const validateCheckPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认密码'));
        } else {
          if (value != this.formData.password) {
              console.log(this.formData.password)
            callback(new Error('两次输入的密码不一致！'));
          }
          callback();
        }
      };
            return {
                pageNo:1,
                pageSize:10,
                 formData: {
                    name: '',
                    account: '',
                    password: '',
                    checkPwd: '',
                },
                ruleCustom: {
                userNickPwd: [
                    { validator: validateName, trigger: 'blur' }
                ],
                account: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePwd, trigger: 'blur' }
                ],
                checkPwd: [
                    { validator: validateCheckPwd, trigger: 'blur' }
                ]
                },
                modal1: false,
                columns7: [
                    {
                        title: '用户名',
                        key: 'account',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [],
                isCreat:false,
                isEdit:false,
                id:0
            }
        },
        methods: {
            show (index) {
                console.log(index)
                this.modal1 = true;
                this.isEdit = true;
                this.id = this.data6[index].id
            },
            remove (index) {
                // 删除
                let deleteUserServerData = {'id':this.data6[index].id}
                 Api.deleteUserServer(deleteUserServerData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '删除成功!');
                            this.loading = false;
                            //查询用户列表
                            this.queryUserServer();
                            // this.data6.splice(index, 1);
                        }
                        });
            },
            ok (formName) {
                let t = this;
                console.log('formName==',formName)
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    t.loading = true;
                    if(t.isCreat){
                        // 新增
                        Api.createUserServer(t.formData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '创建成功!');
                            t.loading = false;
                            //查询用户列表
                            t.queryUserServer();
                            this.isCreat = false;
                        }
                        });
                    }else if (t.isEdit){
                        // 编辑
                         Object.assign(t.formData,{'id':t.id});
                         console.log('updateUserServer',t.formData)
                        Api.updateUserServer(t.formData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '编辑成功!');
                            t.loading = false;
                            //查询用户列表
                            t.queryUserServer();
                            this.isEdit = false;
                        }
                        });
                    }
                    
                } else {
                    Util.showNotificationBox('error', '表单验证失败!');
                    return false;
                }
                });
            },
            cancel () {
                this.isCreat = false;
                this.isCreat = false;
            },
            creatUser(){
                this.modal1 = true;
                this.isCreat = true;
            },
            queryUserServer(){
                //查询用户列表
            let queryUserData = {
                'pageNo':this.pageNo,
                'pageSize':this.pageSize
            }
            Api.queryUserServer(queryUserData).then(response => {
               if (response.code == 200) {
                        this.loading = false;
                        this.data6 = response.dataMap.records
                    }
                });
            }
        },
        created(){
            //查询用户列表
           this.queryUserServer()
        }
    }
</script>
