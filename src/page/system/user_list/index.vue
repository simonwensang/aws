<template>
    <div>
        <Button type="primary" @click="creatUser">{{userType == 1 ? '新增用户' : '新增商家'}}</Button>
        <Modal
            v-model="modal1"
            :title="formTitle"
            @on-ok="ok('validateForm')"
            @on-cancel="cancel">
            <Form :rules="ruleCustom" ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem :label="formUserName" prop="account">
                    <Input v-model="formData.account" style="width:300px;" :maxlength="20"></Input>
                </FormItem>
                <FormItem label="手机号码：" prop="mobile">
                    <Input v-model="formData.mobile" style="width:300px;" :maxlength="11"></Input>
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
        <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page>
    </div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
    export default {
        data () {
            const validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码！'));
        } else {
          if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确格式的手机号码！'));
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
                 formData: {
                    mobile: '',
                    account: '',
                    password: '',
                    checkPwd: '',
                },
                ruleCustom: {
                mobile: [
                    { validator: validateMobile, trigger: 'blur' }
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
                columns7: [],
                data6: [],
                isCreat:false,
                isEdit:false,
                id:0,
                totalRecords:0,
                pageNo:1,
                pageSize:10,
                userType:1,
                formTitle:'请填写用户信息',
                formUserName:'用户名'
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
                    let userData = Object.assign({},t.formData,{'type':this.userType});
                    if(t.isCreat){
                        // 新增
                        Api.createUserServer(userData).then(response => {
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
                         Object.assign(userData,{'id':t.id});
                         console.log('updateUserServer',userData)
                        Api.updateUserServer(userData).then(response => {
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
                'pageSize':this.pageSize,
                'type':this.userType
            }
            Api.queryUserServer(queryUserData).then(response => {
               if (response.code == 200) {
                        this.loading = false;
                        if(response.dataMap.records.length > 0){
                            response.dataMap.records.forEach(function(element) {
                                if(element.type == 1){
                                    element.type = '管理员'
                                }else if(element.type == 2){
                                    element.type = '加盟商家'
                                }else if(element.type == 3){
                                   element.type = '供应商'
                                };
                                if(element.status == 0){
                                    element.status = '待审核'
                                }else if(element.status == 1){
                                    element.status = '启用'
                                }else if(element.status == 2){
                                   element.status = '禁止'
                                };
                            }, this);
                        }
                        this.data6 = response.dataMap.records;
                         this.pageNo = response.dataMap.pageNo;
                         this.totalRecords = response.dataMap.totalRecords;
                    }
                });
            },
            changePage(current){
                console.log('changePage',current);
                this.pageNo = current;
                this.queryUserServer()
            },
            chengeType(data){
                this.formTitle = data == 1 ? '请填写用户信息' : '请填写商家信息';
                this.formUserName = data == 1 ? '用户名' : '商家名称';

                this.columns7 = data == 1 ? [
                    {
                        title:'用户名',
                        key: 'account',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.account)
                            ]);
                        }
                    },
                    {
                        title: '用户类型',
                        key: 'type'
                    },
                    {
                        title: '用户状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
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
                ] : [
                    {
                        title:'商家名',
                        key: 'account',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.account)
                            ]);
                        }
                    },
                    {
                        title: '商家类型',
                        key: 'type'
                    },
                    {
                        title: '商家状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
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
                ]

            }
        },
        created(){
            //查询用户列表
           this.queryUserServer();
           //表头切换
           this.chengeType(this.$route.query.type);
        },
        watch:{
        },
        beforeRouteUpdate (to, from, next) {
         //获取用户type
           this.userType = to.query.type;
           this.queryUserServer();
           //表头切换
           this.chengeType(this.userType);
           console.log(this.userType);
           next()
        }
    }
</script>
