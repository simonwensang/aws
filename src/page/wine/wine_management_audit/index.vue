<template>
<div>
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
            dataTable:[],
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