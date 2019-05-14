<template>
  <div style="width: 100%; background: #eee; margin-top: 80px;" class="display-house">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="item-box" style="margin-top: 10px; padding-top: 0px;">
            <div class="row">
              <div class="col-md-12 padding-left:0px">
                <div class="row nopadding desktophouseimages" v-if="house.accommodationImages.length">
                  <div class="col-md-6 nopadding">
                    <div style="width:100%; height:450px;" class="accommodation-images">
                      <img :src="house.accommodationImages[0].path" style="width:100%; height:100%">
                    </div>
                  </div>
                  <div class="col-md-6 nopadding" style="overflow: hidden;">
                    <div
                      style="height: 225px; float: left;"
                      class="nopadding"
                      v-for="(image, index) in accImages"
                      :value="image"
                      :key="index"
                      :index="image"
                      v-bind:style="{width: imageWidth + '%'}"
                    >
                      <div style="width:100%; height:100%;" class="nopadding accommodation-images">
                        <img :title="index" :src="image.path" style="width:100%; height:100%">
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-md-12">
                    <div class="mobilehouseimages">
                      <b-carousel
                        :id="house._id"
                        :interval="0"
                        controls
                        indicators
                        background="#ffffff"
                        img-width="100%"
                        img-height="100%"
                        style="height: 220px; overflow: hidden; border-radius: 1px;"
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
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-md-8">
                      <h1 class="property-title">{{house.title}}</h1>
                      <hr> 
                      <div class="row">
                      <div class="col-md-12">
                        <h6><i style="color:black;" class="fas fa-info-circle"></i>&nbsp;&nbsp;Description</h6>
                        <p>{{house.description}}</p>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-md-12">
                          <ul class="non-ticked">
                            <li><i class="fas fa-building listStylingIcons"></i><strong class="listStyling">Space Type</strong> <span class="listStylingData">{{house.spaceType}}</span></li>
                            <li><i class="fas fa-home listStylingIcons"></i><strong class="listStyling">Total Rooms</strong> <span class="listStylingData">{{house.totalRoomCount}}</span></li>
                            <li><i class="fas fa-bed listStylingIcons"></i><strong class="listStyling">Bedrooms</strong> <span class="listStylingData">{{house.bedroomcount}}</span></li>
                            <li><i class="fas fa-user listStylingIcons"></i><strong class="listStyling">People Per Bedroom</strong> <span class="listStylingData">{{house.countperbedroom}}</span></li>
                            <li><i class="fas fa-book listStylingIcons"></i><strong class="listStyling">Study rooms</strong> <span class="listStylingData">{{house.studyroomcount}}</span></li>
                            <li><i class="fas fa-users listStylingIcons"></i><strong class="listStyling">Guests</strong> <span class="listStylingData">{{house.guestcount}}</span></li>
                          </ul>
                        </div>
                      </div>
                      <hr>
                      <div class="row">
                        <div class="col-md-12">
                          <h6><i style="color:red;" class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Location </h6>
                          <ul class="non-ticked">
                            <li><i class="fas fa-city listStylingIcons"></i><strong class="listStyling">City</strong> <span class="listStylingData">{{house.city}}</span></li>
                            <li><i class="fas fa-map-marker-alt listStylingIcons"></i><strong class="listStyling">Suburb</strong> <span class="listStylingData">{{house.suburb}}</span></li>
                            <li><i class="fas fa-university listStylingIcons"></i><strong class="listStyling">Nearby Universities</strong> <span class="listStylingData"><div style="width: 100%;" v-for="university in house.universities" :key="university">{{university}}</div></span></li>
                          </ul>
                        </div>
                      </div>
                      <hr>
                      <div class="row" style="margin-bottom: 30px;">
                        <div class="col-md-12">
                          <h6>Ammenities &nbsp;<i class="fas fa-arrow-circle-right" ></i></h6>
                          <div class="row nopadding">
                            <div class="col-md-6" v-for="(key, value) in house.amenities" :key="value">
                              <ul class="ticked" v-if="key == true">
                                <li v-if="value=='beds'"><i class="fas fa-bed listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Beds </span></li>
                                <li v-if="value=='essentials'"><i class="fas fa-briefcase listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Essentials</span></li>
                                <li v-if="value=='wifi'"><i class="fas fa-wifi listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Wifi</span></li>
                                <li v-if="value=='desks'"><i class="fas fa-table listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Study Desk(s)</span></li>
                                <li v-if="value=='drawer'"><i class="fas fa-archway listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Drawer(s)</span></li>
                                <li v-if="value=='television'"><i class="fas fa-tv listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">TV</span></li>
                                <li v-if="value=='pool'"><i class="fas fa-swimming-pool listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Swimming Pool</span></li>
                                <li v-if="value=='laundry'"><i class="fas fa-tshirt listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Laundry</span></li>
                                <li v-if="value=='parking'"><i class="fas fa-car listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Parking</span></li>
                                <li v-if="value=='elevator'"><i class="fas fa-accessible-icon listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Accessibility</span></li>
                                <li v-if="value=='hottub'"><i class="fas fa-hot-tub listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Hot Tub</span></li>
                                <li v-if="value=='gym'"><i class="fas fa-dumbbell listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Gym</span></li>
                                <li v-if="value=='firstaid'"><i class="fas fa-first-aid listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">First Aid Kit</span></li>
                                <li v-if="value=='fireextinguisher'"><i class="fas fa-fire-extinguisher listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Fire Extinguisher</span></li>
                                <li v-if="value=='locks'"><i class="fas fa-lock listStylingIconsAmmenities"></i><span class="listStylingDataAmmenity">Security</span></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="item-box ownerProfile">
                        <div
                          v-if="houseOwnerProfile.profileImage"
                          class="ratio img-responsive img-circle"
                          style="margin-left: 10%; margin-top: 0px;"
                          :title="houseOwnerProfile.firstname + ' ' + houseOwnerProfile.lastname"
                          :alt="houseOwnerProfile.firstname + ' ' + houseOwnerProfile.lastname"
                          v-bind:style="{backgroundImage: 'url(' + houseOwnerProfile.profileImage.path + ')'}"
                        ></div>
                        <div
                          v-else
                          class="ratio img-responsive img-circle"
                          style="background-image: url(/profileImages/user.png); margin-left: 10%; margin-top: 0px;"
                          :title="houseOwnerProfile.firstname + ' ' + houseOwnerProfile.lastname"
                          :alt="houseOwnerProfile.firstname + ' ' + houseOwnerProfile.lastname"
                        ></div>
                        <div class="sectionInfo">
                          <h3 class="subheading-two" style="word-spacing: 0px; padding-bottom: 0px; margin: 0px;">{{houseOwnerProfile.firstname}} {{houseOwnerProfile.lastname}}</h3>
                          <p class="subheading-four" style="text-align: center; color: #909090;">{{houseOwnerProfile.city}}, Zimbabwe</p>
                          <div class="pricing-data">
                            <div class="info-icon" style="width: 15%;"><i class="fas fa-info-circle" style="color: purple;"></i></div>
                            <div v-if="house.priceMethod == 'perHead'" class="pricing-info" style="width: 50%;">Pricing per person</div>
                            <div v-else-if="house.priceMethod == 'perRoom'" class="pricing-info" style="width: 50%;">Pricing per room</div>
                            <div v-else-if="house.priceMethod == 'fullHouse'" class="pricing-info" style="width: 50%;">Full House</div>
                            <div v-else class="pricing-info" style="width: 50%;">Pricing</div>
                            <div class="pricing-amount" style="width: 35%; text-align: right;">{{house.priceCurrency}}{{house.priceValue}}</div>  
                          </div>
                          <div class="pricing-data">
                            <div class="info-icon" style="width: 15%;"><i class="fas fa-info-circle" style="color: purple;"></i></div>
                            <div class="pricing-info" style="width: 50%;">Service Fee</div>
                            <div class="pricing-amount" style="width: 35%; text-align: right;">US$0</div>  
                          </div>
                          <div class="pricing-data">
                            <div class="info-icon" style="width: 15%; color: #fff;">.</div>
                            <div class="pricing-info" style="width: 50%;"><strong>Total</strong></div>
                            <div class="pricing-amount" style="width: 35%; text-align: right;"><strong>{{house.priceCurrency}}{{house.priceValue}}</strong></div>  
                          </div>
                          <span style="font-size: 22px;">Per {{house.priceTime}}</span>

                          <!--Logged in and already made Request Start-->
                          <br>
                          <span style="font-size: 16px;" v-if="$store.state.authUser && $store.state.authUser.user._id != house.owner && requested == true">
                            <strong>You made a request to rent</strong>
                          </span>
                          <button
                            v-if="$store.state.authUser && $store.state.authUser.user._id != house.owner && requested == true"
                            class="default-button"
                            style="margin-top: 30px;"
                            @click="startChat(houseOwnerProfile.username)"  
                            ><i class="fas fa-comment"></i> Contact {{houseOwnerProfile.firstname}}</button>
                          <a href="#cancel-request" v-if="$store.state.authUser && $store.state.authUser.user._id != house.owner && requested == true">
                            <button
                              class="default-button"
                              style="margin-top: 30px;"
                              
                            >Cancel Request</button>
                          </a>
                          <div id="cancel-request" class="modal-window">
                            <div>
                              <a href="#cancel-request-close" title="Close" class="modal-close">close &times;</a>
                              <div class="modal-text">Are you sure you want to cancel request?</div>
                              <button class="default-button-small button-red" v-on:click.prevent="modifyRequest(house._id, 'Cancelled')">Yes</button>
                            </div>
                          </div>
                          <!--Logged in and already made Request End-->

                          <!--Logged in and hasn't made request Start-->
                          <a href="#make-request" v-if="$store.state.authUser && $store.state.authUser.user._id != house.owner && requested == false">
                            <button
                              class="default-button"
                              style="margin-top: 30px;"
                            >Request to Rent</button>
                          </a>
                          <div id="make-request" class="modal-window">
                            <div>
                              <a href="#make-request-close" title="Close" class="modal-close">close &times;</a>
                              <div class="modal-text">Are sure you want to make this request.</div>
                              <button class="default-button-small button-red"  @click.prevent="sendRequest()">Yes</button>
                            </div>
                          </div>
                          <!--Logged in and hasn't made request End-->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="taxiMapDisplay" style="width: 100%; margin-bottom: 20px;">
                        <no-ssr>
                          <google-map
                            :center="markers[0].position"
                            :zoom="11"
                            style="width: 100%; height: 100%"
                          >
                            <google-marker
                              v-for="m in markers"
                              :key="m._id"
                              :position="m.position"
                              :clickable="true"
                              :icon="{ url: require('@/assets/icons/house-marker.png')}"
                              @click="center=m.position"
                            ></google-marker>
                          </google-map>
                        </no-ssr>
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
  </div>
</template>



<script>
import defaultAdsColumn from "@/components/defaultAdsColumn";
export default {
  components: {
    defaultAdsColumn: defaultAdsColumn
  },
  data() {
    return {
      userProfile: "",
      house: {},
      errors: [],
      houseExists: null,
      accImages: [],
      imageHeight: 0,
      imageWidth: 0,
      requested: false,
      houseOwnerProfile: {},
      Form: {
        reqID: null,
        requesterID: null,
        houseID: null
      },
      title: "View House",
      description: "Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform."
    };
  },
  methods: {
    async sendRequest(){
      this.Form.reqID = this.$store.state.authUser.user._id + this.house._id
      this.Form.requesterID = this.$store.state.authUser.user._id
      this.Form.houseID = this.house._id
      try{
        this.requested = true
        var x = await this.$store.dispatch("houseRequestToRent", this.Form)
        this.house = x.data.house
        this.userProfile = await this.$store.dispatch("userRequestToRent", this.Form)
        this.userProfile = this.userProfile.data  
      }catch(e){
        this.errors.push(e)
      }
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
      this.requestedHouses = []
       try {
        this.userProfile = await this.$store.dispatch('getProfile', { id: this.$store.state.authUser.user.username })
        this.userProfile = this.userProfile.data.user
        var index
        for(index in this.userProfile.allRequests){
          var request = await this.$store.dispatch('getOneHouse', { id: this.userProfile.allRequests[index].requestedHouseID })
          if(request.data){
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
    },
    async changeHouseStatus(id) {
      var index = this.housesOwned.findIndex(house => house._id === id);
      var newStatus = null;
      if (this.housesOwned[index].status == "Suspended")
        newStatus = "Active";
      else
        newStatus = "Suspended";
      try {
        if (await this.$store.dispatch("changeHouseStatus", {id: id, status: newStatus})) {
          this.housesOwned[index].status = newStatus;
        }
      } catch (e) {
        this.errors.push(e.message);
      }
    },
    async deleteHouse(id) {
      try {
        if (await this.$store.dispatch("deleteHouse", { id: id })) {
          this.houseExists = await this.$store.dispatch("getHousesByID", {id: this.userProfile._id});
          if (this.houseExists.data.message == "House could not be found")
            this.houseExists = false;
          else if (this.houseExists.data.message == "404")
            this.houseExists = false;
          else {
            this.housesOwned = null;
            this.housesOwned = this.houseExists.data;
            this.houseExists = true;
          }
        }
      } catch (e) {
        this.errors.push(e.message);
      }
    },
    startChat(username){
      window.location.href = '/messages/?user=' + username
    }
  },

  async created(){
    if(this.fullHouse){
      this.house = this.fullHouse
    }
    try {
      this.houseOwnerProfile = await this.$store.dispatch('getProfilebyID', { id: this.house.owner })
      this.houseOwnerProfile = this.houseOwnerProfile.data.user
    } catch (e) {
      this.error = e.message
    }
  },

  async mounted() {
    this.$nextTick(() => { this.$nuxt.$loading.start() })
    try {
      this.houseExists = await this.$store.dispatch("getOneHouse", { id: this.$route.params.id });
      if (this.houseExists.data.message == "House could not be found")
        this.houseExists = false;
      else if (this.houseExists.data.message == "404")
        this.houseExists = false;
      else {
        this.house = this.houseExists.data.house
        this.title = this.house.title
        this.description = this.house.description
        this.accImages = this.house.accommodationImages
        if(this.accImages.length >= 5){
          this.accImages.splice(4, 1)
        }
        if(this.accImages.length == 1){
          this.imageHeight = 100
          this.imageWidth = 100
        }else if(this.accImages.length == 2){
          this.imageHeight = 100
          this.imageWidth = 100
        }else if(this.accImages.length == 3){
          this.imageHeight = 100
          this.imageWidth = 50
        }else if(this.accImages.length == 4){
          this.imageHeight = 100
          this.imageWidth = 50
        }
        if(this.house.allRequests && this.$store.state.authUser){
          var index
          for(index in this.house.allRequests){
            if(this.house.allRequests[index].requester == this.$store.state.authUser.user._id && this.house.allRequests[index].requestStatus == 'pending'){
              this.requested = true
            }
          }
        }
        this.houseExists = true
      }
    } catch (e) {
      this.errors.push(e.message);
    }
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 0);});
  },

  async asyncData({ store, params, context }) {
    var x
    if(process.client == true){
      x = await store.dispatch("getHousesByID", { id: params.id });
    }else{
      x = await store.dispatch("getHouseFuck", { id: params.id });
    }
    const house = x
    const fullHouse = house.data.house
    const markers = []
    markers.push(house.data.house)
    return {
      title: house.data.house.title,
      description: house.data.house.description,
      fullHouse: house.data.house,
      markers: markers
    }
  },

  head() {
    return {
      title: this.title + " | Collegehub Zimbabwe",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description
        }
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href:
            "https://www.collegehub.co.zw/houses/view/" + this.$route.params.id
        }
      ]
    };
  }
};
</script>

<style>
.property-title{
  font-size: 22px;
  text-align: left;
  color: #000000;
  word-spacing: 0px;
  padding: 10px 0 5px 0px;
  margin: 10px 0 10px 0px;
  font-weight: 500;
}

.non-ticked li{
  width: 100%;
  height: 30px;
}
.ticked li{
  width: 100%;
  height: 15px;
}
.listStylingIcons{
  float: left;
  width: 5%;
  margin-top: 5px;
}

.listStyling{
  float: left;
  width: 40%;
}
.listStylingData{
  float: left;
  width: 55%;
}

.listStylingIconsAmmenities{
  float: left;
  width: 15%;
  margin-top: 5px;
}
.listStylingDataAmmenity{
  float: left;
  width: 75%;
}
.sectionInfo{
  text-align: center;
  padding: 10px;
}

.sectionInfo .pricing-data{
  width: 100%;
  height: 30px;
  padding-bottom: 1px;
  border-bottom: 1px solid #eee;
  text-align: left;
  font-size: 12px;
  font-weight: 420;
  color: #606060;
}

.sectionInfo .pricing-data div{
  float:left;
  margin-top: 5px;
}
@media only screen and (min-width: 756px) {
  .ownerProfile{
    position: relative;
    width: 100%;
    top: -200px;
    border: 1px solid purple;
  }
  .mobilehouseimages{
    display: none;
  }
}

@media only screen and (max-width: 756px) {
  .desktophouseimages{
    display: none;
  }
  .ownerProfile{
    position: relative;
    width: 100%;
    border: 1px solid purple;
    margin: 10px 0 10px 0;
  }
  .non-ticked li{
    font-size: 13px;
  }
  .listStylingIcons{
    width: 10%;
  }
  .listStyling{
    width: 55%;
  }
  .listStylingData{
    width: 35%;
  }
}

.li {
    display: block;
    width: 25%;
    float: left;
}

.non-ticked{
  list-style: none;
}
.ticked{
  list-style: none;
}
.ticked li:after {
  content: "✓";
}

.desktophouseimages{
  overflow: hidden;
}

.display-house .accommodation-images {
  border: 0.5px solid #fff;
  filter: brightness(0.98);
  transition: transform 0.8s ease;
  overflow: hidden;
}
.display-house .accommodation-images:hover {
  transform: scale(1.04);
  filter: brightness(1.2);
  cursor: pointer;
  border: none;
}
</style>

