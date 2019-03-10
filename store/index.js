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
  nuxtServerInit({commit}, {req}) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },

  async login({commit}, {email, password}) {
    try {
      const {data} = await axios.post('/users/login', {email, password})
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Incorrect login credentials')
      }
      throw error
    }
  },

  async forgotPassword({commit}, {email}){
    try {
      const {data} = await axios.post('/users/forgot-password', {email})
      commit('SET_USER', data)
      commit('SET_USER', null)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Email Provided does not exist')
      }
      throw error
    }
  },

  async logout({commit}) {
    await axios.post('/users/logout')
    commit('SET_USER', null)
  },


  async signUp({commit}, {firstname, lastname, username, email, password, isSeeker}) {
    try {
      const {data} = await axios.post('/users/signup', {firstname, lastname, username, email, password, isSeeker})
      commit('SET_USER', data)
      commit('SET_USER', null)
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
    var url = '/users/confirm-signup/' + id
    try {
      const {data} = await axios.post(url, {id})
      commit('SET_USER', data)
      commit('SET_USER', null)
    } catch (error) {
      if (error.response && error.response.status === 400){ 
        throw new Error("User Could not be found")
      }else{ 
        throw new Error("Unknown Error")
      }
      throw error
    }
  },

  async getProfile({commit}, {id}){
    var url = '/users/profile/' + id
    try {
      return await axios.post(url, {id})
    } catch (error) {
      if (error.response && error.response.status === 401){ 
        throw new Error("This account may not have been confirmed yet.")
      }else{ 
        throw new Error("Unknown Error")
      }
      throw error
    }
  },

  async editProfile({commit}, {id, firstname, lastname, email, password, sex, dob, phone, isSeeker}){
    var url = '/users/profile/edit/' + id
    var form = {}
    if(firstname != '')
      form["firstname"] = firstname;
    if(lastname != '')
      form["lastname"] = lastname;
    if(email != '')
      form["email"] = email;
    if(password != '')
      form["password"] = password;
    if(sex != '')
      form["sex"] = sex;
    if(dob != '')
      form["dob"] = dob;
    if(phone != '')
      form["phone"] = phone;
    if(isSeeker)
      form["isSeeker"] = isSeeker;
    else
      form["isSeeker"] = false;
    
    try {
      return await axios.post(url, form)
    } catch (error) {
      if (error.response && error.response.status === 401){ 
        throw new Error("This account may not have been confirmed yet.")
      }else{ 
        throw new Error("Unknown Error")
      }
      throw error
    }
  }

}
