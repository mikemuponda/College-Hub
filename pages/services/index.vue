<template>
  <div style="width: 100%;">
		<div class="container-fluid">
			Hello world
		</div>
	</div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Collegehub | Services',
    }
  },
  mounted() {
    this.$nextTick(() => {this.$nuxt.$loading.start()})
    this.$nextTick(() => {setTimeout(() => this.$nuxt.$loading.finish(), 400)})
  }
}
</script>
