<template>
  <div style="width: 100%">
    <div class="container-fluid" style="background: #eee;">
      <div class="row">
        <div class="col-md-12" style="text-align: center;">
          <div class="alert alert-danger" v-if="error.length > 1">{{error}}</div>
          <div class="container" v-else>
            <div class="emp-profile section">
              <form method="post">
                <div class="row">
                  <div class="col-md-4">
                    <div class="profile-img">
                      <img src="/profile-image/user.jpeg" alt>
                      <div class="file btn btn-lg btn-primary" v-if="$store.state.authUser">
                        Change Photo
                        <input type="file" name="file">
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="profile-head">
                      <h5>{{userProfile.username}}</h5>
                      <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >About</a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >Timeline</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <input
                      type="submit"
                      class="profile-edit-btn"
                      name="btnAddMore"
                      value="Edit Profile"
                      v-if="$store.state.authUser"
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="profile-work" style="text-align: left;">
                      <p>
                        {{userProfile.firstname}} {{userProfile.lastname}}
                        <br>
                        Joined: {{date(userProfile.createdAt)}}
                      </p>
                      <div class="sensitive" v-if="$store.state.authUser">
                        <p>{{userProfile.email}}</p>
                        <p v-if="$store.state.isSeeker">Seeking Accomodation</p>
                        <p v-else>Providing Accomodation</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div class="row">
                          <div class="col-md-12">Some Info</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>



          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return true
  },
  data() {
    return {
      userProfile: {},
      error: ''
    }
  },
  async beforeCreate() {
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$route.params.id
      })
      this.userProfile = this.userProfile.data.user
    } catch (e) {
      this.error = e.message
    }
  },
  methods: {
    date(date){
      return new Date(date);
    }
  },
  head() {
    return {
      title: 'Collegehub | ' + this.$route.params.id,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.lekkahub.com/' + this.$route.params.id
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.$route.params.id +
            "'s account on Collegehub. Collegehub provides services that facilate college life."
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.$route.params.id +
            "'s account on Collegehub. Collegehub provides services that facilate college life."
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.collegehub.co.zw'
        },
        { hid: 'og:image', property: 'og:image', content: '/img/logo.png' }
      ]
    }
  }
}
</script>

<style>
.emp-profile {
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 1px;
  -webkit-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
}
.profile-img {
  text-align: center;
}
.profile-img img {
  width: 70%;
  height: 100%;
}
.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}

.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}
.profile-head h5 {
  color: #333;
}
.profile-head h6 {
  color: #0062cc;
}
.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 70%;
  padding: 2%;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}

.profile-head .nav-tabs {
  margin-bottom: 5%;
}
.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}
.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}
.profile-work {
  padding: 14%;
  margin-top: -15%;
}
.profile-work p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}

.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}
.profile-work ul {
  list-style: none;
}
.profile-tab label {
  font-weight: 600;
}
.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}
</style>

