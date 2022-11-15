// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '@/layouts/Default.vue'
import '~/assets/css/bootstrap.min.css'
import '~/assets/css/main.css'
import '~/assets/css/lineicons.css'
import '~/assets/css/tiny-slider.css'
import ButterHeader from '@/components/ButterHeader'
import ButterFooter from '@/components/ButterFooter'
import ScrollToTop from '@/components/ScrollToTop'

export default function (Vue, { router, head, isClient }) {
  Vue.component('DefaultLayout', DefaultLayout)
  Vue.component('ButterHeader', ButterHeader)
  Vue.component('ButterFooter', ButterFooter)
  Vue.component('ScrollToTop', ScrollToTop)
}
