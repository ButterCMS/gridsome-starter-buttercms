<template>
  <div>
    <ButterHeader :active-link="activeLink" />
    <slot />
    <ScrollToTop />
    <ButterFooter :active-link="activeLink" />
  </div>
</template>

<script>
import { nextTick, provide, ref } from 'vue'

const activeLink = ref('')
const route = ref(undefined)

export default {
  data() {
    return {
      activeLink,
    }
  },
  mounted() {
    route.value = this.$route
    window.addEventListener('load', scrollToSection)
    window.document.addEventListener('scroll', onScroll, { passive: true })
  },
  unmounted() {
    window.removeEventListener('load', scrollToSection)
    window.document.removeEventListener('scroll', onScroll)
  },
  setup() {
    provide('defaultLayout', {
      handleMounted,
    })
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

  if (route.value?.hash) {
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
