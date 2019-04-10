import Vue from 'vue'
import io from 'socket.io-client'
const socket = io.connect(process.env.socketsIO)

Vue.component('socket', socket)
export default socket