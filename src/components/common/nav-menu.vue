<style>
</style>
<template>
  <div>
    <Menu ref="side_menu" theme="dark" width="auto" @on-select="menuClick" :active-name="activeName"
          :open-names="openNames" accordion>

      <div class="layout-header"></div>
      <MenuItem name="console">
        <Icon type="ios-navigate" :size="14"></Icon>
        <span class="layout-text">管理控制台</span>
      </MenuItem>
      <Submenu name="domain">
        <template slot="title">
          <Icon type="navicon"></Icon>
          域名管理
        </template>
        <MenuItem name="domainList">域名列表</MenuItem>
        <MenuItem name="domainPrice">域名价格</MenuItem>
        <MenuItem name="domainInfo">域名信息管理</MenuItem>
      </Submenu>
      <Submenu name="finance">
        <template slot="title">
          <Icon type="ios-paper"></Icon>
          财务中心
        </template>
        <MenuItem name="financeIndex">概览</MenuItem>
        <MenuItem name="financeAccountDetail">收支明细</MenuItem>
        <MenuItem name="financeOrder">订单管理</MenuItem>
        <!--<MenuItem name="2-4">发票管理</MenuItem>-->
      </Submenu>
      <Submenu name="user">
        <template slot="title">
          <Icon type="person"></Icon>
          用户管理
        </template>
        <MenuItem name="userSafe">安全设置</MenuItem>
        <MenuItem name="userMessage">消息管理</MenuItem>
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
        this.$router.push({name: name});
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
