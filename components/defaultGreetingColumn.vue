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
    <!-- <div
      style="background-color: #fff; border-radius: 2px;"
      class="item white shadow cf mobileHide"
      v-for="(activity, index) in activities.slice().reverse()"
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
                <p class="nopadding">{{activity.activity}}</p>
              </span>
            </div>
          </div>
        </div>
        <div class="row padding">
          <div
            class="activity-box col-12 col-persist gutter-h-10 padding-15"
            style="text-align: right;"
          >
            <span style="font-size:9px; color: #606060; padding-right: 5px;">{{timer()}}</span>
          </div>
        </div>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script>
//import io from 'socket.io-client'
export default {
  data() {
    return {
      userProfile: '',
      counter: 0,
      max: 100,
      activity: '',
      activities: [],
      //time: '',
     // socket: io('lekkahub.com')
    }
  },
  methods: {
    //shareActivity() {
    //  this.socket.emit('ACTIVITY_FEED', {
    //    user: this.user.username,
    //    activity: this.activity
    //  })
    //  this.activity = ''
   // },
   // timer() {
    //  var d = new Date()
    //  return d.toLocaleTimeString()
    //}
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
          if (value == '' || value == null) {
            i++
          }
        }
      }
      this.counter = 100 - Math.round((i / j) * this.max)

      this.socket.emit('ACTIVITY_FEED', {
        user: this.userProfile,
        activity: 'is logged in'
      })
      this.socket.on('ACTIVITY', data => {
        this.activities.push(data)
        if (this.userProfile.username != data.user.username) {
          var audio = new Audio('/notifications/open-ended.mp3')
          audio.play()
        }
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

