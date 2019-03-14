import Vue from 'vue'
import io from 'socket.io-client'
const socket = io.connect('http://www.lekkahub.com/')

Vue.component('socket', socket)
export default socket