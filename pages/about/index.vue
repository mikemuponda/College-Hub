<template>
  <div style="width:100%">
    <!--snippet from bootsnipp.com statrs after this-->
    <section id="about" class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-xs-8">
            <div class="item-box">
              <h2 class="heading-two">About Us</h2>
            </div>
            <div class="item-box">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="subheading-three">We are Collegehub!</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <p class="about-us-p">
                        We provide awesome services to simplify college life. We are passionate about
                        making university experiences an easy ride.
                      </p>
                      <p class="about-us-p">We are based in Zimbabwe and we do amazing things.</p>
                    </div>
                    <div class="col-md-6">
                      <div class="about-img">
                        <img src="/img/logo.png">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="subheading-three">What drives us</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="about-img">
                        <img src="/img/logo.png">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <p class="about-us-p">
                        We provide awesome services to simplify college life. We are passionate about
                        making university experiences an easy ride.
                      </p>
                      <p class="about-us-p">We are based in Zimbabwe and we do amazing things.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="subheading-three">Our Values</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <p class="about-us-p">
                        Our Values are this and that
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <h2 class="subheading-three">A short Background</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <p class="about-us-p">
                        Founded in 2019 by a group of young people with the aim to ease life for
                        college students, Collegehub seeks to bridge students to various services
                        that students need.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-4">
            <div class="item-box"><h2 class="subheading-three">ads and other stuff to come here</h2></div>
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
      title: 'Collegehub | About Us'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 400)
    })
  }
}
</script>

<style>
.item-box {
  background-color: #fff;
  border-radius: 1px;
  padding-top: 20px;
  padding-bottom: 20px;
  -webkit-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.5);
  margin-top: 10px;
}

section {
  padding: 60px 0;
}

.about-us-p {
  padding: 20px;
  text-align: justify;
}

.about-img {
  width: 100%;
}

.about-img img {
  width: 100%;
}
</style>

