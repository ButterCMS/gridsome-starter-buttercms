<template>
  <a
    href="#"
    class="scroll-top btn-hover d-flex"
    :class="{ 'd-none': !isVisible }"
  >
    <i class="lni lni-chevron-up"></i>
  </a>
</template>

<script>
import { ref } from 'vue'

const isVisible = ref(false)
const visibleThreshold = 50
export default {
  data() {
    return {
      isVisible,
    }
  },
  mounted() {
    const onScroll = (event) => {
      isVisible.value =
        document.body.scrollTop > visibleThreshold ||
        document.documentElement.scrollTop > visibleThreshold
    }
    window.document.addEventListener('scroll', onScroll, { passive: true })
    return () => window.document.removeEventListener('scroll', onScroll)
  },
}
</script>
