<template>
  <div>
    <NoApiKeyView v-if="!apiKeyExists" />
    <NoApiTokenView v-else-if="error" />
    <DefaultLayout v-else>
      <HomeView />
    </DefaultLayout>
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
import { useApiError } from '@/utils/hooks'
import NoApiKeyView from '@/views/NoApiKeyView'
import NoApiTokenView from '@/views/NoApiTokenView'
import HomeView from '@/views/HomeView'
import { ref } from 'vue'

const { error: apiError } = useApiError()
const errorsWhileGenerating = ref(false)

export default {
  components: { HomeView, NoApiTokenView, NoApiKeyView },
  data() {
    return {
      error: apiError || errorsWhileGenerating,
      apiKeyExists: !!process.env.GRIDSOME_APP_BUTTER_CMS_API_KEY,
    }
  },
  mounted() {
    errorsWhileGenerating.value = this.$static.errors.totalCount > 0
  },
  metaInfo: {
    title: 'Gridsome Butter CMS starter',
  },
}
</script>
