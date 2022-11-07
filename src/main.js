// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/css/bootstrap.min.css'
import '~/assets/css/main.css'
import '~/assets/css/lineicons.css'
import '~/assets/css/tiny-slider.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  // eslint-disable-next-line vue/multi-word-component-names
  Vue.component('DefaultLayout', DefaultLayout)
}
