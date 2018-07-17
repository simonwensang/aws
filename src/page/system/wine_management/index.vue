<template>
<div>
  <Table border :columns="columnsList" :data="dataTable"></Table>
  <Page :total="totalRecords" show-total :current="pageNo" @on-change='changePage'></Page>
</div>
</template>
<script>
  import Api from "../../../store/Api";
  import Util from '../../../util/util';
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
                        title: '安卓id',
                        key: 'androidId'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
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
                                            this.lockMachine(params.index,0)
                                        }
                                    }
                                }, '营业'),
                                h('Button', {
                                    props: {
                                        type: 'error',
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
                                }, '停业'),
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
                                            this.bindMachine(params.index,1)
                                        }
                                    }
                                }, ' 绑定商家'),
                                 h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.bindMachine(params.index,2)
                                        }
                                    }
                                }, ' 解绑商家')
                            ]);
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
         Store.commit('changeTitle','酒机列表')
    },
    methods:{
        lockMachine(index,opt){
            let lockMachineData = {
                'id':this.data[index].id,
                'opt':opt
            }
            Api.lockMachine(lockMachineData).then((data) => {
            console.log(data)
            })
        },
        bindMachine(index,opt){
            let lockMachineData = {
                'id':this.data[index].id,
                'opt':opt
            }
            Api.bindMachine(lockMachineData).then((data) => {

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
                                }, this);
                this.dataTable = data.dataMap.records;
                this.pageNo = !!data.dataMap.pageNo ? data.dataMap.pageNo : 1;
                this.totalRecords = data.dataMap.totalRecords;
            })
        }
    }
  }
  </script>
