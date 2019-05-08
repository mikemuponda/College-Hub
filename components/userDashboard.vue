<template>
  <div style="width: 100%; background: #eee; padding-bottom: 20px; margin-top: 80px;">
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
                  <div class="forSeekers" style="width: 100%" v-if="userProfile.accountType == 'Student'">
                    <div class="row" v-if="!userProfile.allRequests || userProfile.allRequests.length == 0">
                      
                      <div style="width: 100%; padding-top: 40px; padding-bottom: 40px; text-align: center;">
                        <p style="margin-top: 30px; color: #000;" class="subheading" >It looks like you haven't made any requests to rent</p>
                        <div class="row nopadding add-house">
                          <div class="col-md-4"></div>
                          <div class="col-md-4">
                            <button class="default-button" @click="searchAccommodation()">Find Accommodation</button>
                          </div>
                          <div class="col-md-4"></div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="row nopadding" style="width: 100%;">
                        <div class="col-md-12 inner-title-sec">
                          <h2>Rental Requests</h2>
                        </div>
                      </div>

                      <div style="width: 100%;" v-if="requestedHouses && this.requestedHouses.length > 0">
                        <div
                          class="row nopadding feed"
                          v-for="(house, index) in requestedHouses"
                          :key="index"
                        >
                          <div class="col-md-12">
                            <div class="row">
                              <div class="col-md-4 rental-image-div">
                                <div style="margin-top: 10px; margin-left: 10px;">
                                  <b-carousel
                                    :id="house._id"
                                    :interval="0"
                                    controls
                                    indicators
                                    background="#ffffff"
                                    img-width="100%"
                                    img-height="100%"
                                    style="height: 120px; overflow: hidden; border-radius: 1px;"
                                  >
                                    <b-carousel-slide
                                      v-for="(image, index) in house.accommodationImages"
                                      :key="index"
                                      :alt="house.title"
                                      :img-src="image.path"
                                    ></b-carousel-slide> 
                                  </b-carousel>
                                </div>
                              </div>
                              <div class="col-md-8">
                                <div class="row">
                                  <div class="col-md-12 houseMobileStyles">
                                    <h3 class="section-subtitle">{{house.title}}</h3>
                                    <p
                                      class="section-small-text"
                                    >{{house.addressSuburb}}, {{house.city}}</p>
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
                              </div>
                            </div>
                            <hr>
                            <div class="row" style="width: 100%;">
                              <div class="col-md-12">
                                <div class="row">
                                  <div class="col-md-12" style="text-align: center;" v-for="request in house.allRequests" :key="request.requestID">
                                    <p style="font-weight: 400; font-size: 14px;" v-if="request.requester == userProfile._id">Request Status: {{request.requestStatus}}</p>
                                  </div>
                                </div>
                                <div class="row" style="padding-bottom: 20px;">
                                  <div class="col-md-12">
                                    <div class="row">
                                      <div class="col-md-1"></div>
                                      <div class="col-md-4">
                                        <NuxtLink :to="'/accommodation/view/' + house._id" title="View">
                                          <button class="default-button-small button-green">View House</button>
                                        </NuxtLink>
                                      </div>
                                      <div class="col-md-2"></div>
                                      <div class="col-md-4" v-for="request in house.allRequests" :key="request.requestID">
                                        <a href="#cancel-request" v-if="request.requester == userProfile._id && request.requestStatus == 'pending'"><button class="default-button-small button-red">Cancel Request</button></a>
                                        <a href="#resend-request" v-else-if="request.requester == userProfile._id && request.requestStatus == 'Cancelled'"><button class="default-button-small button-red">Resend Request</button></a>
                                        
                                        <div id="cancel-request" class="modal-window">
                                          <div>
                                            <a href="#cancel-request-close" title="Close" class="modal-close">close &times;</a>
                                            <div class="modal-text">Are you sure you want to cancel request?</div>
                                            <button class="default-button-small button-red" v-on:click.prevent="modifyRequest(house._id, 'Cancelled')">Yes</button>
                                          </div>
                                        </div>
                                        <div id="resend-request" class="modal-window">
                                          <div>
                                            <a href="#resend-request-close" title="Close" class="modal-close">close &times;</a>
                                            <div class="modal-text">Are you sure you want to resend this request?</div>
                                            <button class="default-button-small button-red" v-on:click.prevent="modifyRequest(house._id, 'pending')">Yes</button>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-md-1"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style="width: 100%; padding-top: 40px; padding-bottom: 40px; text-align: center;">
                        <div class="row nopadding add-house">
                          <div class="col-md-4"></div>
                          <div class="col-md-4">
                            <button class="default-button" @click="searchAccommodation()">Find Accommodation</button>
                          </div>
                          <div class="col-md-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="forProviders" style="width: 100%" v-else>
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
                                <div style="margin-top: 10px;">
                                  <b-carousel
                                    :id="house._id"
                                    :interval="0"
                                    controls
                                    indicators
                                    background="#ffffff"
                                    img-width="100%"
                                    img-height="100%"
                                    style="height: 120px; overflow: hidden; border-radius: 1px;"
                                  >
                                    <b-carousel-slide
                                      v-for="(image, index) in house.accommodationImages"
                                      :key="index"
                                      :alt="house.title"
                                      :img-src="image.path"
                                    ></b-carousel-slide> 
                                  </b-carousel>
                                </div>
                              </div>
                              <div class="col-md-8">
                                <div class="row">
                                  <div class="col-md-12 houseMobileStyles">
                                    <h3 class="section-subtitle">{{house.title}}</h3>
                                    <p
                                      class="section-small-text"
                                    >{{house.addressSuburb}}, {{house.city}}</p>
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
                              </div>
                            </div>
                            <hr>
                            <div class="row" style="width: 100%;">
                              <div class="col-md-12">
                                <div class="row">
                                  <div class="col-md-12" style="text-align: center;">
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
                                        <a href="#suspend-house"><button class="default-button-small button-yellow">Suspend</button></a>
                                      </div>
                                      <div class="col-md-3" v-else>
                                        <a href="#suspend-house"><button class="default-button-small button-green">Activate</button></a>
                                      </div>
          
                                        <div id="suspend-house" class="modal-window">
                                          <div>
                                            <a href="#suspend-house-close" title="Close" class="modal-close">close &times;</a>
                                            <div class="modal-text">Are you sure you want to change the status of your Space?</div>
                                            <button class="default-button-small button-red" v-on:click.prevent="changeHouseStatus(house._id)">Yes, Change Status</button>
                                          </div>
                                        </div>
                                      <div class="col-md-3">
                                        <a href="#delete-house" v-if="house.status == 'Active' || house.status == 'Suspended'"><button class="default-button-small button-red">Remove</button></a>
                                        <div id="delete-house" class="modal-window">
                                          <div>
                                            <a href="#delete-house-close" title="Close" class="modal-close">close &times;</a>
                                            <div class="modal-text">Are you sure you want to remove this listed Space?</div>
                                            <button class="default-button-small button-red" v-on:click.prevent="deleteHouse(house._id)">Yes, Remove</button>
                                          </div>
                                        </div>
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
      requestedHouses: [],
    }
  },
  methods: {
    searchAccommodation() {
      window.location.href = '/accommodation/find/?city=' + this.userProfile.city + '&suburb=allsuburbs'
    },
    async modifyRequest(houseID, action){
      var index
      for(index in this.userProfile.allRequests){
        if(this.userProfile.allRequests[index].requestedHouseID == houseID){
          this.userProfile.allRequests[index].requestStatus = action
          try{
            this.userProfile = await this.$store.dispatch('modifyRequestToRentUser', {Form: this.userProfile.allRequests[index]})
            this.userProfile = this.userProfile.data.user
            await this.$store.dispatch('modifyRequestToRentHouse', {Form: this.userProfile.allRequests[index]})
          }catch(e){
            this.errors.push(e)
          }
        }
      }
      this.getData()
    },

    async getData(){
      this.$nextTick(() => { this.$nuxt.$loading.start() })
      this.requestedHouses = []
       try {
        this.userProfile = await this.$store.dispatch('getProfile', { id: this.$store.state.authUser.user.username })
        this.userProfile = this.userProfile.data.user
        var index
        for(index in this.userProfile.allRequests){
          var request = await this.$store.dispatch('getOneHouse', { id: this.userProfile.allRequests[index].requestedHouseID })
          if(request.data && request.data.length > 0){
            this.requestedHouses.push(request.data.house)
          }   
        }
        if (this.userProfile.accountType != 'Student') {
          this.houseExists = await this.$store.dispatch('getHousesByID', { id: this.userProfile._id })
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
        this.errors.push(e)
      }
      this.$nextTick(() => { setTimeout(() => this.$nuxt.$loading.finish(), 0) })
    },
    
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
        this.errors.push(e)
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
        this.errors.push(e)
      }
    }
  },
  async mounted() {
    this.getData()
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
