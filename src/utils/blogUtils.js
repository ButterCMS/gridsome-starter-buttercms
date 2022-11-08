import { getButterCMS } from '@/utils/ButterCMS'

export const getBlogCategory = async (categorySlug) => {
  const response = await getButterCMS().category.retrieve(categorySlug)
  return response.data.data
}

export const getBlogTag = async (tagSlug) => {
  const response = await getButterCMS().tag.retrieve(tagSlug)
  return response.data.data
}
