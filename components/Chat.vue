<template>
  <div>
    <div class="container-fluid" style="background: #eee;" v-if="$store.state.authUser">
      <div class="row">
        <div class="col-md-4">
          Hello
        </div>
        <div class="col-md-8">
          <div class="chat-main nopadding">
            <div class="chat-bar">
              Hello World
            </div>
            <div class="chat-messages-box" >
              <div v-for="(msg, index) in messages" :key="index">
                <div class="chat-box">
                  <img v-if="msg.user == userProfile.username" :src="userProfile.profileImage.path" :alt="userProfile.firstname + ' ' + userProfile.lastname" class="right">
                  <img v-else :src="msg.receiverProfile.profileImage.path" :alt="msg.receiverProfile.firstname + ' ' + msg.receiverProfile.lastname" class="left">
                  <p v-if="msg.user == userProfile.username" class="text-left">{{msg.message}}</p>
                  <p v-else class="text-right">{{msg.message}}</p>
                  <span v-if="msg.user == userProfile.username" class="time-left">{{ dateConversion(msg.createdAt) }}</span>
                  <span v-else class="time-right">{{ dateConversion(msg.createdAt) }}</span>
                </div>
              </div>
            </div>
            <div class="input-field-chat">
              <form @submit.prevent="sendMessage" class="chat-area">
                <div class="form-group">
                  <textarea type="text" v-model="message" class="chat-form-control"></textarea>
                </div>
                <button v-if="message.length > 0" type="submit" class="btn-send" style="width: 35px;"><i class="fas fa-paper-plane"></i></button>
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
        chatRoomID: 'roomID',
        user: this.userProfile.username,
        message: this.message,
        receiverUsername: this.receiver,
        createdAt: new Date(),
        receiverProfile: this.receiverProfile,
        senderProfile: this.userProfile
      }
      if(data.message.length){
        this.socket.emit('SEND_MESSAGE', data)
        this.scrollToBottom()
        this.message = ''
      }
    },
    scrollToBottom: function() {    	
      var container = this.$el.querySelector(".chat-messages-box");
      container.scrollTop = container.scrollHeight;
    },
    dateConversion(stringDate) {
      var dateFormat = require('dateformat')
      var mydate = new Date(stringDate)
      if (!isNaN(mydate.getTime()))
        return dateFormat(mydate, 'dddd, mmmm dS, yyyy, h:MM TT')
      else return 'unknown'
    }
  },
  mounted() {
    this.userProfile = this.$store.state.authUser.user
    if (this.$route.query.user){
      this.receiver = this.$route.query.user
    }else{
      this.receiver = 'Robi'
    }
    var data = {
      user: this.userProfile.username,
      chatRoomID: 'roomID',
      createdAt: new Date()
    }
    this.socket.emit('SEND_MESSAGE', data)  

    this.socket.on('MESSAGE', data => {
      this.receiver = data.user
      var newData = {
        id: data.id,
        chatRoomID: data.chatRoomID,
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
  width: 100%;
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
  height: 76%;
  padding: 5px;
  margin: 0px;
  background-image: url('/img/chat-background.jpeg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.chat-main ::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(233, 30, 99, 0.2);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.chat-main ::-webkit-scrollbar{
  width: 9px;
  background-color: #F5F5F5;
}

.chat-main ::-webkit-scrollbar-thumb{
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(233, 30, 99, 0.2);
  background-color: purple;
}

.chat-box {
  border: none;
  background:	rgb(62, 240, 127);
  font-size: 15px;
  font-weight: 420;
  box-shadow: inset 0 -0.1em 2em -0.35em rgba(0, 0, 0, 0.17), inset 0 0.6em 0.5em -0.3em rgba(255, 255, 255, 0.15), inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 96%;
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

.text-left{
  width: 80%;
  float: left;
  text-align: justify;
}
.text-right{
  width: 80%;
  float: right;
  text-align: justify;
}

.time-right {
  float: right;
  color: #909090;
  font-size: 12px;
  font-weight: 420;
}

.time-left {
  float: left;
  color: #909090;
  font-size: 12px;
  font-weight: 420;
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

@media only screen and (min-width: 872px) {
  .chat-area{
    height: 50px;
  }
  .chat-area{
    width: 96.5%;
  }
  .chat-area .form-group{
    width: 91%;
  }
  .chat-form-control{
    height: 40px;
  }
  .btn-send{
    margin-top: 1px;
  }
}
@media only screen and (max-width: 872px) {
  .chat-area{
    height: 40px;
  }
  .chat-area{
    width: 93%;
  }
  .chat-area .form-group{
    width: 87%;
  }
  .chat-form-control{
    height: 30px;
  }
  .btn-send{
    margin-top: -3px;
  }
}
@media only screen and (max-width: 500px){
  .text-left{
    width: 70%;
  }
  .text-right{
    width: 70%;
  }
}
@media only screen and (max-width: 390px) {
  .chat-area{
    width: 91%;
  }
  .chat-area .form-group{
    width: 83%;
  }
  .text-left{
    width: 50%;
  }
  .text-right{
    width: 50%;
  }
}
.chat-area{
  padding-top: 5px;
  background: linear-gradient(-135deg, rgba(63, 81, 181, 0.2), rgba(233, 30, 99, 0.2));
  padding-left: 10px;
  border-top: 0.5px solid #ccc;
}
.chat-form-control{
  width: 100%;
  border: 0.5px solid purple;
  border-radius: 15px 15px 15px 15px;
  padding: 5px 15px 5px 15px;
  overflow-y: hidden;
  font-size: 14px;
}
.btn-send{
  background: linear-gradient(-135deg, rgb(63, 81, 181), rgb(233, 30, 99));
  background: -webkit-linear-gradient(-135deg, rgb(63, 81, 181), rgb(233, 30, 99));
  margin-left: 10px;
  border-radius: 50%;
  border: none;
  padding: 5px 0px 5px 0px;
  width: 10px;
  cursor: pointer;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17), inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15), inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
}

.btn-send .fa-paper-plane{
  color: #fff;
  padding-right: 3px;
}
</style>