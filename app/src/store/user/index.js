import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, clearToken } from '@/utils/token'

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    SETTOKEN(state, token) {
        state.token = token;
    },
    //存储用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //退出登录情况全部用户信息
    USERLOGOUT(state) {
        state.token = '';
        state.userInfo = {};
        //本地存储数据【token】
        clearToken();
    }
}
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //登录业务
    async userLogin({ commit }, data) {
        //当前的这个action，向服务器发起登录请求
        let result = await reqUserLogin(data);
        //切记:当用户登录成功以后，服务器会返回相应数据信息，数据信息当中包含token
        if (result.code == 200) {
            //如果仓库,已经存储token,用户一定登陆
            commit("SETTOKEN", result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            //登录失败
            return Promise.reject(result.message);
        }
    },
    //获取用户信息:只要出发这个action，就可以获取用户信息
    async getUserInfo({ commit }) {
        //为什么用户已经登录：但是获取不到用户信息，因为获取用户信息需要携带token
        //这样服务器才知道你是谁，才会返回相应的用户额信息
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //发请求通知服务器销毁token
        let result = await reqLogout();
        if (result.code == 200) {
            commit("USERLOGOUT");
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    }
}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters
}