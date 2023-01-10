<template>
  <div>
    <spinner v-show="loading" />
    <div v-if="pageData">
      <template v-for="(item, index) in pageData.body">
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

<static-query>
  query {
    homePageData: allHomePageData {
      edges {
        node {
          fields {
            seo {
              title
              description
            },
            body {
              type,
              fields {
                headline,
                subheadline,
                image,
                button_label,
                button_url,
                scroll_anchor_id,
                image_position,
                features{
                  headline,
                  description,
                  icon
                },
                testimonial {
                  quote,
                  name,
                  title
                }
              }
            }
          }
        }
      }
    }
  }
  </static-query>

<script>
import { inject, nextTick, ref } from 'vue'
import { useApiError } from '@/utils/hooks'
import FeaturesSection from '@/components/Homepage/FeaturesSection'
import { getButterCMS } from '@/utils/ButterCMS'
import TestimonialsSection from '@/components/Homepage/TestimonialsSection'
import BlogSection from '@/components/Homepage/BlogSection'
import TwoColumnsWithImageSection from '@/components/Homepage/TwoColumnsWithImageSection'
import HeroSection from '@/components/Homepage/HeroSection'
import Spinner from '@/components/Spinner'

const { setError } = useApiError()
const pageData = ref(null)
const loading = ref(true)

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
      pageData,
      loading,
    }
  },
  async beforeMount() {
    const { handleMounted } = inject('defaultLayout')

    try {
      const butterCMS = getButterCMS()

      const pageSlug =
        this.$route?.params?.slug || 'landing-page-with-components'

      if (pageSlug !== 'landing-page-with-components') {
        pageData.value = (
          await butterCMS?.page.retrieve('landing-page', pageSlug)
        )?.data.data.fields
      } else {
        pageData.value = this.$static.homePageData.edges[0].node.fields
      }

      loading.value = false

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

    return this.$seo(pageData.value.seo)
  },
}
</script>
