<template >
  <div class="loading-page" v-if="loading">
    <div class="row">
      <div class="col-md-5"></div>
      <div class="col-md-2">
        <div class="lds-css ng-scope">
          <div style="width:100%;height:100%" class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 200px;
  z-index: 100;
  background: #fff;
}

@keyframes lds-ripple {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}
@-webkit-keyframes lds-ripple {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}
.lds-ripple {
  position: relative;
}
.lds-ripple div {
  box-sizing: content-box;
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  -webkit-animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(1) {
  border-color: #337ab7;
}
.lds-ripple div:nth-child(2) {
  border-color: #5bc0de;
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.lds-ripple {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}

@media (max-width: 764px) {
  .lds-ripple{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>