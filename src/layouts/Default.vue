<template>
  <div>
    <butter-header :menu-items="menuItems" :active-link="activeLink" />
    <slot />
    <ScrollToTop />
    <butter-footer :menu-items="menuItems" :active-link="activeLink" />
  </div>
</template>

<script>
import { nextTick, provide, ref } from 'vue'
import ScrollToTop from '@/components/ScrollToTop'
import HomeView from '@/views/HomeView'

const activeLink = ref('')
const route = ref(undefined)

export default {
  data() {
    return {
      activeLink,
    }
  },
  mounted() {
    window.addEventListener('load', scrollToSection)
    window.document.addEventListener('scroll', onScroll, { passive: true })
  },
  unmounted() {
    window.removeEventListener('load', scrollToSection)
    window.document.removeEventListener('scroll', onScroll)
  },
  setup() {
    provide('layout', {
      handleMounted,
    })
  },
  props: ['menuItems'],
  components: {
    HomeView,
    ScrollToTop,
  },
}

const onScroll = () => {
  const sections = document.querySelectorAll('.page-scroll')
  const scrollPos =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop

  for (let currLink of sections) {
    const currLinkHref = currLink.getAttribute('href')
    const val = currLinkHref?.replace('/', '')
    const refElement = document.querySelector(String(val))
    const scrollTopMinus = scrollPos + 73

    if (
      refElement &&
      refElement?.offsetTop <= scrollTopMinus &&
      refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
    ) {
      activeLink.value = String(currLinkHref)
    }
  }
}
const scrollToSection = async () => {
  await nextTick()

  if (route.value.hash) {
    const elementToScrollId = route.value.hash.slice(1)
    const elem = document.getElementById(elementToScrollId)

    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

function handleMounted() {
  scrollToSection()
}
</script>
