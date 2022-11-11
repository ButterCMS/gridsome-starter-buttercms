import { reactive, ref, toRefs, watch } from 'vue'
import { getButterCMS } from '@/utils/ButterCMS'

const state = reactive({
  error: null,
})

const butterCMS = getButterCMS()

export const useBlogPosts = (filter) => {
  const posts = ref([])
  const loading = ref(true)
  const loadPosts = () => {
    if (typeof filter.value == 'object') {
      butterCMS?.post
        .list(filter.value)
        .then((response) => {
          posts.value = response.data.data
        })
        .catch((e) => (state.error = e))
        .finally(() => {
          loading.value = false
        })
    } else {
      butterCMS.post
        .search(filter.value)
        .then((response) => {
          posts.value = response.data.data
        })
        .catch((e) => (state.error = e))
        .finally(() => {
          loading.value = false
        })
    }
  }
  loadPosts()
  watch(filter, () => loadPosts())
  return { posts, loading }
}

export const useApiError = () => {
  const setError = (error) => {
    state.error = error
  }

  return { ...toRefs(state), setError }
}
