<template>
  <div style="width: 100%; margin-top: 80px;">
    <style>
      :root {
        --imageUrl: url('{{ imageUrl }}');
      }
    </style>
    <div class="container">
      <div class="row">
        <div class="section col-md-12 notification-container-box">
          <div v-if="error" class="confirmation-box alert alert-danger">
            <p class="error">
              <i>{{ error }}</i>
            </p>
          </div>
          <div v-else class="confirmation-box">
            <form method="post" enctype="multipart/form-data">
              <div class="row">
                <div class="col-md-4">
                  <div class="container">
                    <div class="row" style="margin-bottom: 20px;">
                      <div class="col-md-2"></div>
                      <div class="col-md-8">
                        <div class="image-box item-box" style="padding-top: 0px; padding-bottom: 0px;">
                          <div v-bind:class="[ imageUrl ? 'profImage' : 'dropbox' ]">
                            <input 
                              type="file" 
                              :id="uploadFieldName"
                              :ref="uploadFieldName"
                              :name="uploadFieldName"
                              @change="onFileChange"
                              accept="image/*"
                              class="input-file"
                            >
                            <p>
                              Upload Profile Picture
                            </p>
                            <div class="changeImage">
                              <small>Change Image</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2"></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="row" v-if="errors.length">
                    <div class="col-md-12">
                      <div class="alert alert-danger">
                        <ul style="color: #000000;">
                          <li
                            v-for="(error, index) in errors"
                            :item="error"
                            :index="index"
                            :key="error"
                          >{{ error }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="row nopadding" v-else>
                    <div class="col-md-7">
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <input
                          v-model="Form.firstname"
                          type="text"
                          name="firstname"
                          id="firstName"
                          :placeholder="userProfile.firstname"
                        >
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000;" for="firstName">
                          <span class="span-inputConfirm">First Name</span>
                        </label>
                      </div>
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <input
                          v-model="Form.lastname"
                          type="text"
                          name="lastname"
                          id="lastname"
                          :placeholder="userProfile.lastname"
                        >
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000;" for="lastname">
                          <span class="span-inputConfirm">Last Name</span>
                        </label>
                      </div>
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <input
                          v-model="Form.username"
                          type="text"
                          name="username"
                          id="username"
                          :placeholder="userProfile.username"
                          readonly
                        >
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000; margin-top: -15px;" for="username">
                          <span class="span-inputConfirm">Username</span>
                        </label>
                      </div>
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <input
                          v-model="Form.email"
                          type="email"
                          name="email"
                          id="email"
                          :placeholder="userProfile.email"
                          readonly
                        >
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000; margin-top: -15px;" for="email">
                          <span class="span-inputConfirm">Email</span>
                        </label>
                      </div>
                      <div class="row nopadding">
                        <div class="accountTypeRadio col-md-6">
                          <input type="radio" name="radio" id="radio1" value="Student" class="radio" @change="accountType('Student')" checked/>
                          <label for="radio1">Student</label>
                        </div>

                        <div class="accountTypeRadio col-md-6">
                          <input type="radio" name="radio" id="radio2" value="Service Provider" class="radio" @change="accountType('Service Provider')"/>
                          <label for="radio2">Service Provider</label>
                        </div>
                      </div>

                      <div class="row nopadding" v-if="Form.accountType && Form.accountType == 'Service Provider'">
                        <div class="accountTypeRadio col-md-4">
                          <input id="accommodation" type="checkbox" value="accommodation" v-model="accommodation" class="radio">
                          <label for="accommodation" style="font-size: 9px;">Accommodation</label>
                        </div>
                        <div class="accountTypeRadio col-md-4">
                          <input id="taxiOperator" type="checkbox" value="taxi" v-model="taxi" class="radio">
                          <label for="taxiOperator" style="font-size: 9px;">Taxi</label>
                        </div>
                        <div class="accountTypeRadio col-md-4">
                          <input id="restaurants" type="checkbox" value="restaurants" v-model="restaurants" class="radio">
                          <label for="restaurants" style="font-size: 9px;">Restaurants</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <select v-model="Form.city" id="city" @change="displayUniversities()">
                          <option :value="null">Select City</option>
                          <option :value="city" v-for="city in cities" :key="city">{{city}}</option>
                        </select>
                        
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000; margin-top: -20px;" for="city">
                          <span class="span-inputConfirm">City</span>
                        </label>
                      </div>
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <select v-model="Form.university" id="university">
                          <option :value="null">Select University</option>
                          <option :value="university" v-for="university in universities" :key="university">{{university}}</option>
                        </select>
                        
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000; margin-top: -20px;" for="university">
                          <span class="span-inputConfirm">University</span>
                        </label>
                      </div>
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <input
                          v-model="Form.phone"
                          type="tel"
                          name="mobile"
                          id="mobile"
                          placeholder="0777 777 777"
                        >
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000;" for="mobile">
                          <span class="span-inputConfirm">Mobile Number</span>
                        </label>
                      </div>

                      <div class="groupConfirm" style="margin-top: 30px;">
                        <select v-model="Form.sex" id="sex">
                          <option :value="null">Select Sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000; margin-top: -20px;" for="sex">
                          <span class="span-inputConfirm">Sex</span>
                        </label>
                      </div>
                      
                      <div class="groupConfirm" style="margin-top: 30px;">
                        <textarea
                          v-model="Form.bio"
                          name="bio"
                          id="bio"
                          placeholder="Short Description about yourself"
                          rows="5"
                          style="width: 100%; border-radius: 1px; border: 0.5px solid #aaa; font-size: 10px; padding: 5px;"
                        >
                          Enter your text here...
                        </textarea>
                        <span class="highlightConfirm"></span>
                        <span class="barConfirm"></span>
                        <label style="color: #000; margin-top: -20px;" for="bio">
                          <span class="span-inputConfirm">Bio</span>
                        </label>
                      </div>
                    </div>

                    <div class="row" style="width: 100%;">
                      <div class="col-md-3"></div>
                      <div class="col-md-6">
                        <button
                          class="default-button"
                          style="margin-top: 10px;"
                          value="Save"
                          v-on:click.prevent="save()"
                        >Save</button>
                      </div>
                      <div class="col-md-3"></div>
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
</template>

<script>
import data from '~/locales/zw.json'

export default {
  data() {
    return {
      error: null,
      errors: [],
      userProfile: {},
      uploadFieldName: 'profileImage',
      imageUrl: null,
      profileImage: null,
      accommodation: null,
      taxi: null,
      restaurants: null,
      locale: {},
      cities: [],
      universities: [],
      Form: {
        id: null,
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        sex: null,
        dob: null,
        phone: null,
        accountType: null,
        services: [],
        isSeeker: null,
        university: null,
        city: null,
        bio: null
      }
    }
  },
  mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    this.Form.firstname = this.userProfile.firstname
    this.Form.lastname = this.userProfile.lastname
    this.Form.username = this.userProfile.username
    this.Form.email = this.userProfile.email
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 400)})
  },
  methods: {
    accountType(accountType){
      this.Form.accountType = accountType
    },
    pushServices(){
      if(this.Form.accountType != 'Student'){
        if(this.accommodation && this.accommodation != '')
          this.Form.services.push({accommodation: true})
        if(this.taxi && this.taxi != '')
          this.Form.services.push({taxi: true})
        if(this.restaurants && this.restaurants != '')
          this.Form.services.push({restaurants: true})
      }
    },
    displayUniversities(){
      this.universities = []
      var index, i
      for(index in this.locale.cities){
        if(this.locale.cities[index].name == this.Form.city){
          for(i in this.locale.cities[index].universities){
            this.universities.push(this.locale.cities[index].universities[i].name)
          }
        }
      }
    },
    confirm: async function() {
      var id = this.$route.params.id
      try {
        this.error = null
        await this.$store.dispatch('emailConfirm', { id: id })
        if(!this.userProfile){
          this.error = 'User could not be found. Please contact Support'
        }
      } catch (e) {
        this.error = e.message
      }
    },
    onFileChange(e) {
      var file = e.target.files[0]
      file.renameFile = this.userProfile._id + '.' + file.name.split('.').pop()
      this.profileImage = file
      this.imageUrl = URL.createObjectURL(file)
    },
    async save(){
      this.errors = []
      this.pushServices()
      if (!this.errors.length) {
        this.Form.id = this.userProfile.username
        let formData = new FormData()
        formData.append('profileImage', this.profileImage)
        formData.append('id', this.userProfile.username)
        try {
          if (this.profileImage)
            await this.$store.dispatch('profileImage', { formData: formData, id: this.userProfile.username})
          await this.$store.dispatch('editProfile', this.Form)
        } catch (e) {
          this.errors.push(e.message)
        }
        window.location.replace("/")
      }
    }
  },
  created() {
    this.userProfile = this.$store.state.authUser.user
    this.confirm()
    this.locale = data.locale
    var index
    for(index in this.locale.cities){
      this.cities.push(this.locale.cities[index].name)
    }
  },
  head() {
    return {
      title: 'Confirm Your Account | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Confirm your account to have access to a range of services that Collegehub provides. Collegehub Zimbabwe offers easy access to accomodation, taxis restaurants, upcoming events, and a marketplace for buying and selling'
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/confirm-signup/'
        }
      ],
    }
  }
}
</script>

<style>
.notification-container-box {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 2px;
  padding-bottom: 50px;
}

.confirmation-box {
  margin-top: 50px;
  margin-bottom: 10px;
  border-radius: 2px;
}

.image-box {
  width: 100%;
  height: 100%;
}

.profImage {
  outline-offset: -10px;
  background-image: var(--imageUrl);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  cursor: pointer;
  width: 209px;
  height: 209px;
  border-radius: 50%;
}

.changeImage{
  background: rgba(258, 258, 258, 0.4);
  width: 100%;
  height: 30%;
  bottom: 0px;
  position: absolute;
  text-align: center;
  border-top: 0.5px solid #ffffff;
}

.changeImage small{
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
}

.profImage p{
  display: none;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.dropbox .changeImage{
  display: none;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.groupConfirm {
  position: relative;
  margin-bottom: 45px;
}

.groupConfirm input {
  font-size: 14px;
  padding: 1px 10px 10px 10px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 0.5px solid #aaa;
  background: none;
  color: #000;
}

.groupConfirm select {
  font-size: 14px;
  padding: 1px 10px 10px 10px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 0.5px solid #aaa;
  background: none;
  color: #000;
}

.groupConfirm input:focus {
  outline: none;
}

.groupConfirm select:focus {
  outline: none;
}

/* LABEL ======================================= */


.groupConfirm label {
  color: #000;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  pointer-events: none;
  left: 1px;
  top: 1px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active status */

.groupConfirm input:focus~label {
  top: -20px;
  font-size: 12px;
  color: #aaa;
  font-weight: 300;
}

.groupConfirm select:focus~label {
  top: -20px;
  font-size: 12px;
  color: #aaa;
  font-weight: 300;
}

/* BOTTOM BARS ================================= */

.barConfirm {
  position: relative;
  display: block;
  width: 100%;
}

.barConfirm:before,
.barConfirm:after {
  content: '';
  height: 0.5px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #aaa;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.barConfirm:before {
  left: 50%;
}

.barConfirm:after {
  right: 50%;
}

/* active status barConfirm */

.groupConfirm input:focus~.barConfirm:before,
.groupConfirm input:focus~.barConfirm:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */

.highlightConfirm {
  position: absolute;
  height: 0%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active durum */

.groupConfirm input:focus~.highlightConfirm {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/* form animasyon ================ */

@-webkit-keyframes inputHighlighter {
  from {
    background: #aaa;
  }

  to {
    width: 0;
    background: transparent;
  }
}

@-moz-keyframes inputHighlighter {
  from {
    background: #aaa;
  }

  to {
    width: 0;
    background: transparent;
  }
}

@keyframes inputHighlighter {
  from {
    background: #aaa;
  }

  to {
    width: 0;
    background: transparent;
  }
}

.span-inputConfirm {
  margin-left: 10px;
  position: relative;
  top: -5px;
}

.accountTypeRadio{
  clear: both;
}

.accountTypeRadio label{
  width: 100%;
  border-radius: 3px;
  border: 0.5px solid #D1D3D4;
}

/* hide input */
input.radio:empty {
	margin-left: -999px;
}

/* style label */
input.radio:empty ~ label {
	position: relative;
	float: left;
	line-height: 2.5em;
	text-indent: 3.25em;
	margin-top: 2em;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
  user-select: none;
  color: #aaa;
}

input.radio:empty ~ label:before {
	position: absolute;
	display: block;
	top: 0;
	bottom: 0;
	left: 0;
	content: '';
	width: 2.5em;
	background: #D1D3D4;
	border-radius: 3px 0 0 3px;
}

/* toggle hover */
input.radio:hover:not(:checked) ~ label:before {
	content:'\2714';
	text-indent: .9em;
	color: #aaa;
}

input.radio:hover:not(:checked) ~ label {
	color: #888;
}

/* toggle on */
input.radio:checked ~ label:before {
	content:'\2714';
	text-indent: .9em;
	color: #9CE2AE;
	background-color: #4DCB6D;
}

input.radio:checked ~ label {
	color: #777;
}

/* radio focus */
input.radio:focus ~ label:before {
	box-shadow: 0 0 0 3px #999;
}
</style>


