import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

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

  async resetPassword({commit}, {id, password}){
    var url = '/users/reset-password/' + id
    try {
      const {data} = await axios.post(url, {password})
      commit('SET_USER', data)
      commit('SET_USER', null)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Reset id provided is incorrect. Please go to the "Forgot Password" Page')
      }
      throw error
    }
  },

  async logout({commit}) {
    await axios.post('/users/logout')
    commit('SET_USER', null)
  },


  async signUp({commit}, {firstname, lastname, username, email, password}) {
    try {
      const {data} = await axios.post('/users/signup', {firstname, lastname, username, email, password})
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
      const {data} =  await axios.post(url, {id})
      commit('SET_USER', data)
      return data
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

  async getProfileforMeta({commit}, {id}){
    var url = 'http://localhost:8080/users/profile/' + id
    try {
      return await axios.post(url, {id})
    } catch (error) {
      return error
    }
  },

  async profileImage({commit}, {formData, id}){
    axios.post( '/users/profile/upload/image/' + id, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
      }).then(function(){console.log('UPLOADED')}).catch(function(){console.log('FAILED')
    })
  },

  async editProfile({commit}, {id, firstname, lastname, email, password, sex, dob, phone, accountType, services, city, university, bio}){
    var url = '/users/profile/edit/' + id
    var form = {}
    if(firstname != '' && firstname != null)
      form["firstname"] = firstname;
    if(lastname != '' && lastname != null)
      form["lastname"] = lastname;
    if(email != '' && email != null)
      form["email"] = email;
    if(password != '' && password != null)
      form["password"] = password;
    if(sex != '' && sex != null)
      form["sex"] = sex;
    if(dob != '' && dob != null)
      form["dob"] = dob;
    if(phone != '' && phone != null)
      form["phone"] = phone;
    if(city != '' && city != null)
      form["city"] = city;
    if(university != '' && university != null)
      form["university"] = university;
    if(accountType != '' && accountType != null)
      form["accountType"] = accountType;
    if(services != '' && services != null)
      form["services"] = services;
    if(bio != '' && bio != null)
      form["bio"] = bio;

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
  },

  async contact({commit}, {name, email, phone, message}){
    var url = '/contact/message/send'
    try {
      return await axios.post(url, {name, email, phone, message})
    } catch (error) {
      if (error.response && error.response.status === 401){
        throw new Error("Message could not ne sent")
      }else{
        throw new Error("Message could not ne sent")
      }
      throw error
    }
  },

  async addListing({commit}, Form){
    var url = '/houses/list/house'
    try {
      return await axios.post(url, Form)
    } catch (error) {
      if (error.response && error.response.status === 401){
        throw new Error("Message could not ne sent")
      }else{
        throw new Error("Message could not ne sent")
      }
      throw error
    }
  },

  async uploadAccommodationImages({commit}, {formData, id}){
    axios.post( '/houses/list/house/upload/' + id, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
      }).then(function(){console.log('UPLOADED')}).catch(function(){console.log('FAILED')
    })
  },

  //OwnerID
  async getHousesByID({commit}, {id}){
    var url = '/houses/owner/' + id
    try {
      return await axios.post(url, {id})
    } catch (error) {
      return "404"
      throw error
    }
  },

  async getHousesByCity({commit}, {id}){
    var url = '/houses/city/' + id
    try {
      return await axios.post(url, {id})
    } catch (error) {
      return "404"
      throw error
    }
  },

  async getOneHouse({commit}, {id}){
    var url = '/houses/house/' + id
    try {
      return await axios.post(url, {id})
    } catch (error) {
      return error
      throw error
    }
  },

  async getHouseFuck({commit}, {id}){
    var url = 'http://localhost:8080/houses/house/' + id
    try {
      return await axios.post(url, {id})
    } catch (error) {
      return error
    }
  },
  
  async getHouses({commit}){
    var url = '/houses/allhouses'
    try {
      return await axios.post(url)
    } catch (error) {
      return "404"
      throw error
    }
  },

  async getAllHousesAsync({commit}){
    var url = 'http://localhost:8080/houses/allhouses'
    try {
      return await axios.post(url)
    } catch (error) {
      return error
    }
  },

  async changeHouseStatus({commit}, {id, status}){
    var url = '/houses/house/edit/' + id
    try {
      return await axios.post(url, {status})
    } catch (error) {
      return "404"
      throw error
    }
  },

  async deleteHouse({commit}, {id}){
    var url = '/houses/delete/' + id
    try {
      return await axios.delete(url)
    } catch (error) {
      return "404"
      throw error
    }
  },

  async userRequestToRent({commit}, Form){
    var userURL = '/users/accommodation/request/' + Form.requesterID
    try {
      await axios.post(userURL, Form)
    } catch (error) {
      return error
    }
  },

  async houseRequestToRent({commit}, Form){
    var accommodationURL = '/houses/house/request/' + Form.houseID
    var house
    try {
      house = await axios.post(accommodationURL, Form)
      return house
    } catch (error) {
      return error
    }
  },

  async getAllLocales({commit},){
    var url = '/data/get/locales'
    try {
      return await axios.post(url)
    } catch (error) {
      return "404"
    }
  }
}
