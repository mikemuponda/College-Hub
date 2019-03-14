import Vue from 'vue'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8080/')

Vue.component('socket', socket)
export default socket