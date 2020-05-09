import { Login } from "@/api/login";
import { setToken, setUserName, getUserName, removeToken, removeUserName } from "@/utils/app"

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    username: getUserName() || '',  // 防止刷新后删除
}

const getters = {
    isCollapse: state => state.isCollapse,
}

const mutations = {
    SET_Collapse (state) {
        // 进行取反处理
        state.isCollapse = !state.isCollapse
        // html5 的本地存储
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state, value) {
        state.to_ken = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    }
}

const actions = {
    login(content, requestData) {
        console.log(requestData)
        // content 中是包含 state getters commit 的方法的
        return new Promise((resolve, reject) => {
            // 接口
            Login(requestData).then((response) => {
                // 登录完成之后存储 token 和 username
                console.log(response);
                let data = response.data.data;
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUserName(data.username);

                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },
    exit(content) {
        return new Promise((resolve, reject) => {
            removeToken();
            removeUserName();
            content.commit('SET_TOKEN', '');
            content.commit('SET_USERNAME', '')
            // 退出没有什么特别的操作，直接返回成功
            resolve();
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}