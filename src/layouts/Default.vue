<template>
  <div>
    <NoApiKeyView v-if="!apiKeyExists" />
    <NoApiTokenView v-else-if="error" />
    <div v-else>
      <ButterHeader :active-link="activeLink" />
      <slot />
      <ScrollToTop />
      <ButterFooter :active-link="activeLink" />
    </div>
  </div>
</template>

<static-query>
query {
	errors: allError {
    totalCount
  }
}
</static-query>

<script>
import { nextTick, provide, ref } from 'vue'
import { useApiError } from '@/utils/hooks'
import NoApiTokenView from '@/views/NoApiTokenView'
import NoApiKeyView from '@/views/NoApiKeyView'

const activeLink = ref('')
const route = ref(undefined)
const { error: apiError } = useApiError()
const errorsWhileGenerating = ref(false)

export default {
  components: { NoApiTokenView, NoApiKeyView },

  data() {
    return {
      activeLink,
      error: apiError || errorsWhileGenerating,
      apiKeyExists: !!process.env.GRIDSOME_APP_BUTTER_CMS_API_KEY,
    }
  },
  mounted() {
    errorsWhileGenerating.value = this.$static.errors.totalCount > 0
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

  if (!sections) {
    return
  }

  sections.forEach((currLink) => {
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
  })
}

const scrollToSection = async () => {
  await nextTick()

  if (!route.value?.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    return
  }

  const elementToScrollId = route.value.hash.slice(1)
  const elem = document.getElementById(elementToScrollId)

  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleMounted() {
  scrollToSection()
}
</script>
