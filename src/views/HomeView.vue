<template>
  <div>
    <div v-if="pageData">
      <template v-for="(item, index) in pageData.fields.body">
        <hero-section
          v-if="item?.type === 'hero'"
          :key="index"
          :fields="item?.fields"
        />
        <two-columns-with-image-section
          v-if="item?.type === 'two_column_with_image'"
          :key="index"
          :fields="item?.fields"
        />
        <features-section
          v-if="item?.type === 'features'"
          :key="index"
          :fields="item?.fields"
        />
        <testimonials-section
          v-if="item?.type === 'testimonials'"
          :key="index"
          :fields="item?.fields"
        />
      </template>
      <blog-section />
    </div>
  </div>
</template>

<script>
import { inject, nextTick, ref } from 'vue'
import { useApiError } from '@/utils/hooks'
import FeaturesSection from '@/components/Homepage/FeaturesSection'
import { getButterCMS } from '@/utils/ButterCMS'
import TestimonialsSection from '@/components/Homepage/TestimonialsSection'
import BlogSection from '@/components/Homepage/BlogSection'
import TwoColumnsWithImageSection from '@/components/Homepage/TwoColumnsWithImageSection'
import HeroSection from '@/components/Homepage/HeroSection'

const { setError } = useApiError()
const pageData = ref(null)

export default {
  components: {
    HeroSection,
    TwoColumnsWithImageSection,
    BlogSection,
    TestimonialsSection,
    FeaturesSection,
  },
  data() {
    return {
      pageData,
    }
  },
  async mounted() {
    const { handleMounted } = inject('defaultLayout')

    try {
      const butterCMS = getButterCMS()
      const pageSlug =
        this.$route?.params?.slug || 'landing-page-with-components'

      pageData.value = (
        await butterCMS?.page.retrieve('landing-page', pageSlug)
      )?.data.data

      await nextTick()
      handleMounted()
    } catch (e) {
      setError(e)
    }
  },
  metaInfo() {
    if (!pageData.value) {
      return
    }

    return this.$seo(pageData.value.fields.seo)
  },
}
</script>
