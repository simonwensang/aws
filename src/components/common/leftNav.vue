<template>
  <div id="leftNav" class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
      <Menu ref="side_menu" theme="dark" width="auto" @on-select="menuClick" :active-name="activeName" :open-names="openNames" accordion>

        <div class="layout-header">
          <Button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <MenuItem name="console">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <span class="layout-text">酒机后台管理系统</span>
        </MenuItem>
        <Submenu name="1">
          <template slot="title">
            <Icon type="person"></Icon>
            用户管理
          </template>
          <MenuItem name="1-1">文章管理</MenuItem>
          <MenuItem name="1-2">评论管理</MenuItem>
          <MenuItem name="1-3">举报管理</MenuItem>
        </Submenu>
        <Submenu name="finance">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            财务中心
          </template>
          <MenuItem name="financeIndex">概览</MenuItem>
          <MenuItem name="accountDetail">收支明细</MenuItem>
          <MenuItem name="2-3">订单管理</MenuItem>
          <MenuItem name="2-4">发票管理</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            用户管理
          </template>
          <MenuItem name="3-1">文章管理</MenuItem>
          <MenuItem name="3-2">评论管理</MenuItem>
          <MenuItem name="3-3">举报管理</MenuItem>
        </Submenu>
      </Menu>
      </Col>
      <Col :span="spanRight">
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>{{title}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view v-on:setNavInfo="setNavInfo"></router-view>
        </div>
      </div>
      <div class="layout-copy">
        2017 &copy; auto-wine
      </div>
      </Col>


    </Row>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from '../../util/util';
  export default {
    data() {
      return {
        data: null,
        activeName: null,
        openNames: [],
        title: '酒机后台管理系统',
        spanLeft: 4,
        spanRight: 19
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 4 ? 14 : 24;
      }
    },
    created(){
      // this.getMenuList();
      // this.getUserInfo();
    },
    methods: {
      setNavInfo(title, activeName, openNames) {
        if(openNames != undefined && openNames != '') {
          this.openNames.push(openNames);
        } else {
          this.openNames = [];
        }
        if(activeName != undefined && activeName != '') {
          this.activeName = activeName;
        } else {
          this.activeName = null;
        }
        if(title != undefined && title != '') {
          this.title = title;
        }


        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      },
      menuClick(name) {
        this.$router.push({ name: name});
      },
      toggleClick () {
        if (this.spanLeft === 4) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
        }
      },
      getMenuList() {
        let t = this;
        this.$get('menu/nav', null).then(response => {
          if (response.code == 200) {
            t.data = response.dataMap.records;
          }
        });
      },
      getUserInfo() {
        Api.getUserInfo(null).then(response => {
          if (response.code == 200) {
            Util.setUser(response.dataMap);
          }
        });
      }
    }
  }
</script>
<style>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 300px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .layout-header {
    height: 40px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    text-align: center;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }
</style>
