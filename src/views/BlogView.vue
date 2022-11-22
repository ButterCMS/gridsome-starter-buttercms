<template>
  <DefaultLayout>
    <spinner v-show="loading" />
    <div v-show="!loading">
      <blog-header :heading="heading" :links="headerLinks" :text="headerText" />
      <blog-layout>
        <blog-posts :blog-posts="posts" />
      </blog-layout>
    </div>
  </DefaultLayout>
</template>

<script>
import { basicBlogLinks } from '@/utils'
import { useApiError, useBlogPosts } from '@/utils/hooks'
import { ref, watch } from 'vue'
import { getBlogCategory, getBlogTag } from '@/utils/blogUtils'
import Spinner from '@/components/Spinner'
import BlogHeader from '@/components/Blog/BlogHeader'
import BlogLayout from '@/layouts/BlogLayout'
import BlogPosts from '@/components/Blog/BlogPosts'

const { setError } = useApiError()
const headerText = ref('')
const heading = ref('')
const filter = ref({})
const headerLinks = ref([])
const seoTitle = ref('')
const seoDescription = ref('')

const loadData = (route) => {
  headerLinks.value = basicBlogLinks

  if ('category' in route.params) {
    const slug = route.params.category
    heading.value = 'Blog Posts by Category'
    filter.value = { category_slug: slug }
    getBlogCategory(slug)
      .then((category) => {
        headerText.value = `Category: ${category.name}`
        seoTitle.value = `Category: ${category.name}`
        seoDescription.value = `Sample blog powered by ButterCMS, showing category: ${category.name}`
      })
      .catch((e) => setError(e))
  } else if ('tag' in route.params) {
    const slug = route.params.tag

    heading.value = 'Blog Posts by Tag'
    filter.value = { tag_slug: slug }

    getBlogTag(slug)
      .then((tag) => {
        headerText.value = `Tag: ${tag.name}`
        seoTitle.value = `Tag: ${tag.name}`
        seoDescription.value = `Sample blog powered by ButterCMS, showing tag: ${tag.name}"`
      })
      .catch((e) => setError(e))
  } else if ('q' in route.query) {
    filter.value = String(route.query['q'])
    heading.value = 'Search Results'
    headerText.value = `Search: ${route.query['q']}`
    seoTitle.value = `search results for ${filter.value}`
    seoDescription.value = `Sample blog powered by ButterCMS, showing search results for query: "${route.query['q']}"`
  } else {
    headerText.value = heading.value = 'All Blog Posts'
    headerLinks.value = [basicBlogLinks[0]]
    filter.value = {}
    seoTitle.value = `All Posts`
    seoDescription.value = `Sample blog powered by ButterCMS, showing all posts.`
  }
}
const { posts, loading } = useBlogPosts(filter)

export default {
  components: { BlogPosts, BlogHeader, Spinner, BlogLayout },
  data() {
    return {
      loading,
      heading,
      headerLinks,
      headerText,
      posts,
    }
  },
  mounted() {
    try {
      watch(() => this.$route, loadData)
      loadData(this.$route)
    } catch (e) {
      setError(e)
    }
  },
  metaInfo() {
    return this.$seo({
      title: seoTitle.value,
      description: seoDescription.value,
    })
  },
}
</script>
