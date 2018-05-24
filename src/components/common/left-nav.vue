<style rel="stylesheet/css">
  .layout {
    position: relative;
  }

  .layout-breadcrumb {
    padding: 10px 15px 7px 10px;
    overflow: hidden;
    background-color: #fff;
  }

  .layout-content {
    /*min-width: 1100px;*/
    min-height: 300px;
    margin: 10px 15px 15px;
    overflow: hidden;
    border-radius: 4px;
    clear: both;
  }

  .layout-content-main {

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

  .layout-left-all {
    width: 200px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background: #464c5b;
    z-index: 9;
  }
</style>
<template>
  <div id="leftNav" class="layout">
    <Row type="flex">
      <Col style="width: 200px;" class="layout-menu-left">
      <div class="layout-left-all">
        <nav-menu ref="navMenuObj"></nav-menu>
      </div>
      </Col>
      <Col :span="spanRight" style="width: calc(100% - 200px);">
      <div class="layout-breadcrumb">
        <Breadcrumb class="fl">
          <BreadcrumbItem>{{title}}</BreadcrumbItem>
        </Breadcrumb>
        <div style="position: absolute;right: 10px;top: 8px;">
          <div class="fl mr20">
            <message-tip :value="mesCount"></message-tip>
          </div>
          <div class="fl">
            <Dropdown class="mr10" transfer trigger="click" @on-click="handleClickUserDropdown">
              <a href="javascript:void(0)">
                <span class="main-user-name">{{ userNickName }}</span>
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="userCenter">个人中心</DropdownItem>
                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <!--<router-link class="mr5" :to="''">{{userNickName}}</router-link>-->
            <Avatar style="background-color: #0089f0" icon="person" size="small"/>
          </div>
        </div>
      </div>

      <div class="layout-content">
        <div class="layout-content-main">
          <!--<keep-alive>
            <router-view v-on:setNavInfo="setNavInfo"></router-view>
          </keep-alive>-->
          <router-view v-on:setNavInfo="setNavInfo"></router-view>
        </div>
      </div>
      <div class="layout-copy">
        2017 &copy; auto-wine 自动贩售
      </div>
      </Col>


    </Row>
  </div>
</template>
<script>
  import Api from "../../store/Api";
  import Util from '../../util/util';
  import navMenu from './nav-menu.vue';
  import messageTip from '../console/message-tip.vue';
  export default {
    components: {
      navMenu,
      messageTip,
    },
    data() {
      return {
        userNickName: '',
        mesCount: 2,
        data: null,
        activeName: null,
        openNames: [],
        title: '管理控制台',
        spanLeft: 4,
        spanRight: 19
      }
    },
    created(){
      // this.getMenuList();
      this.getUserInfo();
    },
    methods: {
      setNavInfo(title, activeName, openNames) {
        this.$refs.navMenuObj.setNavInfo(title, activeName, openNames);
      },
      menuClick(name) {
        this.$router.push({name: name});
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
        let t = this;
        let user = Util.getUser();
        this.userNickName = user != null ? user.userNickName : '';
        let data = {pageSize: 1000000, isRead: false};
        Api.queryUserMessage(data).then(response => {
          t.mesCount = response.dataMap.totalRecords;
        });
      },
      handleClickUserDropdown(name) {
        if (name === 'userCenter') {
          this.$router.push({name: 'userSafe'});
        } else if (name === 'loginout') {
          // 退出登录
          this.$Modal.confirm({
            title: '确认',
            content: '<p>确定要退出登录吗？</p>',
            onOk: () => {
              Api.loginout().then(response => {
                if (response.code == 200) {
                  Util.showNotificationBox('success', '退出成功!');
                  this.$router.push({name: 'login'});
                }
              });
            }
          });

        }
      }
    }
  }
</script>
