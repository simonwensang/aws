import leftNav from '@/components/common/left-nav.vue';

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  //地址为空时跳转login页面
  redirect: '/login',
  component: leftNav,
  children: [
    {
      path: 'console', name: 'console', component: resolve => {
      require(['@/page/common/console.vue'], resolve)
    }
    },
    {
      path: 'system/user_list', name: 'user_list', component: resolve => {
      require(['@/page/system/user_list/index.vue'], resolve)
    }
    },
   {
      path: 'system/wine_management', name: 'wine_management', component: resolve => {
      require(['@/page/system/wine_management/index.vue'], resolve)
    }
    },
    {
      path: 'user/safe', name: 'userSafe', component: resolve => {
      require(['@/page/user/safe/index.vue'], resolve)
    }
    },
    {
      path: 'user/safe/pwd', name: 'userSafePwd', component: resolve => {
      require(['@/page/user/safe/pwd.vue'], resolve)
    }
    },
    {
      path: 'user/safe/pay/pwd', name: 'userSafePayPwd', component: resolve => {
      require(['@/page/user/safe/payPwd.vue'], resolve)
    }
    },
    {
      path: 'user/safe/problem', name: 'userSafeProblem', component: resolve => {
      require(['@/page/user/safe/problem.vue'], resolve)
    }
    },
    {
      path: 'user/safe/phone', name: 'userSafePhone', component: resolve => {
      require(['@/page/user/safe/phone.vue'], resolve)
    }
    },
    {
      path: 'user/safe/mail', name: 'userSafeMail', component: resolve => {
      require(['@/page/user/safe/mail.vue'], resolve)
    }
    },

    {
      path: 'user/message', name: 'userMessage', component: resolve => {
      require(['@/page/user/message/list.vue'], resolve)
    }
    },

    {
      path: 'finance/order', name: 'order', component: resolve => {
      require(['@/page/finance/order.vue'], resolve)
    }
    },
    {
      path: 'finance/pay', name: 'financePay', component: resolve => {
      require(['@/page/finance/pay.vue'], resolve)
    }
    },
    {
      path: 'finance/account/detail', name: 'financeAccountDetail', component: resolve => {
      require(['@/page/finance/accountDetail.vue'], resolve)
    }
    },
    {
      path: 'finance/order', name: 'financeOrder', component: resolve => {
      require(['@/page/finance/order.vue'], resolve)
    }
    },
    {
      path: 'finance/order/detail', name: 'financeOrderDetail', component: resolve => {
      require(['@/page/finance/orderDetail.vue'], resolve)
    }
    },

    {
      path: 'domain/search', name: 'domainSearch', component: resolve => {
      require(['@/page/domain/search.vue'], resolve)
    }
    },
    {
      path: 'domain/submit/info', name: 'domainSubmitInfo', component: resolve => {
      require(['@/page/domain/submitInfo.vue'], resolve)
    }
    },
    {
      path: 'domain/submit/confirm', name: 'domainSubmitConfirm', component: resolve => {
      require(['@/page/domain/submitConfirm.vue'], resolve)
    }
    },
    {
      path: 'domain/pay', name: 'domainPay', component: resolve => {
      require(['@/page/domain/pay.vue'], resolve)
    }
    },
    {
      path: 'domain/success', name: 'domainSuccess', component: resolve => {
      require(['@/page/domain/success.vue'], resolve)
    }
    },
    {
      path: 'domain/price', name: 'domainPrice', component: resolve => {
      require(['@/page/domain/price.vue'], resolve)
    }
    },
    {
      path: 'domain/list', name: 'domainList', component: resolve => {
      require(['@/page/domain/list.vue'], resolve)
    }
    },
    {
      path: 'domain/detail/:id', name: 'domainDetail', component: resolve => {
      require(['@/page/domain/detail.vue'], resolve)
    }
    },
    {
      path: 'domain/info', name: 'domainInfo', component: resolve => {
      require(['@/page/domain/info.vue'], resolve)
    }
    },
  ]
};
export const loginRouter = {
  path: '/login', name: 'login', component: resolve => {
    require(['@/page/common/login.vue'], resolve)
  }
}
export const regRouter = {
  path: '/reg', name: 'reg', component: resolve => {
    require(['@/page/common/reg.vue'], resolve)
  }
}

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  otherRouter,
  loginRouter,
  regRouter,
]
