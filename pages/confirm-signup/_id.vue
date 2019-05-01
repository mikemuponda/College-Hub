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
            <div class="row">
              <div class="col-md-4">
                <div class="container">
                  <div class="row">
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
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

.image-box{
  width: 100%;
  height: 100%;
}

.profImage{
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
</style>

<script>
export default {
  data() {
    return {
      error: null,
      userProfile: {},
      uploadFieldName: 'profileImage',
      imageUrl: null,
      profileImage: null,
    }
  },
  mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    this.confirm()
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 400)})
  },
  methods: {
    confirm: async function() {
      var id = this.$route.params.id
      try {
        //await this.$store.dispatch('emailConfirm', { id: id })
        this.userProfile = await this.$store.dispatch('getProfile', { id: 'IamTinashe' })
        this.userProfile = this.userProfile.data.user
        this.error = null
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
  },
  created() {
    this.confirm()
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


