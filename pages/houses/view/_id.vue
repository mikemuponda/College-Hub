<template>
  <div style="width: 100%; background: #eee;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 dashboard-greeting-display">
          <greetingColumn/>
        </div>
        <div class="col-md-7">
          <div class="item-box" style="margin-top: 10px;">
            <div class="row">
              <div class="col-md-3">Request to Rent</div>
              <div class="col-md-3">Edit</div>
              <div class="col-md-3">
                <button on:click="changeHouseStatus(some_house_id_here)">suspend</button>
              </div>
              <div class="col-md-3">
                <button on:click="deleteHouse(some_house_id_here)">delete</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                {{house}}
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
import greetingColumn from '@/components/defaultGreetingColumn'
import defaultAdsColumn from '@/components/defaultAdsColumn'
export default {
  components: {
    greetingColumn: greetingColumn,
    defaultAdsColumn: defaultAdsColumn
  },
  data() {
    return {
      userProfile: '',
      house: null,
      errors: null,
      houseExists: null,
      title: 'View House',
      description: 'Collegehub is the only service in Zimbabwe where university students get easy access to accomodation, restaurants, listings of upcoming events, a marketplace for buying and selling and can travel with great convenience using the taxi finder platform.'
    }
  },
  methods: {
    async changeHouseStatus(id) {
      var index = this.housesOwned.findIndex(house => house._id === id)
      var newStatus = null
      if (this.housesOwned[index].status == 'Suspended') newStatus = 'Active'
      else newStatus = 'Suspended'
      try {
        if (
          await this.$store.dispatch('changeHouseStatus', {
            id: id,
            status: newStatus
          })
        ) {
          this.housesOwned[index].status = newStatus
        }
      } catch (e) {
        this.errors.push(e.message)
      }
    },
    async deleteHouse(id) {
      try {
        if (await this.$store.dispatch('deleteHouse', { id: id })) {
          this.houseExists = await this.$store.dispatch('getHousesByID', {
            id: this.userProfile._id
          })
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
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    try {
      this.houseExists = await this.$store.dispatch('getOneHouse', {
        id: this.$route.params.id
      })
      if (this.houseExists.data.message == 'House could not be found')
        this.houseExists = false
      else if (this.houseExists.data.message == '404') this.houseExists = false
      else {
        this.house = this.houseExists.data.house
        this.title = this.house.title
        this.description = this.house.description
        this.houseExists = true
      }
    } catch (e) {
      this.errors.push(e.message)
    }
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 0)})
  },

  async asyncData ({ store, params, context }) {
    if(process.server){
      const house = await store.dispatch('getHouseFuck', {id: params.id})
      return{
        title: house.data.house.title,
        description: house.data.house.description
      }
    }
  },

  head() {
    return {
      title: this.title + ' | Collegehub Zimbabwe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://www.collegehub.co.zw/houses/view/' + this.$route.params.id
        }
      ],
    }
  }
}
</script>
