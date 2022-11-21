<template>
  <DefaultLayout>
    <HomeView />
  </DefaultLayout>
</template>

<script>
import { useApiError } from '@/utils/hooks'
import HomeView from '@/views/HomeView'
import { ref } from 'vue'

const { error: apiError } = useApiError()
const errorsWhileGenerating = ref(false)

export default {
  components: { HomeView },
  data() {
    return {
      error: apiError || errorsWhileGenerating,
      apiKeyExists: !!process.env.GRIDSOME_APP_BUTTER_CMS_API_KEY,
    }
  },
  mounted() {
    errorsWhileGenerating.value = this.$static.errors.totalCount > 0
  },
}
</script>
