<template>
<div>
    <Modal
            v-model="modal1"
            title="请填写酒机信息"
            @on-ok="ok('validateForm')"
            >
             <Form  ref="validateForm" :model="formData" :label-width="150" style="padding-top: 30px;">
                <FormItem label="formUserName" prop="account">
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
  <Table border :columns="columnsList" :data="dataTable"></Table>
  <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page>
</div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
  import Notice from 'iview/src/components/notice';
    import Store from "../../../store/index";
  export default{
    data(){
        return{
            columnsList:[{
                        title:'酒机名称',
                        key: 'machineName'
                    },
                    {
                        title: '酒机码',
                        key: 'machineCode'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '是否营业',
                        key: 'isLockedSale'
                    },
                    {
                        title: '绑定状态',
                        key: 'bindStatus'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 260,
                        align: 'center',
                        render: (h, params) => {
                            let renderList = [];
                            renderList.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.toDeatil(params.index)
                                        }
                                    }
                                }, '查看'));
                             renderList.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.lockMachine(params.index,1)
                                        }
                                    }
                                }, '审核通过'));
                                renderList.push(h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.lockMachine(params.index,2)
                                        }
                                    }
                                }, '审核不通过'));
                            return h('div', renderList);
                        }
                    }],
                formData: {
                    mobile: '',
                    account: '',
                    password: '',
                    checkPwd: '',
                },
            dataTable:[],
            modal1: false,
            totalRecords:0,
            pageNo:1,
            pageSize:10,
        }
    },
    created(){
        //查询酒机列表
        this.queryAuditMachine();
        Store.commit('changeTitle','待审核酒机列表')
    },
    methods:{
        toDeatil(index){
            let machineId = this.dataTable[index].id;
            this.$router.push({name: 'wine_detail', query: { machineId: machineId}});
        },
        show (index) {
                // console.log(index)
                this.modal1 = true;
                // this.isEdit = true;
                // this.id = this.data6[index].id
            },
        ok (formName) {
                let t = this;
                console.log('formName==',formName)
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    t.loading = true;
                    let userData = Object.assign({},t.formData,{'type':2});
                        // 新增
                        
                        Api.createUserServer(userData).then(response => {
                        if (response.code == 200) {
                            Util.showNotificationBox('success', '创建成功!');
                            t.loading = false;
                            //查询用户列表
                            t.queryBrand();
                            
                        }
                        });
                   
                     this.isEdit = false;
                     this.isCreat = false;
                    
                } else {
                    Util.showNotificationBox('error', '表单验证失败!');
                    return false;
                }
                });
            },
        lockMachine(index,opt){
            console.log('66666')
            let lockMachineData = {
                'id':this.dataTable[index].id,
                'audit':opt,
                'pipeCount':this.dataTable[index].pipeCount
            }
            Api.machineAudit(lockMachineData).then((data) => {
                if(data.code == '200'){
                    Notice.success({
                     title: '操作成功'
                    });
                    this.queryAuditMachine()
                }
               
            })
        },
        bindMachine(index,opt){
            let lockMachineData = {
                'id':this.dataTable[index].id,
                'opt':opt
            }
            Api.bindMachine(lockMachineData).then((data) => {
                 Notice.success({
                     title: '操作成功'
               });
               this.queryAuditMachine()
            })
        },
        changePage(current){
                console.log('changePage',current);
                this.pageNo = current;
                this.queryAuditMachine()
            },
        queryAuditMachine(){
            let queryAuditMachineData = {
                'pageNo':this.pageNo,
                'pageSize':this.pageSize
            };
            Api.queryAuditMachine(queryAuditMachineData).then((data) => {
                !!data.dataMap.records && data.dataMap.records.forEach(function(element) {
                                    element.createTime = Util.transformTime(element.createTime);
                                    // element.updateTime = Util.transformTime(element.updateTime);
                                    console.log(element.isLockedSale)
                                if(element.isLockedSale == 0){
                                    element.isLockedSale = '售卖'
                                }else if(element.isLockedSale == 1){
                                    element.isLockedSale = '停业'
                                };
                                 if(element.bindStatus == 0){
                                    element.bindStatus = '未绑定'
                                }else if(element.bindStatus == 1){
                                    element.bindStatus = '申请绑定'
                                }else if(element.bindStatus == 2){
                                    element.bindStatus = '已绑定'
                                };
                                if(element.status == 0){
                                    element.isLockedSale = '售卖'
                                }else if(element.status == 1){
                                    element.isLockedSale = '停业'
                                };
                                }, this);

                                
                this.dataTable = data.dataMap.records;
                this.pageNo = !!data.dataMap.pageNo ? data.dataMap.pageNo : 1;
                this.totalRecords = data.dataMap.totalRecords;
            })
        }
    }
  }
  </script>