<template>
  <div style="width: 100%;">
		<section id="services" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="item-box">
              <h1 class="heading-two">Services</h1>
            </div>
            <div class="item-box" style="margin-top: 10px;">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="subheading-three">Accommodation</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <p class="about-us-p">
                        College hub offers house owners a platform to share their properties with
                        prospective occupants who are the students.Our clients(students) have nothing
                        short of an efficient ,easy way of accessing off campus accommodation. We
                        assist students in secuing accommodation at a place that suits their desires
                        through the variety of properties on the list.Through our drive to deliver
                        work that exceeds expectation we will help you get the place that you need.
                        We are a full service company ,supporting you through out the process and
                        through our agreements with the house owners we guarantee you a good stay.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="subheading-three">Restaurants</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <p class="about-us-p">
                        Students due to their busy schedules hardly have ample time to go through
                        different websites online to look for a place to have lunch ,dinner,etc.
                        College hub in partnership will restaurants close to campus site ,brings
                        you a listing of Restaurant locations, menus and by the click of a button
                        you can make your reservation on our website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="subheading-three">Taxi.</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <p class="about-us-p">
                        Its quite a nightmare when you find yourself stuck in town or anywhere
                        else away from campus especially at night on a rainy day and there are
                        no public buses to the college.College hub is here to take away that
                        nightmare from you ,make your life easier. Using our taxi platform,
                        you can make an arrangement online and get your taxi wherever you are,
                        anytime of the day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-md-4 col-sm-4 col-xs-4">
            <div class="item-box">
              <h2 class="subheading-three">ads and other stuff to come here</h2>
            </div>
          </div>


        </div>
      </div>
    </section>
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
