<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="container">
        <div class="row">
          <div class="col-md-2 dashboard-greeting-display">
            <NuxtLink
              :to="{path: '/profile/' + user.username}"
              title="Profile"
              style="color: #606060;"
            >
              <div class="user-profile">
                <div class="profile-image">
                  <div
                    class="ratio img-responsive img-circle"
                    style="background-image: url(/profile-image/user.jpeg);"
                  ></div>
                </div>
                <br>
                {{user.firstname}} {{user.lastname}}
              </div>
            </NuxtLink>
          </div>
          <div class="col-md-7">
            <div class="container">
              <div class="row default-user-panel" style="margin-top: 5px;">
                <form method="post" style="width: 100%;">
                  <div class="row nopadding" style="width: 100%;">
                    <div class="col-md-12 nopadding" style="margin-top: 10px;">
                      <div class="edit-profile-section profile-head nopadding">
                        <ul class="nav nav-tabs">
                          <li class="nav-item">
                            <a
                              class="nav-link active"
                              style="padding-left: 30px;"
                            >Let’s get started listing your space.</a>
                          </li>
                        </ul>
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

                        <div class="row">
                          <div class="col-md-1"></div>
                          <div class="col-md-5 listing-input-div">
                            <select class="form-control-edit">
                              <option value="Full House">Full House</option>
                              <option value="Cottage">Cottage</option>
                              <option value="Private Room">Private Room</option>
                              <option value="Shared Room">Shared Room</option>
                            </select>
                          </div>
                          <div class="col-md-5 listing-input-div">
                            <select class="form-control-edit">
                              <option value="1">One Room</option>
                              <option value="2">Two Rooms</option>
                              <option value="3">Three Rooms</option>
                              <option value="4">Four Rooms</option>
                              <option value="5">Five Rooms</option>
                              <option value="6">Five Rooms</option>
                              <option value="7">Six Rooms</option>
                              <option value="8">Seven Rooms</option>
                              <option value="9">Eight Rooms</option>
                              <option value="10">Nine Rooms</option>
                            </select>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-1"></div>
                          <div class="col-md-5 listing-input-div">
                            <select class="form-control-edit">
                              <option value="Harare">Harare</option>
                            </select>
                          </div>
                          <div class="col-md-5 listing-input-div">
                            <select class="form-control-edit">
                              <option value="Belgravia">Belgravia</option>
                              <option value="Avenues">Avenues</option>
                            </select>
                          </div>
                        </div>

                        <div class="row" style="margin-top: 50px;">
                          <div class="col-md-12" style="width: 100%;">
                            <div class="container">
                              <div style="float: left; width: 50%;">
                                <button class="default-button" style="width: 100px;">Back</button>
                              </div>
                              <div style="float: left; width: 50%;">
                                <button
                                  class="default-button"
                                  style="width: 100px; float: right;"
                                >Next</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <br>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-3">Hie</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: 'Collegehub | List your house'
    }
  },
  data() {
    return {
      user: '',
      errors: ''
    }
  },
  methods: {},
  created() {
    this.user = this.$store.state.authUser
    this.user = this.user.user
  }
}
</script>

<style>
.listing-input-div {
	margin-top: 5px;
	margin-left: 5px;
}

@media (max-width: 762px) {
  .listing-input-div {
    margin-left: 15px;
  }
}
</style>

