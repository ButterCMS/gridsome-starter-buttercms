<template>
  <div>
    <spinner v-if="loading" />
    <div v-if="pageData">
      <template v-for="(item, index) in pageData.fields.body">
        <hero-section
          v-if="item.type === 'hero'"
          :key="index"
          :fields="item.fields"
        />
        <two-columns-with-image-section
          v-if="item.type === 'two_column_with_image'"
          :key="index"
          :fields="item.fields"
        />
        <features-section
          v-if="item.type === 'features'"
          :key="index"
          :fields="item.fields"
        />
        <testimonials-section
          v-if="item.type === 'testimonials'"
          :key="index"
          :fields="item.fields"
        />
      </template>
      <blog-section :blog-posts="blogPosts" />
    </div>
  </div>
</template>

<script>
import { inject, nextTick, ref } from 'vue'
import { useApiError } from '@/utils/hooks'
import Spinner from '@/components/Spinner'
import FeaturesSection from '@/components/Homepage/FeaturesSection'
import { getButterCMS } from '@/utils/ButterCMS'
import TestimonialsSection from '@/components/Homepage/TestimonialsSection'
import BlogSection from '@/components/Homepage/BlogSection'
import TwoColumnsWithImageSection from '@/components/Homepage/TwoColumnsWithImageSection'
import HeroSection from '@/components/Homepage/HeroSection'

const { setError } = useApiError()
const pageData = ref(null)
const loading = ref(true)
const blogPosts = ref([])

export default {
  components: {
    HeroSection,
    TwoColumnsWithImageSection,
    BlogSection,
    TestimonialsSection,
    FeaturesSection,
    Spinner,
  },
  data() {
    return {
      loading,
      blogPosts,
      pageData,
    }
  },
  async mounted() {
    const { handleMounted } = inject('layout')

    try {
      const butterCMS = getButterCMS()
      const pageSlug =
        this.$route?.params?.slug ?? 'landing-page-with-components'
      const page = await butterCMS?.page.retrieve('landing-page', pageSlug)
      pageData.value = page?.data.data

      const posts = await butterCMS?.post.list({ page: 1, page_size: 2 })
      blogPosts.value = posts?.data.data

      await nextTick()
      loading.value = false
      handleMounted()
    } catch (e) {
      setError(e)
    }
  },
}
</script>
