<template>
  <div style="width: 100%">
    <div class="container-fluid" style="background: #eee;">
      <div class="row">
        <div class="col-md-12" style="text-align: center;">
          <div
            style="height: 90px; margin-top: 20px;"
            class="alert alert-danger"
            v-if="error.length > 1"
          >{{error}}</div>
          <div class="container" v-else>
            <div class="emp-profile">
              <form method="post">
                <div class="row">
                  <div class="col-md-4" style="margin-top: 10px;">
                    <div class="profile-img item-box">
                      <img src="/profile-image/user.jpeg" alt>
                      <div
                        class="file btn btn-lg btn-primary"
                        v-if="$store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id)"
                      >
                        Change Photo
                        <input type="file" name="file">
                      </div>
                      <div class="profile-item-brief" style="text-align: left;">
                        <p>{{userProfile.firstname}} {{userProfile.lastname}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6" style="margin-top: 10px;">
                    <div class="edit-profile-section profile-head item-box" v-if="displayEdit">
                      <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <a class="nav-link active" style="padding-left: 30px;">Edit Profile</a>
                        </li>
                      </ul>
                      <div class="row input-div" v-if="submitErrors.length">
                        <div class="col-md-12">
                          <div class="alert alert-danger">
                            <ul style="color: #000000;">
                              <li
                                v-for="(error, index) in submitErrors"
                                :item="error"
                                :index="index"
                                :key="error"
                              >{{ error }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="firstname">First Name</label>
                        </div>
                        <div class="col-md-6">
                          <input
                            type="text"
                            class="form-control-edit"
                            id="firstname"
                            :placeholder="userProfile.firstname"
                            v-model="Form.firstname"
                          >
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="lastname">Last Name</label>
                        </div>
                        <div class="col-md-6">
                          <input
                            type="text"
                            class="form-control-edit"
                            id="lastname"
                            :placeholder="userProfile.lastname"
                            v-model="Form.lastname"
                          >
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="email">Email</label>
                        </div>
                        <div class="col-md-6">
                          <input
                            type="email"
                            class="form-control-edit"
                            id="email"
                            name="email"
                            :placeholder="userProfile.email"
                            v-model="Form.email"
                          >
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="accountType">{{ accountType }}</label>
                        </div>
                        <div class="col-md-6">
                          <select
                            v-model="seeker"
                            @change="onChange($event)"
                            class="form-control-edit"
                            id="accountType"
                          >
                            <option
                              value="Finding Accomodation"
                              v-if="userProfile.isSeeker"
                            >Finding Accomodation</option>
                            <option
                              value="Listing Accomodation"
                              v-if="!userProfile.isSeeker"
                            >Listing Accomodation</option>
                            <option value="1">Finding Accomodation</option>
                            <option value="2">Listing Accomodation</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="profile-head item-box" v-else>
                      <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <a class="nav-link active" style="padding-left: 30px;">About</a>
                        </li>
                      </ul>
                      <div class="profile-about">
                        <div class="row nopadding">
                          <div class="col-md-12 nopadding">
                            <div class="nopadding" style="width: 30%; float: left;">
                              <label class="nopadding">Username:</label>
                            </div>
                            <div class="nopadding" style="width: 70%; float: left;">
                              <p class="nopadding">{{userProfile.username}}</p>
                            </div>
                          </div>
                        </div>
                        <div class="row nopadding">
                          <div class="col-md-12 nopadding">
                            <div class="nopadding" style="width: 30%; float: left;">
                              <label class="nopadding">Name:</label>
                            </div>
                            <div class="nopadding" style="width: 70%; float: left;">
                              <p
                                class="nopadding"
                              >{{userProfile.firstname}} {{userProfile.lastname}}</p>
                            </div>
                          </div>
                        </div>
                        <div class="row nopadding">
                          <div class="col-md-12 nopadding">
                            <div class="nopadding" style="width: 30%; float: left;">
                              <label class="nopadding">Joined:</label>
                            </div>
                            <div class="nopadding" style="width: 70%; float: left;">
                              <p class="nopadding">{{date(userProfile.createdAt)}}</p>
                            </div>
                          </div>
                        </div>
                        <div class="sensitive" v-if="$store.state.authUser">
                          <div class="row nopadding">
                            <div class="col-md-12 nopadding">
                              <div class="nopadding" style="width: 30%; float: left;">
                                <label class="nopadding">Email:</label>
                              </div>
                              <div class="nopadding" style="width: 70%; float: left;">
                                <p class="nopadding">{{userProfile.email}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row nopadding">
                            <div class="col-md-12 nopadding">
                              <div class="nopadding" style="width: 30%; float: left;">
                                <label class="nopadding">Account Type:</label>
                              </div>
                              <div class="nopadding" style="width: 70%; float: left;">
                                <p
                                  class="nopadding"
                                  v-if="$store.state.isSeeker"
                                >Seeking Accomodation</p>
                                <p class="nopadding" v-else>Providing Accomodation</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2" style="margin-top: 10px;">
                    <input
                      class="default-button"
                      value="Edit Profile"
                      v-on:click="edit"
                      v-if="$store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id) && !displayEdit"
                    >
                    <input
                      class="default-button"
                      value="Cancel"
                      v-on:click="cancel"
                      v-if="$store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id) && displayEdit"
                    >
                    <input
                      class="default-button"
                      style="margin-top: 10px;"
                      value="Save"
                      v-on:click="save"
                      v-if="$store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id) && displayEdit"
                    >
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
      error: '',
      displayEdit: false,
      accountType: 'Account Type',
      submitErrors: [],
      seeker: '',
      Form: {
        id: this.$route.params.id,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        isSeeker: null
      }
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
    date(date) {
      return new Date(date)
    },
    edit: function(e) {
      this.displayEdit = true
    },
    cancel: function(e) {
      this.displayEdit = false
    },
    save: async function(e) {
      this.submitErrors = []
      this.displayEdit = false

      if (this.Form.email && !this.validEmail(this.Form.email)){
        this.submitErrors.push('Please write a valid email')
        this.displayEdit = true
      }else{
        this.displayEdit = false
      }
      if (!this.submitErrors.length) {
        try {
          await this.$store.dispatch('editProfile', this.Form)
        } catch (e) {
          this.submitErrors.push(e.message)
        }
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    onChange: function(e) {
      if (this.seeker == 1) {
        this.Form.isSeeker = true
        this.accountType = 'Finding Accommodation'
      } else if (this.seeker == 2) {
        this.Form.isSeeker = false
        this.accountType = 'Listing Accommodation'
      } else {
        if (this.userProfile.isSeeker) {
          this.Form.isSeeker = true
          this.accountType = 'Finding Accommodation'
        } else {
          this.Form.isSeeker = false
          this.accountType = 'Listing Accommodation'
        }
      }
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
}

.item-box {
  background-color: #fff;
  border-radius: 1px;
  padding-top: 20px;
  padding-bottom: 20px;
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
.profile-item-brief {
  padding: 14%;
  margin-top: -15%;
}
.profile-item-brief p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}

.profile-item-brief a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}
.profile-item-brief ul {
  list-style: none;
}

.edit-profile-section {
  padding-top: 50px 10px 10px 10px;
}

.form-control-edit {
  width: 95%;
  margin-right: 5px;
  border: 0.5px solid #ccc;
  border-radius: 1px;
  background-color: #eee;
  padding: 2px 10px;
  display: inline-block;
  box-sizing: border-box;
}
.input-div {
  margin-top: 5px;
}

.input-div label {
  width: 100%;
  text-align: right;
  font-size: 12px;
  font-weight: 430;
  color: #909090;
}

.profile-about {
  width: 100%;
  text-align: left;
  padding-left: 20px;
  padding-bottom: 50px;
}

@media (max-width: 762px) {
  .input-div label {
    text-align: left;
    margin-left: 10px;
    margin-top: 10px;
  }
}

.profile-about label {
  width: 95%;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 450;
}

.profile-about p {
  margin-left: 10px;
  font-size: 13px;
}
</style>

