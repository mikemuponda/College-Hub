<template>
  <div style="width: 100%;">
    <NuxtLink
      :to="{path: '/profile/' + userProfile.username}"
      title="Profile"
      style="color: #606060;"
    >
      <div class="user-profile">
        <div class="profile-image">
          <div
            v-if="userProfile.profileImage"
            class="ratio img-responsive img-circle"
            :title="userProfile.firstname + ' ' + userProfile.lastname"
            :alt="userProfile.firstname + ' ' + userProfile.lastname"
            v-bind:style="{backgroundImage: 'url(' + userProfile.profileImage.path + ')'}"
          ></div>
          <div
            v-else
            class="ratio img-responsive img-circle"
            style="background-image: url(/profileImages/user.png);"
            :title="userProfile.firstname + ' ' + userProfile.lastname"
            :alt="userProfile.firstname + ' ' + userProfile.lastname"
          ></div>
        </div>
        <br>
        {{userProfile.firstname}} {{userProfile.lastname}}
        <br>
        <br>
        <small>Your profile is {{counter}}% complete</small>
        <b-progress :value="counter" :max="max" show-progress animated/>
      </div>
    </NuxtLink>

    <div class="row nopadding mobileHide" style="width: 100%;">
      <div class="col-md-12 nopadding">
        <div
          class="item shadow cf"
          style="width: 100%; background-color: #fff; height: 20px; border-bottom: 0.5px solid #aaa;"
        >
          <h2 style="font-size: 11px; text-align: center; padding-top: 5px;">Activity Feed</h2>
        </div>
      </div>
    </div>
    <!-- Feed Item Start -->
    <div
      style="background-color: #fff; border-radius: 2px;"
      class="item white shadow cf mobileHide"
      v-for="(activity, index) in activities"
      :key="index"
    >
      <NuxtLink
        :to="{path: '/profile/' + activity.user.username}"
        :title="activity.user.firstname + ' ' + activity.user.lastname"
        style="color: #606060;"
      >
        <div class="row nopadding">
          <div class="activity-box col-12 col-persist gutter-h-10">
            <div class="profile-image nopadding" style="float: left; width: 30%;">
              <div
                v-if="activity.user.profileImage"
                class="ratio img-responsive img-circle"
                :title="activity.user.firstname + ' ' + activity.user.lastname"
                :alt="activity.user.firstname + ' ' + activity.user.lastname"
                v-bind:style="{backgroundImage: 'url(' + activity.user.profileImage.path + ')'}"
              ></div>
              <div
                v-else
                class="ratio img-responsive img-circle"
                style="background-image: url(/profileImages/user.png);"
                :title="activity.user.firstname + ' ' + activity.user.lastname"
                :alt="activity.user.firstname + ' ' + activity.user.lastname"
              ></div>
            </div>
            <div style="float: left; width: 70%; text-align: center; margin-top: 10px;">
              <span style="font-size:10px;">
                <strong>{{ activity.user.username }}</strong><br>
                <p class="nopadding">{{activity.activity.status}}</p>
              </span>
            </div>
          </div>
        </div>
        <div class="row padding">
          <div
            class="activity-box col-12 col-persist gutter-h-10 padding-15"
            style="text-align: right;"
          >
            <span style="font-size:9px; color: #606060; padding-right: 5px;">{{activity.activity.time}}</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div
      style="background-color: #fff; border-radius: 2px; text-align: right; padding-right: 5px; font-size: 12px; font-weight: 400;"
      class="item white shadow cf mobileHide"
    ><p> Online Users: {{loggedInUsers}} <i style="color: green;" class="fas fa-circle"></i></p></div>

    <div class="row nopadding" style="width: 100%;">
      <div class="col-md-12 nopadding">
        <div style="width: 100%; margin-bottom: 10px; margin-top: 10px;" class="item-box">
          <no-ssr>
            <flip-countdown deadline="2019-05-22 23:59:59"></flip-countdown>
          </no-ssr>
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
      userProfile: '',
      counter: 0,
      max: 100,
      activity: '',
      activities: [],
      time: '',
      socket: io(process.env.socketsIO),
      loggedInUsers: null,
    }
  },
  methods: {
    shareActivity() {
      this.socket.emit('ACTIVITY_FEED', {
        user: this.user.username,
        activity: this.activity
      })
      this.activity = ''
    }
  },
  async created() {
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$store.state.authUser.user.username
      })
      this.userProfile = this.userProfile.data.user
      var i = 0,
        j = 0
      for (let index in this.userProfile) {
        j++
        if (this.userProfile.hasOwnProperty(index)) {
          var value = this.userProfile[index]
          if ((value == '' || value == null) && value != false) {
            i++
          }
        }
      }
      this.counter = 100 - Math.round((i / j) * this.max)
      var d = new Date()
      

      this.socket.emit('ACTIVITY_FEED', {
        user: this.userProfile,
        activity: {
          status: 'is logged in',
          time: d.toLocaleTimeString(),
          ringer: true
        }
      })
      this.socket.on('ACTIVITY', data => {
        var tempActivVar = []
        tempActivVar = data
        var setRinger = false, i = 0
        for(i = 0; i < tempActivVar.length; i++){
          if(tempActivVar[i].activity.ringer == true){
            setRinger = true
          }
          if(this.userProfile.username == tempActivVar[i].user.username){
            setRinger = false
          }
        }
        tempActivVar = tempActivVar.slice().reverse()
        this.activities = []
        if (tempActivVar.length < 5){
          for(i = 0; i < tempActivVar.length; i++){
            this.activities.push(tempActivVar[i])
          }
        }else{
          for(i = 0; i < 5; i++){
            this.activities.push(tempActivVar[i])
          }
        }

        if (setRinger == true){
          var audio = new Audio('/notifications/open-ended.mp3')
          audio.play()
          setRinger = false
        }

        this.loggedInUsers = tempActivVar.length
        
      })
      this.activity = ''
    } catch (e) {
      this.error = e.message
    }
  }
}
</script>

<style>
@media (max-width: 767px) {
  .mobileHide{
    display: none;
  }
}
</style>

