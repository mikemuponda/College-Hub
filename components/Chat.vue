<template>
  <div>
    <div class="container-fluid" style="background: #eee;" v-if="$store.state.authUser">
      <div class="row">
        <div class="col-md-4">
          <div class="item-box">
            <div class="message-nav">
              <h1 class="subheading-two">Messages</h1>
            </div>
            <div v-if="chatUsers.length" style="100%;">
              <div class="user" v-for="(user, index) in chatUsers" :key="index" @click="getReceiverProfile(user.username)">
                <div class="user-box">
                  <div class="chatUserProfileImage">
                    <img
                      v-if="user.profileImage"
                      title="Profile and Settings"
                      :alt="user.firstname + ' ' + user.lastname"
                      :src="user.profileImage.path"
                      @click="show = !show"
                    />
                    <img
                      v-else
                      title="Profile and Settings"
                      :alt="user.firstname + ' ' + user.lastname"
                      src="/img/profileImages/user.png"
                      @click="show = !show"
                    />
                  </div>
                  <div class="chatUserInfo">
                    <p class="chatUserName">{{user.firstname}} {{user.lastname}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="chatting-box">
            <div class="chat-main nopadding">
              <div class="chat-bar">
                <div class="chat-bar-inner" v-if="receiverProfile">
                  <div class="chatUserProfileImage">
                    <img
                      v-if="receiverProfile.profileImage"
                      title="Profile and Settings"
                      :alt="receiverProfile.firstname + ' ' + receiverProfile.lastname"
                      :src="receiverProfile.profileImage.path"
                      @click="show = !show"
                    />
                    <img
                      v-else
                      title="Profile and Settings"
                      :alt="receiverProfile.firstname + ' ' + receiverProfile.lastname"
                      src="/img/profileImages/user.png"
                      @click="show = !show"
                    />
                  </div>
                  <div class="chatUserInfo">
                    <p class="chatUserName">{{receiverProfile.firstname}} {{receiverProfile.lastname}}</p>
                  </div>
                </div>
              </div>
              <div class="chat-messages-box" >
                <div v-for="(msg, index) in messages" :key="index">
                  <div class="chat-box">
                    <img v-if="msg.sender == userProfile.username" :src="userProfile.profileImage.path" :alt="userProfile.firstname + ' ' + userProfile.lastname" class="right">
                    <img v-else :src="msg.receiverProfile.profileImage.path" :alt="msg.receiverProfile.firstname + ' ' + msg.receiverProfile.lastname" class="left">
                    <p v-if="msg.sender == userProfile.username" class="text-left">{{msg.message}}</p>
                    <p v-else class="text-right">{{msg.message}}</p>
                    <span v-if="msg.sender == userProfile.username" class="time-left">{{ dateConversion(msg.createdAt) }}</span>
                    <span v-else class="time-right">{{ dateConversion(msg.createdAt) }}</span>
                  </div>
                </div>
              </div>
              <div class="input-field-chat">
                <form @submit.prevent="sendMessage" class="chat-area">
                  <div class="form-group">
                    <input type="text" v-model="message" class="chat-form-control"/>
                  </div>
                  <button v-if="message.length > 0" type="submit" class="btn-send" style="width: 35px;"><i class="fas fa-paper-plane"></i></button>
                </form>
              </div>
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
      chats: [],
      errors: [],
      allUsers: [],
      chatUsers: [],
      chatRoomID: null,
      socket: io(process.env.socketsIO)
    }
  },
  methods: {
    async sendMessage(e) {
      e.preventDefault()
      this.setRoomID()
      var data = {
        id: this.socket.id,
        chatRoomID: this.chatRoomID,
        sender: this.userProfile.username,
        message: this.message,
        receiver: this.receiver,
        createdAt: new Date(),
        receiverProfile: this.receiverProfile,
        senderProfile: this.userProfile,
        notification: false
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
    },
    async getReceiverProfile(receiverID){
      this.receiver = receiverID
      this.messages = []
      this.errors = []
      try{
        this.chats = await this.$store.dispatch('getUserChats', {id: this.userProfile.username})
        this.chats = this.chats.data
      }catch(error){
        this.errors.push(error)
      }

      var index, j, k
      for(index in this.allUsers){
        if(this.allUsers[index].username == receiverID){
          this.receiverProfile = this.allUsers[index]
        }
      }

      for(index in this.chats){
        for(j in this.chats[index].users){
          if(this.chats[index].users[j] == this.receiver){
            for(k in this.chats[index].conversation){
              var sender, receiver
                if(this.chats[index].conversation[k].sender != this.userProfile.username){
                  sender = this.userProfile
                  receiver = this.receiverProfile
                }else{
                  sender = this.receiverProfile
                  receiver = this.userProfile
                }
                let defaultChat = {
                  id: this.socket.id,
                  chatRoomID: this.chatRoomID,
                  sender: this.chats[index].conversation[k].sender,
                  message: this.chats[index].conversation[k].message,
                  receiver: this.chats[index].conversation[k].receiver,
                  createdAt: this.chats[index].conversation[k].createdAt,
                  receiverProfile: receiver,
                  senderProfile: sender,
                  notification: this.chats[index].conversation[k].notification
                }
                this.messages.push(defaultChat)
            }
          }
        }
      }
    },
    async setDefaultChat(){
      if (this.$route.query.user){
        this.getReceiverProfile(this.$route.query.user)
      }else{
        var index
        for(index in this.chats[0].users){
          if(this.chats[0].users[index] != this.userProfile.username){
            this.getReceiverProfile(this.chats[0].users[index])
            this.chatRoomID = this.chats[0].chatRoomID
          }
        }
      }
    },
    async setChatUsers(){
      try{
        this.allUsers = await this.$store.dispatch('getAllUserProfiles')
        this.allUsers = this.allUsers.data 
      }catch(error){
        this.errors.push(error)
      }
      var index, j, k, users = []
      for(index in this.allUsers){
        for(j in this.chats){
          for(k in this.chats[j].users){
            if(this.chats[j].users[k] == this.allUsers[index].username && this.allUsers[index].username != this.userProfile.username){
              users.push(this.allUsers[index])
            }
          }
        }
      }
      this.chatUsers = users
    },
    async setRoomID(){
      var index, chatsroomNotSet = true
      console.log(this.receiverProfile.username)
      for(index in this.chats){
        if(this.chats[index] && this.chats[index].users.includes(this.userProfile.username) && this.chats[index].users.includes(this.receiverProfile.username)){
          this.chatRoomID = this.chats[index].chatRoomID
          chatsroomNotSet = false
        }
      }
      if(chatsroomNotSet == true){
        this.chatRoomID = "d5"
      }
    }
  },
  async created(){
    try{
      this.userProfile = await this.$store.dispatch('getProfile', {id: this.$store.state.authUser.user.username})
      this.userProfile = this.userProfile.data.user
      this.allUsers = await this.$store.dispatch('getAllUserProfiles')
      this.allUsers = this.allUsers.data
      this.chats = await this.$store.dispatch('getUserChats', {id: this.userProfile.username})
      this.chats = this.chats.data
      this.setChatUsers()
      this.setDefaultChat()
      this.setRoomID()
      
    }catch(error){
      this.errors.push(error)
    }  
  },
  mounted() {
    var data = {
      sender: this.userProfile.username,
      chatRoomID: this.chatRoomID,
      createdAt: new Date()
    }
    this.socket.emit('SEND_MESSAGE', data)

    this.socket.on('MESSAGE', data => {
      this.receiver = data.sender
      var newData = {
        id: data.id,
        chatRoomID: data.chatRoomID,
        sender: data.sender,
        message: data.message,
        receiver: data.receiver,
        createdAt: data.createdAt,
        receiverProfile: data.senderProfile,
        senderProfile: this.userProfile
      }
      this.messages.push(newData)
    })
  },
  updated(){
    this.scrollToBottom()
  }
}
</script>

<style scoped>
.message-nav{
  width: 100%;
  background: #fff;
  padding: 5px 0 15px 0;
  border-bottom: 1px solid #eee;
}
.user{
  width: 100%;
  height: 60px;
  border-bottom: 0.5px solid #eee;
  padding: 5px 0 5px 0;
}
.user:hover{
  cursor: pointer;
  background: #eee;
}
.chatUserProfileImage{
  float: left;
  margin-left: 2.5%;
  width: 50px;
  height: 50px;
}

.chatUserProfileImage img{
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.chatUserInfo{
  float: left;
  width: 80%;
  text-align: left;
}

.chatUserInfo .chatUserName{
  padding: 5px;
  font-weight: 420;
  font-size: 14px;
  margin-top: 5px;
  margin-left: 5px;
}

.chatting-box{
  position: fixed;
  width: 64%;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 1px;
  padding-top: 5px;
  padding-bottom: 5px;
  -webkit-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.chat-main{
  background: #fff;
  width: 100%;
  padding: 10px;
  margin: 0px;
  height: 83vh;
}
.chat-bar{
  width: 100%;
  border-bottom: 0.5px solid #aaa;
  height: 55px;
}

.chat-bar-inner{
  height: 100%;
  width: 100%;
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
    width: 100%;
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