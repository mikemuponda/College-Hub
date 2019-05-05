<template>
  <div style="width: 100%; background: #eee; margin-top: 80px;" class="display-house">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9">
          <div class="item-box" style="margin-top: 10px; padding-top: 0px;">
            <div class="row">
              <div class="col-md-12 padding-left:0px">
                <div class="row nopadding" v-if="house.accommodationImages.length">
                  <div class="col-md-6 nopadding">
                    <div style="width:100%; height:400px;" class="accommodation-images">
                      <img :src="house.accommodationImages[0].path" style="width:100%; height:100%">
                    </div>
                  </div>
                  <div class="col-md-6 nopadding">
                    <div
                      style="height: 200px; float: left;"
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
                <div class="row" style="padding-top:20px;" v-if="$store.state.authUser">
                  <div class="col-md-3" v-if="$store.state.authUser.user._id != house.owner">
                    <p v-if="requested == true">Request Sent</p>
                    <button v-else class="custom-button" @click.prevent="sendRequest()">Request to rent</button>
                  </div>
                  <div class="col-md-3" v-if="$store.state.authUser.user._id == house.owner">
                    <button class="custom-button">Edit</button>
                  </div>
                  <div class="col-md-3" v-if="$store.state.authUser.user._id == house.owner">
                    <button class="custom-button" @click="changeHouseStatus(house._id)">Suspend</button>
                  </div>
                  <div class="col-md-3" v-if="$store.state.authUser.user._id == house.owner">
                    <button class="custom-button" @click="deleteHouse(house._id)">Delete</button>
                    <!--ADD Notification here -->
                  </div>
                </div>
                <!--Extra info section-->
                <div class="row" style="padding-top:30px; padding-bottom:10px;padding-left:20px;">
                     <h5 align="center" style="padding-left:10px; color:#a7234f">About this property</h5>
                </div>
                <div class="row" >
                   <h6 style="padding-left:40px;text:bold;"><i class="far fa-eye"></i>&nbsp;&nbsp;Status<span style="font-size: 13pt;color:green;">: &nbsp; {{house.status}}</span></h6>
                </div>
                 <hr> 
                <div class="row">
                 <div class="col-md-12">
                  <h6 style="padding-left:30px;"><i style="color:black;" class="fas fa-info-circle"></i>&nbsp;&nbsp;Description</h6>
                  
                      <p style="padding-left:30px; color:#a7234f">"{{house.description}}"</p>
                  </div>
                </div>

                 <hr>
                  <div class=row>
                 <div class="col-md-8">
                  
                  <div class="row">
                    <ul class="non-ticked">
                      <li><strong>Owner</strong>: <span>{{house.owner}}</span></li>
                      <li><strong>Space Type</strong>: <span>{{house.spaceType}}</span></li>
                      <li><strong>Room Count</strong>: <span>{{house.totalRoomCount}}</span></li>
                      <li><strong>Bedrooms</strong>: <span>{{house.bedroomcount}}</span></li>
                      <li><strong>People Per Bedroom</strong>: <span>{{house.countperbedroom}}</span></li>
                      <li><strong>Study rooms</strong>: <span>{{house.studyroomcount}}</span></li>
                      <li><strong>Guests</strong>: <span>{{house.guestcount}}</span></li>
                    </ul>
                  </div>
                  <hr>
                  <div class="row" style="padding-left:35px">
                    <h5 align="left" style="padding-left:0px;"><i style="color:red;" class="fas fa-map-marker-alt"></i>&nbsp;Location </h5>
                  </div>
                  <div class="row">
                    <ul class="non-ticked">
                      <li><strong>City</strong>: {{house.city}}</li>
                      <li><strong>Suburb</strong>: {{house.suburb}}</li>
                      <hr  width="18%">
                      <li><strong>Nearby Universities</strong>: {{house.universities.toString()}}</li>
                    </ul>   
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
                 <div class="col-md-4">
                   <div class="item-box nopadding" style="text-align: left; border: 0.5px solid #aaa;">
                        <div class="row nopadding" style="background: #eee;">
                          <p style="color:#a7234f; padding: 20px; font-weight: 400; font-size: 20px;">Price</p>
                        </div>
                        <div class="row">
                          <p style="padding: 40px; font-weight: 300; font-size: 42px;">{{house.priceCurrency}}<span style="color:green">{{house.priceValue}}.00</span> 
                            <br><i class="far fa-user"></i><span style="font-size: 15pt;"> &nbsp; {{house.priceMethod}}/per {{house.priceTime}}</span></br>
                          </p>
                        </div>
                        <hr>
                      </div>
                  </div>
                </div>
               <div class="row" style="padding-left:35px;padding-top:20px;">
                  <h5>Ammenities &nbsp;<i class="fas fa-arrow-circle-right" ></i></h5>
               </div>
            <div class="col-md-12" style="padding-left:40px; padding-right:40px;">
              <div class="row" style="border:1px solid maroon; border-radius:30px;">
                   <div class="col-md-4" style="padding-top:10px; margin:0;">
                       <ul class="ticked">
                      <!--house.ammenties[i] returns true or false but we want yes or no -->
                      <li><i class="fas fa-couch"></i>&nbsp;{{house.furnishStatus}}</li>
                      <li><i class="fas fa-bed"></i>&nbsp;beds {{house.amenities[0]}}</li>
                      <li><i class="fas fa-heart"></i>&nbsp;essentials {{house.amenities[1]}}</li>
                      <li><i class="fas fa-wifi"></i>&nbsp;wifi {{house.amenities[2]}}</li>
                      <li><i class="fas fa-minus"></i>&nbsp;desks {{house.amenities[3]}}</li>
                      <li><i class="fas fa-box"></i>&nbsp;drawers {{house.amenities[4]}}</li>
                      <li><i class="fas fa-tv"></i>&nbsp;television {{house.amenities[5]}}</li>
                       </ul>
                   </div>

                   <div class="col-md-4" style="padding-top:10px; margin:0;">
                    <ul class="ticked">
                      <li><i class="fas fa-swimming-pool"></i>&nbsp;swimming pool{{house.amenities[6]}}</li>
                      <li><i class="fas fa-tshirt"></i>&nbsp;laundry {{house.amenities[7]}}</li>
                      <li><i class="fas fa-parking"></i>&nbsp;parking {{house.amenities[8]}}</li>
                      <li><i class="fas fa-arrow-circle-up"></i>&nbsp;elevator {{house.amenities[9]}}</li>
                      <li><i class="fas fa-hot-tub"></i>&nbsp;hottub {{house.amenities[10]}}</li>
                    </ul>
                   </div>

                   <div class="col-md-4" style="padding-top:10px; margin:0;">
                     <ul class="ticked">
                      <li><i class="fas fa-dumbbell"></i>&nbsp;gym{{house.amenities[11]}}</li>
                      <li><i class="fas fa-first-aid"></i>&nbsp;firstaid {{house.amenities[12]}}</li>
                      <li><i class="fas fa-fire-extinguisher"></i>&nbsp;fire extinguisher {{house.amenities[8]}}</li>
                      <li><i class="fas fa-lock"></i>&nbsp;locks {{house.amenities[9]}}</li>
                    </ul>
                   </div>
                  </div>
              </div>


              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 dashboard-greeting-display">
          <defaultAdsColumn/>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import greetingColumn from "@/components/defaultGreetingColumn";
import defaultAdsColumn from "@/components/defaultAdsColumn";
export default {
  components: {
    greetingColumn: greetingColumn,
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
    }
  },

  async mounted() {
    this.$nextTick(() => { this.$nuxt.$loading.start(); });
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
        if(this.accImages.length > 5){
          this.accImages.splice(4, this.accImages.length - 5)
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
            if(this.house.allRequests[index].requester == this.$store.state.authUser.user._id){
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
    const house = await store.dispatch("getHouseFuck", { id: params.id });
    const markers = []
    markers.push(house.data.house)
    return {
      title: house.data.house.title,
      description: house.data.house.description,
      house: house.data.house,
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
.vl {
  border-left: 1px solid maroon;
  height: 80%;
  left: 80%;
  position:absolute;
  overflow: hidden;
}
.li {
    display: block;
    width: 25%;
    float: left;
}
.centered{
   text-align: center;
   display: inline-block;
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
.display-house .col-md-6 {
  overflow: hidden;
}
.display-house .col-md-3 {
  overflow: hidden;
}
.display-house .accommodation-images {
  border: 0.5px solid black;
  overflow: hidden;
  filter: brightness(0.98);
  transition: transform 0.8s ease;
}
.display-house .accommodation-images:hover {
  transform: scale(1.04);
  filter: brightness(1.2);
  cursor: pointer;
}
</style>

