// 配置路由的地方
import Vue from 'vue';
import routes from './routes'
import VueRouter from 'vue-router'
import store from '@/store'

//使用插件
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//创建并暴露一个路由器
let router = new VueRouter({
    routes,
    //滚动
    scrollBehavior(to, from, savedPosition) {
        //滚动条在最上方
        return { y: 0 }
    }
})

//全局守卫
router.beforeEach(async (to, from, next) => {
    //获取仓库中的token,因为如果用户登录了，仓库中一定是有token，用户没有登录，没有token
    let token = store.state.user.token;
    //获取用户信息，通过用户信息有没有进行判断，进行方式
    let name = store.state.user.userInfo.name;
    //用户已经输入用户名+密码登录成---【token】
    if (token) {
        //用户登陆了，且想去登录页的分支
        if (to.path == "/login" || to.path == "/register") {
            next("/");
            //用户登录了，且想去的不是login的分支  
        } else {
            //代表用户登录了（且去的不是login），而且还有用户信息
            if (name) {
                //next代表该去哪里就去哪里 
                next();
            } else {
                //代表用户登录了，且没有用户信息
                try {
                    //代表用户登录了，但是没有用户信息，发请求让仓库存储用户信息，在进行路由跳转 
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token过期失效了:清除本地的token（过期的）
                    await store.dispatch('userLogout');
                    //清除本地数据之后，让用户回到登录页，重新登录、获取新的token
                    next('/login')
                }
            }
        }

    } else {
        //未登录的判断
        //如果用户未登录：去交易页面trade、去支付页面pay、支付成功页面paysuccess、个人中心 center/myorder  center/grouporder
        //用户未登录应该去登录页
        //获取用户未登录想去的路由的路径
        let toPath = to.path;
        //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
            //跳转到登录页
            next('/login?redirect=' + toPath);
        } else {
            //去的并非上面这些路由,放行
            next();
        }
    }


});

export default router