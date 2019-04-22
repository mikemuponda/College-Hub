<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px;">
    <div class="container-fluid" style="margin-bottom: 20px;">
      <div class="row">
        <div class="col-md-2 dashboard-greeting-display">
          <greetingColumn/>
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-4 dashboard-greeting-display">
              <NuxtLink :to="'/accommodation/find'" title="List your house" style="color: #606060;">
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
              <NuxtLink :to="'/restaurants/find'" title="Find a restaurant" style="color: #606060;">
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
              <NuxtLink :to="'/accommodation/list'" title="List your house" style="color: #606060;">
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
                  <div class="forSeekers" style="width: 100%" v-if="userProfile.isSeeker">
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

                  <div class="forProviders" style="width: 100%" v-if="!userProfile.isSeeker">
                    <div class="houseAvailable" style="width: 100%">
                      <div class="row nopadding" style="width: 100%;">
                        <div class="col-md-12 inner-title-sec">
                          <h2>My Houses</h2>
                        </div>
                      </div>

                      <div style="width: 100%; text-align: center;" v-if="houseExists == false">
                        <p
                          style="margin-top: 30px; color: #000;"
                          class="subheading"
                        >It looks like you haven't listed your space yet</p>
                        <div class="row">
                          <div class="col-md-3"></div>
                          <div class="col-md-6">
                            <NuxtLink :to="'/accommodation/list'" title="List Your House">
                              <button
                                style="margin-bottom: 30px;"
                                class="default-button"
                              >List Your House</button>
                            </NuxtLink>
                          </div>
                          <div class="col-md-3"></div>
                        </div>
                      </div>

                      <div style="width: 100%;" v-if="houseExists == true">
                        <div
                          class="row nopadding feed"
                          v-for="(house, index) in housesOwned"
                          :key="index"
                        >
                          <div class="col-md-12">
                            <div class="row">
                              <div class="col-md-4 rental-image-div">
                                <div
                                  class="ratio img-responsive img-circle resizeHouseimage"
                                  style="background-image: url(/houses/collegehub-alexandra.jpeg); margin-top: 10px;"
                                ></div>
                              </div>
                              <div class="col-md-8">
                                <div class="row">
                                  <div class="col-md-12 houseMobileStyles">
                                    <h3 class="section-subtitle">{{house.title}}</h3>
                                    <p
                                      class="section-small-text"
                                    >{{house.addressSuburb}}, {{house.city}}</p>
                                    <div style="width: 100%; margin-top: 10px;">
                                      <p class="section-small-text">{{house.description}}</p>
                                    </div>
                                    <div class="section-amenities">
                                      <div style="width: 50%; float: left;">
                                        <p class="section-small-text" v-if="house.specificSpaceType == 'Apartment'">
                                          <i class="fas fa-building"></i>
                                          {{house.specificSpaceType}}
                                        </p>
                                        <p class="section-small-text" v-else-if="house.specificSpaceType == 'House'">
                                          <i class="fas fa-home"></i>
                                          {{house.specificSpaceType}}
                                        </p>
                                        <p class="section-small-text" v-else>
                                          <i class="fas fa-hotel"></i>
                                          {{house.specificSpaceType}}
                                        </p>
                                        <p class="section-small-text" v-if="house.amenities.wifi">
                                          <i class="fas fa-wifi"></i> Wifi
                                        </p>
                                        <p class="section-small-text" v-else-if="house.amenities.essentials">
                                          <i class="fas fa-briefcase"></i> Essentials
                                        </p>
                                        <p class="section-small-text" v-else-if="house.amenities.desks">
                                          <i class="fas fa-table"></i> Desks
                                        </p>
                                        <p class="section-small-text" v-else-if="house.amenities.drawer">
                                          <i class="fas fa-archway"></i> Drawers
                                        </p>
                                        <p class="section-small-text" v-else-if="house.amenities.television">
                                            <i class="fas fa-tv"></i> TV
                                        </p>
                                        <p class="section-small-text" v-else-if="house.amenities.locks">
                                            <i class="fas fa-lock"></i> Locks
                                        </p>
                                      </div>
                                      <div style="width: 50%; float: left;">
                                        <p class="section-small-text">
                                          <i class="fas fa-bed"></i>
                                          {{house.bedroomcount}} Bedrooms  
                                        </p>
                                        <p class="section-small-text">
                                          <i class="fas fa-couch"></i>
                                          {{house.furnishStatus}}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12" style="text-align: center; margin-top: 10px;">
                                    <p style="color: #00FF00; font-weight: 400;">{{house.status}}</p>
                                  </div>
                                </div>
                                <div class="row" style="padding-bottom: 20px;">
                                  <div class="col-md-12">
                                    <div class="row">
                                      <div class="col-md-3">
                                        <NuxtLink :to="'/accommodation/view/' + house._id" title="View">
                                          <button class="default-button-small button-green">View</button>
                                        </NuxtLink>
                                      </div>
                                      <div class="col-md-3">
                                        <NuxtLink :to="'/accommodation/edit/' + house._id" title="Edit">
                                          <button class="default-button-small button-blue">Edit</button>
                                        </NuxtLink>
                                      </div>
                                      <div class="col-md-3" v-if="house.status == 'Active'">
                                        <button class="default-button-small button-yellow" v-on:click.prevent="changeHouseStatus(house._id)">Suspend</button>
                                      </div>
                                      <div class="col-md-3" v-else>
                                        <button class="default-button-small button-green" v-on:click.prevent="changeHouseStatus(house._id)">Activate</button>
                                      </div>
                                      <div class="col-md-3">
                                        <button class="default-button-small button-red" v-on:click.prevent="deleteHouse(house._id)">Remove</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style="width: 100%; padding-top: 40px; padding-bottom: 40px;">
                          <div class="row nopadding add-house">
                            <div class="col-md-4"></div>
                            <div class="col-md-4">
                              <NuxtLink :to="'/accommodation/list'" title="Add another house">
                                <button class="default-button">Add another house</button>
                              </NuxtLink>
                            </div>
                            <div class="col-md-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <defaultAdsColumn/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import greetingColumn from '@/components/defaultGreetingColumn'
import defaultAdsColumn from '@/components/defaultAdsColumn'
export default {
  components: {
    greetingColumn: greetingColumn,
    defaultAdsColumn: defaultAdsColumn
  },
  data() {
    return {
      user: '',
      userProfile: '',
      housesOwned: null,
      houseExists: null,
      errors: null,
    }
  },
  methods: {
    async changeHouseStatus(id){
      var index = this.housesOwned.findIndex(house => house._id === id)
      var newStatus = null
      if(this.housesOwned[index].status == 'Suspended')
        newStatus = 'Active'
      else
        newStatus = 'Suspended'
      try{
        if(await this.$store.dispatch('changeHouseStatus', {id: id, status: newStatus})){
          this.housesOwned[index].status = newStatus
        }
      } catch (e) {
        this.errors.push(e.message)
      }
    },
    async deleteHouse(id){
      try{
        if(await this.$store.dispatch('deleteHouse', {id: id})){
          this.houseExists = await this.$store.dispatch('getHousesByID', { id: this.userProfile._id})
          if (this.houseExists.data.message == 'House could not be found')
            this.houseExists = false
          else if (this.houseExists.data.message == '404')
            this.houseExists = false
          else {
            this.housesOwned = null
            this.housesOwned = this.houseExists.data
            this.houseExists = true
          }
        }
      } catch (e) {
        this.errors.push(e.message)
      }
    }
  },
  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    try {
      this.userProfile = await this.$store.dispatch('getProfile', {
        id: this.$store.state.authUser.user.username
      })
      this.userProfile = this.userProfile.data.user
      if (!this.userProfile.isSeeker) {
        this.houseExists = await this.$store.dispatch('getHousesByID', {
          id: this.userProfile._id
        })
        if (this.houseExists.data.message == 'House could not be found')
          this.houseExists = false
        else if (this.houseExists.data.message == '404')
          this.houseExists = false
        else {
          this.housesOwned = this.houseExists.data
          this.houseExists = true
        }
      }
    } catch (e) {
      this.errors.push(e.message)
    }
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 0)
    })
  }
}
</script>

<style>
@media only screen and (max-width: 756px) {
  .resizeHouseimage {
    height: 0;
    padding-bottom: 40%;
    width: 40%;
    margin-left: 30%;
  }
  .houseMobileStyles {
    text-align: center;
  }
}

.button-green{
  background-image: linear-gradient(to right, #7FFF00 , #00FF00);
}

.button-blue{
  background-image: linear-gradient(to right, #1E90FF , #4169E1);
}

.button-yellow{
  background-image: linear-gradient(to right, #FFFF00	 , #FFD700);
}

.button-red{
  background-image: linear-gradient(to right, #FF4500 , #FF0000);
}
</style>
