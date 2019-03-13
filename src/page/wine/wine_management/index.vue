<template>
    <div>
        <Modal v-model="showModal" title="请选择要绑定的商家" @on-ok="ok" @on-cancel="cancel">
            <Select v-model="model1" style="width:200px">
                <Option v-for="items in SellerList" :value="items.id" :key="items.id">{{items.account}}</Option>
            </Select>
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
export default {
    data() {
        return {
            columnsList: [{
                title: '酒机名称',
                key: 'machineName'
            },
            {
                title: '酒机码',
                key: 'machineCode'
            },
            {
                title: '酒机类型',
                key: 'type'
            },
    
            {
                title: '绑定商家',
                key: 'sellerName'
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
                title: '离线状态',
                key: 'isOffLine'
            },
            {
                title: '操作',
                key: 'action',
                width: 230,
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
                    params.row.isLockedSale == '停业' ? renderList.push(h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.lockMachine(params.index, 0)
                            }
                        }
                    }, '营业')) : renderList.push(h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.lockMachine(params.index, 1)
                            }
                        }
                    }, '停业'));
                    params.row.bindStatus == '已绑定' ? renderList.push(h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.bindMachine(params.index, 2)
                            }
                        }
                    }, ' 解绑商家')) : (params.row.bindStatus == '申请绑定' ? renderList.push(h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.bindMachine(params.index, 1)
                            }
                        }
                    }, ' 绑定通过')) : renderList.push(h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.bindMachine(params.index, 3)
                            }
                        }
                    }, ' 指定绑定商家')));


                    return h('div', renderList);

                }
            }],
            dataTable: [],
            totalRecords: 0,
            pageNo: 1,
            pageSize: 10,
            showModal: false,
            SellerList: [],
            model1: 0,
            clickIndex: 0,
            clickOpt: 0
        }
    },
    created() {
        //查询酒机列表
        this.queryAuditMachine();
        Store.commit('changeTitle', '酒机列表')
    },
    methods: {
        toDeatil(index) {
            let machineId = this.dataTable[index].id;
            this.$router.push({ name: 'wine_detail', query: { machineId: machineId, opt: 1 } });
        },
        ok() {
            if (!!this.model1) {
                console.log(this.model1)
                this.showModal = false;
                this.bindMachine(this.clickIndex, this.clickOpt, true)
            } else {
                Notice.warning({
                    title: '请选择绑定商家'
                });
            }
        },
        cancel() {
            this.showModal = false;
        },
        lockMachine(index, opt) {
            console.log('66666')
            let lockMachineData = {
                'id': this.dataTable[index].id,
                'opt': opt
            }
            Api.lockMachine(lockMachineData).then((data) => {
                Notice.success({
                    title: '操作成功'
                });
                this.queryAuditMachine()
            })
        },
        bindMachine(index, opt, hasSeller) {
            let lockMachineData = {
                'id': this.dataTable[index].id,
                'opt': opt,
                'sellerId': !!this.dataTable[index].sellerId ? this.dataTable[index].sellerId : this.model1
            };

            this.clickIndex = index;
            this.clickOpt = opt;

            if (opt === 3 && !hasSeller) {
                this.showModal = true;
                Api.querySeller({
                    'pageNo': 1,
                    'pageSize': 10000,
                }).then((data) => {
                    this.SellerList = data.dataMap.records
                })
                return false
            }
            Api.bindMachine(lockMachineData).then((data) => {
                if (data.code == '200') {
                    Notice.success({
                        title: '操作成功'
                    });
                    this.model1 = 0;
                    this.queryAuditMachine()
                }

            })
        },
        changePage(current) {
            console.log('changePage', current);
            this.pageNo = current;
            this.queryAuditMachine()
        },
        queryAuditMachine() {
            let queryAuditMachineData = {
                'pageNo': this.pageNo,
                'pageSize': this.pageSize
            };
            Api.queryMachine(queryAuditMachineData).then((data) => {
                !!data.dataMap.records && data.dataMap.records.forEach(function(element) {
                    element.createTime = Util.transformTime(element.createTime);
                    // element.updateTime = Util.transformTime(element.updateTime);
                    console.log(element.isLockedSale)
                    if (element.isLockedSale == 0) {
                        element.isLockedSale = '售卖'
                    } else if (element.isLockedSale == 1) {
                        element.isLockedSale = '停业'
                    };

                    if (element.bindStatus == 0) {
                        element.bindStatus = '未绑定'
                    } else if (element.bindStatus == 1) {
                        element.bindStatus = '申请绑定'
                    } else if (element.bindStatus == 2) {
                        element.bindStatus = '已绑定'
                    };

                    if (element.isOffLine == 0) {
                        element.isOffLine = '在线'
                    } else if (element.isOffLine == 1) {
                        element.isOffLine = '离线'
                    }

                    if (element.type == 1) {
                        element.type = '大型机'
                    } else if (element.type == 2) {
                        element.type = '小型机'
                    }

                }, this);
                this.dataTable = data.dataMap.records;
                this.pageNo = !!data.dataMap.pageNo ? data.dataMap.pageNo : 1;
                this.totalRecords = data.dataMap.totalRecords;
            })
        }
    }
}
</script>
