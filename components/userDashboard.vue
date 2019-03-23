<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="container">
        <div class="row">
          <div class="col-md-2 dashboard-greeting-display">
            <greetingColumn/>
          </div>
          <div class="col-md-10">
            <div class="row">
              <div class="col-md-4 dashboard-greeting-display">
                <NuxtLink :to="'/houses/find'" title="List your house" style="color: #606060;">
                  <div class="row nopadding feature">
                    <div class="nopadding" style="width: 40%; float: left;">
                      <img
                        class="img-fluid mb-3 mb-md-0 feature-img"
                        src="/img/collegehub-from-mobile.jpeg"
                        alt="List your house"
                      >
                    </div>
                    <div style="width: 60%; float: left;">
                      <p class="feature-text">Looking for a house?</p>
                      <p class="feature-heading">Find a house</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>

              <div class="col-md-4 dashboard-greeting-display">
                <NuxtLink :to="'/taxi/find'" title="Get a Taxi" style="color: #606060;">
                  <div class="row nopadding feature">
                    <div class="nopadding" style="width: 40%; float: left;">
                      <img
                        class="img-fluid mb-3 mb-md-0 feature-img"
                        src="/img/collegehub-taxi.jpeg"
                        alt="Get a Taxi"
                      >
                    </div>
                    <div style="width: 60%; float: left;">
                      <p class="feature-text">Going somewhere?</p>
                      <p class="feature-heading">Get a Taxi</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>

              <div class="col-md-4 dashboard-greeting-display">
                <NuxtLink
                  :to="'/restaurants/find'"
                  title="Find a restaurant"
                  style="color: #606060;"
                >
                  <div class="row nopadding feature">
                    <div class="nopadding" style="width: 40%; float: left;">
                      <img
                        class="img-fluid mb-3 mb-md-0 feature-img"
                        src="/img/collegehub-restaurants.jpeg"
                        alt="Find a restaurant"
                      >
                    </div>
                    <div style="width: 60%; float: left;">
                      <p class="feature-text">Feeling hungry?</p>
                      <p class="feature-heading">Find a Restaurant</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 dashboard-greeting-display">
                <NuxtLink :to="'/houses/list'" title="List your house" style="color: #606060;">
                  <div class="row nopadding feature">
                    <div class="nopadding" style="width: 40%; float: left;">
                      <img
                        class="img-fluid mb-3 mb-md-0 feature-img"
                        src="/img/collegehub-house.jpeg"
                        alt="List your house"
                      >
                    </div>
                    <div style="width: 60%; float: left;">
                      <p class="feature-text">Renting a house?</p>
                      <p class="feature-heading">List your house</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-4 dashboard-greeting-display">
                <NuxtLink :to="'/taxi/list'" title="List your taxi" style="color: #606060;">
                  <div class="row nopadding feature">
                    <div class="nopadding" style="width: 40%; float: left;">
                      <img
                        class="img-fluid mb-3 mb-md-0 feature-img"
                        src="/img/collegehub-taxi.jpeg"
                        alt="List your taxi"
                      >
                    </div>
                    <div style="width: 60%; float: left;">
                      <p class="feature-text">Own a Taxi?</p>
                      <p class="feature-heading">List your taxi</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-4 dashboard-greeting-display">
                <NuxtLink
                  :to="'/restaurants/list'"
                  title="Add your restaurant"
                  style="color: #606060;"
                >
                  <div class="row nopadding feature">
                    <div class="nopadding" style="width: 40%; float: left;">
                      <img
                        class="img-fluid mb-3 mb-md-0 feature-img"
                        src="/img/collegehub-restaurants.jpeg"
                        alt="Add your restaurant"
                      >
                    </div>
                    <div style="width: 60%; float: left;">
                      <p class="feature-text">You run a restaurant?</p>
                      <p class="feature-heading">List your restaurant</p>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <div class="row" style="margin-top: 20px;">
              <div class="col-md-8">
                <div class="row nopadding default-user-panel">
                  <div
                    class="row nopadding alert alert-success"
                    v-if="!$store.state.authUser.user.isConfirmed"
                  >
                    <div class="col-md-12">
                      <h2 class="section-title">Hi, {{$store.state.authUser.user.firstname}}</h2>
                      <p style="font-size: 13px;">
                        Please note that your account has not been confirmed yet therefore you will not be able
                        to use this service. We sent an email with a confirmation link to: {{$store.state.authUser.user.email}}.
                        <br>Follow the link in the email, otherwise contact support.
                      </p>
                    </div>
                  </div>

                  <div style="width: 100%;" v-else>
                    <div class="row nopadding" style="width: 100%;">
                      <div class="col-md-12 inner-title-sec">
                        <h2>Rental Requests</h2>
                      </div>
                    </div>

                    <div class="row nopadding feed">
                      <div class="col-md-12">
                        <div class="rental-image-div" style="width: 20%; float: left;">
                          <div
                            class="ratio img-responsive img-circle"
                            style="background-image: url(/houses/collegehub-alexandra.jpeg);"
                          ></div>
                        </div>
                        <div class="-div" style="width: 80%; float: left;">
                          <div class="row">
                            <div class="col-md-8">
                              <h3 class="section-subtitle">Avondale, Harare</h3>
                              <p
                                class="section-small-text"
                              >King George Street &#8811; Avondale &#8811; Harare</p>
                              <div class="section-amenities">
                                <div style="width: 50%; float: left;">
                                  <p class="section-small-text">
                                    <i class="fas fa-graduation-cap"></i>UZ (10 minutes)
                                  </p>
                                  <p class="section-small-text">
                                    <i class="fas fa-wifi"></i>Wifi
                                  </p>
                                </div>
                                <div style="width: 50%; float: left;">
                                  <p class="section-small-text">
                                    <i class="fas fa-bed"></i>
                                    2 Bedrooms
                                  </p>
                                  <p class="section-small-text">
                                    <i class="fas fa-couch"></i>
                                    Furnished
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="rental-alert">
                                <h2 class="success">Approved</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row nopadding feed">
                      <div class="col-md-12">
                        <div class="rental-image-div" style="width: 20%; float: left;">
                          <div
                            class="ratio img-responsive img-circle"
                            style="background-image: url(/houses/house-four.jpeg);"
                          ></div>
                        </div>
                        <div class="-div" style="width: 80%; float: left;">
                          <div class="row">
                            <div class="col-md-8">
                              <h3 class="section-subtitle">Avenues, Harare</h3>
                              <p
                                class="section-small-text"
                              >Baines Street &#8811; Avenues &#8811; Harare</p>
                              <div class="section-amenities">
                                <div style="width: 50%; float: left;">
                                  <p class="section-small-text">
                                    <i class="fas fa-graduation-cap"></i>UZ (10 minutes)
                                  </p>
                                  <p class="section-small-text">
                                    <i class="fas fa-wifi"></i>Wifi
                                  </p>
                                </div>
                                <div style="width: 50%; float: left;">
                                  <p class="section-small-text">
                                    <i class="fas fa-bed"></i>
                                    1 Bedroom
                                  </p>
                                  <p class="section-small-text">
                                    <i class="fas fa-couch"></i>
                                    Furnished
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="rental-alert">
                                <h2 class="danger">Disapproved</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">Ads and Suggestions will come here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import greetingColumn from '@/components/defaultGreetingColumn'
export default {
  components: {
    greetingColumn: greetingColumn
  },
  data() {
    return {
      user: '',
      userProfile: ''
    }
  },
  async created() {
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$store.state.authUser.user.username
      })
      this.userProfile = this.userProfile.data.user
    } catch (e) {
      this.error = e.message
    }
  }
}
</script>