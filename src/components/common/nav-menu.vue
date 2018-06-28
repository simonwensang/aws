<style>
</style>
<template>
  <div>
    <Menu ref="side_menu" theme="dark" width="auto" @on-select="menuClick" :active-name="activeName"
          :open-names="openNames" accordion>

      <div class="layout-header"></div>
      <MenuItem name="console">
        <Icon type="ios-navigate" :size="14"></Icon>
        <span class="layout-text">酒机后台管理系统</span>
      </MenuItem>
      <Submenu name="domain">
        <template slot="title">
          <Icon type="navicon"></Icon>
          基础数据
        </template>
        <MenuItem name="domainList">商家管理</MenuItem>
        <MenuItem name="domainPrice">酒机管理</MenuItem>
        <MenuItem name="domainInfo">酒品管理</MenuItem>
        <MenuItem name="domainInfo1">会员管理</MenuItem>
        <MenuItem name="domainInfo2">磁卡管理</MenuItem>
      </Submenu>
      <Submenu name="finance">
        <template slot="title">
          <Icon type="ios-paper"></Icon>
          统计记录
        </template>
        <MenuItem name="order">在线订单</MenuItem>
        <MenuItem name="financeAccountDetail">上酒记录</MenuItem>
        <MenuItem name="financeOrder">出酒记录</MenuItem>
        <MenuItem name="financeOrder1">会员充值</MenuItem>
        <MenuItem name="financeOrder2">会员消费</MenuItem>
      </Submenu>
      <!-- <Submenu name="user">
        <template slot="title">
          <Icon type="person"></Icon>
          系统管理
        </template>
         <MenuItem name="userSafe">管理员用户列表</MenuItem>
        <MenuItem name="userMessage">商家管理</MenuItem> 
      </Submenu> -->
      <Submenu name="system">
        <template slot="title">
          <Icon type="person"></Icon>
          系统管理
        </template>
         <MenuItem name="user_list">管理员用户列表</MenuItem>
        <MenuItem name="business_management">商家管理</MenuItem> 
        <MenuItem name="wine_management">酒机管理</MenuItem> 
      </Submenu>
    </Menu>
  </div>

</template>
<script>
  import Api from "../../store/Api";
  import Util from '../../util/util';
  export default {
    components: {},
    data() {
      return {
        activeName: null,
        openNames: [],
      }
    },
    methods: {
      menuClick(name) {
        if(name == 'user_list'){
          this.$router.push({name: name, query: { type: 1 }});
        }else if(name == 'business_management'){
          this.$router.push({name: 'user_list', query: { type: 2 }});
        }else{
          this.$router.push({name: name});
        }
      },
      setNavInfo(title, activeName, openNames) {
        if (openNames != undefined && openNames != '') {
          this.openNames.push(openNames);
        } else {
          this.openNames = [];
        }
        if (activeName != undefined && activeName != '') {
          this.activeName = activeName;
        } else {
          this.activeName = null;
        }
        if (title != undefined && title != '') {
          this.title = title;
        }


        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      },
    }
  }
</script>
