import axios from 'axios'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login({
    commit
  }, {
    username,
    password
  }) {
    try {
      const {
        data
      } = await axios.post('/api/login', {
        username,
        password
      })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Incorrect login credentials')
      }
      throw error
    }
  },

  async logout({
    commit
  }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },


  async signUp({
    commit
  }, {
    first_name,
    last_name,
    username,
    email,
    password,
    isSeeker
  }) {
    try {
      const {
        data
      } = await axios.post('/api/signup', {
        first_name,
        last_name,
        username,
        email,
        password,
        isSeeker
      })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Email is already in use")
      }else if (error.response && error.response.status === 409) {
        throw new Error("Username is already in use")
      }
      throw error
    }
  },

  async emailConfirm({commit}, {id}) {
    var url = '/api/confirm-signup/' + id
    try {
      const {data} = await axios.post(url, {id})
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 400) 
        throw new Error("User Could not be found")
      else 
        throw new Error("Unknown Error")
      
      throw error
    }
  },

}
