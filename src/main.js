import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.js';

// import "bootstrap-vue"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// import {Buffer} from 'buffer';
import { createApp } from 'vue'
import App from './App.vue'

// import { VBTooltip } from 'bootstrap-vue'
// import { VBTooltipPlugin } from 'bootstrap-vue'
// Note: Vue automatically prefixes the directive name with 'v-'
// Vue.directive('b-tooltip', VBTooltip)

createApp(App)
  // .use(Buffer)
  // .use(VBTooltipPlugin)
  // .directive('b-tooltip', VBTooltipPlugin)
  .mount('#app')


