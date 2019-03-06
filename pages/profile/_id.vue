<template>
 <div style="width: 100%">
   {{this.$route.params.id}}
 </div>
</template>

<script>
export default {

 data(){
    return{
      user: {},
      error: ''
      }
    },

  async created(){
    try {
        await this.$store.dispatch('profile', {
          id: this.$route.params.id
        })
      } catch (e) {
        this.error = e.message
      }
  },
}
</script>
