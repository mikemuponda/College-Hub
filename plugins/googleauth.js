import Vue from 'vue'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
    clientId: process.env.google_clientID,
    scope: 'profile email',
    prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)