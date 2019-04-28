<template>
  <div style="width: 100%; background: #eee;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9">
          <div class="item-box" style="margin-top: 10px;">
            <div class="row">
              <div class="col-md-12">
                <div class="row nopadding">
                  <div class="col-md-6 nopadding">
                    <div style="width:100%; height:400px;" class="accommodation-images">
                      <img :src="house.accommodationImages[0].path" style="width:100%; height:100%">
                    </div>
                  </div>
                  <div class="col-md-3 nopadding">
                    <div style="width:100%; height:200px;" class="nopadding accommodation-images">
                      <img :src="house.accommodationImages[1].path" style="width:100%; height:100%">
                    </div>

                    <div style="width:100%; height:200px;" class="nopadding accommodation-images">
                      <img :src="house.accommodationImages[1].path" style="width:100%; height:100%">
                    </div>
                  </div>
                  <div class="col-md-3 nopadding">
                    <div style="width:100%; height:200px;" class="nopadding accommodation-images">
                      <img :src="house.accommodationImages[1].path" style="width:100%; height:100%">
                    </div>

                    <div style="width:100%; height:200px;" class="nopadding accommodation-images">
                      <img :src="house.accommodationImages[1].path" style="width:100%; height:100%">
                    </div>
                  </div>
                </div>
                <div class="row" style="padding-top:20px;">
                  <div class="col-md-3">
                    <button class="custom-button">Request to rent</button>
                  </div>
                  <div class="col-md-3">
                    <button class="custom-button">Edit</button>
                  </div>
                  <div class="col-md-3">
                    <button class="custom-button" @click="changeHouseStatus(house._id)">Suspend</button>
                  </div>
                  <div class="col-md-3">
                    <button class="custom-button" @click="deleteHouse(house._id)">Delete</button>
                    <!--ADD Notification here -->
                  </div>
                </div>
                <!--Extra info section-->
                <div class="row" style="padding-top:20px;">
                 <div class="col-md-3">
                   <h6>About this property</h6>
                   <ul class="list-tick">
                       <li>Owner           {{house.owner}}</li>
                       <li>Space Type      {{house.spaceType}}</li>
                       <li>Rooms    {{house.totalRoomCount}}</li>
                      <li> </li>
                    </ul>

                    <h6>Location</h6>
                      <ul class="list-tick">
                       <li>City           {{house.owner}}</li>
                       <li> Nearby Universities    {{house.universities}}</li>
                      <li> </li>
                       <li>     </li>
                    </ul>
                 </div>

                 <div class="col-md-3">
                   <h6>Ammenities</h6>
                   <ul class="list-tick">
                     <!--house.ammenties[i] returns true or false but we want yes or no -->
                       <li>Furnishing           {{house.furnishStatus}}</li>
                       <li>beds   {{house.amenities[0]}}</li>
                       <li>essentials  {{house.amenities[1]}}</li>
                       <li>wifi {{house.amenities[2]}}</li>
                       <li>drawers  {{house.amenities[3]}}</li>
                       <li>television  {{house.amenities[4]}}</li>
                       <li>pool  {{house.amenities[5]}}</li>
                       <li>laundry  {{house.amenities[6]}}</li>
                       <li>parking  {{house.amenities[7]}}</li>
                       <li>elevator  {{house.amenities[8]}}</li>
                       <li>hottub {{house.amenities[9]}}</li>
                      <li> </li>
                    </ul>
                 </div>
                </div>

                <div class="row">.col-md-</div>
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
      house: null,
      errors: null,
      houseExists: null,
      title: "View House",
      description:
        "Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform."
    };
  },
  methods: {
    async changeHouseStatus(id) {
      var index = this.housesOwned.findIndex(house => house._id === id);
      var newStatus = null;
      if (this.housesOwned[index].status == "Suspended") newStatus = "Active";
      else newStatus = "Suspended";
      try {
        if (
          await this.$store.dispatch("changeHouseStatus", {
            id: id,
            status: newStatus
          })
        ) {
          this.housesOwned[index].status = newStatus;
        }
      } catch (e) {
        this.errors.push(e.message);
      }
    },
    async deleteHouse(id) {
      try {
        if (await this.$store.dispatch("deleteHouse", { id: id })) {
          this.houseExists = await this.$store.dispatch("getHousesByID", {
            id: this.userProfile._id
          });
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
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    try {
      this.houseExists = await this.$store.dispatch("getOneHouse", {
        id: this.$route.params.id
      });

      if (this.houseExists.data.message == "House could not be found")
        this.houseExists = false;
      else if (this.houseExists.data.message == "404") this.houseExists = false;
      else {
        this.house = this.houseExists.data.house;
        this.title = this.house.title;
        this.description = this.house.description;
        this.houseExists = true;
        console.log(this.house);
      }
    } catch (e) {
      this.errors.push(e.message);
    }
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 0);
    });
  },

  async asyncData({ store, params, context }) {
    if (process.server) {
      const house = await store.dispatch("getHouseFuck", { id: params.id });
      return {
        title: house.data.house.title,
        description: house.data.house.description,
        house: house.data.house
      };
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
ul {
  list-style: none;
}

ul li:before {
  content: '✓';
}
.col-md-6{
overflow: hidden;
}
.col-md-3{
  overflow: hidden;
}
.accommodation-images {
  border: 0.5px solid black;
  overflow: hidden;
  filter: brightness(0.98);
  transition: transform .8s ease;
}
.accommodation-images:hover {
  transform: scale(1.04);
  filter: brightness(1.2);

}
</style>

