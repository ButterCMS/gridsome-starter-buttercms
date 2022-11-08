<template>
  <div>
    <Spinner v-if="loading" />
    <NoApiKeyView v-else-if="!apiKeyExists" />
    <NoApiTokenView v-else-if="error" />
    <DefaultLayout :menu-items="items" v-else>
      <HomeView />
    </DefaultLayout>
  </div>
</template>

<script>
import { useApiError, useMenuItems } from '@/utils/hooks'
import Spinner from '@/components/Spinner'
import NoApiKeyView from '@/views/NoApiKeyView'
import NoApiTokenView from '@/views/NoApiTokenView'
import HomeView from '@/views/HomeView'

const { items, loading } = useMenuItems()
const { error } = useApiError()

export default {
  components: { HomeView, NoApiTokenView, NoApiKeyView, Spinner },
  data() {
    console.log('error: ', error)
    return {
      items,
      loading,
      error,
      apiKeyExists: !!process.env.GRIDSOME_APP_BUTTER_CMS_API_KEY,
    }
  },
  metaInfo: {
    title: 'Gridsome Butter CMS starter',
  },
}
</script>
