import Butter from 'buttercms'

export const getButterCMS = () => {
  try {
    const apiKey = process.env.GRIDSOME_APP_BUTTER_CMS_API_KEY
    const preview = process.env.GRIDSOME_APP_BUTTER_CMS_PREVIEW !== 'false'
    return Butter(apiKey, preview)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while getting Butter CMS:', error)
  }
}
