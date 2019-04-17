<template>
<div style="width: 100%;">
  <div class="card mt-3" v-if="$store.state.authUser">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p>
            <span class="font-weight-bold">{{ msg.user }}:</span>
            {{ msg.message }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
						{{assignUser($store.state.authUser.user)}}
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
	<div v-else>
		You are not logged in. Please login
	</div>
	</div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io(process.env.socketsIO)
    }
  },
  methods: {
		assignUser(sessionUser) {
			this.user = sessionUser
		},
    sendMessage(e) {
      e.preventDefault()
      this.socket.emit('SEND_MESSAGE', {user: this.user.username, message: this.message})
      this.message = ''
    }
  },
  mounted() {
    this.socket.on('MESSAGE', data => {
      //this.messages = [...this.messages, data]
      this.messages.push(data)
    })
  }
}
</script>

<style>
</style>