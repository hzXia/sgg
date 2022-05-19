export default [
    {
        path: '/center',
        component: () => import('@/views/Center'),
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: () => import('@/views/Center/myOrder'),
            },
            {
                path: 'grouporder',
                component: () => import('@/views/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder',
            },
        ]
    },
    {
        path: '/paysuccess',
        component: () => import('@/views/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        component: () => import('@/views/Pay'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //进入支付页面，必须从交易页面而来
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/trade',
        component: () => import('@/views/Trade'),
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            //to：去哪个路由
            //from：从哪个路由而来
            //next：放行函数
            //代表的用户从购物车跳转到交易页面，才放行
            if (from.path == "/shopcart") {
                next();
            } else {
                //用户并非从购物车而来  
                //next(false): 中断当前的导航。
                next(false);
            }
        }
    },
    {
        path: '/shopcart',
        component: () => import('@/views/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: () => import('@/views/AddCartSuccess'),
        meta: { show: true },
        name: 'addcartsuccess'
    },
    {
        path: '/detail/:skuid',//需要带数据，占位
        component: () => import('@/views/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component: () => import('@/views/Home'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/views/Search'),
        meta: { show: true },
        name: 'search'
    },
    {
        path: '/login',
        component: () => import('@/views/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import('@/views/Register'),
        meta: { show: false }
    },
    //重定向，在项目跑起来时，访问/立马定向回到首页
    {
        path: '*',
        redirect: '/home'
    }
]