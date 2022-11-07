<template>
  <div>
    <ButterHeader />
    <ButterFooter />
  </div>
</template>

<script>
import ButterFooter from '../layouts/ButterFooter'
import ButterHeader from '../layouts/ButterHeader'

export default {
  components: { ButterHeader, ButterFooter },
  metaInfo: {
    title: 'Hello, world!',
  },
}
</script>
