import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),//登录后的token储存
    name: '',//获取用户信息后存储用户的名称
    avatar: ''//获取用户信息后存储用户的头像
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //登录后设置用户token   存储到state
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  /* SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  } */
  //获取用户信息后设置用户信息 存储到state
  SET_USERINFO(state,userInfo){
    state.name = userInfo.name
    state.avatar = userInfo.avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

 /*  async login({commit},userInfo){
    const {username,password} = userInfo
    const response = await login({username:username.trim(),password:password}) 
    if(response.code === 20000){
      const {data} = response
      commit ('SET_TOKEN',data.token)
      setToken(data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  }, */

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // const { name, avatar } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        commit('SET_USERINFO',data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  //命名空间 写了它,以后访问actions getters mutations 
  //就得加上名称前缀  user/login
  //可以让多个模块具有相同的actions getters mutations home/login
  namespaced: true,
  state,
  mutations,
  actions
}

