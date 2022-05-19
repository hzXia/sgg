//当前这个模块：API进行统一管理
import request from './request'
import mockRequest from './mockRequest'

//三级联动接口
//商品分类的数据接口
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });
//获取banner数据的接口函数(mock)
export const reqGetBannerList = () => mockRequest({ url: '/banner', method: 'get' });
//获取Floor数据接口的函数(mock)
export const reqFloorList = () => mockRequest({ url: '/floor', method: 'get' });
//搜索产品的接口
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'post', data: params });
//获取产品详情的接口
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' });
//添加到购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
//获取购物车的数据
export const reqCartList = () => request({ url: `/cart/cartList`, method: 'get' });
//删除购物车某一个产品的接口
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
//修改某一个产品的选中状态接口
export const reqUpdateCheckedByid = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//用户获取到验证码的接口
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
//注册用户接口
export const reqUserRegister = (data) => request({ url: `/user/passport/register`, data, method: 'post' });
//登录接口
export const reqUserLogin = (data) => request({ url: `/user/passport/login`, data, method: 'post' });
//获取用户信息的接口
export const reqUserInfo = () => request({ url: `/user/passport/auth/getUserInfo`, method: 'get' });
//退出登录的接口
export const reqLogout = () => request({ url: `/user/passport/logout`, method: 'get' });
//获取用户地址信息(mock)
export const reqAddressInfo = () => mockRequest({ url: `/address`, method: 'get' });
//获取购物清单
export const reqOrderInfo = () => request({ url: `/order/auth/trade`, method: 'get' });
//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });
//获取支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
//判断用户是否支付成功
export const reqOrderStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
//获取用户订单列表数据
export const reqMyList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' });