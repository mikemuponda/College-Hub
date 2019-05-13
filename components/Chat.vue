<template>
  <div>
    <div class="container-fluid" style="background: #eee;" v-if="$store.state.authUser">
      <div class="row">
        <div class="col-md-4">
          Hello
        </div>
        <div class="col-md-8">
          <div class="chat-main">
            <div class="chat-bar">
              Hello World
            </div>
            <div class="chat-messages-box" >
              <div v-for="(msg, index) in messages" :key="index">
                <div class="chat-box darker">
                  <img v-if="msg.user == userProfile.username" :src="userProfile.profileImage.path" :alt="userProfile.firstname + ' ' + userProfile.lastname" class="right">
                  <img v-else :src="msg.receiverProfile.profileImage.path" :alt="msg.receiverProfile.firstname + ' ' + msg.receiverProfile.lastname" class="left">
                  <p>{{msg.message}}</p>
                  <span class="time-left">{{ msg.createdAt }}</span>
                </div>
              </div>
            </div>
            <div class="input-field-chat">
              <form @submit.prevent="sendMessage">
                <div class="form-group">
                  <input type="text" v-model="message" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
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
      receiver: '',
      receiverProfile: {},
      userProfile: {},
      socket: io(process.env.socketsIO)
    }
  },
  methods: {
    async sendMessage(e) {
      e.preventDefault()
      this.receiverProfile = await this.$store.dispatch('getProfile', {id: this.receiver})
      this.receiverProfile = this.receiverProfile.data.user
      var data = {
        id: this.socket.id,
        user: this.userProfile.username,
        message: this.message,
        receiverUsername: this.receiver,
        createdAt: new Date(),
        receiverProfile: this.receiverProfile,
        senderProfile: this.userProfile
      }
      this.messages.push(data)
      this.socket.emit('SEND_MESSAGE', data)
      this.scrollToBottom()
      this.message = ''
    },
    scrollToBottom: function() {    	
      var container = this.$el.querySelector(".chat-messages-box");
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted() {
    this.userProfile = this.$store.state.authUser.user
    if (this.$route.query.user){
      this.receiver = this.$route.query.user
    }
    var data = {
      user: this.userProfile.username,
      createdAt: new Date()
    }
    this.socket.emit('SEND_MESSAGE', data)  

    this.socket.on('MESSAGE', data => {
      this.receiver = data.user
      var newData = {
        id: data.id,
        user: data.user,
        message: data.message,
        receiverUsername: data.receiverUsername,
        createdAt: data.createdAt,
        receiverProfile: data.senderProfile,
        senderProfile: this.userProfile
      }
      this.receiverProfile = newData.receiverProfile
      this.messages.push(newData)
    })
  },
  updated(){
    this.scrollToBottom()
  }
}
</script>

<style scoped>
.chat-main{
  background: #fff;
  width: 96%;
  padding: 10px;
  margin: 0px;
  height: 87vh;
}
.chat-bar{
  width: 100%;
  border-bottom: 0.5px solid #aaa;
  height: 50px;
}
.chat-messages-box{
  overflow-y: scroll;
  height: 80%;
  padding: 5px;
  margin: 0px;
}
.chat-box {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 96%;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.chat-box::after {
  content: "";
  clear: both;
  display: table;
}

.chat-box img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

.chat-box img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
  width: 100%;
  text-align: right;
}

.chat-box img.left {
  width: 100%;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}
.input-field-chat{
  width: 100%;
  bottom: 0px;
  margin-bottom: 0px;
  position: absolute;
}
.input-field-chat div{
  float: left;
  width: 70%;
}
.input-field-chat button{
  float: left;
  width: 10%;
}
</style>