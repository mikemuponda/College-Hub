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
              <form method="post" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-4" style="margin-top: 10px;">
                    <div class="profile-img item-box">
                      <div
                        v-if="userProfile.profileImage && !imageUrl"
                        class="ratio img-responsive img-circle profImagePosition"
                        :title="userProfile.firstname + ' ' + userProfile.lastname"
                        :alt="userProfile.firstname + ' ' + userProfile.lastname"
                        v-bind:style="{
                          backgroundImage: 'url(' + userProfile.profileImage.path + ')'
                        }"
                      ></div>
                      <div
                        v-else-if="imageUrl"
                        class="ratio img-responsive img-circle profImagePosition"
                        :title="userProfile.firstname + ' ' + userProfile.lastname"
                        :alt="userProfile.firstname + ' ' + userProfile.lastname"
                        v-bind:style="{
                          backgroundImage: 'url(' + imageUrl + ')'
                        }"
                      ></div>
                      <div
                        v-else
                        class="ratio img-responsive img-circle profImagePosition"
                        style="background-image: url(/profileImages/user.png);"
                        :title="userProfile.firstname + ' ' + userProfile.lastname"
                        :alt="userProfile.firstname + ' ' + userProfile.lastname"
                      ></div>
                      <div
                        class="file btn btn-lg btn-primary"
                        v-if="displayEdit && $store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id)"
                      >
                        Change Photo
                        <input
                          type="file"
                          :id="uploadFieldName"
                          :ref="uploadFieldName"
                          :name="uploadFieldName"
                          @change="onFileChange"
                          accept="image/*"
                        >
                      </div>
                      <div class="profile-item-brief" style="text-align: left;">
                        <p>Brief Description here</p>
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
                            :placeholder="userProfile.email"
                            v-model="Form.email"
                          >
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="phone">Phone</label>
                        </div>
                        <div class="col-md-6">
                          <input
                            type="phone"
                            class="form-control-edit"
                            id="phone"
                            name="phone"
                            :placeholder="userProfile.phone"
                            v-model="Form.phone"
                          >
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="dob">Date of Birth</label>
                        </div>
                        <div class="col-md-6">
                          <input
                            type="date"
                            class="form-control-edit"
                            id="dob"
                            :placeholder="userProfile.dob"
                            v-model="Form.dob"
                            style="height: 30px;"
                          >
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="sex">Sex</label>
                        </div>
                        <div class="col-md-6">
                          <select id="sex" class="form-control-edit" v-model="Form.sex">
                            <option :value="null">Sex</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                          </select>
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="accountType">Account Type</label>
                        </div>
                        <div class="col-md-6">
                          <select id="accountType" @change="onChange($event)" class="form-control-edit" v-model="seeker">
                            <option :value="null">Account Type</option>
                            <option value="1">Finding Accomodation</option>
                            <option value="2">Sharing a House</option>
                          </select>
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="city">City</label>
                        </div>
                        <div class="col-md-6">
                          <select id="city" class="form-control-edit" v-model="Form.city">
                            <option :value="null">Select City</option>
                            <option value="Harare">Harare</option>
                            <option value="Bulawayo">Bulawayo</option>
                            <option value="Gweru">Gweru</option>
                            <option value="Mutare">Mutare</option>
                            <option value="Masvingo">Masvingo</option>
                            <option value="Marondera">Marondera</option>
                            <option value="Chinhoyi">Chinhoyi</option>
                            <option value="Bindura">Bindura</option>
                            <option value="Gwanda">Gwanda</option>
                            <option value="Lupane">Lupane</option>
                          </select>
                        </div>
                      </div>
                      <div class="row input-div">
                        <div class="col-md-4">
                          <label for="university">University</label>
                        </div>
                        <div class="col-md-6">
                          <select id="university" class="form-control-edit" v-model="Form.university">
                            <option :value="null">Select University</option>
                            <option v-if="Form.city=='Harare'" value="University of Zimbabwe">University of Zimbabwe</option>
                            <option v-if="Form.city=='Harare'" value="Harare Institute of Technology">Harare Institute of Technology</option>
                            <option v-if="Form.city=='Harare'" value="Women's University in Africa">Women's University in Africa</option>
                            <option v-if="Form.city=='Harare'" value="Zimbabwe Open University">Zimbabwe Open University</option>
                            <option v-if="Form.city=='Harare'" value="Catholic University in Zimbabwe">Catholic University in Zimbabwe</option>
                            <option v-if="Form.city=='Harare'" value="Southern Africa Methodist University">Southern Africa Methodist University</option>
                            <option v-if="Form.city=='Bulawayo'" value="National University of Science and Technology">National University of Science and Technology</option>
                            <option v-if="Form.city=='Bulawayo'" value="Solusi University">Solusi University</option>
                            <option v-if="Form.city=='Bulawayo'" value="Gwanda State University">Gwanda State University</option>
                            <option v-if="Form.city=='Gweru'" value="Midlands State University">Midlands State University</option>
                            <option v-if="Form.city=='Mutare'" value="Africa University">Africa University</option>
                            <option v-if="Form.city=='Mutare'" value="Manicaland University of Science and Technology">Manicaland University of Science and Technology</option>
                            <option v-if="Form.city=='Masvingo'" value="Great Zimbabwe University">Great Zimbabwe University</option>
                            <option v-if="Form.city=='Masvingo'" value="Reformed Church University">Reformed Church University</option>
                            <option v-if="Form.city=='Marondera'" value="Marondera University of Agricultural Sciences and Technology">Marondera University of Agricultural Sciences and Technology</option>
                            <option v-if="Form.city=='Marondera'" value="Women's University in Africa">Women's University in Africa</option>
                            <option v-if="Form.city=='Chinhoyi'" value="Chinhoyi University of Technology">Chinhoyi University of Technology</option>
                            <option v-if="Form.city=='Bindura'" value="Bindura University of Science Education">Bindura University of Science Education</option>
                            <option v-if="Form.city=='Bindura'" value="Zimbabwe Ezekiel Guti University">Zimbabwe Ezekiel Guti University</option>
                            <option v-if="Form.city=='Gwanda'" value="Gwanda State University">Gwanda State University</option>
                            <option v-if="Form.city=='Lupane'" value="Lupane State University">Lupane State University</option>
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
                          <div class="col-md-12 nopadding" style="border-bottom: 0.5px solid #eee;">
                            <div class="nopadding" style="width: 30%; float: left;">
                              <label class="nopadding">Username:</label>
                            </div>
                            <div class="nopadding" style="width: 70%; float: left;">
                              <NuxtLink
                                :to="{path: '/profile/' + userProfile.username}"
                                :title="userProfile.username"
                                style="color: #000;"
                              >
                                <p class="nopadding">{{userProfile.username}}</p>
                              </NuxtLink>
                            </div>
                          </div>
                        </div>
                        <div class="row nopadding">
                          <div class="col-md-12 nopadding" style="border-bottom: 0.5px solid #eee;">
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
                          <div class="col-md-12 nopadding" style="border-bottom: 0.5px solid #eee;">
                            <div class="nopadding" style="width: 30%; float: left;">
                              <label class="nopadding">Sex:</label>
                            </div>
                            <div class="nopadding" style="width: 70%; float: left;">
                              <p class="nopadding">{{userProfile.sex}}</p>
                            </div>
                          </div>
                        </div>
                        <div class="row nopadding">
                          <div class="col-md-12 nopadding" style="border-bottom: 0.5px solid #eee;">
                            <div class="nopadding" style="width: 30%; float: left;">
                              <label class="nopadding">Joined:</label>
                            </div>
                            <div class="nopadding" style="width: 70%; float: left;">
                              <p class="nopadding">{{date(userProfile.createdAt)}}</p>
                            </div>
                          </div>
                        </div>
                        <div class="row nopadding">
                          <div class="col-md-12 nopadding" style="border-bottom: 0.5px solid #eee;">
                            <div class="nopadding" style="width: 30%; float: left;">
                              <label class="nopadding">City:</label>
                            </div>
                            <div class="nopadding" style="width: 70%; float: left;">
                              <p class="nopadding">{{userProfile.city}}</p>
                            </div>
                          </div>
                        </div>
                        <div class="sensitive" v-if="$store.state.authUser">
                          <div class="row nopadding">
                            <div
                              class="col-md-12 nopadding"
                              style="border-bottom: 0.5px solid #eee;"
                            >
                              <div class="nopadding" style="width: 30%; float: left;">
                                <label class="nopadding">University:</label>
                              </div>
                              <div class="nopadding" style="width: 70%; float: left;">
                                <p class="nopadding">{{userProfile.university}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row nopadding">
                            <div
                              class="col-md-12 nopadding"
                              style="border-bottom: 0.5px solid #eee;"
                            >
                              <div class="nopadding" style="width: 30%; float: left;">
                                <label class="nopadding">D.o.B:</label>
                              </div>
                              <div class="nopadding" style="width: 70%; float: left;">
                                <p class="nopadding">{{date(userProfile.dob)}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row nopadding">
                            <div
                              class="col-md-12 nopadding"
                              style="border-bottom: 0.5px solid #eee;"
                            >
                              <div class="nopadding" style="width: 30%; float: left;">
                                <label class="nopadding">Email:</label>
                              </div>
                              <div class="nopadding" style="width: 70%; float: left;">
                                <p class="nopadding">{{userProfile.email}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row nopadding">
                            <div
                              class="col-md-12 nopadding"
                              style="border-bottom: 0.5px solid #eee;"
                            >
                              <div class="nopadding" style="width: 30%; float: left;">
                                <label class="nopadding">Phone:</label>
                              </div>
                              <div class="nopadding" style="width: 70%; float: left;">
                                <p class="nopadding">{{userProfile.phone}}</p>
                              </div>
                            </div>
                          </div>
                          <div class="row nopadding">
                            <div
                              class="col-md-12 nopadding"
                              style="border-bottom: 0.5px solid #eee;"
                            >
                              <div class="nopadding" style="width: 30%; float: left;">
                                <label class="nopadding">Account Type:</label>
                              </div>
                              <div class="nopadding" style="width: 70%; float: left;">
                                <p
                                  class="nopadding"
                                  v-if="userProfile.isSeeker"
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
                    <button
                      class="default-button"
                      value="Edit"
                      style="margin-top: 10px;"
                      v-on:click.prevent="edit"
                      v-if="$store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id) && !displayEdit"
                    >Edit</button>
                    <button
                      class="default-button"
                      value="Cancel"
                      style="margin-top: 10px;"
                      v-on:click.prevent="cancel"
                      v-if="$store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id) && displayEdit"
                    >Cancel</button>
                    <button
                      class="default-button"
                      style="margin-top: 10px;"
                      value="Save"
                      v-on:click="save"
                      v-if="$store.state.authUser && ($store.state.authUser.user.username == this.$route.params.id) && displayEdit"
                    >Save</button>
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

<style>
.profImagePosition {
  margin-left: 10%;
}
</style>


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
      accountType: null,
      submitErrors: [],
      seeker: null,
      Form: {
        id: this.$route.params.id,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        sex: null,
        dob: null,
        phone: null,
        isSeeker: null,
        university: null,
        city: null
      },
      profileImage: null,
      uploadFieldName: 'profileImage',
      imageUrl: null
    }
  },
  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$route.params.id
      })
      this.userProfile = this.userProfile.data.user
    } catch (e) {
      this.error = e.message
    }
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 0)
    })
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
    onFileChange(e) {
      var file = e.target.files[0]
      file.renameFile = this.userProfile._id + '.' + file.name.split('.').pop()
      this.profileImage = file
      this.imageUrl = URL.createObjectURL(file)
    },
    save: async function(e) {
      this.submitErrors = []
      this.displayEdit = false

      if (this.Form.email && !this.validEmail(this.Form.email)) {
        this.submitErrors.push('Please write a valid email')
        this.displayEdit = true
      } else {
        this.displayEdit = false
      }
      if (!this.submitErrors.length) {
        let formData = new FormData()
        formData.append('profileImage', this.profileImage)
        formData.append('id', this.id)
        try {
          if (this.profileImage)
            await this.$store.dispatch('profileImage', {
              formData: formData,
              id: this.userProfile.username
            })

          await this.$store.dispatch('editProfile', this.Form)
          window.location.reload(true)
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
